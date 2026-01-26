import { useQuery } from "@tanstack/react-query";
import { api, ENDPOINTS } from "@/lib/api";

export const useCartSummaryQuery = <T>() =>
  useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await api.get<T>(ENDPOINTS.CART);
      return response.data;
    },
  });
