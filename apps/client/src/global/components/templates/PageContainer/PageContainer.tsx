import { useEffect } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import { CSSTransition, SwitchTransition } from "react-transition-group";

import { css } from "../../../../../styled-system/css";
import { pagesRoutes } from "../../../../routes";
import Widget from "../../atoms/Widget/Widget";
import Footer from "../../organisms/Footer/Footer";
import Header from "../../organisms/Header/Header";

function PageContainer() {
  const { pathname } = useLocation();
  const currentOutlet = useOutlet();
  const { nodeRef } =
    pagesRoutes.find((route) => route.path === location.pathname) || {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={container}>
      <Header />

      <SwitchTransition>
        <CSSTransition
          timeout={200}
          key={location.pathname}
          nodeRef={nodeRef}
          in={true}
          appear
          classNames={"pages"}
        >
          <div ref={nodeRef} className={contentContainer}>
            {currentOutlet}
          </div>
        </CSSTransition>
      </SwitchTransition>
      <Widget />

      <Footer />
    </div>
  );
}

const container = css({
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "stretch",
  minHeight: "100vh",
  gap: "64px",

  "& .pages-enter": {
    opacity: 0,
  },
  "& .pages-enter-active": {
    opacity: 1,
    animationFillMode: "forwards",
  },
  "& .pages-exit": {
    opacity: 1,
  },
  "& .pages-exit-active": {
    opacity: 0,
    animationFillMode: "forwards",
  },

  "& .pages-appear": {
    opacity: 0,
  },
  "& .pages-appear-active": {
    opacity: 1,
    animationFillMode: "forwards",
  },
});

const contentContainer = css({
  transition: "all 0.2s ease-in-out",
});

export default PageContainer;
