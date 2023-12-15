import { useOutlet } from "react-router-dom";
import Header from "../../organisms/Header/Header";
import { css } from "../../../../styled-system/css";

function PageContainer() {
  const outlet = useOutlet();

  return (
    <div className={container}>
      <Header />
      {outlet}
    </div>
  );
}

export default PageContainer;

const container = css({
  width: "100vw",
  height: "100vh",
  display: "flex",
  flexFlow: "column nowrap",
});
