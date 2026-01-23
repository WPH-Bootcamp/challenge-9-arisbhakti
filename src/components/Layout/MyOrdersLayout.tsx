import { Outlet, NavLink } from "react-router-dom";
import { SlLocationPin } from "react-icons/sl";

import { IoDocumentTextOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";

export default function MyOrdersLayout() {
  return (
    //<main className="w-full px-4 md:px-30  pt-4 md:pt-0 md:mt-32 mt-16 flex flex-col gap-4 md:gap-8 text-neutral-950 md:items-center"></main>
    <main className="w-full px-4 md:px-30 mt-16 md:mt-32 flex flex-row gap-6 md:gap- text-neutral-950 ">
      {/* LEFT SIDEBAR (TETAP) */}
      <aside className="h-fit rounded-3xl bg-white shadow-lg p-5 md:flex flex-col gap-6 w-60 hidden">
        <div className="flex flex-row items-center gap-2 ">
          <img
            src="/images/common/profile-dummy.svg"
            className="w-10 h-10 rounded-full"
          />
          <div className="font-bold text-md">John Doe</div>
        </div>
        <hr />

        <nav className="flex flex-col gap-6">
          <NavLink to="profile" className="">
            <div className="flex flex-row items-center gap-2 ">
              <SlLocationPin className="w-6 h-6" />
              <span className="text-base leading-7.5 -tracking-[0.03em] ">
                Delivery Address
              </span>
            </div>
          </NavLink>
          <NavLink to="orders" className="">
            <div className="flex flex-row items-center gap-2 ">
              <IoDocumentTextOutline className="w-6 h-6 text-primary-100" />
              <span className="text-base leading-7.5 -tracking-[0.03em] text-primary-100 ">
                My Orders
              </span>
            </div>
          </NavLink>
          <NavLink to="profile" className="">
            <div className="flex flex-row items-center gap-2 ">
              <RiLogoutCircleLine className="w-6 h-6 " />
              <span className="text-base leading-7.5 -tracking-[0.03em]">
                Logout
              </span>
            </div>
          </NavLink>
        </nav>
      </aside>

      {/* RIGHT CONTENT (GANTI-GANTI) */}
      <section className="w-full">
        <Outlet />
      </section>
    </main>
  );
}

// shadow-[0_12px_24px_-12px_rgba(0,0,0,0.10)]
