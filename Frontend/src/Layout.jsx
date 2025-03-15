import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import "./App.css";

function Layout() {
  const location = useLocation();
  const hideHeaderFooter = location.pathname === "/login" || location.pathname.startsWith("/dashboard");

  useEffect(() => {
    const loadChatbot = () => {
      console.log("Checking if BotPress is available...");
      if (window.botpress) {
        console.log("BotPress Loaded! Initializing...");
        window.botpress.init({
          botId: "828919f3-986c-4ddb-8bbd-4c7fcd2f8a98",
          clientId: "0360f5b3-c621-4fc1-805a-dda2d9c7d8a2",
          configuration: {
            botName: "MLense",
            botAvatar: "https://cdn-icons-png.flaticon.com/512/4712/4712037.png",
            botDescription: "Your AI Assistant for all queries ",
            color: "#578bdd",
            variant: "solid",
            themeMode: "light",
            fontFamily: "rubik",
            radius: 4,            
            showPoweredBy: false, 
          }
        });
      } else {
        console.error(" BotPress WebChat script not loaded yet.");
      }
    };

    const injectScript = (id, src, callback = null) => {
      if (!document.getElementById(id)) {
        console.log(`Injecting script: ${src}`);
        const script = document.createElement("script");
        script.id = id;
        script.src = src;
        script.async = true;
        if (callback) script.onload = callback;
        document.body.appendChild(script);
      } else {
        console.log(`Script already exists: ${src}`);
        if (callback) callback();
      }
    };

    injectScript("botpress-script", "https://cdn.botpress.cloud/webchat/v2.2/inject.js", loadChatbot);
  }, []);

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <Outlet />
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default Layout;
