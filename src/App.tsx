import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "./features/theme/themeSlice";
import type { RootState } from "./app/store";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import CheckoutBottomBar from "./components/popup/CheckoutBottomBar";

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  //const theme = useSelector((state: RootState) => state.theme.mode);
  const cartCount = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.qty, 0),
  );
  const totalPrice = useSelector((state: RootState) =>
    state.cart.items.reduce((sum, item) => sum + item.price * item.qty, 0),
  );

  useEffect(() => {
    const isHome = location.pathname === "/" || location.pathname === "/home";
    dispatch(setTheme(isHome ? "light" : "dark"));
  }, [dispatch, location.pathname]);

  // useEffect(() => {
  //   document.documentElement.classList.toggle("dark", theme === "dark");
  // }, [theme]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-hidden">
        <Outlet />
      </main>
      <Footer />
      <CheckoutBottomBar cartCount={cartCount} totalPrice={totalPrice} />
    </div>
  );
}
