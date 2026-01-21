import { useMemo } from "react";
import {
  tmdbImage,
  useNowPlayingInfinite,
  useTrendingMovies,
} from "../../lib/tmdbQuery";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMovieTrailer } from "../../lib/tmdbQuery";
import { useTrailerModal } from "../../context/TrailerModalContext";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const heroVariants = {
  initial: { opacity: 0, scale: 1.05 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const heroTextVariants = {
  initial: { opacity: 0, y: 12, filter: "blur(6px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: "blur(6px)",
    transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] as const },
  },
};

const Home = () => {
  // 1) Trending (Hero + Trending row)
  const { openTrailer } = useTrailerModal();
  const loadMoreRef = useRef<HTMLButtonElement | null>(null);

  const [heroIndex, setHeroIndex] = useState(0);

  const trending = useTrendingMovies("day");
  const trendingList = trending.data?.results ?? [];
  const trendingRef = useRef<HTMLDivElement | null>(null);

  const heroCandidates = useMemo(() => {
    return trendingList.filter((m) => m.backdrop_path);
  }, [trendingList]);

  useEffect(() => {
    if (heroCandidates.length === 0) return;

    const interval = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % heroCandidates.length);
    }, 3000); // 3 detik

    return () => clearInterval(interval);
  }, [heroCandidates.length]);

  // Hero movie: ambil yang punya backdrop biar cakep
  const heroMovie = heroCandidates[heroIndex];

  const heroTrailer = useMovieTrailer(heroMovie?.id);
  const trailerKey = heroTrailer.data;
  const hasTrailer = !!trailerKey;

  // 3) New Release (Now Playing) + Load More
  const nowPlaying = useNowPlayingInfinite();
  const nowPlayingMovies =
    nowPlaying.data?.pages.flatMap((p) => p.results) ?? [];

  const scrollTrendingRight = () => {
    if (!trendingRef.current) return;

    const container = trendingRef.current;
    const cardWidth = container.firstElementChild?.clientWidth ?? 200;
    const gap = 16;
    const scrollAmount =
      window.innerWidth < 768
        ? (cardWidth + gap) * 2 // mobile: 2 card
        : (cardWidth + gap) * 4; // desktop: 4 card

    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };
  const navigate = useNavigate();

  const goToDetails = (id: number) => {
    navigate(`/details/${id}`);
  };

  const handleWatchTrailer = () => {
    if (!trailerKey) return;
    openTrailer(trailerKey);
  };

  return (
    <>
      {/* HERO BACKGROUND */}
      <div className="relative w-full h-98 md:h-202.5 overflow-hidden">
        <AnimatePresence mode="wait">
          {heroMovie?.backdrop_path ? (
            <motion.div
              key={heroMovie.id}
              variants={heroVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 bg-cover bg-center bg-no-repeat text-xl"
              style={{
                backgroundImage: `url(${tmdbImage(
                  heroMovie.backdrop_path,
                  "original"
                )})`,
              }}
            />
          ) : (
            <motion.div
              key="hero-fallback"
              variants={heroVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute inset-0 bg-black"
            />
          )}
        </AnimatePresence>

        <div className="md:hidden absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent z-10"></div>
        <div className="hidden md:block absolute inset-0 bg-linear-to-t from-black to-transparent z-10"></div>
      </div>

      {/* HERO CONTENT */}
      <div
        id="popular-content"
        className="flex flex-col gap-6 px-4 md:px-0 absolute top-55.75 md:top-74.5 md:left-35 md:w-158.75 z-20"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={heroMovie?.id ?? "hero-text-loading"}
            variants={heroTextVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col gap-1.5 md:gap-4"
          >
            <h1 className="font-bold text-2xl leading-9 text-neutral-25 md:text-5xl md:leading-15 md:tracking-[0.02em]">
              {trending.isLoading ? "Loading..." : heroMovie?.title ?? "—"}
            </h1>

            <p className="text-[14px] leading-7 text-neutral-400 md:text-[16px] md:leading-7.5 line-clamp-5">
              {trending.isLoading
                ? "Fetching trending movie..."
                : heroMovie?.overview || "No overview available."}
            </p>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={
              heroMovie?.id
                ? `hero-actions-${heroMovie.id}`
                : "hero-actions-loading"
            }
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1] as const,
                delay: 0.05,
              },
            }}
            exit={{
              opacity: 0,
              y: -6,
              transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] as const },
            }}
            className="flex flex-col gap-4 md:flex-row"
          >
            <button
              onClick={handleWatchTrailer}
              disabled={!hasTrailer}
              className={`p-2  h-11 rounded-full md:h-13 md:w-57.5 ${
                hasTrailer ? "bg-primary-300 cursor-pointer" : "bg-neutral-800"
              } `}
            >
              <span className="font-semibold text-[14px] leading-7 md:text-[16px] md:leading-7.5">
                {hasTrailer ? "Watch Trailer" : "No Trailer Available"}
              </span>
              {hasTrailer ? (
                <img
                  src="/images/common/play.svg"
                  alt="play"
                  className="inline-block w-4.5 h-4.5 md:w-6 md:h-6 ml-2"
                />
              ) : null}
            </button>

            {heroMovie ? (
              <button
                onClick={() => goToDetails(heroMovie.id)}
                className="p-2 border border-neutral-900 h-11 rounded-full bg-neutral-950/60 backdrop-blur-md md:h-13 md:w-57.5 cursor-pointer"
              >
                <span className="font-semibold text-[14px] leading-7 md:text-[16px] md:leading-7.5">
                  See Detail
                </span>
              </button>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      <main className="relative top-35 md:-top-12 w-full z-20">
        {/* TRENDING */}
        <section
          id="trending"
          className="flex flex-col gap-6 md:gap-10 px-4 py-10 md:pt-0 md:pl-35 md:pb-20"
        >
          <h1 className="font-bold text-2xl leading-9 md:text-4xl md:leading-12 md:tracking-[0.02em]">
            Trending Now
          </h1>
          <div className="hidden md:block absolute inset-y-0 right-0 w-60 bg-linear-to-l from-black to-transparent z-20 pointer-events-none"></div>
          <div className="hidden md:block absolute inset-y-0 right-0 w-60 bg-linear-to-l from-black to-transparent z-20 pointer-events-none"></div>

          <div className="relative">
            <div
              id="trending-contents"
              ref={trendingRef}
              className="flex gap-4 md:gap-5 overflow-x-auto [scrollbar-width:thin]"
            >
              {trending.isLoading ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <article
                    key={i}
                    className="flex flex-col gap-2 shrink-0 w-40 md:w-56"
                  >
                    <div className="w-full h-56 rounded-xl bg-neutral-900/50 animate-pulse" />
                    <div className="h-4 w-28 bg-neutral-900/50 rounded animate-pulse" />
                    <div className="h-4 w-20 bg-neutral-900/50 rounded animate-pulse" />
                  </article>
                ))
              ) : trending.isError ? (
                <div className="text-red-300">
                  Error: {(trending.error as Error).message}
                </div>
              ) : (
                trendingList.map((movie, idx) => (
                  <article
                    key={movie.id}
                    onClick={() => goToDetails(movie.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ")
                        goToDetails(movie.id);
                    }}
                    className="flex flex-col flex-1/2 md:flex-none gap-2 shrink-0 w-40 md:w-54 cursor-pointer transition hover:scale-[1.02] active:scale-[0.99]"
                  >
                    <div className="w-full relative">
                      <div className="w-8 h-8 md:w-12 md:h-12 bg-neutral-950/60 rounded-full absolute z-20 flex items-center justify-center top-2 left-2">
                        <span className="text-neutral-25 font-semibold text-[14px] md:text-[18px] leading-7 md:leading-8">
                          {idx + 1}
                        </span>
                      </div>

                      <img
                        src={
                          movie.poster_path
                            ? tmdbImage(movie.poster_path, "w500")
                            : "./images/movies/trending2.svg"
                        }
                        className="w-full rounded-xl relative top-0 left-0 z-10"
                        alt={movie.title}
                        loading="lazy"
                      />
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <h3 className="font-semibold text-[16px]] leading-7.5 md:text-[18px] md:leading-8">
                        {movie.title}
                      </h3>
                      <div>
                        <img
                          src="./images/common/star.svg"
                          alt="star"
                          className="inline-block w-4.5 h-4.5 mr-1"
                        />
                        <span className="text-neutral-400 text-[14px] md:text-[16px]">
                          {movie.vote_average
                            ? `${movie.vote_average.toFixed(1)}/10`
                            : "—"}
                        </span>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>

            <button
              onClick={scrollTrendingRight}
              className="
      absolute right-1 top-1/2 -translate-y-1/2
      w-11 h-11 md:w-14 md:h-14 rounded-full
      bg-neutral-950/80 backdrop-blur
      border border-neutral-800
      flex items-center justify-center
      hover:bg-neutral-900
      transition
      z-20
      cursor-pointer
    "
            >
              <img
                src="./images/common/arrow-right-medium.svg"
                alt="scroll right"
                className="w-5.5 h-5.5 md:w-7 md:h-7"
              />
            </button>
          </div>
        </section>

        {/* NEW RELEASE */}
        <section
          id="new-release"
          className="relative flex flex-col gap-6 md:gap-10 px-4 pt-0 pb-40 md:px-35 md:pb-20"
        >
          <div className="absolute inset-x-0 bottom-0 h-130 bg-linear-to-t from-black to-transparent z-30"></div>
          <div className="absolute inset-x-0 bottom-0 h-130 bg-linear-to-t from-black to-transparent z-30"></div>
          <div className="md:hidden absolute inset-x-0 bottom-0 h-130 bg-linear-to-t from-black to-transparent z-30"></div>
          <div className="md:hidden absolute inset-x-0 bottom-0 h-130 bg-linear-to-t from-black to-transparent z-30"></div>

          <h1 className="font-bold text-2xl leading-9 md:text-4xl md:leading-12 md:tracking-[0.02em]">
            New Release
          </h1>

          <button
            ref={loadMoreRef}
            onClick={async () => {
              if (!loadMoreRef.current) return;

              const prevTop = loadMoreRef.current.getBoundingClientRect().top;

              await nowPlaying.fetchNextPage();

              requestAnimationFrame(() => {
                if (!loadMoreRef.current) return;

                const newTop = loadMoreRef.current.getBoundingClientRect().top;
                const delta = newTop - prevTop;

                window.scrollBy({
                  top: delta,
                  behavior: "auto",
                });
              });
            }}
            disabled={!nowPlaying.hasNextPage || nowPlaying.isFetchingNextPage}
            className="absolute bottom-60 md:bottom-50 left-1/2 -translate-x-1/2 flex items-center justify-center px-6 w-50 h-11 md:h-13 md:w-57.5 rounded-full bg-neutral-950 border border-neutral-900 font-semibold text-[14px] md:text-[16px] text-neutral-25 cursor-pointer z-50 leading-7 md:leading-7.5 p-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {nowPlaying.isFetchingNextPage
              ? "Loading..."
              : nowPlaying.hasNextPage
              ? "Load More"
              : "No More"}
          </button>

          <div
            id="new-release-contents"
            className="grid grid-cols-2 md:grid-cols-5 gap-x-4 gap-y-8 md:gap-x-5 md:gap-y-10"
          >
            {nowPlaying.isLoading ? (
              Array.from({ length: 10 }).map((_, i) => (
                <article key={i} className="flex flex-col gap-2">
                  <div className="w-full h-56 rounded-xl bg-neutral-900/50 animate-pulse" />
                  <div className="h-4 w-28 bg-neutral-900/50 rounded animate-pulse" />
                  <div className="h-4 w-20 bg-neutral-900/50 rounded animate-pulse" />
                </article>
              ))
            ) : nowPlaying.isError ? (
              <div className="text-red-300">
                Error: {(nowPlaying.error as Error).message}
              </div>
            ) : (
              nowPlayingMovies.map((movie) => (
                <article
                  key={movie.id}
                  onClick={() => goToDetails(movie.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ")
                      goToDetails(movie.id);
                  }}
                  className="flex flex-col gap-2 cursor-pointer transition hover:scale-[1.02] active:scale-[0.99] "
                >
                  <div className="w-full relative">
                    <img
                      src={
                        movie.poster_path
                          ? tmdbImage(movie.poster_path, "w500")
                          : "./images/movies/trending2.svg"
                      }
                      className="w-full rounded-xl relative top-0 left-0 z-10"
                      alt={movie.title}
                      loading="lazy"
                    />
                  </div>

                  <div className="flex flex-col gap-0.5">
                    <h3 className="font-semibold text-[16px]] leading-7.5 md:text-[18px] md:leading-8">
                      {movie.title}
                    </h3>
                    <div>
                      <img
                        src="./images/common/star.svg"
                        alt="star"
                        className="inline-block w-4.5 h-4.5 mr-1"
                      />
                      <span className="text-neutral-400 text-[14px] md:text-[16px]">
                        {movie.vote_average
                          ? `${movie.vote_average.toFixed(1)}/10`
                          : "—"}
                      </span>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default Home;
