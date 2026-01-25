import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTheme } from "./features/theme/themeSlice";
import { AnimatePresence, motion } from "framer-motion";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import CheckoutBottomBar from "./components/popup/CheckoutBottomBar";

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  //const theme = useSelector((state: RootState) => state.theme.mode);
  const hideCheckoutBar =
    location.pathname === "/mycart" || location.pathname === "/checkout";

  useEffect(() => {
    const isHome = location.pathname === "/" || location.pathname === "/home";
    dispatch(setTheme(isHome ? "light" : "dark"));
  }, [dispatch, location.pathname]);

  const topLevelKey = location.pathname.split("/")[1] || "home";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={topLevelKey}
            initial={{ opacity: 1, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      {!hideCheckoutBar && <CheckoutBottomBar />}
    </div>
  );
}
