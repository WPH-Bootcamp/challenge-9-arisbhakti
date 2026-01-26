import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { api, ENDPOINTS } from "@/lib/api";

export const useRecommendedQuery = <TResponse>() =>
  useQuery({
    queryKey: ["recommended-resto"],
    queryFn: async () => {
      const response = await api.get<TResponse>(ENDPOINTS.RESTO_RECOMMENDED);
      return response.data;
    },
  });

export const useBestSellerQuery = <TResponse>(limit: number, enabled: boolean) =>
  useInfiniteQuery({
    queryKey: ["best-seller-resto"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get<TResponse>(ENDPOINTS.RESTO_BEST_SELLER, {
        params: { page: pageParam, limit },
      });
      return response.data;
    },
    enabled,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages) => {
      const pagination = lastPage.data?.pagination;
      if (pagination?.page && pagination?.totalPages) {
        return pagination.page < pagination.totalPages
          ? pagination.page + 1
          : undefined;
      }
      const count = lastPage.data?.restaurants?.length ?? 0;
      return count < limit ? undefined : pages.length + 1;
    },
  });

export const useSearchQuery = <TResponse>(
  keyword: string,
  limit: number,
  enabled: boolean,
) =>
  useQuery({
    queryKey: ["search-resto", keyword],
    queryFn: async () => {
      const response = await api.get<TResponse>(ENDPOINTS.RESTO_SEARCH, {
        params: { q: keyword, page: 1, limit },
      });
      return response.data;
    },
    enabled: enabled && keyword.trim().length > 0,
  });

export const useAllRestaurantsQuery = <TResponse>(
  limit: number,
  enabled: boolean,
) =>
  useInfiniteQuery({
    queryKey: ["all-restaurants"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get<TResponse>(ENDPOINTS.RESTO, {
        params: { page: pageParam, limit },
      });
      return response.data;
    },
    enabled,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages) => {
      const pagination = lastPage.data?.pagination;
      if (pagination?.page && pagination?.totalPages) {
        return pagination.page < pagination.totalPages
          ? pagination.page + 1
          : undefined;
      }
      const count = lastPage.data?.restaurants?.length ?? 0;
      return count < limit ? undefined : pages.length + 1;
    },
  });

export const useNearbyQuery = <TResponse>(
  range: number,
  limit: number,
  enabled: boolean,
) =>
  useInfiniteQuery({
    queryKey: ["nearby-resto", range],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get<TResponse>(ENDPOINTS.RESTO, {
        params: { range, page: pageParam, limit },
      });
      return response.data;
    },
    enabled,
    initialPageParam: 1,
    getNextPageParam: (lastPage: any, pages) => {
      const pagination = lastPage.data?.pagination;
      if (pagination?.page && pagination?.totalPages) {
        return pagination.page < pagination.totalPages
          ? pagination.page + 1
          : undefined;
      }
      const count = lastPage.data?.restaurants?.length ?? 0;
      return count < limit ? undefined : pages.length + 1;
    },
  });
