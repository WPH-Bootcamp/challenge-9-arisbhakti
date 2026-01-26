import { useMutation, useQuery, keepPreviousData } from "@tanstack/react-query";
import { api, ENDPOINTS } from "@/lib/api";

export const useRestaurantDetailQuery = <T>(
  id: string | undefined,
  menuLimit: number,
  reviewLimit: number,
) =>
  useQuery({
    queryKey: ["restaurant-detail", id, menuLimit, reviewLimit],
    queryFn: async () => {
      const response = await api.get<{ success: boolean; message: string; data?: T }>(
        `${ENDPOINTS.RESTO}/${id}`,
        { params: { limitMenu: menuLimit, limitReview: reviewLimit } },
      );
      return response.data;
    },
    enabled: Boolean(id),
    placeholderData: keepPreviousData,
  });

export const useAddToCartMutation = ({
  queryClient,
  dispatch,
  cartItems,
  detail,
  upsertItem,
  setItems,
  setCartItemId,
  updateQuantity,
}: any) =>
  useMutation({
    mutationFn: async (payload: {
      restaurantId: number;
      menuId: number;
      quantity: number;
    }) => {
      const response = await api.post(ENDPOINTS.CART, payload);
      return response.data as {
        data?: { cartItem?: { id: number; quantity: number } };
      };
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousItems = cartItems;
      const existing = cartItems.find((item: any) => item.menuId === payload.menuId);
      const nextQty = (existing?.qty ?? 0) + payload.quantity;

      if (detail) {
        const menu = detail.menus.find((m: any) => m.id === payload.menuId);
        if (menu) {
          dispatch(
            upsertItem({
              menuId: menu.id,
              name: menu.foodName,
              price: menu.price,
              image: menu.image,
              restaurantId: detail.id,
              restaurantName: detail.name,
              qty: nextQty,
              cartItemId: existing?.cartItemId,
            }),
          );
        }
      }

      return { previousItems };
    },
    onError: (_err, _payload, context) => {
      if (context?.previousItems) {
        dispatch(setItems(context.previousItems));
      }
    },
    onSuccess: (data, payload) => {
      const cartItemId = data?.data?.cartItem?.id;
      const quantity = data?.data?.cartItem?.quantity;
      if (cartItemId) {
        dispatch(setCartItemId({ menuId: payload.menuId, cartItemId }));
      }
      if (typeof quantity === "number") {
        dispatch(updateQuantity({ menuId: payload.menuId, qty: quantity }));
      }
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
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
      const previousItems = cartItems;
      const target = cartItems.find(
        (item: any) => item.cartItemId === payload.cartItemId,
      );
      if (target) {
        dispatch(updateQuantity({ menuId: target.menuId, qty: payload.quantity }));
      }
      return { previousItems };
    },
    onError: (_err, _payload, context) => {
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
      const response = await api.delete(
        `${ENDPOINTS.CART}/${payload.cartItemId}`,
      );
      return response.data as { success: boolean };
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousItems = cartItems;
      const target = cartItems.find(
        (item: any) => item.cartItemId === payload.cartItemId,
      );
      if (target) {
        dispatch(removeItem(target.menuId));
      }
      return { previousItems };
    },
    onError: (_err, _payload, context) => {
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
