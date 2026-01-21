import { useEffect, useState } from "react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // cleanup (WAJIB)
    return () => window.removeEventListener("scroll", handleScroll);
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
                  <span className="text-[12px]">1</span>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center gap-4 ">
                <img
                  src="/images/common/profile-dummy.svg"
                  className="w-10 h-10 md:h-12 md:w-12 rounded-full"
                  alt=""
                />
                <span className="hidden md:block font-semibold text-lg leading-8 -tracking-[0.02em]">
                  John Doe
                </span>
              </div>
            </div>
          )}
          {!isLogin && (
            <div className="hidden md:flex flex-row gap-4">
              <button
                className={`h-12 w-40.75 px-2 py-2 rounded-[100px] ring-2 ring-inset ring-neutral-300 font-bold text-[16px] leading-7.5 -tracking-[0.02em] ${isScrolled ? "text-black" : "text-white"}`}
              >
                Sign In
              </button>
              <button
                className={`h-12 ${isScrolled ? "bg-black text-white" : "bg-white"} text-black w-40.75 px-2 py-2 rounded-[100px]  font-bold text-[16px] leading-7.5 -tracking-[0.02em]`}
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
