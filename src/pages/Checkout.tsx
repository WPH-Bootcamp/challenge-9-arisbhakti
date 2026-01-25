import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import {
  clearCart,
  removeItem,
  upsertItem,
  setItems,
} from "@/features/cart/cartSlice";
import { Button } from "@/components/ui/button";

type CheckoutCartItem = {
  id: number;
  menu: {
    id: number;
    foodName: string;
    price: number;
    type: "food" | "drink";
    image: string;
  };
  quantity: number;
  itemTotal: number;
};

type CheckoutCartGroup = {
  restaurant: {
    id: number;
    name: string;
    logo: string;
  };
  items: CheckoutCartItem[];
  subtotal: number;
};

type CheckoutState = {
  cart?: CheckoutCartGroup[];
  summary?: {
    totalItems: number;
    totalPrice: number;
    restaurantCount: number;
  };
};

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const state = (location.state || {}) as CheckoutState;
  const selectedRestaurantIds = (state.cart ?? []).map(
    (group) => group.restaurant.id,
  );
  const cartQuery = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await api.get<{
        data?: {
          cart?: CheckoutCartGroup[];
          summary?: CheckoutState["summary"];
        };
      }>("/api/cart");
      return response.data;
    },
  });

  const cartGroups =
    cartQuery.data?.data?.cart?.filter((group) =>
      selectedRestaurantIds.includes(group.restaurant.id),
    ) ??
    state.cart ??
    [];

  const DELIVERY_FEE = 15000;
  const SERVICE_FEE = 5000;

  const [paymentMethod, setPaymentMethod] = useState(
    "BNI Bank Negara Indonesia",
  );
  const [errorOpen, setErrorOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("Terjadi kesalahan.");

  const totalItems = cartGroups.reduce(
    (sum, group) =>
      sum + group.items.reduce((acc, item) => acc + item.quantity, 0),
    0,
  );
  const totalPrice = cartGroups.reduce((sum, group) => sum + group.subtotal, 0);
  const grandTotal = totalPrice + DELIVERY_FEE + SERVICE_FEE;

  const updateMutation = useMutation({
    mutationFn: async (payload: { cartItemId: number; quantity: number }) => {
      const response = await api.put(`/api/cart/${payload.cartItemId}`, {
        quantity: payload.quantity,
      });
      return response.data as {
        data?: { cartItem?: { id: number; quantity: number } };
      };
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previous = queryClient.getQueryData(["cart"]);
      const previousItems = cartItems;

      queryClient.setQueryData(["cart"], (old: unknown) => {
        if (!old || typeof old !== "object") return old;
        const typed = old as {
          data?: { cart?: CheckoutCartGroup[] };
        };
        if (!typed.data?.cart) return old;
        const next = typed.data.cart.map((group) => ({
          ...group,
          items: group.items.map((item) =>
            item.id === payload.cartItemId
              ? { ...item, quantity: payload.quantity }
              : item,
          ),
          subtotal: group.items.reduce((sum, item) => {
            const qty =
              item.id === payload.cartItemId ? payload.quantity : item.quantity;
            return sum + item.menu.price * qty;
          }, 0),
        }));
        return { ...typed, data: { ...typed.data, cart: next } };
      });

      return { previous, previousItems };
    },
    onError: (_err, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["cart"], context.previous);
      }
      if (context?.previousItems) {
        dispatch(setItems(context.previousItems));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (payload: { cartItemId: number }) => {
      const response = await api.delete(`/api/cart/${payload.cartItemId}`);
      return response.data as { success: boolean };
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previous = queryClient.getQueryData(["cart"]);
      const previousItems = cartItems;

      queryClient.setQueryData(["cart"], (old: unknown) => {
        if (!old || typeof old !== "object") return old;
        const typed = old as {
          data?: { cart?: CheckoutCartGroup[] };
        };
        if (!typed.data?.cart) return old;
        const next = typed.data.cart
          .map((group) => ({
            ...group,
            items: group.items.filter((item) => item.id !== payload.cartItemId),
          }))
          .filter((group) => group.items.length > 0);
        return { ...typed, data: { ...typed.data, cart: next } };
      });

      return { previous, previousItems };
    },
    onError: (_err, _payload, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["cart"], context.previous);
      }
      if (context?.previousItems) {
        dispatch(setItems(context.previousItems));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        restaurants: cartGroups.map((group) => ({
          restaurantId: group.restaurant.id,
          items: group.items.map((item) => ({
            menuId: item.menu.id,
            quantity: item.quantity,
          })),
        })),
        deliveryAddress: "Jl. Sudirman No. 25, Jakarta Pusat, 10220",
        phone: "0812-3456-7890",
        paymentMethod,
        notes: "Please ring the doorbell",
      };
      const response = await api.post("/api/order/checkout", payload);
      return response.data as { success: boolean };
    },
    onSuccess: async () => {
      queryClient.setQueryData(["cart"], (prev: any) => {
        if (!prev || typeof prev !== "object") return prev;

        const prevObj = prev as { data?: unknown };

        const prevData =
          prevObj.data && typeof prevObj.data === "object" ? prevObj.data : {};

        return {
          ...prevObj,
          data: {
            ...(prevData as Record<string, unknown>),
            summary: {
              totalItems: 0,
              totalPrice: 0,
              restaurantCount: 0,
            },
          },
        };
      });
      const cartItemIds = cartGroups.flatMap((group) =>
        group.items.map((item) => item.id),
      );
      await Promise.allSettled(
        cartItemIds.map((id) => api.delete(`/api/cart/${id}`)),
      );
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      dispatch(clearCart());
      localStorage.removeItem("cart_state");
      const successPayload = {
        date: dayjs().toISOString(),
        paymentMethod,
        totalItems,
        price: totalPrice,
        deliveryFee: DELIVERY_FEE,
        serviceFee: SERVICE_FEE,
        total: grandTotal,
      };
      localStorage.setItem("checkout_success", JSON.stringify(successPayload));
      navigate("/success");
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Checkout gagal. Coba lagi.");
      }
      setErrorOpen(true);
    },
  });

  const banks = [
    {
      value: "BNI Bank Negara Indonesia",
      label: "Bank Negara Indonesia",
      logo: "/images/common/BNI.svg",
    },
    {
      value: "BRI Bank Rakyat Indonesia",
      label: "BRI Bank Rakyat Indonesia",
      logo: "/images/common/BRI.svg",
    },
    {
      value: "BCA Virtual Account",
      label: "BCA Virtual Account",
      logo: "/images/common/BCA.svg",
    },
    {
      value: "Mandiri",
      label: "Mandiri",
      logo: "/images/common/Mandiri.svg",
    },
  ];

  return (
    <main className="text-neutral-950 w-full px-4  md:mt-32 pt-4 md:pt-0 mt-16 md:flex md:flex-col gap-4 md:gap-6 items-center z-10 mb-12 md:mb-25">
      <div className="flex flex-col gap-4 md:gap-6 md:w-250">
        <h1 className="font-extrabold text-2xl leading-9 md:text-[32px] md:leading-10.5">
          Checkout
        </h1>
        <div className="flex flex-col gap-4 md:flex-row md:gap-5 md:items-start">
          {/* left side */}
          <div className="flex flex-col gap-4 md:flex-1/4">
            {/* Delviery Address */}
            <div className="flex flex-col gap-4 p-4 rounded-3xl shadow-sm md:gap-5.25 md:p-5">
              {/* Header & Text */}
              <div className="flex flex-col gap-1">
                {/* Header */}
                <div className="flex flex-row gap-2 items-center">
                  <img
                    src="/images/common/location.svg"
                    className="w-6 h-6"
                    alt="delivery-address"
                  />
                  <span className="text-base leading-7.5 font-extrabold md:text-lg md:leading-8 -tracking-[0.02em] ">
                    Delivery Address
                  </span>
                </div>
                {/* Address */}
                <span className="text-sm leading-7 font-medium md:text-base md:leading-7.5 md:-tracking-[0.03em]">
                  Jl. Sudirman No. 25, Jakarta Pusat, 10220
                </span>
                <span className="text-sm leading-7 font-medium md:text-base md:leading-7.5 md:-tracking-[0.03em]">
                  0812-3456-7890
                </span>
              </div>
              {/* button */}
              <button className="h-9 w-30 md:h-10  rounded-full ring-1 ring-inset ring-neutral-300 flex items-center justify-center font-bold text-sm leading-7 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em]">
                Change
              </button>
            </div>
            {/* Order Items */}
            {cartGroups.map((group) => (
              <div
                key={group.restaurant.id}
                className="flex flex-col gap-3 p-4 rounded-3xl shadow-sm md:p-5 md:gap-5.25"
              >
                <div className="flex flex-row justify-between items-center just">
                  <div className="flex flex-row gap-1 items-center  md:gap-2 ">
                    <img
                      src={
                        group.restaurant.logo ||
                        "/images/common/icon-restaurant-dummy.svg"
                      }
                      className="w-8 h-8"
                      alt={group.restaurant.name}
                    />
                    <span className="font-bold text-base leading-7.5 -tracking-[0.02em] md:text-lg md:leading-8 md:-tracking-[0.03em] ">
                      {group.restaurant.name}
                    </span>
                  </div>
                  <button
                    onClick={() => navigate(`/details/${group.restaurant.id}`)}
                    className="h-9 w-26.5 md:h-10 md:w-30 rounded-full ring-1 ring-inset ring-neutral-300 flex items-center justify-center font-bold text-sm leading-7 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em] cursor-pointer"
                  >
                    Add Item
                  </button>
                </div>
                {group.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-row items-center justify-between"
                  >
                    <div className="flex flex-row gap-4.25">
                      <div
                        className="bg-cover bg-center bg-no-repeat text-xl w-16 h-16 md:h-20 md:w-20 rounded-2xl"
                        style={{
                          backgroundImage: `url('${item.menu.image}')`,
                        }}
                      />
                      <div className="flex flex-col justify-center">
                        <span className="font-medium text-sm leading-7 md:text-base md:leading-7.5 -tracking-[0.03em]">
                          {item.menu.foodName}
                        </span>
                        <span className="font-extrabold text-base leading-7.5 md:text-lg md:leading-8 -tracking-[0.02em]">
                          {formatRupiah(item.menu.price)}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-row items-center gap-4 py-6">
                      <button
                        onClick={() => {
                          const nextQty = item.quantity - 1;
                          if (nextQty <= 0) {
                            deleteMutation.mutate({ cartItemId: item.id });
                            dispatch(removeItem(item.menu.id));
                            return;
                          }
                          updateMutation.mutate({
                            cartItemId: item.id,
                            quantity: nextQty,
                          });
                          dispatch(
                            upsertItem({
                              menuId: item.menu.id,
                              cartItemId: item.id,
                              name: item.menu.foodName,
                              price: item.menu.price,
                              image: item.menu.image,
                              restaurantId: group.restaurant.id,
                              restaurantName: group.restaurant.name,
                              qty: nextQty,
                            }),
                          );
                        }}
                        className="h-9 w-9 ring-1 ring-inset ring-neutral-300 rounded-full flex items-center justify-center cursor-pointer md:h-10 md:w-10"
                      >
                        <img
                          src="/images/common/minus.svg"
                          alt="decrease"
                          className="w-[19.5px] h-[19.5px] md:w-6 md:h-6"
                        />
                      </button>
                      <div className="text-[16px] leading-7.5 -tracking-[0.02em] font-semibold md:text-[18px] md:leading-8 md:-tracking-[0.02em]">
                        {item.quantity}
                      </div>
                      <button
                        onClick={() => {
                          const nextQty = item.quantity + 1;
                          updateMutation.mutate({
                            cartItemId: item.id,
                            quantity: nextQty,
                          });
                          dispatch(
                            upsertItem({
                              menuId: item.menu.id,
                              cartItemId: item.id,
                              name: item.menu.foodName,
                              price: item.menu.price,
                              image: item.menu.image,
                              restaurantId: group.restaurant.id,
                              restaurantName: group.restaurant.name,
                              qty: nextQty,
                            }),
                          );
                        }}
                        className="h-9 w-9 bg-primary-100 rounded-full flex items-center justify-center cursor-pointer  md:h-10 md:w-10"
                      >
                        <img
                          src="/images/common/plus.svg"
                          alt="increase"
                          className="w-[19.5px] h-[19.5px] md:w-6 md:h-6"
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Right Side, Payment Method */}
          <div className="flex flex-col gap-4 p-4 rounded-3xl shadow-sm w-full md:flex-1 md:p-5">
            {/* Payment Method div */}
            <div className="flex flex-col gap-3 md:gap-4">
              <h1 className="font-bold text-base leading-7.5 md:text-lg md:leading-8 -tracking-[0.02em] ">
                Payment Method
              </h1>
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
                className="flex flex-col gap-3"
              >
                {banks.map((bank) => (
                  <div key={bank.value} className="flex flex-col gap-3">
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-row gap-2 items-center ">
                        <div className="w-10 h-10 flex items-center justify-center rounded-xl ring-[0.75px] ring-inset ring-neutral-300">
                          <img
                            src={bank.logo}
                            className="w-6 h-6"
                            alt={bank.label}
                          />
                        </div>
                        <span className="font-bold text-sm leading-7.5 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em]">
                          {bank.label}
                        </span>
                      </div>
                      <label className="flex items-center ">
                        <RadioGroupItem value={bank.value} />
                      </label>
                    </div>
                    <hr />
                  </div>
                ))}
              </RadioGroup>
              <hr className="border-t border-dashed border-neutral-300" />
              {/* Payment Summary */}
              <div className="flex flex-col gap-4">
                <h1 className="font-extrabold text-base leading-7.5 md:text-lg md:leading-8 -tracking-[0.02em]  ">
                  Payment Summary
                </h1>
                <div className="flex flex-row justify-between">
                  <span className="text-sm leading-7 font-medium md:text-base md:leading-7.5 md:-tracking-[0.03em]">
                    Price ( {totalItems} items )
                  </span>
                  <span className="font-bold text-sm leading-7 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em]">
                    {formatRupiah(totalPrice)}
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="text-sm leading-7 font-medium  md:text-base md:leading-7.5 md:-tracking-[0.03em]">
                    Delivery Fee
                  </span>
                  <span className="font-bold text-sm leading-7 -tracking-[0.02em]  md:text-base md:leading-7.5 md:-tracking-[0.02em]">
                    {formatRupiah(DELIVERY_FEE)}
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="text-sm leading-7 font-medium  md:text-base md:leading-7.5 md:-tracking-[0.03em]">
                    Service Fee
                  </span>
                  <span className="font-bold text-sm leading-7 -tracking-[0.02em]  md:text-base md:leading-7.5 md:-tracking-[0.02em]">
                    {formatRupiah(SERVICE_FEE)}
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="text-base leading-7.5 font-normal -tracking-[0.02em] md:text-lg md:leading-8">
                    Total
                  </span>
                  <span className="font-extrabold text-base leading-7.5 md:text-lg md:leading-8 -tracking-[0.02em]">
                    {formatRupiah(grandTotal)}
                  </span>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => checkoutMutation.mutate()}
                  disabled={
                    checkoutMutation.isPending || cartGroups.length === 0
                  }
                  className="
    h-11 md:h-12 w-full rounded-[100px]
    bg-primary-100 text-white
    font-bold text-base leading-7.5 -tracking-[0.02em]
    items-center justify-center text-center
    cursor-pointer
    disabled:opacity-60 disabled:cursor-not-allowed
  "
                >
                  {checkoutMutation.isPending ? "Processing..." : "Buy"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={errorOpen} onOpenChange={setErrorOpen}>
        <DialogContent className="rounded-3xl">
          <DialogHeader>
            <DialogTitle>Checkout gagal</DialogTitle>
            <DialogDescription>{errorMessage}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </main>
  );
}

{
  /* <label className="flex items-center gap-3">
                <RadioGroupItem value="1km" />
                <span>Within 1 km</span>
              </label> */
}

{
  /* <h1 className="font-extrabold text-2xl leading-9 md:text-[32 px] md:leading-10.5">
  Checkout
</h1>; */
}
