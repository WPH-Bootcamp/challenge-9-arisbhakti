import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Checkout() {
  return (
    <main className="text-neutral-950 w-full px-4  md:mt-32 pt-4 md:pt-0 mt-16 md:flex md:flex-col gap-4 md:gap-6 items-center z-10 mb-12 md:mb-25">
      <div className="flex flex-col gap-4 md:gap-6 md:w-250">
        <h1 className="font-extrabold text-2xl leading-9 md:text-[32px] md:leading-10.5">
          Checkout
        </h1>
        <div className="flex flex-col gap-4 md:flex-row md:gap-5 md:items-start">
          {/* left side */}
          <div className="flex flex-col gap-4 md:flex-1/4">
            {/* Delviery Address */}
            <div className="flex flex-col gap-4 p-4 rounded-3xl shadow-sm md:gap-5.25 md:p-5">
              {/* Header & Text */}
              <div className="flex flex-col gap-1">
                {/* Header */}
                <div className="flex flex-row gap-2 items-center">
                  <img
                    src="/images/common/location.svg"
                    className="w-6 h-6"
                    alt="delivery-address"
                  />
                  <span className="text-base leading-7.5 font-extrabold md:text-lg md:leading-8 -tracking-[0.02em] ">
                    Delivery Address
                  </span>
                </div>
                {/* Address */}
                <span className="text-sm leading-7 font-medium md:text-base md:leading-7.5 md:-tracking-[0.03em]">
                  Jl. Sudirman No. 25, Jakarta Pusat, 10220
                </span>
                <span className="text-sm leading-7 font-medium md:text-base md:leading-7.5 md:-tracking-[0.03em]">
                  0812-3456-7890
                </span>
              </div>
              {/* button */}
              <button className="h-9 w-30 md:h-10  rounded-full ring-1 ring-inset ring-neutral-300 flex items-center justify-center font-bold text-sm leading-7 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em]">
                Change
              </button>
            </div>
            {/* Order Items */}
            <div className="flex flex-col gap-3 p-4 rounded-3xl shadow-sm md:p-5 md:gap-5.25">
              {/* Header & Button */}
              <div className="flex flex-row justify-between items-center just">
                <div className="flex flex-row gap-1 items-center  md:gap-2 ">
                  <img
                    src="/images/common/icon-restaurant-dummy.svg"
                    className="w-8 h-8"
                    alt="restaurant"
                  />
                  <span className="font-bold text-base leading-7.5 -tracking-[0.02em] md:text-lg md:leading-8 md:-tracking-[0.03em] ">
                    Burger King
                  </span>
                </div>
                <button className="h-9 w-26.5 md:h-10 md:w-30 rounded-full ring-1 ring-inset ring-neutral-300 flex items-center justify-center font-bold text-sm leading-7 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em] ">
                  Add Item
                </button>
              </div>
              {/* Item List */}
              <div className="flex flex-row items-center justify-between">
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
            </div>
          </div>
          {/* Right Side, Payment Method */}
          <div className="flex flex-col gap-4 p-4 rounded-3xl shadow-sm w-full md:flex-1 md:p-5">
            {/* Payment Method div */}
            <div className="flex flex-col gap-3 md:gap-4">
              <h1 className="font-bold text-base leading-7.5 md:text-lg md:leading-8 -tracking-[0.02em] ">
                Payment Method
              </h1>
              {/* banks */}
              <div className="flex flex-row justify-between">
                {/* bank image and name */}
                <div className="flex flex-row gap-2 items-center ">
                  {/* bank image */}
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl ring-[0.75px] ring-inset ring-neutral-300">
                    <img
                      src="/images/common/BNI.svg"
                      className="w-6 h-6"
                      alt="bank-bca"
                    />
                  </div>
                  {/* bank name */}
                  <span className="font-bold text-sm leading-7.5 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em]">
                    Bank Negara Indonesia
                  </span>
                </div>
                {/* radio button */}
                <RadioGroup>
                  <label className="flex items-center ">
                    <RadioGroupItem value="BNI" checked />
                  </label>
                </RadioGroup>
              </div>
              <hr />
              <div className="flex flex-row justify-between">
                {/* bank image and name */}
                <div className="flex flex-row gap-2 items-center ">
                  {/* bank image */}
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl ring-[0.75px] ring-inset ring-neutral-300">
                    <img
                      src="/images/common/BRI.svg"
                      className="w-6 h-6"
                      alt="bank-bca"
                    />
                  </div>
                  {/* bank name */}
                  <span className="font-bold text-sm leading-7.5 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em]">
                    BCA Rakyat Indonesia
                  </span>
                </div>
                {/* radio button */}
                <RadioGroup>
                  <label className="flex items-center ">
                    <RadioGroupItem value="BRI" />
                  </label>
                </RadioGroup>
              </div>
              <hr />
              <div className="flex flex-row justify-between">
                {/* bank image and name */}
                <div className="flex flex-row gap-2 items-center ">
                  {/* bank image */}
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl ring-[0.75px] ring-inset ring-neutral-300">
                    <img
                      src="/images/common/BCA.svg"
                      className="w-6 h-6"
                      alt="bank-bca"
                    />
                  </div>
                  {/* bank name */}
                  <span className="font-bold text-sm leading-7.5 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em]">
                    BCA Virtual Account
                  </span>
                </div>
                {/* radio button */}
                <RadioGroup>
                  <label className="flex items-center ">
                    <RadioGroupItem value="BCA" />
                  </label>
                </RadioGroup>
              </div>
              <hr />
              <div className="flex flex-row justify-between">
                {/* bank image and name */}
                <div className="flex flex-row gap-2 items-center ">
                  {/* bank image */}
                  <div className="w-10 h-10 flex items-center justify-center rounded-xl ring-[0.75px] ring-inset ring-neutral-300">
                    <img
                      src="/images/common/Mandiri.svg"
                      className="w-6 h-6"
                      alt="bank-bca"
                    />
                  </div>
                  {/* bank name */}
                  <span className="font-bold text-sm leading-7.5 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em]">
                    Mandiri
                  </span>
                </div>
                {/* radio button */}
                <RadioGroup>
                  <label className="flex items-center ">
                    <RadioGroupItem value="Mandiri" />
                  </label>
                </RadioGroup>
              </div>
              <hr className="border-t border-dashed border-neutral-300" />
              {/* Payment Summary */}
              <div className="flex flex-col gap-4">
                <h1 className="font-extrabold text-base leading-7.5 md:text-lg md:leading-8 -tracking-[0.02em]  ">
                  Payment Summary
                </h1>
                <div className="flex flex-row justify-between">
                  <span className="text-sm leading-7 font-medium md:text-base md:leading-7.5 md:-tracking-[0.03em]">
                    Price ( 2 items )
                  </span>
                  <span className="font-bold text-sm leading-7 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em]">
                    Rp100.000
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="text-sm leading-7 font-medium  md:text-base md:leading-7.5 md:-tracking-[0.03em]">
                    Delivery Fee
                  </span>
                  <span className="font-bold text-sm leading-7 -tracking-[0.02em]  md:text-base md:leading-7.5 md:-tracking-[0.02em]">
                    Rp100.000
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="text-sm leading-7 font-medium  md:text-base md:leading-7.5 md:-tracking-[0.03em]">
                    Service Fee
                  </span>
                  <span className="font-bold text-sm leading-7 -tracking-[0.02em]  md:text-base md:leading-7.5 md:-tracking-[0.02em]">
                    Rp100.000
                  </span>
                </div>
                <div className="flex flex-row justify-between">
                  <span className="text-base leading-7.5 font-normal -tracking-[0.02em] md:text-lg md:leading-8">
                    Total
                  </span>
                  <span className="font-extrabold text-base leading-7.5 md:text-lg md:leading-8 -tracking-[0.02em]">
                    Rp100.000
                  </span>
                </div>
                <button className="h-11 md:h-12 w-full rounded-[100px] bg-primary-100 text-white font-bold text-base leading-7.5 -tracking-[0.02em] items-center justify-center text-center ">
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

{
  /* <label className="flex items-center gap-3">
                <RadioGroupItem value="1km" />
                <span>Within 1 km</span>
              </label> */
}

{
  /* <h1 className="font-extrabold text-2xl leading-9 md:text-[32 px] md:leading-10.5">
  Checkout
</h1>; */
}
