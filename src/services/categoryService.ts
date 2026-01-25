import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export type CategoryResponse<T> = {
  success: boolean;
  message: string;
  data?: {
    restaurants?: T[];
    pagination?: {
      page?: number;
      limit?: number;
      total?: number;
      totalPages?: number;
    };
    filters?: Record<string, unknown>;
  };
};

export const useCategoryQuery = <T>(
  queryKey: unknown[],
  params: Record<string, unknown>,
) =>
  useQuery({
    queryKey,
    queryFn: async () => {
      const response = await api.get<CategoryResponse<T>>("/api/resto", {
        params,
      });
      return response.data;
    },
  });
