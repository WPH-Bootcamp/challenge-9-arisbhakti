import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import MobileMenuToggle from "../container/MobileMenuToggle";
import MobileMenu from "../container/MobileMenu";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    // cleanup (WAJIB)
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (value: string) => {
    setKeyword(value);
    navigate(`/search?q=${encodeURIComponent(value)}`);
  };

  const clearSearch = () => {
    setKeyword("");
    navigate("/search"); // atau "/search" kalau kamu mau tetap di search page
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 h-16 md:h-22.5 flex justify-between items-center px-4 md:px-35 transition-all duration-300 ${
          isScrolled ? "backdrop-blur-2xl bg-black/40" : "bg-transparent"
        }`}
      >
        {!isSearching && (
          <>
            <div className="flex flex-row gap-20">
              <a
                href="#home"
                className="flex flex-row  gap-[7.11px] cursor-pointer "
                id="home-button"
              >
                <img
                  src="/images/common/box.svg"
                  className="w-[23.33px] h-[21.82px] md:w-[33.33px] md:h-[31.18px]"
                  alt="Your Logo"
                />
                <p className="menu-hover font-semibold text-[19.91px] leading-[24.9px] tracking-[-0.8px] md:text-[28.44px] md:leading-[35.6px] md:tracking-[-0.04em]">
                  Movie
                </p>
              </a>

              <nav className="hidden md:flex flex-row">
                <ul className="flex gap-12 items-center h-full">
                  <li>
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        `p-2 menu-hover text-base leading-7.5 ${
                          isActive ? "text-primary-300 font-bold" : "text-white"
                        }`
                      }
                    >
                      Home
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/favorites"
                      className={({ isActive }) =>
                        `p-2 menu-hover text-base leading-7.5 ${
                          isActive ? "text-primary-300 font-bold" : "text-white"
                        }`
                      }
                    >
                      Favorites
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="relative hidden md:block">
              <img
                src="/images/common/search_vector_grey.svg"
                alt="search"
                className="absolute left-4 top-4 w-6 h-6 z-50"
              />
              {keyword && (
                <img
                  src="/images/common/close.svg"
                  alt="close"
                  id="clearSearchDesktop"
                  onClick={clearSearch}
                  className="absolute right-4 top-4 w-6 h-6 cursor-pointer z-50"
                />
              )}

              <input
                id="searchInput"
                name="searchInput"
                type="text"
                value={keyword}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search Movie"
                className="w-60.75 h-14 rounded-2xl pl-13 text-[16px] bg-neutral-950/60 backdrop-blur-md
  focus:outline-none focus:ring-2 focus:ring-white leading-7.5 text-neutral-300"
              />
            </div>

            <div className="flex flex-row items-center gap-6 justify-center md:hidden">
              {!isMobileMenuOpen && (
                <img
                  src="/images/common/search_vector.svg"
                  className="w-4.5 h-4.5 z-50"
                  alt=""
                  onClick={() => setIsSearching(true)}
                />
              )}
              <MobileMenuToggle
                open={isMobileMenuOpen}
                onToggle={() => setIsMobileMenuOpen((v) => !v)}
              />
            </div>
          </>
        )}
        {isSearching && (
          <div className="w-full flex items-center justify-center">
            <img
              src="/images/common/arrow-left.svg"
              className="w-6 h-6 mr-4 cursor-pointer"
              alt="back"
              onClick={() => {
                setIsSearching(false);
              }}
            />
            <div className="relative flex-1">
              <img
                src="/images/common/search_vector_grey.svg"
                alt="search"
                className="absolute left-4 top-3 w-5 h-5"
              />
              {keyword && (
                <img
                  id="clearSearchMobile"
                  src="/images/common/close.svg"
                  alt="close"
                  onClick={clearSearch}
                  className="absolute right-4 top-2.5 w-6 h-6 cursor-pointer z-50"
                />
              )}

              <input
                id="searchInput"
                name="searchInput"
                type="text"
                value={keyword}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search Movie"
                className="w-full h-11 rounded-2xl pl-13 text-[16px] bg-neutral-950/60 border border-neutral-800
  focus:outline-none focus:ring-1 focus:ring-white leading-7.5 text-neutral-300"
              />
            </div>
          </div>
        )}
      </header>
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};
export default Header;
