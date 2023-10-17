import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { css } from "../../../../styled-system/css";

import Widget from "../../atoms/Widget/Widget";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function PageContainer() {
  const { pathname } = useLocation();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  //show content after 1s
  useEffect(() => {
    setShowContent(false);
    setTimeout(() => {
      setShowContent(true);
    }, 100);
  }, [pathname]);

  return (
    <div className={container}>
      <Header />

      <div className={showContent ? fadeIn : hidden}>
        <Widget />
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

const container = css({
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "stretch",
  minHeight: "100vh",
});

const hidden = css({
  opacity: 0,
});

const fadeIn = css({
  opacity: 1,
  transition: "opacity 0.5s ease-in-out ",
});

export default PageContainer;
