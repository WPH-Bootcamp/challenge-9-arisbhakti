import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // selalu balik ke atas setiap ganti route
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    // kalau TS kamu protes "instant", ganti jadi behavior: "auto"
  }, [pathname]);

  return null;
}
