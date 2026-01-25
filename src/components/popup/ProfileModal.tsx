import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { RootState } from "@/app/store";
import { closeProfileModal } from "@/features/modals/profileModalSlice";
import { useUpdateProfileMutation } from "@/services/profileModalService";

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
};

type ProfileResponse = {
  success: boolean;
  message: string;
  data?: {
    user?: User;
  };
};

type Props = {
  user?: User;
};

export default function ProfileModal({ user }: Props) {
  const dispatch = useDispatch();
  const open = useSelector((state: RootState) => state.profileModal.open);
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const previewUrl = useMemo(
    () => (avatarFile ? URL.createObjectURL(avatarFile) : null),
    [avatarFile],
  );

  useEffect(() => {
    if (!open || !user) return;
    setName(user.name || "");
    setEmail(user.email || "");
    setPhone(user.phone || "");
    setAvatarFile(null);
    setFormError(null);
  }, [open, user]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const validate = () => {
    if (!name.trim()) return "Nama wajib diisi.";
    if (!email.trim()) return "Email wajib diisi.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      return "Format email tidak valid.";
    if (!phone.trim()) return "Nomor handphone wajib diisi.";
    if (!/^\d{8,15}$/.test(phone.replace(/\D/g, "")))
      return "Nomor handphone harus 8-15 digit.";
    return null;
  };

  const updateMutation = useUpdateProfileMutation({
    queryClient,
    onSuccess: (res: any) => {
      const updatedUser = res.data;
      const storage =
        localStorage.getItem("auth_token") !== null
          ? localStorage
          : sessionStorage;
      storage.setItem("auth_user", JSON.stringify(updatedUser));
      window.dispatchEvent(new Event("storage"));
      queryClient.setQueryData<ProfileResponse>(["profile"], {
        success: true,
        message: res.message,
        data: { user: updatedUser },
      });
      toast(res.message || "Profile updated successfully");
      dispatch(closeProfileModal());
    },
    onError: (err: unknown) => {
      if (err instanceof Error) setFormError(err.message);
      else setFormError("Gagal memperbarui profil.");
    },
  });

  const handleSave = () => {
    const errorText = validate();
    if (errorText) {
      setFormError(errorText);
      return;
    }
    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("email", email.trim());
    formData.append("phone", phone.trim());
    if (avatarFile) formData.append("avatar", avatarFile);
    updateMutation.mutate(formData);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && dispatch(closeProfileModal())}>
      <DialogContent className="rounded-3xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div
              className="h-14 w-14 rounded-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${
                  previewUrl || user?.avatar || "/images/common/profile-dummy.svg"
                }')`,
              }}
            />
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Avatar</label>
              <Input
                type="file"
                accept="image/*"
                className="cursor-pointer"
                onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama lengkap"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@domain.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Nomor Handphone</label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08xxxxxxxxxx"
            />
          </div>
          {formError && (
            <div className="text-sm font-semibold text-red-600">{formError}</div>
          )}
            <Button
              variant="destructive"
              onClick={handleSave}
              disabled={updateMutation.isPending}
              className="h-11 rounded-[100px] bg-primary-100 text-white font-bold cursor-pointer text-[14px] leading-7 -tracking-[0.02em] md:text-[16px] md:leading-7.5 md:-tracking-[0.02em]"
            >
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
