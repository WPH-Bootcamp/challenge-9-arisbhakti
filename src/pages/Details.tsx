import { useNavigate, useParams } from "react-router-dom";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { api } from "@/lib/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import {
  removeItem,
  setItems,
  setCartItemId,
  updateQuantity,
  upsertItem,
} from "@/features/cart/cartSlice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type MenuItem = {
  id: number;
  foodName: string;
  price: number;
  type: "food" | "drink";
  image: string;
};

type ReviewItem = {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: {
    id: number;
    name: string;
    avatar: string | null;
  };
};

type RestaurantDetail = {
  id: number;
  name: string;
  star: number;
  averageRating: number;
  place: string;
  coordinates?: {
    lat: number;
    long: number;
  };
  logo: string;
  images: string[];
  category: string;
  totalMenus: number;
  totalReviews: number;
  menus: MenuItem[];
  reviews: ReviewItem[];
};

type DetailResponse = {
  success: boolean;
  message: string;
  data?: RestaurantDetail;
};

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

const StarRow = ({ count }: { count: number }) => {
  const stars = Math.max(0, Math.min(5, Math.round(count)));
  return (
    <div className="flex flex-row">
      {Array.from({ length: stars }).map((_, index) => (
        <img
          key={`star-${index}`}
          src="/images/common/star.svg"
          className="w-6 h-6"
          alt="star"
        />
      ))}
    </div>
  );
};

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const MENU_STEP = 10;
  const REVIEW_STEP = 6;
  const [menuLimit, setMenuLimit] = React.useState(MENU_STEP);
  const [reviewLimit, setReviewLimit] = React.useState(REVIEW_STEP);
  const [menuFilter, setMenuFilter] = React.useState<"all" | "food" | "drink">(
    "all",
  );
  const [shareOpen, setShareOpen] = React.useState(false);
  const [shareStatus, setShareStatus] = React.useState<
    "idle" | "copied" | "failed"
  >("idle");
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  const mobileCarouselRef = React.useRef<HTMLDivElement | null>(null);
  const [isLogin, setIsLogin] = React.useState(false);

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["restaurant-detail", id, menuLimit, reviewLimit],
    queryFn: async () => {
      const response = await api.get<DetailResponse>(`/api/resto/${id}`, {
        params: { limitMenu: menuLimit, limitReview: reviewLimit },
      });
      return response.data;
    },
    enabled: Boolean(id),
    placeholderData: keepPreviousData,
  });

  const errorMessage = (() => {
    if (!isError) return "";
    if (axios.isAxiosError(error)) {
      const data = error.response?.data as { message?: string } | undefined;
      if (data?.message) return data.message;
    }
    return "Gagal memuat detail restoran.";
  })();
  const shouldLogin = (() => {
    if (!isError) return false;
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const data = error.response?.data as { message?: string } | undefined;
      return status === 401 || data?.message === "Access token required";
    }
    return false;
  })();

  const detail = data?.data;
  const images = detail?.images ?? [];
  const heroImages = [
    images[0] || "/images/common/details-dummy-1.svg",
    images[1] || "/images/common/details-dummy-2.svg",
    images[2] || "/images/common/details-dummy-3.svg",
    images[3] || "/images/common/details-dummy-4.svg",
  ];
  const mobileImages = images.length > 0 ? images : [heroImages[0]];

  const handleMobileScroll = () => {
    const el = mobileCarouselRef.current;
    if (!el) return;
    const width = el.clientWidth;
    if (width === 0) return;
    const nextIndex = Math.round(el.scrollLeft / width);
    setActiveImageIndex(
      Math.max(0, Math.min(nextIndex, mobileImages.length - 1)),
    );
  };

  const hasMoreMenu = (detail?.menus?.length ?? 0) >= menuLimit;
  const hasMoreReview = (detail?.reviews?.length ?? 0) >= reviewLimit;
  const filteredMenus =
    detail?.menus?.filter((menu) =>
      menuFilter === "all" ? true : menu.type === menuFilter,
    ) ?? [];

  React.useEffect(() => {
    const syncAuth = () => {
      const token = localStorage.getItem("auth_token");
      setIsLogin(Boolean(token));
    };

    syncAuth();
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const addMutation = useMutation({
    mutationFn: async (payload: {
      restaurantId: number;
      menuId: number;
      quantity: number;
    }) => {
      const response = await api.post("/api/cart", payload);
      return response.data as {
        data?: { cartItem?: { id: number; quantity: number } };
      };
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousItems = cartItems;
      const existing = cartItems.find((item) => item.menuId === payload.menuId);
      const nextQty = (existing?.qty ?? 0) + payload.quantity;

      if (detail) {
        const menu = detail.menus.find((m) => m.id === payload.menuId);
        if (menu) {
          dispatch(
            upsertItem({
              menuId: menu.id,
              name: menu.foodName,
              price: menu.price,
              image: menu.image,
              restaurantId: detail.id,
              restaurantName: detail.name,
              qty: nextQty,
              cartItemId: existing?.cartItemId,
            }),
          );
        }
      }

      return { previousItems };
    },
    onError: (_err, _payload, context) => {
      if (context?.previousItems) {
        dispatch(setItems(context.previousItems));
      }
    },
    onSuccess: (data, payload) => {
      const cartItemId = data?.data?.cartItem?.id;
      const quantity = data?.data?.cartItem?.quantity;
      if (cartItemId) {
        dispatch(setCartItemId({ menuId: payload.menuId, cartItemId }));
      }
      if (typeof quantity === "number") {
        dispatch(updateQuantity({ menuId: payload.menuId, qty: quantity }));
      }
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: { cartItemId: number; quantity: number }) => {
      const response = await api.put(`/api/cart/${payload.cartItemId}`, {
        quantity: payload.quantity,
      });
      return response.data as {
        data?: { cartItem?: { id: number; quantity: number } };
      };
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousItems = cartItems;
      const target = cartItems.find(
        (item) => item.cartItemId === payload.cartItemId,
      );
      if (target) {
        dispatch(
          updateQuantity({ menuId: target.menuId, qty: payload.quantity }),
        );
      }
      return { previousItems };
    },
    onError: (_err, _payload, context) => {
      if (context?.previousItems) {
        dispatch(setItems(context.previousItems));
      }
    },
    onSuccess: (data, payload) => {
      const cartItemId = data?.data?.cartItem?.id;
      const quantity = data?.data?.cartItem?.quantity;
      const target = cartItems.find(
        (item) => item.cartItemId === payload.cartItemId,
      );
      if (cartItemId && target) {
        dispatch(setCartItemId({ menuId: target.menuId, cartItemId }));
      }
      if (typeof quantity === "number" && target) {
        dispatch(updateQuantity({ menuId: target.menuId, qty: quantity }));
      }
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (payload: { cartItemId: number }) => {
      const response = await api.delete(`/api/cart/${payload.cartItemId}`);
      return response.data as { success: boolean };
    },
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] });
      const previousItems = cartItems;
      const target = cartItems.find(
        (item) => item.cartItemId === payload.cartItemId,
      );
      if (target) {
        dispatch(removeItem(target.menuId));
      }
      return { previousItems };
    },
    onError: (_err, _payload, context) => {
      if (context?.previousItems) {
        dispatch(setItems(context.previousItems));
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });

  const handleIncrease = (menuId: number, restaurantId: number) => {
    const item = cartItems.find((it) => it.menuId === menuId);
    const nextQty = (item?.qty ?? 0) + 1;
    if (item?.cartItemId) {
      updateMutation.mutate({ cartItemId: item.cartItemId, quantity: nextQty });
    } else {
      addMutation.mutate({ restaurantId, menuId, quantity: 1 });
    }
  };

  const handleDecrease = (menuId: number) => {
    const item = cartItems.find((it) => it.menuId === menuId);
    if (!item) return;
    const nextQty = item.qty - 1;
    if (nextQty <= 0) {
      if (item.cartItemId) {
        deleteMutation.mutate({ cartItemId: item.cartItemId });
      } else {
        dispatch(removeItem(menuId));
      }
      return;
    }
    if (item.cartItemId) {
      updateMutation.mutate({ cartItemId: item.cartItemId, quantity: nextQty });
    } else {
      dispatch(updateQuantity({ menuId, qty: nextQty }));
    }
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = detail?.name ? `Foody - ${detail.name}` : "Foody";

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: "Cek restoran ini di Foody!",
          url: shareUrl,
        });
        return;
      }
    } catch {
      // fall through to dialog
    }
    setShareStatus("idle");
    setShareOpen(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShareStatus("copied");
    } catch {
      setShareStatus("failed");
    }
  };

  return (
    <main className="w-full px-4 md:px-30 md:mt-32 pt-4 md:pt-0 mt-16 flex flex-col gap-4 md:gap-8 text-neutral-950">
      {isLoading && (
        <div className="flex flex-col gap-4 md:gap-8">
          <div className="hidden md:grid md:grid-cols-2 md:gap-5 h-117.5">
            <Skeleton className="h-117.5 rounded-3xl" />
            <div className="flex flex-col gap-5 h-full">
              <Skeleton className="h-75.5 rounded-3xl" />
              <div className="flex flex-row gap-5 h-37.5">
                <Skeleton className="h-full w-full rounded-3xl" />
                <Skeleton className="h-full w-full rounded-3xl" />
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <Skeleton className="h-64 w-full rounded-3xl" />
          </div>
        </div>
      )}

      {isError && (
        <Alert variant="destructive">
          <AlertTitle>Gagal memuat detail</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
          {shouldLogin && (
            <div className="pt-3">
              <Button
                onClick={() => navigate("/auth", { state: { tab: "signin" } })}
                className="h-9 rounded-[100px] bg-primary-100 text-white font-bold text-[14px] leading-7 -tracking-[0.02em]"
              >
                Login untuk melihat detail
              </Button>
            </div>
          )}
        </Alert>
      )}

      {!isLoading && !isError && detail && (
        <>
          <div id="details-header" className="flex flex-col gap-4 md:gap-8">
            <div
              id="images-header-desktop"
              className="hidden md:grid md:grid-cols-2 md:gap-5 h-117.5"
            >
              <div
                className="h-117.5 rounded-3xl inset-0 bg-cover bg-center bg-no-repeat text-xl"
                style={{ backgroundImage: `url('${heroImages[0]}')` }}
              ></div>

              <div className="flex flex-col gap-5 h-full">
                <div
                  className="h-75.5 rounded-3xl inset-0 bg-cover bg-center bg-no-repeat text-xl"
                  style={{ backgroundImage: `url('${heroImages[1]}')` }}
                ></div>
                <div className="flex flex-row gap-5 h-37.5">
                  <div
                    className="h-full w-full rounded-3xl inset-0 bg-cover bg-center bg-no-repeat text-xl"
                    style={{ backgroundImage: `url('${heroImages[2]}')` }}
                  ></div>
                  <div
                    className="h-full w-full rounded-3xl inset-0 bg-cover bg-center bg-no-repeat text-xl"
                    style={{ backgroundImage: `url('${heroImages[3]}')` }}
                  ></div>
                </div>
              </div>
            </div>
            <div id="images-header-mobile" className="md:hidden">
              <div className="w-full">
                <div
                  ref={mobileCarouselRef}
                  onScroll={handleMobileScroll}
                  className="flex w-full overflow-x-auto snap-x snap-mandatory gap-4 no-scrollbar"
                >
                  {mobileImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      className="w-90.25 h-[260.63px] rounded-3xl  inset-0 object-cover bg-no-repeat "
                      alt={detail.name}
                    />
                  ))}
                </div>
                <div className="flex items-center justify-center gap-2 pt-3">
                  {mobileImages.map((_, index) => (
                    <span
                      key={`dot-${index}`}
                      className={`h-2.5 w-2.5 rounded-full ${
                        index === activeImageIndex
                          ? "bg-primary-100"
                          : "bg-neutral-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              <img
                src={detail.logo || "/images/common/burger-king-round.svg"}
                alt={detail.name}
                className="w-22.5 h-22.5 md:w-30 md:h-30 rounded-full object-cover"
              />
              <div className="flex flex-col gap-0.5 w-full md:gap-1 justify-center">
                <h3 className="text-neutral-950 font-extrabold text-[16px] md:text-[32px] leading-7.5 md:leading-10.5 -tracking-[0.02em]">
                  {detail.name}
                </h3>
                <div className="flex flex-row gap-1">
                  <img
                    src="/images/common/star.svg"
                    className="w-6 h-6"
                    alt="star"
                  />
                  <span className="text-neutral-950 font-medium leading-7 text-[14px] md:text-[18px] md:leading-7 md:-tracking-[0.02em]">
                    {detail.star}
                  </span>
                </div>
                <div className="flex flex-row gap-1.5 items-center justify-start w-fit">
                  <span className="text-neutral-950 text-[14px] leading-7 -tracking-[-0.02em] md:text-[18px] md:leading-8 md:tracking-normal">
                    {detail.place}
                  </span>
                  <div className="flex flex-row w-fit items-center justify-center">
                    <div className="w-0.5 h-0.5 bg-neutral-950"></div>
                  </div>
                  <span className="text-neutral-950 text-[14px] leading-7 -tracking-[-0.02em] md:text-[18px] md:leading-8 md:tracking-normal">
                    {detail.category}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={handleShare}
              className="h-fit w-fit p-3 rounded-[100px] ring-1 ring-neutral-300 ring-inset flex flex-row gap-3 items-center justify-center md:px-4 md:py-3 md:h-11 md:w-35 cursor-pointer"
            >
              <img
                src="/images/common/share.svg"
                alt="share"
                className="w-5 h-5"
              />
              <span className="hidden md:block text-neutral-950">Share</span>
            </button>
          </div>

          <Dialog open={shareOpen} onOpenChange={setShareOpen}>
            <DialogContent className="rounded-3xl">
              <DialogHeader>
                <DialogTitle>Bagikan restoran ini</DialogTitle>
                <DialogDescription>
                  Salin link di bawah dan kirim ke temanmu.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-3">
                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-800 break-all">
                  {shareUrl}
                </div>
                <button
                  onClick={handleCopyLink}
                  className="h-10 rounded-[100px] bg-primary-100 text-white font-bold text-[14px] leading-7 -tracking-[0.02em] cursor-pointer"
                >
                  Copy Link
                </button>
                {shareStatus === "copied" && (
                  <p className="text-sm text-accent-green font-semibold">
                    Link berhasil disalin.
                  </p>
                )}
                {shareStatus === "failed" && (
                  <p className="text-sm text-red-600 font-semibold">
                    Gagal menyalin link. Coba lagi.
                  </p>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <hr />

          <article id="menu" className="text-neutral-950 flex flex-col gap-4 ">
            <h1 className="font-extrabold text-[24px] leading-9">Menu</h1>
            <div className="flex flex-row gap-2 md:gap-3">
              <button
                onClick={() => setMenuFilter("all")}
                className={`h-10 md:h-11.5 px-4 py-2 rounded-[100px] ring-1 ring-inset font-bold text-[14px] leading-7 -tracking-[-0.02em] text-center flex items-center justify-center md:text-[16px] md:leading-7.5 md:-tracking-[0.02em] ${
                  menuFilter === "all"
                    ? "ring-primary-100 bg-[#FFECEC] text-primary-100"
                    : "ring-neutral-300 text-neutral-950"
                } cursor-pointer`}
              >
                All Menu
              </button>
              <button
                onClick={() => setMenuFilter("food")}
                className={`h-10 md:h-11.5 px-4 rounded-[100px] ring-1 ring-inset font-semibold text-[14px] leading-7 -tracking-[0.02em] items-center justify-center text-center md:text-[16px] md:leading-7.5 md:-tracking-[0.02em] ${
                  menuFilter === "food"
                    ? "ring-primary-100 bg-[#FFECEC] text-primary-100"
                    : "ring-neutral-300 text-neutral-950"
                } cursor-pointer`}
              >
                Food
              </button>
              <button
                onClick={() => setMenuFilter("drink")}
                className={`h-10 md:h-11.5 px-4 rounded-[100px] ring-1 ring-inset font-semibold text-[14px] leading-7 -tracking-[0.02em] items-center justify-center text-center md:text-[16px] md:leading-7.5 md:-tracking-[0.02em] ${
                  menuFilter === "drink"
                    ? "ring-primary-100 bg-[#FFECEC] text-primary-100"
                    : "ring-neutral-300 text-neutral-950"
                } cursor-pointer`}
              >
                Drink
              </button>
            </div>
          </article>

          {filteredMenus.length === 0 ? (
            <Alert>
              <AlertTitle>Belum ada menu</AlertTitle>
              <AlertDescription>
                Menu untuk kategori{" "}
                {menuFilter === "all"
                  ? "All Menu"
                  : menuFilter === "food"
                    ? "Food"
                    : "Drink"}{" "}
                belum tersedia. Coba pilih kategori lain atau kembali lagi
                nanti.
              </AlertDescription>
            </Alert>
          ) : (
            <article className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4 md:gap-x-5 md:gap-y-6">
              {filteredMenus.map((menu) => (
                <div
                  key={menu.id}
                  className="flex flex-col shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-3xl"
                >
                  <div
                    className="h-[172.5px] rounded-tl-2xl rounded-tr-2xl inset-0 bg-cover bg-center bg-no-repeat text-xl"
                    style={{
                      backgroundImage: `url('${
                        menu.image || "/images/common/details-dummy-1.svg"
                      }')`,
                    }}
                  ></div>
                  <div className="flex flex-col md:flex-row md:justify-between gap-4 py-3 px-3 md:py-4 md:px-4  ">
                    <div className="flex flex-col md:flex-1">
                      <span className="font-medium text-[14px] leading-7 md:text-[16px] md:leading-7 md:-tracking-[0.03em]">
                        {menu.foodName}
                      </span>
                      <h3 className="font-extrabold text-[16px] leading-7.5 md:text-[18px] md:leading-8 md:-tracking-[0.02em]">
                        {formatRupiah(menu.price)}
                      </h3>
                    </div>
                    <div className="flex md:flex-1 items-center justfiy-center">
                      {isLogin
                        ? (() => {
                            const item = cartItems.find(
                              (it) => it.menuId === menu.id,
                            );
                            const qty = item?.qty ?? 0;

                            if (qty === 0) {
                              return (
                                <button
                                  onClick={() =>
                                    detail &&
                                    addMutation.mutate({
                                      restaurantId: detail.id,
                                      menuId: menu.id,
                                      quantity: 1,
                                    })
                                  }
                                  className="h-9 md:h-10 w-full rounded-[100px] bg-primary-100 text-white font-bold text-[14px] leading-7 -tracking-[0.02em] items-center justify-center text-center md:text-[16px] md:leading-7.5 md:-tracking-[0.02em] cursor-pointer"
                                >
                                  Add
                                </button>
                              );
                            }

                            return (
                              <div
                                id="quantity-controls"
                                className="flex flex-row items-center gap-4"
                              >
                                <button
                                  onClick={() => handleDecrease(menu.id)}
                                  className="h-9 w-9 ring-1 ring-inset ring-neutral-300 rounded-full flex items-center justify-center cursor-pointer md:h-10 md:w-10"
                                >
                                  <img
                                    src="/images/common/minus.svg"
                                    alt="decrease"
                                    className="w-[19.5px] h-[19.5px] md:w-6 md:h-6"
                                  />
                                </button>
                                <div
                                  id="quantity-info"
                                  className="text-[16px] leading-7.5 -tracking-[0.02em] font-semibold md:text-[18px] md:leading-8 md:-tracking-[0.02em]"
                                >
                                  {qty}
                                </div>
                                <button
                                  onClick={() =>
                                    detail && handleIncrease(menu.id, detail.id)
                                  }
                                  className="h-9 w-9 bg-primary-100 rounded-full flex items-center justify-center cursor-pointer  md:h-10 md:w-10"
                                >
                                  <img
                                    src="/images/common/plus.svg"
                                    alt="increase"
                                    className="w-[19.5px] h-[19.5px] md:w-6 md:h-6"
                                  />
                                </button>
                              </div>
                            );
                          })()
                        : null}
                    </div>
                  </div>
                </div>
              ))}
            </article>
          )}

          <div className="flex flex-row flex-1 w-full items-center justify-center pb-4 md:pb-0">
            <button
              disabled={!hasMoreMenu || isFetching}
              onClick={() => setMenuLimit((prev) => prev + MENU_STEP)}
              className={`h-10 w-40 ring-1 ring-inset ring-neutral-300 rounded-[100px] text-[14px] leading-7 -tracking-[0.02em] font-bold ${
                !hasMoreMenu || isFetching
                  ? "text-neutral-400 cursor-not-allowed"
                  : "text-neutral-950 cursor-pointer"
              }`}
            >
              {!hasMoreMenu
                ? "No More Data"
                : isFetching
                  ? "Loading..."
                  : "Show More"}
            </button>
          </div>

          <hr />

          <article className="flex flex-col gap-4">
            <h2 className="text-[24px] leading-9 font-extrabold md:text-[36px] md:leading-11">
              Review
            </h2>
            <div className="flex flex-row gap-1 items-center">
              <img
                src="/images/common/star.svg"
                className="w-6 h-6 md:w-8.5 md:h-8.5"
                alt="star"
              />
              <span className="font-extrabold text-[16px] leading-7.5 md:text-[20px] md:leading-8.5">
                {detail.averageRating} ({detail.totalReviews} Ulasan)
              </span>
            </div>
            <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-5">
              {detail.reviews.map((review) => (
                <div
                  key={review.id}
                  className="flex flex-col gap-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-3xl px-4 py-4"
                >
                  <div className="flex flex-row gap-3">
                    <div
                      className="h-14.5 w-14.5 md:w-16 md:h-16 rounded-full bg-cover bg-center bg-no-repeat"
                      style={{
                        backgroundImage: `url('${
                          review.user.avatar ||
                          "/images/common/profile-dummy.svg"
                        }')`,
                      }}
                    ></div>
                    <div className="flex flex-col">
                      <h3 className="font-extrabold text-[16px] leading-7.5 md:text-[18px] md:leading-8 -tracking-[0.02em]">
                        {review.user.name}
                      </h3>
                      <p className="text-[14px] leading-7 -tracking-[0.02em] md:text-[16px] md:leading-7.5 md:-tracking-[0.02em]">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <StarRow count={review.star} />
                    <p className="text-[14px] leading-7 -tracking-[0.02em] md:text-[16px] md:leading-7.5">
                      {review.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <div className="flex flex-row flex-1 w-full items-center justify-center pb-4 md:pb-0 mb-13">
            <button
              disabled={!hasMoreReview || isFetching}
              onClick={() => setReviewLimit((prev) => prev + REVIEW_STEP)}
              className={`h-10 w-40 ring-1 ring-inset ring-neutral-300 rounded-[100px] text-[14px] leading-7 -tracking-[0.02em] font-bold ${
                !hasMoreReview || isFetching
                  ? "text-neutral-400 cursor-not-allowed"
                  : "text-neutral-950 cursor-pointer"
              }`}
            >
              {!hasMoreReview
                ? "No More Data"
                : isFetching
                  ? "Loading..."
                  : "Show More"}
            </button>
          </div>
        </>
      )}
    </main>
  );
}
