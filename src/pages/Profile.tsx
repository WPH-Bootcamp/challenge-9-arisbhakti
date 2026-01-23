import React from "react";

export default function Profile() {
  return (
    <div className="flex flex-col gap-4 md:gap-6 pt-4 md:pt-0 md:w-131 md:mb-[192px]">
      <h1 className=" font-extrabold text-2xl leading-9 md:text-[32px] md:leading-10.5 ">
        Profile
      </h1>
      <div className="flex flex-col gap-6 p-4 bg-white shadow-2xl rounded-3xl md:p-5  ">
        <div className="flex flex-col gap-2 md:gap-3">
          <div
            className="h-16 w-16 rounded-full inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/images/common/profile-dummy.svg')`,
            }}
          ></div>
          <div className="flex flex-row justify-between">
            <span className="font-medium text-sm leading-7 md:text-base md:leading-7.5 -tracking-[0.03em]">
              Name
            </span>
            <span className="font-bold text-sm leading-7 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em]">
              Johndoe
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <span className="font-medium text-sm leading-7 md:text-base md:leading-7.5 -tracking-[0.03em] ">
              Email
            </span>
            <span className="font-bold text-sm leading-7 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em]">
              johndoe@email.com
            </span>
          </div>
          <div className="flex flex-row justify-between">
            <span className="font-medium text-sm leading-7 md:text-base md:leading-7.5 -tracking-[0.03em] ">
              Nomor Handphone
            </span>
            <span className="font-bold text-sm leading-7 -tracking-[0.02em] md:text-base md:leading-7.5 md:-tracking-[0.02em]">
              081234567890
            </span>
          </div>
        </div>
        <button className="h-11 md:h-12 w-full  rounded-[100px] bg-primary-100 text-white font-bold text-[14px] leading-7 -tracking-[0.02em] items-center justify-center text-center md:text-[16px] md:leading-7.5 md:-tracking-[0.02em]">
          Update Profile
        </button>
      </div>
    </div>
  );
}
