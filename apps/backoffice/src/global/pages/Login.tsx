import { useNavigate } from "react-router-dom";
import { css } from "../../../styled-system/css";
import Button from "../components/atoms/Button/Button";
import { useCurrentUser } from "../hooks/useUser";
import { checkUserPermissions } from "../utils/user";
import { storeCodeVerifier } from "../utils/auth";
import { generateCodeChallenge } from "../utils/crypto";

function Login() {
  const { currentUser, isSuccess } = useCurrentUser();
  const navigate = useNavigate();

  if (currentUser && isSuccess) {
    navigate(
      checkUserPermissions(currentUser, ["inactive"]) ? "/inactive" : "/",
      { replace: true },
    );
  }

  const microsoftLogin = async () => {
    try {
      const codeVerifier = storeCodeVerifier();
      const codeChallenge = await generateCodeChallenge(codeVerifier);

      const loginUrl =
        "https://login.microsoftonline.com/consumers/oauth2/v2.0/authorize?" +
        `client_id=${import.meta.env.VITE_MS_CLIENT_ID}` +
        "&scope=openid" +
        "&response_type=code" +
        `&redirect_uri=https://localhost:3000/administration/login/redirect
` +
        `&code_challenge=${codeChallenge}` +
        "&code_challenge_method=S256";
      window.location.href = loginUrl;
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={container}>
      <p>
        Bonjour, la connexion s&apos;effectue via Facebook. Une fois connectée,
        un email sera envoyé au responsable afin de valider votre compte. Merci
        de vous rapprocher de Roger ou de Quentin.
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
