import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const useCartSummaryQuery = <T>() =>
  useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await api.get<T>("/api/cart");
      return response.data;
    },
  });
