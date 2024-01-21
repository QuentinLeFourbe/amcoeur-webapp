import { useOutlet } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../../organisms/Header/Header";
import { css } from "../../../../styled-system/css";
import Footer from "../../organisms/Footer/Footer";

function PageContainer() {
  const outlet = useOutlet();

  const authToken = Cookies.get("authToken");

  return (
    <div className={container}>
      <Header isUserLoggedIn={!!authToken} />
      {outlet}
      <Footer />
    </div>
  );
}

export default PageContainer;

const container = css({
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexFlow: "column nowrap",
  gap: "2rem",
});
