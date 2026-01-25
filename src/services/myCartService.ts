import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const useCartQuery = <T>() =>
  useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await api.get<T>("/api/cart");
      return response.data;
    },
  });

export const useUpdateCartMutation = ({
  queryClient,
  dispatch,
  cartItems,
  setItems,
  setCartItemId,
  updateQuantity,
}: any) =>
  useMutation({
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

      queryClient.setQueryData<T>(["cart"], (old: any) => {
        if (!old?.data?.cart) return old;
        const next = old.data.cart.map((group: any) => ({
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
        return { ...old, data: { ...old.data, cart: next } };
      });

      const target = cartItems.find(
        (item: any) => item.cartItemId === payload.cartItemId,
      );
      if (target) {
        dispatch(updateQuantity({ menuId: target.menuId, qty: payload.quantity }));
      }

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
    onSuccess: (data, payload) => {
      const cartItemId = data?.data?.cartItem?.id;
      const quantity = data?.data?.cartItem?.quantity;
      const target = cartItems.find(
        (item: any) => item.cartItemId === payload.cartItemId,
      );
      if (cartItemId && target) {
        dispatch(setCartItemId({ menuId: target.menuId, cartItemId }));
      }
      if (typeof quantity === "number" && target) {
        dispatch(updateQuantity({ menuId: target.menuId, qty: quantity }));
      }
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

export const useDeleteCartMutation = ({
  queryClient,
  dispatch,
  cartItems,
  removeItem,
  setItems,
}: any) =>
  useMutation({
    mutationFn: async (payload: { cartItemId: number }) => {
      const response = await api.delete(`/api/cart/${payload.cartItemId}`);
      return response.data as { success: boolean };
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previous = queryClient.getQueryData(["cart"]);
      const previousItems = cartItems;

      queryClient.setQueryData<T>(["cart"], (old: any) => {
        if (!old?.data?.cart) return old;
        const next = old.data.cart
          .map((group: any) => ({
            ...group,
            items: group.items.filter((item: any) => item.id !== payload.cartItemId),
          }))
          .filter((group: any) => group.items.length > 0);
        return { ...old, data: { ...old.data, cart: next } };
      });

      const target = cartItems.find(
        (item: any) => item.cartItemId === payload.cartItemId,
      );
      if (target) {
        dispatch(removeItem(target.menuId));
      }

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
