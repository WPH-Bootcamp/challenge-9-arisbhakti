import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { api } from "@/lib/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

type CartMenu = {
  id: number;
  foodName: string;
  price: number;
  type: "food" | "drink";
  image: string;
};

type CartItem = {
  id: number;
  menu: CartMenu;
  quantity: number;
  itemTotal: number;
};

type CartRestaurant = {
  restaurant: {
    id: number;
    name: string;
    logo: string;
  };
  items: CartItem[];
  subtotal: number;
};

type CartResponse = {
  success: boolean;
  message: string;
  data?: {
    cart?: CartRestaurant[];
    summary?: {
      totalItems: number;
      totalPrice: number;
      restaurantCount: number;
    };
  };
};

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

export default function MyCart() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await api.get<CartResponse>("/api/cart");
      return response.data;
    },
  });

  const errorMessage = (() => {
    if (!isError) return "";
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as { message?: string } | undefined;
      if (data?.message) return data.message;
    }
    return "Gagal memuat data cart.";
  })();

  const shouldLogin = (() => {
    if (!isError) return false;
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data as { message?: string } | undefined;
      return status === 401 || data?.message === "Access token required";
    }
    return false;
  })();

  const cartGroups = data?.data?.cart ?? [];

  return (
    <main className="w-full px-4 md:px-30  pt-4 md:pt-0 md:mt-32 mt-16 flex flex-col gap-4 md:gap-8 text-neutral-950 md:items-center mb-12 md:mb-25">
      <div className="flex flex-col gap-4 md:gap-8 md:w-200">
        <h1 className="font-extrabold text-2xl leading-9 md:text-[32 px] md:leading-10.5">
          My Cart
        </h1>

        <div className="flex flex-col gap-5 ">
          {isLoading && (
            <>
              {Array.from({ length: 2 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="flex flex-col gap-3 md:gap-5 py-4 px-4 shadow-sm rounded-3xl h-fit"
                >
                  <div className="flex flex-row gap-2 items-center">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="h-5 w-40" />
                  </div>
                  {Array.from({ length: 2 }).map((__, idx) => (
                    <div
                      key={`item-${idx}`}
                      className="flex flex-row justify-between"
                    >
                      <div className="flex flex-row gap-4.25">
                        <Skeleton className="w-16 h-16 md:h-20 md:w-20 rounded-2xl" />
                        <div className="flex flex-col justify-center gap-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-5 w-24" />
                        </div>
                      </div>
                      <Skeleton className="h-9 w-24 rounded-full" />
                    </div>
                  ))}
                  <Skeleton className="h-10 w-full rounded-full" />
                </div>
              ))}
            </>
          )}

          {isError && (
            <Alert variant="destructive">
              <AlertTitle>Gagal memuat cart</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
              {shouldLogin && (
                <div className="pt-3">
                  <Button
                    onClick={() =>
                      navigate("/auth", { state: { tab: "signin" } })
                    }
                    className="h-9 rounded-[100px] bg-primary-100 text-white font-bold text-[14px] leading-7 -tracking-[0.02em]"
                  >
                    Login untuk melihat cart
                  </Button>
                </div>
              )}
            </Alert>
          )}

          {!isLoading &&
            !isError &&
            cartGroups.map((group) => (
              <div
                key={group.restaurant.id}
                className="flex flex-col gap-3 md:gap-5 py-4 px-4 shadow-sm rounded-3xl h-fit"
              >
                <div className="flex flex-row gap-1 items-center md:gap-2 ">
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
                  <img
                    src="/images/common/chevron-right.svg"
                    className="w-5 h-5"
                    alt="pointer-right"
                  />
                </div>

                {group.items.map((item) => (
                  <div key={item.id} className="flex flex-row justify-between">
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
                      <button className="h-9 w-9 ring-1 ring-inset ring-neutral-300 rounded-full flex items-center justify-center cursor-pointer md:h-10 md:w-10">
                        <img
                          src="/images/common/minus.svg"
                          alt="decrease"
                          className="w-[19.5px] h-[19.5px] md:w-6 md:h-6"
                        />
                      </button>
                      <div className="text-[16px] leading-7.5 -tracking-[0.02em] font-semibold md:text-[18px] md:leading-8 md:-tracking-[0.02em]">
                        {item.quantity}
                      </div>
                      <button className="h-9 w-9 bg-primary-100 rounded-full flex items-center justify-center cursor-pointer  md:h-10 md:w-10">
                        <img
                          src="/images/common/plus.svg"
                          alt="increase"
                          className="w-[19.5px] h-[19.5px] md:w-6 md:h-6"
                        />
                      </button>
                    </div>
                  </div>
                ))}

                <hr className="border-t border-dashed border-neutral-300" />
                <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
                  <div className="flex flex-col gap-0">
                    <span className="text-sm leading-7 font-medium -mb-1 md:text-base md:leading-7.5 -tracking-[0.03em]">
                      Total
                    </span>
                    <span className="font-extrabold text-lg leading-8 -tracking-[0.02em] md:text-xl md:leading-8.5">
                      {formatRupiah(group.subtotal)}
                    </span>
                  </div>
                  <button className="h-11 md:h-12 w-full md:w-60 rounded-[100px] bg-primary-100 text-white font-bold text-[14px] leading-7 -tracking-[0.02em] items-center justify-center text-center md:text-[16px] md:leading-7.5 md:-tracking-[0.02em]">
                    Checkout
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
