import { Button } from "@/components/ui/button";

type Props = {
  cartCount: number;
  totalPrice: number;
};

export default function CheckoutBottomBar({ cartCount, totalPrice }: Props) {
  const isVisible = cartCount > 0;
  if (!isVisible) return null;

  return (
    <div className="fixed bottom-1.5 left-0 right-0 z-50 w-full h-16 md:bottom-3">
      <div className="flex items-center justify-between px-4 md:px-30 shadow-[0_-12px_24px_-12px_rgba(0,0,0,0.18)] bg-white py-2  ">
        <div className="flex flex-col gap-0.5">
          <div className="flex flex-row gap-1 items-center">
            <img
              src="/images/common/cart-black.svg"
              alt="cart"
              className="w-6 h-6 "
            />
            <span className="text-sm leading-7 -tracking-[0.02em] font-normal">
              {cartCount} Items
            </span>
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-extrabold text-base leading-7.5 md:text-xl md:leading-8.5">
              Rp{totalPrice}
            </span>
          </div>
        </div>

        <Button
          className="
    h-10 md:h-11
    p-2
    w-40 md:w-60
    rounded-[100px]
    bg-primary-100 text-white
    font-bold
    text-[14px] leading-7 -tracking-[0.02em]
    md:text-[16px] md:leading-7.5 md:-tracking-[0.02em]
  "
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
