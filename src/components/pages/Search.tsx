import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  tmdbImage,
  useSearchMovies,
  useTrailersForMovies,
} from "../../lib/tmdbQuery";
import { toggleFavorite, isMovieFavorite } from "../../lib/localFavorite";
import { useTrailerModal } from "../../context/TrailerModalContext";
import { showAppToast } from "../../components/common/AppToast";

const Search = () => {
  const [favoriteTick, setFavoriteTick] = useState(0);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("q") || "";

  const searchQuery = useSearchMovies(keyword);
  const movies = searchQuery.data?.results ?? [];

  const movieIds = useMemo(() => movies.map((m) => m.id), [movies]);
  const trailersQuery = useTrailersForMovies(movieIds);
  const trailerMap = trailersQuery.data ?? {};

  const { openTrailer } = useTrailerModal();

  const goToDetails = (id: number) => {
    navigate(`/details/${id}`);
  };

  const toggleFav = (movie: any) => {
    const added = toggleFavorite({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      vote_average: movie.vote_average,
      overview: movie.overview,
    });

    showAppToast({
      message: added
        ? "Success Add to Favorites"
        : "Success Remove from Favorites",
      variant: "success",
    });

    setFavoriteTick((v) => v + 1);
  };

  return (
    <>
      {/* EMPTY / NOT FOUND STATE */}
      {keyword && !searchQuery.isLoading && movies.length === 0 && (
        <div className="flex flex-row flex-1 items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 ">
          <div className="flex flex-col gap-6 items-center justify-center">
            <div className="flex flex-col gap-3 items-center justify-center md:gap-4 ">
              <img
                src="/images/common/frame-not-found.svg"
                className="w-50 h-50"
                alt=""
              />
              <div className="flex flex-col gap-2 justify-center items-center">
                <h3 className="font-semibold text-[16px] leading-7.5">
                  Data Not Found
                </h3>
                <p className="text-[14px] leading-7 text-neutral-400 text-center">
                  Try other keywords
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 md:px-35 pt-6 pb-10 md:p-0 mt-16 md:mt-38.5 relative md:mb-12">
        <div className="flex flex-col gap-8 md:gap-12">
          {/* Begin Main Content */}
          <>
            {movies.map((movie, index) => {
              const trailerKey = trailerMap[movie.id];
              const hasTrailer = !!trailerKey;
              const isLast = index === movies.length - 1;
              const isFav = isMovieFavorite(movie.id);

              return (
                <div key={movie.id}>
                  <div className="flex flex-col gap-6">
                    <div className="flex flex-row gap-4 md:gap-6">
                      <img
                        onClick={() => goToDetails(movie.id)}
                        src={
                          movie.poster_path
                            ? tmdbImage(movie.poster_path, "w500")
                            : "/images/common/movie-poster.svg"
                        }
                        className="w-26 h-39 md:w-45.5 md:h-67.5 cursor-pointer rounded-xl"
                        alt={movie.title}
                      />

                      <div className="flex flex-col gap-6 relative md:pr-45.5">
                        {/* Desktop Favorite */}
                        <button
                          onClick={() => toggleFav(movie)}
                          className="hidden md:flex absolute top-0 right-0 p-2 border border-neutral-800 h-11 w-11 rounded-full md:h-13 md:w-13 cursor-pointer items-center justify-center bg-neutral-950/60"
                        >
                          <img
                            src={
                              isFav
                                ? "/images/common/heart-red.svg"
                                : "/images/common/heart-white.svg"
                            }
                            className="w-6 h-6"
                            alt=""
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
                              alt=""
                            />
                            <span className="font-medium text-[14px] leading-7 md:text-[18px] md:leading-8">
                              {movie.vote_average?.toFixed(1)}/10
                            </span>
                          </div>

                          <p className="text-neutral-400 text-[14px] leading-7 line-clamp-2 md:text-[16px] md:leading-7.5 ">
                            {movie.overview || "No overview available"}
                          </p>
                        </div>

                        {/* Desktop Watch Trailer */}
                        {hasTrailer && (
                          <button
                            onClick={() => openTrailer(trailerKey)}
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
                        )}
                      </div>
                    </div>

                    {/* Mobile Actions */}
                    <div className="md:hidden flex flex-row gap-4">
                      {hasTrailer && (
                        <button
                          onClick={() => openTrailer(trailerKey)}
                          className="p-2 bg-primary-300 h-11 rounded-full cursor-pointer w-full"
                        >
                          <span className="font-semibold text-[14px] leading-7">
                            Watch Trailer
                          </span>
                          <img
                            src="/images/common/play.svg"
                            alt="play"
                            className="inline-block w-4.5 h-4.5 ml-2"
                          />
                        </button>
                      )}

                      <div>
                        <button
                          onClick={() => toggleFav(movie)}
                          className="p-2 border border-neutral-800 h-11 w-11 rounded-full cursor-pointer flex items-center justify-center bg-neutral-950/60"
                        >
                          <img
                            src={
                              isFav
                                ? "/images/common/heart-red.svg"
                                : "/images/common/heart-white.svg"
                            }
                            className="w-6 h-6"
                            alt=""
                          />
                        </button>
                      </div>
                    </div>
                  </div>

                  {!isLast && (
                    <hr className="border-0 h-px bg-neutral-800 mt-8 md:mt-12" />
                  )}
                </div>
              );
            })}
          </>
          {/* End Main Content */}
        </div>
      </div>
    </>
  );
};

export default Search;
