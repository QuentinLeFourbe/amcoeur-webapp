import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { css } from "../../../../styled-system/css";

type PageContainerProps = {
  children: React.ReactNode;
};

function PageContainer({ children }: PageContainerProps) {
  return (
    <div className={container}>
      <Header />
      {children}
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
