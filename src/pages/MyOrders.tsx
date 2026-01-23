import React from "react";

export default function MyOrders() {
  return (
    <article className="flex flex-col gap-4 md:gap-6 mt-4">
      <h1 className=" font-extrabold text-2xl leading-9 md:text-[32px] md:leading-10.5 ">
        My Orders
      </h1>
      <div className="flex flex-col gap-5 p-4 md:p-6 bg-white rounded-2xl shadow-md ">
        {/* Search Bar */}
        <div className="relative w-full md:w-149.5 ">
          <img
            src="/images/common/search.svg"
            alt="search"
            className="absolute left-4 top-2.5 w-6 h-6 z-50"
          />

          <input
            id="searchInput"
            name="searchInput"
            type="text"
            placeholder="Search"
            className="ring-1 ring-inset ring-neutral-300 ring-neutral w-full h-11 rounded-full pl-13 text-[14px] leading-7   bg-white text-black
  focus:outline-none focus:ring-2 focus:ring-white placeholder:text-neutral-600 -tracking-[0.02em]"
          />
        </div>
        {/* Status */}
        <div className="flex flex-row gap-2 items-center overflow-x-auto no-scrollbar md:gap-3">
          <span className="font-bold text-sm leading-7 -tracking-[0.02em] md:text-lg md:leading-8 md:-tracking-[0.03em]">
            Status
          </span>
          <button className="h-10 px-4 py-2 md:h-10  rounded-full ring-1 ring-inset ring-neutral-300 flex items-center justify-center font-semibold text-sm leading-7 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em]">
            Preparing
          </button>
          <button className="h-10 px-4 py-2 md:h-10  rounded-full ring-1 ring-inset ring-neutral-300 flex items-center justify-center font-semibold text-sm leading-7 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em]">
            On The Way
          </button>
          <button className="h-10 px-4 py-2 md:h-10  rounded-full ring-1 ring-inset ring-neutral-300 flex items-center justify-center font-semibold text-sm leading-7 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em]">
            Delivered
          </button>
          <button className="h-10 px-4 py-2 md:h-10  rounded-full  flex items-center justify-center font-semibold text-sm leading-7 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em] ring-1 ring-inset  ring-primary-100 bg-[#FFECEC] text-primary-100">
            Done
          </button>
          <button className="h-10 px-4 py-2 md:h-10  rounded-full ring-1 ring-inset ring-neutral-300 flex items-center justify-center font-semibold text-sm leading-7 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em]">
            Canceled
          </button>
        </div>
        {/* Order List */}
        <div className="flex flex-col gap-3 shadow-lg p-4 rounded-3xl">
          <div className="flex flex-row justify-between items-center just">
            <div className="flex flex-row gap-2 items-center">
              <img
                src="/images/common/icon-restaurant-dummy.svg"
                className="w-8 h-8"
                alt="restaurant"
              />
              <span className="font-bold text-base leading-7.5 -tracking-[0.02em] md:text-lg md:leading-8 md:-tracking-[0.03em] ">
                Burger King
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <div
              className="bg-cover bg-center bg-no-repeat text-xl w-16 h-16 md:h-20 md:w-20 rounded-2xl"
              style={{
                backgroundImage: `url('/images/common/burger-hero.svg')`,
              }}
            />
            <div className="flex flex-col justify-center">
              <span className="font-medium text-sm leading-7 md:text-base md:leading-7.5 -tracking-[0.03em]">
                Beef Burger
              </span>
              <span className="font-extrabold text-base leading-7.5 md:text-lg md:leading-8 -tracking-[0.02em]">
                Rp50.000
              </span>
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
            <div className="flex flex-col gap-0">
              <span className="text-sm leading-7 font-medium -mb-1 md:text-base md:leading-7.5 -tracking-[0.03em]">
                Total
              </span>
              <span className="font-extrabold text-lg leading-8 -tracking-[0.02em] md:text-xl md:leading-8.5">
                Rp. 100.000
              </span>
            </div>
            <button className="h-11 md:h-12 w-full md:w-60 rounded-[100px] bg-primary-100 text-white font-bold text-[14px] leading-7 -tracking-[0.02em] items-center justify-center text-center md:text-[16px] md:leading-7.5 md:-tracking-[0.02em]">
              Give Review
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
