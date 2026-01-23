import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Favorites from "./components/pages/Favorites";
import ScrollToTop from "./components/common/ScrollToTop";

import { TrailerModalProvider } from "./context/TrailerModalContext";
import AuthPage from "./pages/AuthPage";
import Details from "./pages/Details";
import Category from "./pages/Category";
import MyCart from "./pages/MyCart";
import Checkout from "./pages/Checkout";
import Success from "./pages/Success";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TrailerModalProvider>
          <ScrollToTop />

          <Routes>
            <Route element={<App />}>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/details/:id" element={<Details />} />
              <Route path="/category" element={<Category />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/mycart" element={<MyCart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
            </Route>
          </Routes>

          <Toaster position="top-center" />
        </TrailerModalProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
