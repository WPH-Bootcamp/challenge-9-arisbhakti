import { useState } from "react";

const Home = () => {
  const [keyword, setKeyword] = useState("");

  const handleSearch = (value: string) => {
    setKeyword(value);
  };

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
            <div className="flex flex-col gap-1 md:gap-1.5">
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
            <div className="flex flex-col gap-1 md:gap-1.5">
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
            <div className="flex flex-col gap-1 md:gap-1.5">
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
            <div className="flex flex-col gap-1 md:gap-1.5">
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
            <div className="flex flex-col gap-1 md:gap-1.5">
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
            <div className="flex flex-col gap-1 md:gap-1.5">
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
            <h2 className="text-neutral-950 font-extrabold text-2xl leading-9 md:text-[32px] md:leading-10.5">
              Recommended
            </h2>
            <button className="text-primary-100 cursor-pointer font-extrabold text-[16px] leading-7.5 md:text-lg md:leading-8">
              See All
            </button>
          </div>
          <div className="flex flex-col gap-4 md:grid md:grid-cols-3 md:gap-x-5 md:gap-y-5  ">
            <div className="flex flex-row gap-2 md:gap-3 shadow-[0_4px_12px_rgba(0,0,0,0.06)] rounded-3xl px-3 py-3 md:px-4 md:py-4">
              <img
                src="/images/common/restaurant-dummy.svg"
                alt="restaurant image"
                className="w-22.5 h-22.5 md:h-30 md:w-30 rounded-2xl"
              />
              <div className="flex flex-col gap-0.5 w-full">
                <h3 className="text-neutral-950 font-extrabold text-[16px] leading-7.5 md:text-[18px] md:leading-8 -tracking-[0.02em]">
                  Burger King
                </h3>
                <div className="flex flex-row gap-1">
                  <img
                    src="/images/common/star.svg"
                    className="w-6 h-6"
                    alt="star"
                  />
                  <span className="text-neutral-950 font-medium leading-7 text-[14px] md:text-[16px] md:leading-7.5 -tracking-[0.03em]">
                    4.9
                  </span>
                </div>
                <div className="flex flex-row gap-1.5 items-center justify-start w-fit">
                  <span className="text-neutral-950 text-[14px] leading-7 -tracking-[-0.02em] md:text-[16px] md:leading-7.5">
                    Jakarta Selatan
                  </span>
                  <div className="flex flex-row w-fit items-center justify-center">
                    <div className="w-0.5 h-0.5 bg-neutral-950"></div>
                  </div>
                  <span className="text-neutral-950 text-[14px] leading-7 -tracking-[-0.02em] md:text-[16px] md:leading-7.5">
                    2.4 km
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row flex-1 w-full items-center justify-center">
            <button className="h-10 w-40 ring-1 ring-inset ring-neutral-300 rounded-[100px] text-neutral-950 text-[14px] leading-7 -tracking-[0.02em] font-bold">
              Show More
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
