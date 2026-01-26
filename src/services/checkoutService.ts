import { useMutation, useQuery } from "@tanstack/react-query";
import { api, ENDPOINTS } from "@/lib/api";
import dayjs from "dayjs";

export const useCheckoutCartQuery = <T>() =>
  useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await api.get<T>(ENDPOINTS.CART);
      return response.data;
    },
  });

export const useCheckoutUpdateCartMutation = ({
  queryClient,
  dispatch,
  cartItems,
  setItems,
}: any) =>
  useMutation({
    mutationFn: async (payload: { cartItemId: number; quantity: number }) => {
      const response = await api.put(
        `${ENDPOINTS.CART}/${payload.cartItemId}`,
        {
        quantity: payload.quantity,
      },
      );
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
          data?: { cart?: any[] };
        };
        if (!typed.data?.cart) return old;
        const next = typed.data.cart.map((group) => ({
          ...group,
          items: group.items.map((item: any) =>
            item.id === payload.cartItemId
              ? { ...item, quantity: payload.quantity }
              : item,
          ),
          subtotal: group.items.reduce((sum: number, item: any) => {
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

export const useCheckoutDeleteCartMutation = ({
  queryClient,
  dispatch,
  cartItems,
  setItems,
}: any) =>
  useMutation({
    mutationFn: async (payload: { cartItemId: number }) => {
      const response = await api.delete(
        `${ENDPOINTS.CART}/${payload.cartItemId}`,
      );
      return response.data as { success: boolean };
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previous = queryClient.getQueryData(["cart"]);
      const previousItems = cartItems;

      queryClient.setQueryData(["cart"], (old: unknown) => {
        if (!old || typeof old !== "object") return old;
        const typed = old as {
          data?: { cart?: any[] };
        };
        if (!typed.data?.cart) return old;
        const next = typed.data.cart
          .map((group) => ({
            ...group,
            items: group.items.filter((item: any) => item.id !== payload.cartItemId),
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

export const useCheckoutMutation = ({
  queryClient,
  dispatch,
  cartGroups,
  paymentMethod,
  totalItems,
  totalPrice,
  DELIVERY_FEE,
  SERVICE_FEE,
  grandTotal,
  clearCart,
  navigate,
  setErrorMessage,
  setErrorOpen,
}: any) =>
  useMutation({
    mutationFn: async () => {
      const payload = {
        restaurants: cartGroups.map((group: any) => ({
          restaurantId: group.restaurant.id,
          items: group.items.map((item: any) => ({
            menuId: item.menu.id,
            quantity: item.quantity,
          })),
        })),
        deliveryAddress: "Jl. Sudirman No. 25, Jakarta Pusat, 10220",
        phone: "0812-3456-7890",
        paymentMethod,
        notes: "Please ring the doorbell",
      };
      const response = await api.post(ENDPOINTS.ORDER_CHECKOUT, payload);
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
      const cartItemIds = cartGroups.flatMap((group: any) =>
        group.items.map((item: any) => item.id),
      );
      await Promise.allSettled(
        cartItemIds.map((id: number) => api.delete(`${ENDPOINTS.CART}/${id}`)),
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
