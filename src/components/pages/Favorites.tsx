import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { tmdbImage, useTrailersForMovies } from "../../lib/tmdbQuery";
import { getFavorites, removeFavorite } from "../../lib/localFavorite";
import { useTrailerModal } from "../../context/TrailerModalContext";
import { showAppToast } from "../../components/common/AppToast";

const Favorites = () => {
  const navigate = useNavigate();
  const { openTrailer } = useTrailerModal();

  const [favorites, setFavorites] = useState(getFavorites());
  const isFavoriteExist = favorites.length > 0;

  const movieIds = useMemo(() => favorites.map((m) => m.id), [favorites]);
  const trailersQuery = useTrailersForMovies(movieIds);
  const trailerMap = trailersQuery.data ?? {};

  const goToDetails = (id: number) => navigate(`/details/${id}`);

  const watchTrailer = (movieId: number) => {
    const key = trailerMap[movieId];
    if (!key) return;
    openTrailer(key);
  };

  const removeFromFavorite = (movieId: number) => {
    removeFavorite(movieId);
    setFavorites(getFavorites());
    showAppToast({ message: "Success Remove from Favorites" });
  };

  return (
    <>
      {!isFavoriteExist && (
        <div
          id="favorites-empty-state"
          className="flex flex-row flex-1 items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 "
        >
          <div className="flex flex-col gap-6 items-center justify-center">
            <div className="flex flex-col gap-3 items-center justify-center md:gap-4 ">
              <img
                src="/images/common/frame.svg"
                className="w-50 h-50"
                alt=""
              />
              <div className="flex flex-col gap-2 justify-center items-center">
                <h3 className="font-semibold text-[16px] leading-7.5">
                  Data Empty
                </h3>
                <p className="text-[14px] leading-7 text-neutral-400 text-center">
                  You don't have a favorite movie yet
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/")}
              className="p-2 bg-primary-300 h-11 md:h-13 rounded-full cursor-pointer w-50 md:w-75 flex items-center justify-center"
            >
              <span className="font-semibold text-[14px] leading-7 md:text-[16px] md:leading-7.5">
                Explore Movie
              </span>
            </button>
          </div>
        </div>
      )}

      <div className="px-4 md:px-35 pt-6 pb-10 md:p-0 mt-16 md:mt-38.5 relative md:mb-12">
        <div className="flex flex-col gap-8 md:gap-12">
          <h1 className="text-2xl leading-9 font-bold md:text-[36px] md:leading-12 md:tracking-[-0.02em]">
            Favorites
          </h1>

          {isFavoriteExist && (
            <>
              {favorites.map((movie, index) => {
                const trailerKey = trailerMap[movie.id];
                const hasTrailer = !!trailerKey;
                const isLast = index === favorites.length - 1;

                return (
                  <div key={movie.id}>
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-row gap-4 md:gap-6">
                        <img
                          onClick={() => goToDetails(movie.id)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ")
                              goToDetails(movie.id);
                          }}
                          src={
                            movie.poster_path
                              ? tmdbImage(movie.poster_path, "w500")
                              : "/images/common/movie-poster.svg"
                          }
                          className="w-26 h-39 md:w-45.5 md:h-67.5 rounded-xl object-cover cursor-pointer"
                          alt={movie.title}
                        />

                        <div className="flex flex-col gap-6 relative md:pr-45.5 flex-1">
                          {/* Desktop favorite (default red) */}
                          <button
                            className="hidden md:flex absolute top-0 right-0 p-2 border border-neutral-800 h-11 w-11 rounded-full md:h-13 md:w-13 cursor-pointer items-center justify-center bg-neutral-950/60 backdrop-blur-md"
                            onClick={() => removeFromFavorite(movie.id)}
                            aria-label="remove from favorite"
                          >
                            <img
                              src="/images/common/heart-red.svg"
                              className="w-6 h-6"
                              alt="favorite"
                            />
                          </button>

                          <div className="flex flex-col gap-1 md:gap-3">
                            <h2
                              onClick={() => goToDetails(movie.id)}
                              className="font-bold text-[16px] leading-7.5 md:text-[24px] md:leading-9 cursor-pointer"
                            >
                              {movie.title}
                            </h2>

                            <div className="flex flex-row gap-1 items-center">
                              <img
                                src="/images/common/star.svg"
                                className="w-4.5 h-4.5 md:w-6 md:h-6"
                                alt="star"
                              />
                              <span className="font-medium text-[14px] leading-7 md:text-[18px] md:leading-8">
                                {movie.vote_average
                                  ? `${movie.vote_average.toFixed(1)}/10`
                                  : "—"}
                              </span>
                            </div>

                            <p className="text-neutral-400 text-[14px] leading-7 line-clamp-2 md:text-[16px] md:leading-7.5 ">
                              {movie.overview || "No overview available."}
                            </p>
                          </div>

                          {/* Desktop watch trailer (only if exists) */}
                          {hasTrailer ? (
                            <button
                              onClick={() => watchTrailer(movie.id)}
                              className="hidden md:flex flex-row items-center justify-center p-2 bg-primary-300 h-13 rounded-full cursor-pointer w-50"
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
                        </div>
                      </div>

                      {/* Mobile actions */}
                      <div className="md:hidden flex flex-row gap-4">
                        {hasTrailer ? (
                          <button
                            onClick={() => watchTrailer(movie.id)}
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
                        ) : (
                          <button
                            onClick={() => goToDetails(movie.id)}
                            className="p-2 bg-neutral-950/60 border border-neutral-800 h-11 rounded-full cursor-pointer w-full backdrop-blur-md"
                          >
                            <span className="font-semibold text-[14px] leading-7">
                              See Detail
                            </span>
                          </button>
                        )}

                        <div>
                          <button
                            onClick={() => removeFromFavorite(movie.id)}
                            className="p-2 border border-neutral-800 h-11 w-11 rounded-full cursor-pointer flex items-center justify-center bg-neutral-950/60 backdrop-blur-md"
                            aria-label="remove from favorite"
                          >
                            <img
                              src="/images/common/heart-red.svg"
                              className="w-6 h-6"
                              alt="favorite"
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    {!isLast ? (
                      <hr
                        id="favorites-divider"
                        className="border-0 h-px bg-neutral-800 mt-12"
                      />
                    ) : null}
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Favorites;
