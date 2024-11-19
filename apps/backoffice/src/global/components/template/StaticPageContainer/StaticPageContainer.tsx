import { useOutlet } from "react-router-dom";

import { css } from "../../../../../styled-system/css";
import Footer from "../../organisms/Footer/Footer";
import Header from "../../organisms/Header/Header";

function StaticPageContainer() {
  const outlet = useOutlet();

  return (
    <div className={container}>
      <Header />
      {outlet}
      <Footer />
    </div>
  );
}

export default StaticPageContainer;

const container = css({
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexFlow: "column nowrap",
  gap: "2rem",
});
