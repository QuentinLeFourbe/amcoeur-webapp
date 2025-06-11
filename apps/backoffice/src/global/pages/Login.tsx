import { css } from "../../../styled-system/css";
import Button from "../components/atoms/Button/Button";
import { getMicrosoftLoginUrl } from "../utils/auth";

function Login() {
  const microsoftLogin = async () => {
    try {
      const loginUrl = await getMicrosoftLoginUrl({
        clientId: import.meta.env.VITE_MS_CLIENT_ID,
        redirectUri: `${window.location.origin}/login/redirect`,
      });
      window.location.href = loginUrl.toString();
    } catch (e) {
      console.error(e);
    }
  };

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
