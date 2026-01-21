const DetailsOld = () => {
  return (
    <>
      <div className="relative w-full h-98 md:h-202.5 bg-[url('/images/movies/captain-cover.svg')] bg-cover bg-top bg-no-repeat">
        <div className="md:hidden absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent"></div>
        <div className="hidden md:block absolute inset-0 bg-linear-to-t from-black to-transparent"></div>
      </div>

      <main className="relative -top-30.75  md:-top-99.5 w-full px-4 md:px-35 pt-0 pb-10 md:p-0 -mb-30.75 md:-mb-79.5">
        <div className="flex flex-col gap-6 md:gap-12">
          <div className="flex flex-row gap-4">
            <img
              src="/images/movies/captain-poster.svg"
              className="w-29 h-42.75 md:w-65 md:h-96 rounded-xl"
              alt=""
            />
            <div className="flex flex-col md:gap-6">
              <div className="flex flex-col gap-1 md:gap-4">
                <h2 className="font-bold text-[20px] leading-8.5 md:text-[40px] md:leading-14 tracking-[-0.02em]">
                  Captain America: Brave New World
                </h2>
                <div className="flex flex-row gap-1 md:gap-2 items-center">
                  <img
                    src="/images/common/calendar.svg"
                    className="w-5 h-5 md:w-6 md:h-6"
                    alt=""
                  />
                  <p className="text-[14px] leading-7 md:text-[16px] md:leading-7.5 md:pt-0.5">
                    12 February 2026
                  </p>
                </div>
              </div>
              <div className="hidden md:flex flex-row gap-4">
                <button className="p-2 bg-primary-300 h-13 rounded-full cursor-pointer w-55">
                  <span className="font-semibold text-[14px] leading-7 md:text-[16px] md:leading-7.5">
                    Watch Trailer
                  </span>
                  <img
                    src="/images/common/play.svg"
                    alt="play"
                    className="inline-block w-4.5 h-4.5 md:w-6 md:h-6 ml-2"
                  />
                </button>

                <button className="p-2 border border-neutral-800 h-11 w-11 rounded-full md:h-13 md:w-13 cursor-pointer flex items-center justify-center bg-neutral-950/60">
                  <img
                    src="/images/common/heart-white.svg"
                    className="w-6 h-6"
                    alt=""
                  />
                  {/* <img
                    src="/images/common/heart-red.svg"
                    className="w-6 h-6"
                    alt=""
                  /> */}
                </button>
              </div>
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
                      6.2/10
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-center justify-centergap-2 p-4 border border-neutral-800 rounded-2xl bg-black">
                  <img
                    src="/images/common/genre.svg"
                    alt="star"
                    className="inline-block w-8 h-8"
                  />
                  <div className="flex flex-col">
                    <p className="text-[12px] md:text-[16px] leading-6 md:leading-7.5">
                      Genre
                    </p>
                    <p className="font-semibold text-[18px] md:text-[20px] leading-8 md:leading-8.5">
                      Action
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 items-center justify-centergap-2 p-4 border border-neutral-800 rounded-2xl bg-black">
                  <img
                    src="/images/common/age-limit.svg"
                    alt="star"
                    className="inline-block w-8 h-8"
                  />
                  <div className="flex flex-col">
                    <p className="text-[12px] md:text-[16px] leading-6 md:leading-7.5">
                      Age Limit
                    </p>
                    <p className="font-semibold text-[18px] md:text-[20px] leading-8 md:leading-8.5">
                      13
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:hidden flex flex-row gap-4">
            <button className="p-2 bg-primary-300 h-11 rounded-full cursor-pointer w-full">
              <span className="font-semibold text-[14px] leading-7 md:text-[16px] md:leading-7.5">
                Watch Trailer
              </span>
              <img
                src="/images/common/play.svg"
                alt="play"
                className="inline-block w-4.5 h-4.5 md:w-6 md:h-6 ml-2"
              />
            </button>
            <div>
              <button className="p-2 border border-neutral-800 h-11 w-11 rounded-full md:h-13 md:w-57.5 cursor-pointer flex items-center justify-center bg-neutral-950/60">
                <img
                  src="/images/common/heart-white.svg"
                  className="w-6 h-6"
                  alt=""
                />
              </button>
            </div>
          </div>
          <div className="md:hidden grid grid-cols-3 gap-3 text-center">
            <div className="flex flex-col gap-2 items-center justify-centergap-2 p-4 border border-neutral-800 rounded-2xl">
              <img
                src="/images/common/star.svg"
                alt="star"
                className="inline-block w-6 h-6"
              />
              <div className="flex flex-col">
                <p className="text-[12px] leading-6">Rating</p>
                <p className="font-semibold text-[18px] leading-8">6.2/10</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center justify-centergap-2 p-4 border border-neutral-800 rounded-2xl">
              <img
                src="/images/common/genre.svg"
                alt="star"
                className="inline-block w-6 h-6"
              />
              <div className="flex flex-col">
                <p className="text-[12px] leading-6">Rating</p>
                <p className="font-semibold text-[18px] leading-8">6.2/10</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-center justify-centergap-2 p-4 border border-neutral-800 rounded-2xl">
              <img
                src="/images/common/age-limit.svg"
                alt="star"
                className="inline-block w-6 h-6"
              />
              <div className="flex flex-col">
                <p className="text-[12px] leading-6">Rating</p>
                <p className="font-semibold text-[18px] leading-8">6.2/10</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-[20px] leading-8.5 md:text-[32px] md:leading-11.5 md:tracking-[-0.02em]">
              Overview
            </h3>
            <p className="text-neutral-400 text-[14px] md:text-[16px] leading-7 font-regular md:leading-7.5">
              After meeting with newly elected U.S. President Thaddeus Ross, Sam
              finds himself in the middle of an international incident. He must
              discover the reason behind a nefarious global plot before the true
              mastermind has the entire world seeing red.
            </p>
          </div>
          <div className="flex flex-col gap-4 md:gap-6">
            <h3 className="font-bold text-[20px] leading-8.5 md:text-[32px] md:leading-11.5 tracking-[-0.02em]">
              Cast & Crew
            </h3>
            <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-10">
              <div className="flex flex-row gap-3 md:gap-4">
                <img
                  src="/images/movies/anthony.svg"
                  alt=""
                  className="w-13.75 h-21 md:w-17.25 md:h-26 rounded-lg"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="text-[14px] leading-7 font-semibold md:text-[16px] md:leading-7.5">
                    Anthony Mackie
                  </h3>
                  <p className="text-neutral-400 leading-7 text-[14px] md:text-[16px] md:leading-7.5">
                    Sam Wilson / Captain America
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-3 md:gap-4">
                <img
                  src="/images/movies/anthony.svg"
                  alt=""
                  className="w-13.75 h-21 md:w-17.25 md:h-26 rounded-lg"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="text-[14px] leading-7 font-semibold md:text-[16px] md:leading-7.5">
                    Anthony Mackie
                  </h3>
                  <p className="text-neutral-400 leading-7 text-[14px] md:text-[16px] md:leading-7.5">
                    Sam Wilson / Captain America
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-3 md:gap-4">
                <img
                  src="/images/movies/anthony.svg"
                  alt=""
                  className="w-13.75 h-21 md:w-17.25 md:h-26 rounded-lg"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="text-[14px] leading-7 font-semibold md:text-[16px] md:leading-7.5">
                    Anthony Mackie
                  </h3>
                  <p className="text-neutral-400 leading-7 text-[14px] md:text-[16px] md:leading-7.5">
                    Sam Wilson / Captain America
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-3 md:gap-4">
                <img
                  src="/images/movies/anthony.svg"
                  alt=""
                  className="w-13.75 h-21 md:w-17.25 md:h-26 rounded-lg"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="text-[14px] leading-7 font-semibold md:text-[16px] md:leading-7.5">
                    Anthony Mackie
                  </h3>
                  <p className="text-neutral-400 leading-7 text-[14px] md:text-[16px] md:leading-7.5">
                    Sam Wilson / Captain America
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-3 md:gap-4">
                <img
                  src="/images/movies/anthony.svg"
                  alt=""
                  className="w-13.75 h-21 md:w-17.25 md:h-26 rounded-lg"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="text-[14px] leading-7 font-semibold md:text-[16px] md:leading-7.5">
                    Anthony Mackie
                  </h3>
                  <p className="text-neutral-400 leading-7 text-[14px] md:text-[16px] md:leading-7.5">
                    Sam Wilson / Captain America
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-3 md:gap-4">
                <img
                  src="/images/movies/anthony.svg"
                  alt=""
                  className="w-13.75 h-21 md:w-17.25 md:h-26 rounded-lg"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="text-[14px] leading-7 font-semibold md:text-[16px] md:leading-7.5">
                    Anthony Mackie
                  </h3>
                  <p className="text-neutral-400 leading-7 text-[14px] md:text-[16px] md:leading-7.5">
                    Sam Wilson / Captain America
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-3 md:gap-4">
                <img
                  src="/images/movies/anthony.svg"
                  alt=""
                  className="w-13.75 h-21 md:w-17.25 md:h-26 rounded-lg"
                />
                <div className="flex flex-col justify-center">
                  <h3 className="text-[14px] leading-7 font-semibold md:text-[16px] md:leading-7.5">
                    Anthony Mackie
                  </h3>
                  <p className="text-neutral-400 leading-7 text-[14px] md:text-[16px] md:leading-7.5">
                    Sam Wilson / Captain America
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DetailsOld;
