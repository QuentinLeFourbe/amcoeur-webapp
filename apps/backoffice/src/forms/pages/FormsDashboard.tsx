import { Outlet, useLocation, useNavigate } from "react-router-dom";
import NavigationBar from "../../global/components/molecules/NavigationBar/NavigationBar";
import { css } from "../../../styled-system/css";

function FormsDashboard() {
  const navigate = useNavigate();
  const location = useLocation(); 
  return (
    <div
      className={css({
        display: "flex",
        flexFlow: "column nowrap",
        margin: "0 10vw",
        gap: "16px",
      })}
    >
      <NavigationBar
        links={[
          { label: "Formulaires", onClick: () => navigate("/formulaires"), isActive: location.pathname === "/formulaires"},
          { label: "Questions", onClick: () => navigate("/formulaires/questions") , isActive: location.pathname === "/formulaires/questions"},
        ]}
      />
      <Outlet />
    </div>
  );
}

export default FormsDashboard;
