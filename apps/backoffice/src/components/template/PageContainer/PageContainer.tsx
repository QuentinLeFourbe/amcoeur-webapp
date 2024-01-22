import { useNavigate, useOutlet } from "react-router-dom";
import Header from "../../organisms/Header/Header";
import { css } from "../../../../styled-system/css";
import Footer from "../../organisms/Footer/Footer";
import useUser from "../../../hooks/useUser";
import { logout } from "../../../api/users";

function PageContainer() {
  const outlet = useOutlet();
  const { user, logoutUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      logoutUser();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={container}>
      <Header isUserLoggedIn={!!user} logout={handleLogout} />
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
