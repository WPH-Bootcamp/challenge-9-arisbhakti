import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const useMyReviewsQuery = <T>(open: boolean) =>
  useQuery({
    queryKey: ["my-reviews"],
    queryFn: async () => {
      const response = await api.get<T>("/api/review/my-reviews", {
        params: { page: 1, limit: 50 },
      });
      return response.data;
    },
    enabled: open,
  });

export const useCreateReviewMutation = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) =>
  useMutation({
    mutationFn: async (payload: {
      transactionId: string;
      restaurantId: number;
      star: number;
      comment: string;
      menuIds: number[];
    }) => {
      const response = await api.post("/api/review", payload);
      return response.data as { message?: string };
    },
    onSuccess,
  });

export const useUpdateReviewMutation = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) =>
  useMutation({
    mutationFn: async (payload: {
      reviewId: number;
      star: number;
      comment: string;
    }) => {
      const response = await api.put(`/api/review/${payload.reviewId}`, {
        star: payload.star,
        comment: payload.comment,
      });
      return response.data as { message?: string };
    },
    onSuccess,
  });
