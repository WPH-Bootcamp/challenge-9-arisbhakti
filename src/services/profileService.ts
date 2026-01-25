import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const useProfileQuery = <T>(getFromStorage: () => T | null) =>
  useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const local = getFromStorage();
      if (local) return local;
      const response = await api.get<T>("/api/auth/me");
      return response.data;
    },
  });
