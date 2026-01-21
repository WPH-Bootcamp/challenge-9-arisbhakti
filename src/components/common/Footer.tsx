const Footer = () => {
  return (
    <footer
      className={`top-0 w-full z-50 h-30 flex flex-col md:flex-row md:justify-between md:items-center items-start justify-center gap-3 md:gap-0 px-4 md:px-35 transition-all duration-300  border-t border-neutral-800 `}
    >
      <div className="flex flex-row items-center justify-center">
        <a
          href="#home"
          className="flex flex-row  gap-[7.11px] cursor-pointer "
          id="home-button"
        >
          <img
            src="/images/common/box.svg"
            className="w-[23.33px] h-[21.82px] md:w-[33.33px] md:h-[31.18px] "
            alt="Your Logo"
          />
          <p className="menu-hover font-semibold text-[19.91px] leading-[24.9px] tracking-[-0.8px] md:text-[28.44px] md:leading-[35.6px] md:tracking-[-0.04em]">
            Movie
          </p>
        </a>
      </div>
      <span className="text-[12px] md:text-[16px] leading-6 md:leading-7.5 text-neutral-600">
        Copyright ©2025 Movie Explorer
      </span>
    </footer>
  );
};
export default Footer;
