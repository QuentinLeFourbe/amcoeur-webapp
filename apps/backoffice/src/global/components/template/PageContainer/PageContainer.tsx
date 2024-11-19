import { useOutlet } from "react-router-dom";

import { css } from "../../../../../styled-system/css";
import { useCurrentUser, useUserContext } from "../../../hooks/useUser";
import { checkUserPermissions } from "../../../utils/user";
import Footer from "../../organisms/Footer/Footer";
import Header from "../../organisms/Header/Header";

function PageContainer() {
  const outlet = useOutlet();
  const { logout } = useUserContext() || {};
  const { data: { data: currentUser } = {} } = useCurrentUser();

  return (
    <div className={container}>
      <Header
        isUserLoggedIn={!!currentUser}
        isUserInactive={
          !currentUser || checkUserPermissions(currentUser, ["inactive"])
        }
        isUserAdmin={checkUserPermissions(currentUser, ["admin"]) || false}
        logout={() => logout?.()}
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
