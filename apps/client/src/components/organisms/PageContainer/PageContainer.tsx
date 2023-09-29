import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { css } from "../../../../styled-system/css";

import Widget from "../../atoms/Widget/Widget";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";


function PageContainer() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={container}>
      <Header />
      <Widget />
      <Outlet />
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

export default PageContainer;
