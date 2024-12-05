import { useNavigate } from "react-router-dom";
import { css } from "../../../styled-system/css";
import Button from "../components/atoms/Button/Button";
import { useCurrentUser } from "../hooks/useUser";
import { checkUserPermissions } from "../utils/user";
import { microsoftLogin } from "../utils/auth";

function Login() {
  const { currentUser, isSuccess } = useCurrentUser();
  const navigate = useNavigate();

  if (currentUser && isSuccess) {
    navigate(
      checkUserPermissions(currentUser, ["inactive"]) ? "/inactive" : "/",
      { replace: true },
    );
  }

  return (
    <div className={container}>
      <p>
        Bonjour, la connexion s&apos;effectue via votre adresse email Microsoft
        (Outlook, Hotmail, Live). Une fois connectée, un email sera envoyé au
        responsable afin de valider votre compte. Merci de vous rapprocher de
        Roger ou de Quentin.
      </p>
      <Button type="button" onClick={microsoftLogin}>
        Se connecter avec Outlook
      </Button>
    </div>
  );
}

export default Login;

const container = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "2rem",
});
