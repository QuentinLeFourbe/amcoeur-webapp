import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { css } from "../../../../styled-system/css";
import { Outlet } from "react-router-dom";

function PageContainer() {
  return (
    <div className={container}>
      <Header />
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
