import axios from "axios";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch } from "react-redux";
import ProfileModal from "@/components/popup/ProfileModal";
import { openProfileModal } from "@/features/modals/profileModalSlice";
import { useProfileQuery } from "@/services/profileService";

type ProfileResponse = {
  success: boolean;
  message: string;
  data?: {
    user?: {
      id: number;
      name: string;
      email: string;
      phone: string;
      avatar: string | null;
    };
  };
};

export default function Profile() {
  type User = NonNullable<NonNullable<ProfileResponse["data"]>["user"]>;
  const dispatch = useDispatch();

  const { data, isLoading, isError, error } = useProfileQuery<ProfileResponse>(
    () => {
      const raw =
        localStorage.getItem("auth_user") ||
        sessionStorage.getItem("auth_user");
      if (!raw) return null;
      try {
        const user = JSON.parse(raw) as User;
        return { success: true, message: "OK", data: { user } };
      } catch {
        return null;
      }
    },
  );

  const errorMessage = (() => {
    if (!isError) return "";
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as { message?: string } | undefined;
      if (data?.message) return data.message;
    }
    return "Gagal memuat profil.";
  })();

  const shouldLogin = (() => {
    if (!isError) return false;
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      const data = error.response?.data as { message?: string } | undefined;
      return statusCode === 401 || data?.message === "Access token required";
    }
    return false;
  })();

  const user = data?.data?.user;

  return (
    <div className="flex flex-col gap-4 md:gap-6 pt-4 md:pt-0 md:w-131 mb-12 md:mb-48">
      <h1 className=" font-extrabold text-2xl leading-9 md:text-[32px] md:leading-10.5 ">
        Profile
      </h1>
      {isLoading && (
        <div className="flex flex-col gap-6 p-4 bg-white shadow-2xl rounded-3xl md:p-5">
          <div className="flex flex-col gap-2 md:gap-3">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-36" />
          </div>
          <Skeleton className="h-11 w-full rounded-[100px]" />
        </div>
      )}

      {isError && (
        <Alert variant="destructive">
          <AlertTitle>Gagal memuat profil</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
          {shouldLogin && (
            <div className="pt-3">
              <Button
                onClick={() => window.location.assign("/auth")}
                className="h-9 rounded-[100px] bg-primary-100 text-white font-bold text-[14px] leading-7 -tracking-[0.02em]"
              >
                Login untuk melihat profil
              </Button>
            </div>
          )}
        </Alert>
      )}

      {!isLoading && !isError && (
        <div className="flex flex-col gap-6 p-4 bg-white shadow-2xl rounded-3xl md:p-5  ">
          <div className="flex flex-col gap-2 md:gap-3">
            <div
              className="h-16 w-16 rounded-full inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url('${
                  user?.avatar || "/images/common/profile-dummy.svg"
                }')`,
              }}
            ></div>
            <div className="flex flex-row justify-between">
              <span className="font-medium text-sm leading-7 md:text-base md:leading-7.5 -tracking-[0.03em]">
                Name
              </span>
              <span className="font-bold text-sm leading-7 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em]">
                {user?.name || "-"}
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <span className="font-medium text-sm leading-7 md:text-base md:leading-7.5 -tracking-[0.03em] ">
                Email
              </span>
              <span className="font-bold text-sm leading-7 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em]">
                {user?.email || "-"}
              </span>
            </div>
            <div className="flex flex-row justify-between">
              <span className="font-medium text-sm leading-7 md:text-base md:leading-7.5 -tracking-[0.03em] ">
                Nomor Handphone
              </span>
              <span className="font-bold text-sm leading-7 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em]">
                {user?.phone || "-"}
              </span>
            </div>
          </div>
          <Button
            variant="destructive"
            onClick={() => dispatch(openProfileModal())}
            className="
    h-11 md:h-12 w-full rounded-[100px]
    bg-primary-100 text-white
    font-bold text-[14px] leading-7 -tracking-[0.02em]
    items-center justify-center text-center
    md:text-[16px] md:leading-7.5 md:-tracking-[0.02em]
    cursor-pointer
  "
          >
            Update Profile
          </Button>
        </div>
      )}

      <ProfileModal user={user} />
    </div>
  );
}
