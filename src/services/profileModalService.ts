import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/api";

export const useUpdateProfileMutation = ({
  queryClient,
  onSuccess,
  onError,
}: {
  queryClient: any;
  onSuccess: (data: any) => void;
  onError: (err: unknown) => void;
}) =>
  useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await api.put("/api/auth/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess,
    onError,
  });
