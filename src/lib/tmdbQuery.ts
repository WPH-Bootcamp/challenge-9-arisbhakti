// src/services/tmdbQuery.ts
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";

export type TMDBListResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
};

const BASE_URL = import.meta.env.VITE_BASE_URL as string; // https://api.themoviedb.org/3
const TOKEN = import.meta.env.VITE_READ_ACCESS_TOKEN as string; // TMDB v4 read token

const IMAGE_BASE_ORIGINAL = "https://image.tmdb.org/t/p/original";
const IMAGE_BASE_W500 = "https://image.tmdb.org/t/p/w500";

export function tmdbImage(
  path: string | null,
  size: "original" | "w500" = "original"
) {
  if (!path) return "";
  return `${
    size === "original" ? IMAGE_BASE_ORIGINAL : IMAGE_BASE_W500
  }${path}`;
}

async function tmdbGet<T>(
  endpoint: string,
  params?: Record<string, string | number>
) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("language", "en-US");

  if (params) {
    for (const [k, v] of Object.entries(params)) {
      url.searchParams.set(k, String(v));
    }
  }

  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`TMDB error ${res.status}: ${text || res.statusText}`);
  }

  return (await res.json()) as T;
}

/** HERO + Trending row */
export function useTrendingMovies(timeWindow: "day" | "week" = "day") {
  return useQuery({
    queryKey: ["movies", "trending", timeWindow],
    queryFn: () =>
      tmdbGet<TMDBListResponse<Movie>>(`/trending/movie/${timeWindow}`, {
        page: 1,
      }),
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}

/** New Release + Load More (Now Playing) */
export function useNowPlayingInfinite() {
  return useInfiniteQuery({
    queryKey: ["movies", "now_playing"],
    queryFn: ({ pageParam }) =>
      tmdbGet<TMDBListResponse<Movie>>("/movie/now_playing", {
        page: Number(pageParam ?? 1),
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const next = lastPage.page + 1;
      return next <= lastPage.total_pages ? next : undefined;
    },
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}

// ===================== Details =====================

export type Genre = { id: number; name: string };

export type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  genres: Genre[];
  adult: boolean;
  runtime: number | null;
};

export type Cast = {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
};

export type Crew = {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
};

export type CreditsResponse = {
  id: number;
  cast: Cast[];
  crew: Crew[];
};

export function useMovieDetails(id?: string) {
  return useQuery({
    queryKey: ["movies", "details", id],
    enabled: !!id,
    queryFn: async () => {
      const movie = await tmdbGet<MovieDetails>(`/movie/${id}`);
      const credits = await tmdbGet<CreditsResponse>(`/movie/${id}/credits`);
      const videos = await tmdbGet<VideosResponse>(`/movie/${id}/videos`);

      const trailerKey = pickTrailerKey(videos.results ?? []);

      return { movie, credits, trailerKey };
    },
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}

// ===== TMDB AUTH HELPERS =====

const SESSION_ID = import.meta.env.VITE_SESSION_ID;

export async function getAccountIdFromSession(): Promise<number> {
  const res = await fetch(`${BASE_URL}/account?session_id=${SESSION_ID}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Failed to get account id");
  }

  const data = await res.json();
  return data.id as number;
}

export async function ensureAccountId(): Promise<number> {
  const stored = localStorage.getItem("tmdb_account_id");
  if (stored) {
    return Number(stored);
  }

  const accountId = await getAccountIdFromSession();
  localStorage.setItem("tmdb_account_id", String(accountId));
  return accountId;
}

type ToggleFavoritePayload = {
  movieId: number;
  favorite: boolean;
};

// ===== FAVORITE  =====

async function toggleFavorite({ movieId, favorite }: ToggleFavoritePayload) {
  const accountId = await ensureAccountId();
  console.log("Toggling favorite for account:", accountId);
  const res = await fetch(
    `${BASE_URL}/account/${accountId}/favorite?session_id=${SESSION_ID}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        media_type: "movie",
        media_id: movieId,
        favorite,
      }),
    }
  );

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Failed to toggle favorite");
  }

  return res.json();
}

export function useToggleFavorite() {
  return useMutation({
    mutationFn: toggleFavorite,
  });
}

// ===== Watch Trailer =====
export type Video = {
  id: string;
  key: string; // youtube key
  name: string;
  site: string; // "YouTube"
  type: string; // "Trailer", "Teaser", etc
  official: boolean;
};

export type VideosResponse = {
  id: number;
  results: Video[];
};

function pickTrailerKey(videos: Video[]) {
  const yt = videos.filter((v) => v.site === "YouTube" && v.key);

  // prioritas: Official Trailer → Trailer → Teaser → apa pun YouTube
  const officialTrailer =
    yt.find((v) => v.type === "Trailer" && v.official) ?? null;
  const trailer = yt.find((v) => v.type === "Trailer") ?? null;
  const teaser = yt.find((v) => v.type === "Teaser") ?? null;

  return (officialTrailer ?? trailer ?? teaser ?? yt[0] ?? null)?.key ?? null;
}

// ===== HERO TRAILER CHECK =====
export function useMovieTrailer(movieId?: number) {
  return useQuery({
    queryKey: ["movie", "trailer", movieId],
    enabled: !!movieId,
    queryFn: async () => {
      const videos = await tmdbGet<VideosResponse>(`/movie/${movieId}/videos`);

      const yt = videos.results.filter((v) => v.site === "YouTube" && v.key);

      const official =
        yt.find((v) => v.type === "Trailer" && v.official) ??
        yt.find((v) => v.type === "Trailer") ??
        yt.find((v) => v.type === "Teaser") ??
        yt[0];

      return official?.key ?? null;
    },
    staleTime: 1000 * 60 * 10,
  });
}

// List favorites movies (account id auto dari ensureAccountId())
export function useFavoriteMovies() {
  return useQuery({
    queryKey: ["account", "favorites", "movies"],
    queryFn: async () => {
      const accountId = await ensureAccountId();
      // NOTE: endpoint favorites (movies)
      return tmdbGet<TMDBListResponse<Movie>>(
        `/account/${accountId}/favorite/movies`,
        { page: 1, sort_by: "created_at.desc", session_id: SESSION_ID }
      );
    },
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
}

// Trailer keys untuk banyak movie sekaligus (simple batch via Promise.all)
// supaya Watch Trailer di list bisa tetap conditional.
export function useTrailersForMovies(movieIds: number[]) {
  return useQuery({
    queryKey: ["movies", "trailers", movieIds],
    enabled: movieIds.length > 0,
    queryFn: async () => {
      const entries = await Promise.all(
        movieIds.map(async (id) => {
          const videos = await tmdbGet<VideosResponse>(`/movie/${id}/videos`);
          const yt = (videos.results ?? []).filter(
            (v) => v.site === "YouTube" && v.key
          );
          const pick =
            yt.find((v) => v.type === "Trailer" && v.official) ??
            yt.find((v) => v.type === "Trailer") ??
            yt.find((v) => v.type === "Teaser") ??
            yt[0];

          return [id, pick?.key ?? null] as const;
        })
      );

      return Object.fromEntries(entries) as Record<number, string | null>;
    },
    staleTime: 1000 * 60 * 10,
    retry: 1,
  });
}

// ===== SEARCH MOVIES =====
export function useSearchMovies(query: string) {
  return useQuery({
    queryKey: ["search", "movies", query],
    enabled: query.trim().length > 0,
    queryFn: async () => {
      return tmdbGet<TMDBListResponse<Movie>>("/search/movie", {
        query,
        include_adult: "false",
      });
    },
    staleTime: 0, // realtime feel
  });
}
