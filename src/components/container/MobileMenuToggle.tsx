type MobileMenuToggleProps = {
  open: boolean;
  onToggle: () => void;
};

export default function MobileMenuToggle({
  open,
  onToggle,
}: MobileMenuToggleProps) {
  return (
    <button
      className="md:hidden z-50"
      onClick={onToggle}
      aria-label="Toggle mobile menu"
    >
      {open ? (
        <div className="button-close md:hidden">
          <img
            src="/images/common/menu-close.svg"
            className="w-6 h-6 z-50"
            alt=""
          />
        </div>
      ) : (
        <div className="button-menu md:hidden">
          <img src="/images/common/menu.svg" className="w-6 h-6 z-50" alt="" />
        </div>
      )}
    </button>
  );
}
