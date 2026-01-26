import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  address: string;
  phone: string;
  onSave: (address: string, phone: string) => void;
};

export default function ChangeAddressModal({
  open,
  onOpenChange,
  address,
  phone,
  onSave,
}: Props) {
  const [draftAddress, setDraftAddress] = useState(address);
  const [draftPhone, setDraftPhone] = useState(phone);
  const [errors, setErrors] = useState<{ address?: string; phone?: string }>(
    {},
  );
  const [animate, setAnimate] = useState(false);

  React.useEffect(() => {
    if (!open) return;
    setDraftAddress(address);
    setDraftPhone(phone);
    setErrors({});
  }, [open, address, phone]);

  const triggerAnimation = () => {
    setAnimate(true);
    window.setTimeout(() => setAnimate(false), 400);
  };

  const handleSave = () => {
    const nextErrors: { address?: string; phone?: string } = {};
    if (!draftAddress.trim()) {
      nextErrors.address = "Alamat wajib diisi.";
    }
    const digits = draftPhone.replace(/\D/g, "");
    if (!digits) {
      nextErrors.phone = "Nomor handphone wajib diisi.";
    } else if (digits.length < 8 || digits.length > 15) {
      nextErrors.phone = "Nomor handphone harus 8-15 digit.";
    }
    if (nextErrors.address || nextErrors.phone) {
      setErrors(nextErrors);
      triggerAnimation();
      return;
    }
    setErrors({});
    onSave(draftAddress.trim(), draftPhone.trim());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-3xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Ubah Alamat Pengiriman</DialogTitle>
          <DialogDescription>
            Perbarui alamat dan nomor handphone untuk pengantaran pesananmu.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Alamat</label>
            <Input
              value={draftAddress}
              onChange={(e) => setDraftAddress(e.target.value)}
              placeholder="Masukkan alamat lengkap"
              className={`${errors.address ? "border-red-400" : ""} ${
                animate && errors.address ? "animate-shake" : ""
              }`}
            />
            {errors.address ? (
              <p
                className={`text-xs text-red-600 ${
                  animate ? "animate-shake" : ""
                }`}
              >
                {errors.address}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Nomor Handphone</label>
            <Input
              value={draftPhone}
              onChange={(e) => setDraftPhone(e.target.value)}
              placeholder="08xxxxxxxxxx"
              className={`${errors.phone ? "border-red-400" : ""} ${
                animate && errors.phone ? "animate-shake" : ""
              }`}
            />
            {errors.phone ? (
              <p
                className={`text-xs text-red-600 ${
                  animate ? "animate-shake" : ""
                }`}
              >
                {errors.phone}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Button
              variant="destructive"
              className="w-full rounded-[100px] cursor-pointer"
              onClick={handleSave}
            >
              Simpan Perubahan
            </Button>
            <Button
              variant="destructive"
              className="w-full rounded-[100px] cursor-pointer"
              onClick={() => onOpenChange(false)}
            >
              Batal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
