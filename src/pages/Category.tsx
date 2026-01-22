import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import FilterLeftMenu from "@/components/container/FilterLeftMenu";

export default function Category() {
  return (
    <main className="w-full px-4 md:px-30 md:mt-32 pt-4 md:pt-0 mt-16 flex flex-col gap-4 md:gap-8 text-neutral-950">
      <div className="flex flex-col gap-4">
        <h1 className="text-[24px] leading-9 font-extrabold">All Restaurant</h1>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <div className="flex flex-row justify-between px-3 py-3 items-center shadow-sm rounded-2xl">
              <span className="font-extrabold text-[14px] leading-7">
                Filter
              </span>
              <img
                src="/images/common/filter.svg"
                alt="filter"
                className="w-5 h-5"
              />
            </div>
          </SheetTrigger>

          <SheetContent side="left" className="w-74.5 p-4">
            <div className="pt-4">
              <FilterLeftMenu />
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex flex-row gap-10">
          <div className="hidden md:flex shadow-md w-66.5 min-w-66.5 p-4 rounded-3xl">
            <FilterLeftMenu />
          </div>
          <div className="flex flex-col gap-4 w-full md:grid md:grid-cols-2 md:gap-6 ">
            <div className="flex flex-row gap-2 px-3 py-3 shadow-sm rounded-3xl h-fit">
              <img
                src="/images/common/restaurant-dummy.svg"
                className="rounded-2xl w-22.5 h-22.5"
                alt="restaurant"
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
            <div className="flex flex-row gap-2 px-3 py-3 shadow-sm rounded-3xl h-fit">
              <img
                src="/images/common/restaurant-dummy.svg"
                className="rounded-2xl w-22.5 h-22.5"
                alt="restaurant"
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
        </div>
      </div>
    </main>
  );
}
