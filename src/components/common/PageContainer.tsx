import type { ReactNode } from "react";

export default function PageContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`container mx-auto px-4 md:px-8 lg:px-10 ${className}`}>
      {children}
    </div>
  );
}
