import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { IoDocumentTextOutline } from "react-icons/io5";
import { RiLogoutCircleLine } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";

const Header = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // cleanup (WAJIB)
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const syncAuth = () => {
      const token = localStorage.getItem("auth_token");
      setIsLogin(Boolean(token));
    };

    syncAuth();
    window.addEventListener("storage", syncAuth);

    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 h-16 md:h-22.5 flex justify-between items-center px-4 md:px-30 transition-all duration-300 shadow-md  ${
          isScrolled ? " bg-white" : "bg-transparent "
        }`}
      >
        <>
          <div className="flex flex-row items-center justify-center">
            <a
              href="#home"
              className="flex flex-row items-center justify-center  gap-3.75 cursor-pointer "
              id="home-button"
            >
              <img
                src={
                  isScrolled
                    ? "/images/common/logo-foody.svg"
                    : "/images/common/logo-foody-white.svg"
                }
                className="w-10 h-10 md:w-[33.33px] md:h-[31.18px]"
                alt="Your Logo"
              />
              <p
                className={`hidden md:block menu-hover font-semibold text-[32px] leading-10.5 ${isScrolled ? "text-black" : "text-white"}`}
              >
                Foody
              </p>
            </a>
          </div>
          {isLogin && (
            <div className="relative flex flex-row gap-4 md:gap-6 items-center justify-center">
              <div className="relative">
                <img
                  src={
                    isScrolled
                      ? "/images/common/cart-black.svg"
                      : "/images/common/cart-white.svg"
                  }
                  className="w-7 h-7 md:w-8 md:h-8"
                  alt="cart-white"
                />
                <div className="absolute bg-primary-100 w-5 h-5 -right-1 -top-1.5 rounded-full flex items-center justify-center">
                  <span className="text-[12px] text-neutral-25">1</span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div
                    id="profile-menu"
                    className="flex flex-row items-center justify-center gap-4 cursor-pointer"
                  >
                    <Avatar className="w-10 h-10 md:h-12 md:w-12">
                      <AvatarImage
                        src="/images/common/profile-dummy.svg"
                        alt="profile"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block font-semibold text-lg leading-8 -tracking-[0.02em]">
                      John Doe
                    </span>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  sideOffset={12}
                  className="w-49.25 rounded-3xl p-4 shadow-lg"
                >
                  {/* USER INFO */}
                  <div className="flex items-center gap-3 pb-3 border-b border-neutral-200">
                    <Avatar className="w-9 h-9">
                      <AvatarImage
                        src="/images/common/profile-dummy.svg"
                        alt="profile"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <span className="font-bold text-base leading-7.5 -tracking-[0.02em]">
                      John Doe
                    </span>
                  </div>
                  {/* MENU ITEMS */}

                  <div className="pt-3 flex flex-col gap-0">
                    <DropdownMenuItem className="gap-3 cursor-pointer rounded-xl">
                      <SlLocationPin className="text-xl text-neutral-700" />
                      <span className="text-sm leading-7 font-medium">
                        Delivery Address
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="gap-3 cursor-pointer rounded-xl">
                      <IoDocumentTextOutline className="text-xl text-neutral-700" />
                      <span className="text-sm leading-7 font-medium">
                        My Orders
                      </span>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="gap-3 cursor-pointer rounded-xl text-primary-100 ">
                      <RiLogoutCircleLine className="text-xl" />
                      <span className="text-sm leading-7 font-medium">
                        Logout
                      </span>
                    </DropdownMenuItem>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          {!isLogin && (
            <div className="md:flex flex-row gap-4">
              <button
                onClick={() => navigate("/auth", { state: { tab: "signin" } })}
                className={`cursor-pointer py-2 px-5 md:h-12 md:w-40.75 md:px-2 md:py-2 rounded-[100px] ring-2 ring-inset ring-neutral-300 font-bold text-[16px] leading-7.5 -tracking-[0.02em] ${isScrolled ? "text-black" : "text-white"}`}
              >
                Sign In
              </button>
              <span className="md:hidden">&nbsp;&nbsp;&nbsp;</span>
              <button
                onClick={() => navigate("/auth", { state: { tab: "signup" } })}
                className={`cursor-pointer py-2 px-5 md:h-12 ${isScrolled ? "bg-black text-white" : "bg-white"} text-black md:w-40.75 md:px-2 md:py-2 rounded-[100px]  font-bold text-[16px] leading-7.5 -tracking-[0.02em]`}
              >
                Sign Up
              </button>
            </div>
          )}
        </>
      </header>
    </>
  );
};
export default Header;
