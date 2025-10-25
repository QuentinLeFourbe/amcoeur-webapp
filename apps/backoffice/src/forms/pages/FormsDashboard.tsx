import { Outlet } from "react-router-dom";

import { css } from "../../../styled-system/css";

function FormsDashboard() {
  return (
    <div
      className={css({
        display: "flex",
        flexFlow: "column nowrap",
        margin: "0 10vw",
        gap: "16px",
      })}
    >
      <Outlet />
    </div>
  );
}

export default FormsDashboard;
