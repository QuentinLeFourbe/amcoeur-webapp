import { useOutlet } from "react-router";

import { css } from "../../../../../styled-system/css";
import Footer from "../../organisms/Footer/Footer";

function StaticPageContainer() {
  const outlet = useOutlet();

  return (
    <div className={container}>
      {outlet}
      <Footer />
    </div>
  );
}

export default StaticPageContainer;

const container = css({
  width: "100vw",
  minHeight: "100vh",
  display: "flex",
  flexFlow: "column nowrap",
  backgroundColor: "amcoeurDark",
});
