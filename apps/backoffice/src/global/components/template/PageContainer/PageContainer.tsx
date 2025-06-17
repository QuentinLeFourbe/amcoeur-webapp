import { useOutlet } from "react-router-dom";
import Header from "../../organisms/Header/Header";
import Footer from "../../organisms/Footer/Footer";
import { css } from "../../../../../styled-system/css";
import { useCurrentUser } from "../../../hooks/useUser";
import { checkUserPermissions } from "../../../utils/user";
import { logout } from "../../../api/axios";
import Spinner from "../../atoms/Spinner/Spinner";
import ErrorLabel from "../../atoms/ErrorLabel/ErrorLabel";

function PageContainer() {
  const outlet = useOutlet();
  const {
    data: { data: currentUser } = {},
    isLoading,
    isSuccess,
    isError,
  } = useCurrentUser();

  return (
    <div className={container}>
      <Header
        isUserLoggedIn={!!currentUser}
        isUserInactive={
          !currentUser || checkUserPermissions(currentUser, ["inactive"])
        }
        isUserAdmin={checkUserPermissions(currentUser, ["admin"]) || false}
        logout={() => logout()}
      />
      {isLoading && (
        <div className={css({ margin: "auto" })}>
          <Spinner />
        </div>
      )}
      {isError && (
        <div className={css({ margin: "auto" })}>
          <ErrorLabel>
            Erreur lors de la récupération des informations utilisateurs
          </ErrorLabel>
        </div>
      )}
      {isSuccess && outlet}
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
