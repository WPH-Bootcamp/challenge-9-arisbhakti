import { Outlet } from "react-router-dom";

import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-hidden">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
}
