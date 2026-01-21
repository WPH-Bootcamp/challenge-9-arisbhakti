import { NavLink } from "react-router-dom";

const items: NavItem[] = [
  { label: "Home", route: "/" },
  { label: "Favorites", route: "/favorites" },
];

type NavItem = {
  label: string;
  route: string;
};

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
  items?: NavItem[];
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <nav
      aria-label="mobile"
      className={`mobile-menu h-screen w-screen md:hidden fixed inset-0 
    bg-black overflow-hidden z-40 pt-16
    transition-opacity duration-300
    ${
      isOpen
        ? "pointer-events-auto opacity-100"
        : "pointer-events-none opacity-0"
    }
  `}
    >
      <div className="flex flex-col gap-4 px-4 mt-6">
        {items.map((item) => (
          <NavLink
            key={item.route}
            to={item.route}
            onClick={onClose}
            className={({ isActive }) =>
              `font-semibold text-sm leading-7.5 p-2 transition-colors ${
                isActive
                  ? "text-primary-300 text-[18px]"
                  : "text-neutral-25 text-[16px]"
              }`
            }
          >
            <span className="">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
