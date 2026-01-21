import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { tmdbImage, useMovieDetails } from "../../lib/tmdbQuery"; // sesuaikan path kamu
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { showAppToast } from "../../components/common/AppToast";
import { toggleFavorite, isMovieFavorite } from "../../lib/localFavorite";
import type { FavoriteMovie } from "../../lib/localFavorite";
import { useTrailerModal } from "../../context/TrailerModalContext";

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function getAgeLimit(adult: boolean) {
  
  return adult ? 18 : 13;
}

const Details = () => {
  const { openTrailer } = useTrailerModal();

  const [isFavorite, setIsFavorite] = useState(false);

  const { id } = useParams();
  const details = useMovieDetails(id);

  const movie = details.data?.movie;
  const credits = details.data?.credits;

  const genreText = useMemo(() => {
    const g = movie?.genres?.map((x) => x.name).filter(Boolean) ?? [];
    return g.length ? g[0] : "—"; // UI kamu cuma nampilin 1 genre
  }, [movie?.genres]);

  const castPreview = useMemo(() => {    
    const cast = credits?.cast ?? [];
    return cast.slice(0, 9);
  }, [credits?.cast]);

  useEffect(() => {
    if (!movie) return;
    setIsFavorite(isMovieFavorite(movie.id));
  }, [movie]);

  const trailerKey = details.data?.trailerKey;
  const hasTrailer = !!trailerKey;

  const handleWatchTrailer = () => {
    if (!trailerKey) return;
    openTrailer(trailerKey);
  };

  const handleToggleFavorite = () => {
    if (!movie) return;

    const payload: FavoriteMovie = {
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path ?? null,
      backdrop_path: movie.backdrop_path ?? null,
      vote_average: movie.vote_average,
      overview: movie.overview ?? "",
    };

    const next = toggleFavorite(payload);
    setIsFavorite(next);

    showAppToast({
      message: next
        ? "Success Add to Favorites"
        : "Success Remove from Favorites",
      variant: "success",
    });
  };

  return (
    <>
      {/* Cover */}
      <div
        className="relative w-full h-98 md:h-202.5 bg-cover bg-top bg-no-repeat"
        style={{
          backgroundImage: movie?.backdrop_path
            ? `url(${tmdbImage(movie.backdrop_path, "original")})`
            : `url('/images/common/movie-poster.svg')`,
        }}
      >
        <div className="md:hidden absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="hidden md:block absolute inset-0 bg-linear-to-t from-black to-transparent"></div>
      </div>

      <main className="relative -top-30.75  md:-top-99.5 w-full px-4 md:px-35 pt-0 pb-10 md:p-0 -mb-30.75 md:-mb-79.5">
        {/* Error state */}
        {details.isError ? (
          <div className="rounded-2xl border border-neutral-800 bg-black/60 p-4 text-red-300">
            Error: {(details.error as Error).message}
          </div>
        ) : null}

        <div className="flex flex-col gap-6 md:gap-12">
          <div className="flex flex-row gap-4">
            {/* Poster */}
            <img
              src={
                movie?.poster_path
                  ? tmdbImage(movie.poster_path, "w500")
                  : "/images/common/movie-poster.svg"
              }
              className="w-29 h-42.75 md:w-65 md:h-96 rounded-xl object-cover"
              alt={movie?.title ?? "poster"}
            />

            <div className="flex flex-col md:gap-6 flex-1">
              <div className="flex flex-col gap-1 md:gap-4">
                <h2 className="font-bold text-[20px] leading-8.5 md:text-[40px] md:leading-14 tracking-[-0.02em]">
                  {details.isLoading ? "Loading..." : movie?.title ?? "—"}
                </h2>

                <div className="flex flex-row gap-1 md:gap-2 items-center">
                  <img
                    src="/images/common/calendar.svg"
                    className="w-5 h-5 md:w-6 md:h-6"
                    alt="calendar"
                  />
                  <p className="text-[14px] leading-7 md:text-[16px] md:leading-7.5 md:pt-0.5">
                    {details.isLoading ? "—" : formatDate(movie?.release_date)}
                  </p>
                </div>
              </div>

              {/* Desktop buttons */}
              <div className="hidden md:flex flex-row gap-4">
                {hasTrailer ? (
                  <button
                    onClick={handleWatchTrailer}
                    className="p-2 bg-primary-300 h-13 rounded-full cursor-pointer w-55"
                  >
                    <span className="font-semibold text-[14px] leading-7 md:text-[16px] md:leading-7.5">
                      Watch Trailer
                    </span>
                    <img
                      src="/images/common/play.svg"
                      alt="play"
                      className="inline-block w-4.5 h-4.5 md:w-6 md:h-6 ml-2"
                    />
                  </button>
                ) : null}

                <button
                  id="add-or-remove-favorite-desktop"
                  onClick={handleToggleFavorite}
                  className="
    p-2 border border-neutral-800
    h-11 w-11 md:h-13 md:w-13
    rounded-full flex items-center justify-center
    bg-neutral-950/60 backdrop-blur-md
    transition active:scale-95
    cursor-pointer
  "
                >
                  <img
                    src={
                      isFavorite
                        ? "/images/common/heart-red.svg"
                        : "/images/common/heart-white.svg"
                    }
                    className="w-6 h-6"
                    alt="favorite"
                  />
                </button>
              </div>

              {/* Desktop stats */}
              <div className="hidden md:grid grid-cols-3 gap-3 text-center">
                <div className="flex flex-col gap-2 items-center justify-centergap-2 p-4 border border-neutral-800 rounded-2xl bg-black">
                  <img
                    src="/images/common/star.svg"
                    alt="star"
                    className="inline-block w-8 h-8"
                  />
                  <div className="flex flex-col">
                    <p className="text-[12px] md:text-[16px] leading-6 md:leading-7.5">
                      Rating
                    </p>
                    <p className="font-semibold text-[18px] md:text-[20px] leading-8 md:leading-8.5">
                      {movie?.vote_average
                        ? `${movie.vote_average.toFixed(1)}/10`
                        : "—"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-center justify-centergap-2 p-4 border border-neutral-800 rounded-2xl bg-black">
                  <img
                    src="/images/common/genre.svg"
                    alt="genre"
                    className="inline-block w-8 h-8"
                  />
                  <div className="flex flex-col">
                    <p className="text-[12px] md:text-[16px] leading-6 md:leading-7.5">
                      Genre
                    </p>
                    <p className="font-semibold text-[18px] md:text-[20px] leading-8 md:leading-8.5">
                      {details.isLoading ? "—" : genreText}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-center justify-centergap-2 p-4 border border-neutral-800 rounded-2xl bg-black">
                  <img
                    src="/images/common/age-limit.svg"
                    alt="age limit"
                    className="inline-block w-8 h-8"
                  />
                  <div className="flex flex-col">
                    <p className="text-[12px] md:text-[16px] leading-6 md:leading-7.5">
                      Age Limit
                    </p>
                    <p className="font-semibold text-[18px] md:text-[20px] leading-8 md:leading-8.5">
                      {details.isLoading ? "—" : getAgeLimit(!!movie?.adult)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex flex-row gap-4">
            {hasTrailer ? (
              <button
                onClick={handleWatchTrailer}
                className="p-2 bg-primary-300 h-11 rounded-full cursor-pointer w-full"
              >
                <span className="font-semibold text-[14px] leading-7 md:text-[16px] md:leading-7.5">
                  Watch Trailer
                </span>
                <img
                  src="/images/common/play.svg"
                  alt="play"
                  className="inline-block w-4.5 h-4.5 md:w-6 md:h-6 ml-2"
                />
              </button>
            ) : null}

            <div>
              <button
                id="add-or-remove-favorite-mobile"
                onClick={handleToggleFavorite}
                className="
    p-2 border border-neutral-800
    h-11 w-11 rounded-full
    flex items-center justify-center
    bg-neutral-950/60 backdrop-blur-md
    transition active:scale-95
  "
              >
                <img
                  src={
                    isFavorite
                      ? "/images/common/heart-red.svg"
                      : "/images/common/heart-white.svg"
                  }
                  className="w-6 h-6"
                  alt="favorite"
                />
              </button>
            </div>
          </div>

          {/* Mobile stats */}
          <div className="md:hidden grid grid-cols-3 gap-3 text-center">
            <div className="flex flex-col gap-2 items-center justify-centergap-2 p-4 border border-neutral-800 rounded-2xl">
              <img
                src="/images/common/star.svg"
                alt="star"
                className="inline-block w-6 h-6"
              />
              <div className="flex flex-col">
                <p className="text-[12px] leading-6">Rating</p>
                <p className="font-semibold text-[18px] leading-8">
                  {movie?.vote_average
                    ? `${movie.vote_average.toFixed(1)}/10`
                    : "—"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-center justify-centergap-2 p-4 border border-neutral-800 rounded-2xl">
              <img
                src="/images/common/genre.svg"
                alt="genre"
                className="inline-block w-6 h-6"
              />
              <div className="flex flex-col">
                <p className="text-[12px] leading-6">Genre</p>
                <p className="font-semibold text-[18px] leading-8">
                  {details.isLoading ? "—" : genreText}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 items-center justify-centergap-2 p-4 border border-neutral-800 rounded-2xl">
              <img
                src="/images/common/age-limit.svg"
                alt="age limit"
                className="inline-block w-6 h-6"
              />
              <div className="flex flex-col">
                <p className="text-[12px] leading-6">Age Limit</p>
                <p className="font-semibold text-[18px] leading-8">
                  {details.isLoading ? "—" : getAgeLimit(!!movie?.adult)}
                </p>
              </div>
            </div>
          </div>

          {/* Overview */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-[20px] leading-8.5 md:text-[32px] md:leading-11.5 md:tracking-[-0.02em]">
              Overview
            </h3>
            <p className="text-neutral-400 text-[14px] md:text-[16px] leading-7 font-regular md:leading-7.5">
              {details.isLoading
                ? "Loading overview..."
                : movie?.overview || "No overview available."}
            </p>
          </div>

          {/* Cast & Crew */}
          <div className="flex flex-col gap-4 md:gap-6">
            <h3 className="font-bold text-[20px] leading-8.5 md:text-[32px] md:leading-11.5 tracking-[-0.02em]">
              Cast & Crew
            </h3>

            <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-10">
              {details.isLoading ? (
                Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="flex flex-row gap-3 md:gap-4">
                    <div className="w-13.75 h-21 md:w-17.25 md:h-26 rounded-lg bg-neutral-900/50 animate-pulse" />
                    <div className="flex flex-col justify-center gap-2">
                      <div className="h-4 w-32 bg-neutral-900/50 rounded animate-pulse" />
                      <div className="h-4 w-48 bg-neutral-900/50 rounded animate-pulse" />
                    </div>
                  </div>
                ))
              ) : castPreview.length ? (
                castPreview.map((c) => (
                  <div key={c.id} className="flex flex-row gap-3 md:gap-4">
                    <img
                      src={
                        c.profile_path
                          ? tmdbImage(c.profile_path, "w500")
                          : "/images/movies/anthony.svg"
                      }
                      alt={c.name}
                      className="w-13.75 h-21 md:w-17.25 md:h-26 rounded-lg object-cover"
                      loading="lazy"
                    />
                    <div className="flex flex-col justify-center">
                      <h3 className="text-[14px] leading-7 font-semibold md:text-[16px] md:leading-7.5">
                        {c.name}
                      </h3>
                      <p className="text-neutral-400 leading-7 text-[14px] md:text-[16px] md:leading-7.5">
                        {c.character || "—"}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-neutral-400">No cast data available.</p>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Details;
