import { useQuery } from "@tanstack/react-query";
import { api, ENDPOINTS } from "@/lib/api";

export const useMyOrdersQuery = <T>(status: string) =>
  useQuery({
    queryKey: ["my-orders", status],
    queryFn: async () => {
      const response = await api.get<T>(ENDPOINTS.ORDER_MY, {
        params: { status, page: 1, limit: 50 },
      });
      return response.data;
    },
  });
