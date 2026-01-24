import { useState } from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { api } from "@/lib/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

type RecommendedItem = {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  category: string;
  reviewCount: number;
  isFrequentlyOrdered: boolean;
};

type RecommendedResponse = {
  success: boolean;
  message: string;
  data?: {
    recommendations?: RecommendedItem[];
    restaurants?: RecommendedItem[];
    pagination?: {
      page?: number;
      limit?: number;
      total?: number;
      totalPages?: number;
    };
  };
};

const Home = () => {
  const [keyword, setKeyword] = useState("");
  const [activeList, setActiveList] = useState<
    | "recommended"
    | "best-seller"
    | "all-restaurants"
    | "nearby"
    | "discount"
    | "delivery"
    | "lunch"
  >("recommended");
  const bestSellerLimit = 20;
  const allRestaurantsLimit = 20;
  const nearbyLimit = 20;
  const nearbyRangeKm = 1;

  const handleSearch = (value: string) => {
    setKeyword(value);
  };

  const recommendedQuery = useQuery({
    queryKey: ["recommended-resto"],
    queryFn: async () => {
      const response = await api.get<RecommendedResponse>(
        "/api/resto/recommended",
      );
      return response.data;
    },
  });

  const bestSellerQuery = useInfiniteQuery({
    queryKey: ["best-seller-resto"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get<RecommendedResponse>(
        "/api/resto/best-seller",
        {
          params: { page: pageParam, limit: bestSellerLimit },
        },
      );
      return response.data;
    },
    enabled: activeList === "best-seller",
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const pagination = lastPage.data?.pagination;
      if (pagination?.page && pagination?.totalPages) {
        return pagination.page < pagination.totalPages
          ? pagination.page + 1
          : undefined;
      }
      const count = lastPage.data?.restaurants?.length ?? 0;
      return count < bestSellerLimit ? undefined : pages.length + 1;
    },
  });

  const allRestaurantsQuery = useInfiniteQuery({
    queryKey: ["all-restaurants"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get<RecommendedResponse>("/api/resto", {
        params: { page: pageParam, limit: allRestaurantsLimit },
      });
      return response.data;
    },
    enabled: activeList === "all-restaurants",
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const pagination = lastPage.data?.pagination;
      if (pagination?.page && pagination?.totalPages) {
        return pagination.page < pagination.totalPages
          ? pagination.page + 1
          : undefined;
      }
      const count = lastPage.data?.restaurants?.length ?? 0;
      return count < allRestaurantsLimit ? undefined : pages.length + 1;
    },
  });

  const nearbyQuery = useInfiniteQuery({
    queryKey: ["nearby-resto", nearbyRangeKm],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get<RecommendedResponse>("/api/resto", {
        params: { range: nearbyRangeKm, limit: nearbyLimit, page: pageParam },
      });
      return response.data;
    },
    enabled: activeList === "nearby",
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) => {
      const pagination = lastPage.data?.pagination;
      if (pagination?.page && pagination?.totalPages) {
        return pagination.page < pagination.totalPages
          ? pagination.page + 1
          : undefined;
      }
      const count = lastPage.data?.restaurants?.length ?? 0;
      return count < nearbyLimit ? undefined : pages.length + 1;
    },
  });

  const getErrorMessage = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      const data = err.response?.data as { message?: string } | undefined;
      if (data?.message) return data.message;
    }
    return "Gagal memuat data.";
  };

  const isLoading =
    activeList === "recommended"
      ? recommendedQuery.isLoading
      : activeList === "best-seller"
        ? bestSellerQuery.isLoading
        : activeList === "all-restaurants"
          ? allRestaurantsQuery.isLoading
          : nearbyQuery.isLoading;
  const isError =
    activeList === "recommended"
      ? recommendedQuery.isError
      : activeList === "best-seller"
        ? bestSellerQuery.isError
        : activeList === "all-restaurants"
          ? allRestaurantsQuery.isError
          : nearbyQuery.isError;
  const errorMessage =
    activeList === "recommended"
      ? getErrorMessage(recommendedQuery.error)
      : activeList === "best-seller"
        ? getErrorMessage(bestSellerQuery.error)
        : activeList === "all-restaurants"
          ? getErrorMessage(allRestaurantsQuery.error)
          : getErrorMessage(nearbyQuery.error);

  const recommendations = recommendedQuery.data?.data?.recommendations ?? [];
  const bestSellers =
    bestSellerQuery.data?.pages.flatMap(
      (page) => page.data?.restaurants ?? [],
    ) ?? [];
  const allRestaurants =
    allRestaurantsQuery.data?.pages.flatMap(
      (page) => page.data?.restaurants ?? [],
    ) ?? [];
  const nearbyRestaurants =
    nearbyQuery.data?.pages.flatMap(
      (page) => page.data?.restaurants ?? [],
    ) ?? [];
  const items =
    activeList === "recommended"
      ? recommendations
      : activeList === "best-seller"
        ? bestSellers
        : activeList === "all-restaurants"
          ? allRestaurants
          : activeList === "nearby"
            ? nearbyRestaurants
            : [];

  const titleText =
    activeList === "recommended"
      ? "Recommended"
      : activeList === "best-seller"
        ? "Best Seller"
        : activeList === "all-restaurants"
          ? "All Restaurant"
          : activeList === "nearby"
            ? `Nearby ( ${nearbyRangeKm} km Range )`
            : activeList === "discount"
              ? "Discount"
              : activeList === "delivery"
                ? "Delivery"
                : "Lunch";

  return (
    <>
      {/* HERO BACKGROUND */}
      <div className="relative w-full h-162 md:h-206.75 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat text-xl"
          style={{
            backgroundImage: `url('/images/common/burger-hero.svg')`,
          }}
        />

        <div className="md:hidden absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent z-10"></div>
        <div className="hidden md:block absolute inset-0 bg-linear-to-t from-black to-transparent z-10"></div>
      </div>

      {/* HERO CONTENT */}
      <div
        id="popular-content"
        className="flex flex-col gap-6 px-4 w-full md:px-0 absolute top-52.5 md:top-81.5 z-10 justify-center items-center text-center"
      >
        <div className="flex flex-col gap-6 md:gap-10">
          <div className="flex flex-col gap-1 md:gap-2">
            <h1 className="font-extrabold text-[36px] leading-11 md:text-[48px] md:leading-15 text-white">
              Explore Culinary Experiences
            </h1>
            <p className="font-bold text-[18px] leading-8 -tracking-[0.03em] md:text-[24px] md:leading-9 md:tracking-normal text-white">
              Search and refine your choice to discover the perfect restaurant.
            </p>
          </div>
          <div>
            <div className="relative w-full">
              <img
                src="/images/common/search.svg"
                alt="search"
                className="absolute left-4 top-4 w-6 h-6 z-50"
              />

              <input
                id="searchInput"
                name="searchInput"
                type="text"
                value={keyword}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search restaurants, food and drink"
                className="w-full h-14 rounded-2xl pl-13 text-[14px] leading-7 md:text-[16px] md:leading-7.5  bg-white text-black
  focus:outline-none focus:ring-2 focus:ring-white placeholder:text-neutral-600 -tracking-[0.02em]"
              />
            </div>
          </div>
        </div>
      </div>

      <main className="relative w-full z-20 px-4 md:px-30 flex flex-col">
        <section id="category" className="py-6 md:py-12">
          <div className="grid grid-cols-3  gap-x-5 gap-y-5 md:flex md:flex-row md:justify-between">
            <div
              className="flex flex-col gap-1 md:gap-1.5 cursor-pointer"
              onClick={() => setActiveList("all-restaurants")}
            >
              <div className="w-full h-25 flex items-center justify-center p-2 shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-3xl">
                <img
                  src="/images/common/category-all.svg"
                  className="w-12 h-12 md:w-16.25 md:h-16.25"
                  alt=""
                />
              </div>
              <p className="text-neutral-900 font-bold text-[14px] md:text-[18px] md:leading-8 leading-7 -tracking-[0.02em] md:-tracking-[0.03em] text-center">
                All Restaurant
              </p>
            </div>
            <div
              className="flex flex-col gap-1 md:gap-1.5 cursor-pointer"
              onClick={() => setActiveList("nearby")}
            >
              <div className="w-full h-25 flex items-center justify-center p-2 shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-3xl">
                <img
                  src="/images/common/category-nearby.svg"
                  className="w-12 h-12 md:w-16.25 md:h-16.25"
                  alt=""
                />
              </div>
              <p className="text-neutral-900 font-bold text-[14px] md:text-[18px] md:leading-8 leading-7 -tracking-[0.02em] md:-tracking-[0.03em] text-center">
                Nearby
              </p>
            </div>
            <div
              className="flex flex-col gap-1 md:gap-1.5 cursor-pointer"
              onClick={() => setActiveList("discount")}
            >
              <div className="w-full h-25 flex items-center justify-center p-2 shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-3xl">
                <img
                  src="/images/common/category-discount.svg"
                  className="w-12 h-12 md:w-16.25 md:h-16.25"
                  alt=""
                />
              </div>
              <p className="text-neutral-900 font-bold text-[14px] md:text-[18px] md:leading-8 leading-7 -tracking-[0.02em] md:-tracking-[0.03em] text-center">
                Discount
              </p>
            </div>
            <div
              className="flex flex-col gap-1 md:gap-1.5 cursor-pointer"
              id="best-seller-icon-section"
              onClick={() => setActiveList("best-seller")}
            >
              <div className="w-full h-25 flex items-center justify-center p-2 shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-3xl">
                <img
                  src="/images/common/category-best-seller.svg"
                  className="w-12 h-12 md:w-16.25 md:h-16.25"
                  alt=""
                />
              </div>
              <p className="text-neutral-900 font-bold text-[14px] md:text-[18px] md:leading-8 leading-7 -tracking-[0.02em] md:-tracking-[0.03em] text-center">
                Best Seller
              </p>
            </div>
            <div
              className="flex flex-col gap-1 md:gap-1.5 cursor-pointer"
              onClick={() => setActiveList("delivery")}
            >
              <div className="w-full h-25 flex items-center justify-center p-2 shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-3xl">
                <img
                  src="/images/common/category-delivery.svg"
                  className="w-12 h-12 md:w-16.25 md:h-16.25"
                  alt=""
                />
              </div>
              <p className="text-neutral-900 font-bold text-[14px] md:text-[18px] md:leading-8 leading-7 -tracking-[0.02em] md:-tracking-[0.03em] text-center">
                Delivery
              </p>
            </div>
            <div
              className="flex flex-col gap-1 md:gap-1.5 cursor-pointer"
              onClick={() => setActiveList("lunch")}
            >
              <div className="w-full h-25 flex items-center justify-center p-2 shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-3xl">
                <img
                  src="/images/common/category-lunch.svg"
                  className="w-12 h-12 md:w-16.25 md:h-16.25"
                  alt=""
                />
              </div>
              <p className="text-neutral-900 font-bold text-[14px] md:text-[18px] md:leading-8 leading-7 -tracking-[0.02em] md:-tracking-[0.03em] text-center">
                Lunch
              </p>
            </div>
          </div>
        </section>
        <div className="flex flex-col gap-4 md:gap-8 pt-6 pb-12 md:pt-0 md:pb-25">
          <div className="flex flex-row justify-between">
            <h2
              id="title-type"
              className="text-neutral-950 font-extrabold text-2xl leading-9 md:text-[32px] md:leading-10.5"
            >
              {titleText}
            </h2>
            <button className="text-primary-100 cursor-pointer font-extrabold text-[16px] leading-7.5 md:text-lg md:leading-8">
              See All
            </button>
          </div>
          <div
            id="recommended-list"
            className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-x-5 md:gap-y-5  "
          >
            {activeList === "discount" ||
            activeList === "delivery" ||
            activeList === "lunch" ? (
              <div className="md:col-span-3">
                <Alert>
                  <AlertTitle>Coming Soon</AlertTitle>
                  <AlertDescription>
                    Fitur {titleText} sedang kami siapkan supaya pengalamanmu
                    makin lengkap. Pantengin terus, ya!
                  </AlertDescription>
                </Alert>
              </div>
            ) : null}
            {isLoading &&
              activeList !== "discount" &&
              activeList !== "delivery" &&
              activeList !== "lunch" && (
              <>
                <div className="md:col-span-3 flex items-center justify-between rounded-2xl border border-neutral-200 bg-white px-4 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
                  <div className="flex items-center gap-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary-100 animate-pulse" />
                    <span className="text-sm font-semibold text-neutral-700">
                      Loading data
                    </span>
                  </div>
                  <span className="text-xs text-neutral-500">
                    Mohon tunggu sebentar
                  </span>
                </div>
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={`skeleton-${index}`}
                    className="flex flex-row gap-2 md:gap-3 shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-3xl px-3 py-3 md:px-4 md:py-4"
                  >
                    <Skeleton className="w-22.5 h-22.5 md:h-30 md:w-30" />
                    <div className="flex flex-col gap-2 w-full">
                      <Skeleton className="h-5 w-3/4" />
                      <Skeleton className="h-4 w-1/3" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  </div>
                ))}
              </>
            )}
            {isError &&
              activeList !== "discount" &&
              activeList !== "delivery" &&
              activeList !== "lunch" && (
              <div className="md:col-span-3">
                <Alert variant="destructive">
                  <AlertTitle>Gagal memuat data</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              </div>
            )}
            {!isLoading &&
              !isError &&
              activeList !== "discount" &&
              activeList !== "delivery" &&
              activeList !== "lunch" &&
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-row gap-2 md:gap-3 shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-3xl px-3 py-3 md:px-4 md:py-4 items-center"
                >
                  <img
                    src={item.logo || "/images/common/restaurant-dummy.svg"}
                    alt={item.name}
                    className="w-22.5 h-22.5 md:h-30 md:w-30 rounded-2xl object-cover"
                  />
                  <div className="flex flex-col gap-0.5 w-full">
                    <h3 className="text-neutral-950 font-extrabold text-[16px] leading-7.5 md:text-[18px] md:leading-8 -tracking-[0.02em]">
                      {item.name}
                    </h3>
                    <div className="flex flex-row gap-1">
                      <img
                        src="/images/common/star.svg"
                        className="w-6 h-6"
                        alt="star"
                      />
                      <span className="text-neutral-950 font-medium leading-7 text-[14px] md:text-[16px] md:leading-7.5 -tracking-[0.03em]">
                        {item.star}
                      </span>
                    </div>
                    <div className="flex flex-row gap-1.5 items-center justify-start w-fit">
                      <span className="text-neutral-950 text-[14px] leading-7 -tracking-[-0.02em] md:text-[16px] md:leading-7.5">
                        {item.place}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex flex-row flex-1 w-full items-center justify-center">
            <button
              disabled={
                activeList === "recommended" ||
                activeList === "discount" ||
                activeList === "delivery" ||
                activeList === "lunch" ||
                (activeList === "best-seller" && !bestSellerQuery.hasNextPage) ||
                (activeList === "all-restaurants" &&
                  !allRestaurantsQuery.hasNextPage) ||
                (activeList === "nearby" && !nearbyQuery.hasNextPage)
              }
              onClick={() => {
                if (activeList === "best-seller") {
                  bestSellerQuery.fetchNextPage();
                }
                if (activeList === "all-restaurants") {
                  allRestaurantsQuery.fetchNextPage();
                }
                if (activeList === "nearby") {
                  nearbyQuery.fetchNextPage();
                }
              }}
              className={`h-10 w-40 ring-1 ring-inset ring-neutral-300 rounded-[100px] text-[14px] leading-7 -tracking-[0.02em] font-bold ${
                activeList === "recommended" ||
                activeList === "discount" ||
                activeList === "delivery" ||
                activeList === "lunch" ||
                (activeList === "best-seller" && !bestSellerQuery.hasNextPage) ||
                (activeList === "all-restaurants" &&
                  !allRestaurantsQuery.hasNextPage) ||
                (activeList === "nearby" && !nearbyQuery.hasNextPage)
                  ? "text-neutral-400 cursor-not-allowed"
                  : "text-neutral-950"
              }`}
            >
              {activeList === "recommended" ||
              activeList === "discount" ||
              activeList === "delivery" ||
              activeList === "lunch" ||
              (activeList === "best-seller" && !bestSellerQuery.hasNextPage) ||
              (activeList === "all-restaurants" &&
                !allRestaurantsQuery.hasNextPage) ||
              (activeList === "nearby" && !nearbyQuery.hasNextPage)
                ? "No more data"
                : bestSellerQuery.isFetchingNextPage ||
                    allRestaurantsQuery.isFetchingNextPage ||
                    nearbyQuery.isFetchingNextPage
                  ? "Loading..."
                  : "Show More"}
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
