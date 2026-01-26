import { useMutation } from "@tanstack/react-query";
import { api, ENDPOINTS } from "@/lib/api";

export const useUpdateProfileMutation = ({
  onSuccess,
  onError,
}: {
  queryClient: any;
  onSuccess: (data: any) => void;
  onError: (err: unknown) => void;
}) =>
  useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await api.put(ENDPOINTS.AUTH_PROFILE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess,
    onError,
  });
