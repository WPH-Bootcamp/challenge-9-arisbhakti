import { div } from "framer-motion/client";
import { toast } from "sonner";

type ToastVariant = "success" | "remove";

type ShowToastOptions = {
  message: string;
  variant?: ToastVariant;
  durationMs?: number;
};

export function showAppToast({
  message,
  variant = "success",
  durationMs = 1500,
}: ShowToastOptions) {
  toast.custom(
    (t) => (
      <div
        className="
        pl-50
        md:pt-50
        pt-30
                fixed
          left-1/4
          top-1/4
          md:top-[52%]
          -translate-x-1/2
          z-9999
          md:left-[calc(50%+72px)]
          
              "
      >
        <div
          className="
                  flex items-center gap-3
        px-6 py-3
        rounded-2xl
        bg-neutral-200/30 backdrop-blur-sm
        border border-white/10
        shadow-[0_10px_30px_rgba(0,0,0,0.35)]
        text-white
        whitespace-nowrap
        max-w-[90vw]
        min-w-[320px]
        md:w-132.75
          md:h-13
        justify-center
                "
          role="status"
          onClick={() => toast.dismiss(t)}
        >
          {/* ICON */}
          <span
            className="
                    w-6 h-6
                    rounded-full
                    flex items-center justify-center
                    shrink-0
                    bg-white/20
                  "
          >
            {variant === "success" ? (
              // CHECK ICON
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M20 6L9 17l-5-5"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              // REMOVE / X ICON
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </span>

          {/* MESSAGE */}
          <p className="text-[14px] md:text-[16px] font-semibold">{message}</p>
        </div>
      </div>
    ),
    {
      duration: durationMs,
    }
  );
}
