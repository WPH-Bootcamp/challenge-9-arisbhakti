export default function MyCart() {
  return (
    <main className="w-full px-4 md:px-30 md:mt-32 pt-4 md:pt-0 mt-16 flex flex-col gap-4 md:gap-8 text-neutral-950 md:items-center">
      <div className="flex flex-col gap-4 md:gap-8 md:w-200">
        <h1 className="font-extrabold text-2xl leading-9 md:text-[32 px] md:leading-10.5">
          My Cart
        </h1>

        <div className="flex flex-col gap-5 ">
          {/* Card of cart */}
          <div className="flex flex-col gap-3 md:gap-5 py-4 px-4 shadow-sm rounded-3xl h-fit">
            {/* Card's content  */}
            <div className="flex flex-row gap-1 items-center md:gap-2 ">
              <img
                src="/images/common/icon-restaurant-dummy.svg"
                className="w-8 h-8"
                alt="restaurant"
              />
              <span className="font-bold text-base leading-7.5 -tracking-[0.02em] md:text-lg md:leading-8 md:-tracking-[0.03em] ">
                Burger King
              </span>
              <img
                src="/images/common/chevron-right.svg"
                className="w-5 h-5"
                alt="pointer-right"
              />
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex flex-row gap-4.25">
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
              <div className="flex flex-row items-center gap-4 py-6">
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
              </div>
            </div>

            <hr className="border-t border-dashed border-neutral-300" />
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
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
