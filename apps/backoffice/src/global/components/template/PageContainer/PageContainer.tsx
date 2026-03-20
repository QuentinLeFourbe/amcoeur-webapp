import { useOutlet } from "react-router";

import { css } from "../../../../../styled-system/css";
import { logout } from "../../../api/axios";
import { useCurrentUser } from "../../../hooks/useUser";
import { checkUserPermissions } from "../../../utils/user";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";
import Spinner from "../../atoms/Spinner/Spinner";
import Sidebar from "../../organisms/Sidebar/Sidebar";

function PageContainer() {
  const outlet = useOutlet();
  const {
    data: { data: currentUser } = {},
    isLoading,
    isSuccess,
    isError,
  } = useCurrentUser();

  const isUserInactive = !currentUser || checkUserPermissions(currentUser, ["inactive"]);
  const isUserAdmin = checkUserPermissions(currentUser, ["admin"]) || false;

  return (
    <div className={containerStyle}>
      <div className={mainLayoutStyle}>
        {isSuccess && !isUserInactive && (
          <Sidebar 
            isUserInactive={isUserInactive} 
            isUserAdmin={isUserAdmin} 
            logout={() => logout()}
          />
        )}
        
        <main className={contentAreaStyle}>
          {isLoading && (
            <div className={centerStyle}>
              <Spinner color="amcoeurRose" />
            </div>
          )}
          {isError && (
            <div className={centerStyle}>
              <ErrorLabel>
                Erreur lors de la récupération des informations utilisateurs
              </ErrorLabel>
            </div>
          )}
          {isSuccess && outlet}
        </main>
      </div>
    </div>
  );
}

const containerStyle = css({
  width: "100%",
  height: "100vh",
  backgroundColor: "amcoeurDark",
  color: "white",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
});

const mainLayoutStyle = css({
  display: "flex",
  height: "100%",
  width: "100%",
});

const contentAreaStyle = css({
  flex: 1,
  overflowY: "auto",
  padding: "2.5rem",
  backgroundColor: "amcoeurDark",
});

const centerStyle = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
});

export default PageContainer;
