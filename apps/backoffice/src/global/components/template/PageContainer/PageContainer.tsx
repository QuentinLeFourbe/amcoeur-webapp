import { useOutlet } from "react-router-dom";
import Header from "../../organisms/Header/Header";
import Footer from "../../organisms/Footer/Footer";
import { css } from "../../../../../styled-system/css";
import { useCurrentUser, useLogout } from "../../../hooks/useUser";

function PageContainer() {
  const outlet = useOutlet();
  const { mutate: logout } = useLogout();
  const { data: { data: currentUser } = {} } = useCurrentUser();

  const handleLogout = () => {
    try {
      logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={container}>
      <Header
        isUserLoggedIn={!!currentUser}
        isUserActive={currentUser?.isActive || false}
        logout={handleLogout}
      />
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
