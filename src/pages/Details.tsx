export default function Details() {
  return (
    <main className="w-full px-4 md:px-30 md:mt-32 pt-4 md:pt-0 mt-16 flex flex-col gap-4 md:gap-8 text-neutral-950">
      <div id="details-header" className="flex flex-col gap-4 md:gap-8">
        <div
          id="images-header-desktop"
          className="hidden md:grid md:grid-cols-2 md:gap-5 h-117.5"
        >
          <div
            className="h-117.5 rounded-3xl inset-0 bg-cover bg-center bg-no-repeat text-xl"
            style={{
              backgroundImage: `url('/images/common/details-dummy-1.svg')`,
            }}
          ></div>

          <div className="flex flex-col gap-5 h-full">
            <div
              className="h-75.5 rounded-3xl inset-0 bg-cover bg-center bg-no-repeat text-xl"
              style={{
                backgroundImage: `url('/images/common/details-dummy-2.svg')`,
              }}
            ></div>
            <div className="flex flex-row gap-5 h-37.5">
              <div
                className="h-full w-full rounded-3xl inset-0 bg-cover bg-center bg-no-repeat text-xl"
                style={{
                  backgroundImage: `url('/images/common/details-dummy-3.svg')`,
                }}
              ></div>
              <div
                className="h-full w-full rounded-3xl inset-0 bg-cover bg-center bg-no-repeat text-xl"
                style={{
                  backgroundImage: `url('/images/common/details-dummy-4.svg')`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div id="images-header-mobile" className="md:hidden">
          <img
            src="/images/common/header-details.dummy.svg"
            className="w-full"
            alt=""
          />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-2">
          <img
            src="/images/common/burger-king-round.svg"
            alt="restaurant-image"
            className="w-22.5 h-22.5 md:w-30 md:h-30 rounded-full"
          />
          <div className="flex flex-col gap-0.5 w-full md:gap-1 justify-center">
            <h3 className="text-neutral-950 font-extrabold text-[16px] md:text-[32px] leading-7.5 md:leading-10.5 -tracking-[0.02em]">
              Burger King
            </h3>
            <div className="flex flex-row gap-1">
              <img
                src="/images/common/star.svg"
                className="w-6 h-6"
                alt="star"
              />
              <span className="text-neutral-950 font-medium leading-7 text-[14px] md:text-[18px] md:leading-7 md:-tracking-[0.02em]">
                4.9
              </span>
            </div>
            <div className="flex flex-row gap-1.5 items-center justify-start w-fit">
              <span className="text-neutral-950 text-[14px] leading-7 -tracking-[-0.02em] md:text-[18px] md:leading-8 md:tracking-normal">
                Jakarta Selatan
              </span>
              <div className="flex flex-row w-fit items-center justify-center">
                <div className="w-0.5 h-0.5 bg-neutral-950"></div>
              </div>
              <span className="text-neutral-950 text-[14px] leading-7 -tracking-[-0.02em] md:text-[18px] md:leading-8 md:tracking-normal">
                2.4 km
              </span>
            </div>
          </div>
        </div>
        <button className="h-fit w-fit p-3 rounded-[100px] ring-1 ring-neutral-300 ring-inset flex flex-row gap-3 items-center justify-center md:px-4 md:py-3 md:h-11 md:w-35">
          <img src="/images/common/share.svg" alt="share" className="w-5 h-5" />
          <span className="hidden md:block text-neutral-950">Share</span>
        </button>
      </div>
      <hr />
      <article id="menu" className="text-neutral-950 flex flex-col gap-4 ">
        <h1 className="font-extrabold text-[24px] leading-9">Menu</h1>
        <div className="flex flex-row gap-2 md:gap-3">
          <button className="h-10 md:h-11.5 px-4 py-2  rounded-[100px] ring-1 ring-inset  font-bold text-[14px] leading-7 -tracking-[-0.02em]  text-center flex items-center justify-center md:text-[16px] md:leading-7.5 md:-tracking-[0.02em] ring-primary-100 bg-[#FFECEC] text-primary-100">
            All Menu
          </button>
          <button className="h-10 md:h-11.5 px-4  ring-1 ring-inset ring-neutral-300 rounded-[100px] font-semibold text-[14px] leading-7 -tracking-[0.02em] items-center justify-center text-center md:text-[16px] md:leading-7.5 md:-tracking-[0.02em]">
            Food
          </button>
          <button className="h-10 md:h-11.5 px-4  ring-1 ring-inset ring-neutral-300 rounded-[100px] font-semibold text-[14px] leading-7 -tracking-[0.02em] items-center justify-center text-center md:text-[16px] md:leading-7.5 md:-tracking-[0.02em]">
            Drink
          </button>
        </div>
      </article>
      <article className="grid grid-cols-2 gap-x-4 gap-y-4 md:grid-cols-4 md:gap-x-5 md:gap-y-6">
        <div className="flex flex-col shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-3xl">
          <div
            className="h-[172.5px] rounded-tl-2xl rounded-tr-2xl inset-0 bg-cover bg-center bg-no-repeat text-xl"
            style={{
              backgroundImage: `url('/images/common/details-dummy-1.svg')`,
            }}
          ></div>
          <div className="flex flex-col md:flex-row md:justify-between gap-4 py-3 px-3 md:py-4 md:px-4  ">
            <div className="flex flex-col md:flex-1">
              <span className="font-medium text-[14px] leading-7 md:text-[16px] md:leading-7 md:-tracking-[0.03em]">
                Food Name
              </span>
              <h3 className="font-extrabold text-[16px] leading-7.5 md:text-[18px] md:leading-8 md:-tracking-[0.02em]">
                Rp50.000
              </h3>
            </div>
            <div className="flex md:flex-1">
              <button className="h-9 md:h-10 w-full rounded-[100px] bg-primary-100 text-white font-bold text-[14px] leading-7 -tracking-[0.02em] items-center justify-center text-center md:text-[16px] md:leading-7.5 md:-tracking-[0.02em]">
                Add
              </button>
              {/* <div className="flex flex-row items-center gap-4">
                <button className="h-9 w-9 ring-1 ring-inset ring-neutral-300 rounded-full flex items-center justify-center cursor-pointer md:h-10 md:w-10">
                  <img
                    src="/images/common/minus.svg"
                    alt="decrease"
                    className="w-[19.5px] h-[19.5px] md:w-6 md:h-6"
                  />
                </button>
                <div className="text-[16px] leading-7.5 -tracking-[0.02em] font-semibold md:text-[18px] md:leading-8 md:-tracking-[0.02em]">
                  1
                </div>
                <button className="h-9 w-9 bg-primary-100 rounded-full flex items-center justify-center cursor-pointer  md:h-10 md:w-10">
                  <img
                    src="/images/common/plus.svg"
                    alt="decrease"
                    className="w-[19.5px] h-[19.5px] md:w-6 md:h-6"
                  />
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </article>
      <div className="flex flex-row flex-1 w-full items-center justify-center pb-4 md:pb-0">
        <button className="h-10 w-40 ring-1 ring-inset ring-neutral-300 rounded-[100px] text-neutral-950 text-[14px] leading-7 -tracking-[0.02em] font-bold cursor-pointer">
          Show More
        </button>
      </div>
      <hr />
      <article className="flex flex-col gap-4">
        <h2 className="text-[24px] leading-9 font-extrabold md:text-[36px] md:leading-11">
          Review
        </h2>
        <div className="flex flex-row gap-1">
          <img
            src="/images/common/star.svg"
            className="w-6 h-6 md:w-8.5 md:h-8.5"
            alt="star"
          />
          <span className="font-extrabold text-[16px] leading-7.5 md:text-[20px] md:leading-8.5">
            4.9 (24 Ulasan)
          </span>
        </div>
        <div className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-5">
          <div className="flex flex-col gap-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] rounded-3xl px-4 py-4">
            <div className="flex flex-row gap-3">
              <div
                className="h-14.5 w-14.5 md:w-16 md:h-16 rounded-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url('/images/common/profile-dummy.svg')`,
                }}
              ></div>
              <div className="flex flex-col">
                <h3 className="font-extrabold text-[16px] leading-7.5 md:text-[18px] md:leading-8 -tracking-[0.02em]">
                  Michael Brown
                </h3>
                <p className="text-[14px] leading-7 -tracking-[0.02em] md:text-[16px] md:leading-7.5 md:-tracking-[0.02em]">
                  25 August 2025, 13:38
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row ">
                <img
                  src="/images/common/star.svg"
                  className="w-6 h-6"
                  alt="star"
                />
                <img
                  src="/images/common/star.svg"
                  className="w-6 h-6"
                  alt="star"
                />
                <img
                  src="/images/common/star.svg"
                  className="w-6 h-6"
                  alt="star"
                />
              </div>
              <p className="text-[14px] leading-7 -tracking-[0.02em] md:text-[16px] md:leading-7.5">
                What a fantastic place! The food was delicious, and the ambiance
                was delightful. A must-visit for anyone looking for a great
                time!
              </p>
            </div>
          </div>
        </div>
      </article>
      <div className="flex flex-row flex-1 w-full items-center justify-center pb-4 md:pb-0 mb-13">
        <button className="h-10 w-40 ring-1 ring-inset ring-neutral-300 rounded-[100px] text-neutral-950 text-[14px] leading-7 -tracking-[0.02em] font-bold cursor-pointer">
          Show More
        </button>
      </div>
    </main>
  );
}
