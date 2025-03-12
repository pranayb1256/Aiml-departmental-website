import { Outlet, useLocation } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import "./App.css";

function Layout() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/login" || location.pathname.startsWith("/dashboard");

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Outlet /> {/* This renders the current route's component */}
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default Layout;
