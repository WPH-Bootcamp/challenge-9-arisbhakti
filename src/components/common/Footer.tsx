const Footer = () => {
  return (
    <footer className="bg-[#1a1d29] text-white py-12 md:py-20 px-4 md:px-30">
      <div className="flex flex-wrap gap-y-6 md:gap-40 md:justify-around">
        {/* Left Section - Foody Info */}
        <div className="w-full md:w-[360px] flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/common/logo-foody.svg"
              className="w-10.5 h-10.5"
              alt="logo"
            />
            <span className="text-[32px] font-extrabold leading-7">Foody</span>
          </div>

          <p className="text-neutral-25 text-sm leading-7 -tracking-[0.02em]">
            Enjoy homemade flavors & chef's signature dishes, freshly prepared
            every day. Order online or visit our nearest branch.
          </p>

          <div className="flex flex-col gap-5">
            <h3 className="font-semibold text-sm leading-7 -tracking-[0.02em]">
              Follow on Social Media
            </h3>
            <div className="flex gap-3">
              <img
                src="/images/common/facebook.svg"
                alt="Facebook"
                className="h-10 w-10"
              />
              <img
                src="/images/common/instagram.svg"
                alt="Instagram"
                className="h-10 w-10"
              />
              <img
                src="/images/common/linkedin.svg"
                alt="Twitter"
                className="h-10 w-10"
              />
              <img
                src="/images/common/tiktok.svg"
                alt="LinkedIn"
                className="h-10 w-10"
              />
            </div>
          </div>
        </div>

        <div className="w-1/2  md:flex-1 flex flex-col">
          <h3 className="font-bold text-lg mb-4">Explore</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition text-sm"
              >
                All Food
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition text-sm"
              >
                Nearby
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition text-sm"
              >
                Discount
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition text-sm"
              >
                Best Seller
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition text-sm"
              >
                Delivery
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition text-sm"
              >
                Lunch
              </a>
            </li>
          </ul>
        </div>

        {/* Right Section - Help */}
        <div className="w-1/2  md:flex-1 ">
          <h3 className="font-bold text-lg mb-4">Help</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition text-sm"
              >
                How to Order
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition text-sm"
              >
                Payment Methods
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition text-sm"
              >
                Track My Order
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition text-sm"
              >
                FAQ
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition text-sm"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
