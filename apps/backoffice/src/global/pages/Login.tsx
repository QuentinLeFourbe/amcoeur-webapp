import { useNavigate } from "react-router-dom";
import axios from "axios";
import { css } from "../../../styled-system/css";
import Button from "../components/atoms/Button/Button";
import { useCurrentUser } from "../hooks/useUser";

function Login() {
  const { currentUser, isSuccess } = useCurrentUser();
  const navigate = useNavigate();
  if (currentUser && isSuccess) {
    navigate(currentUser.isActive ? "/" : "/inactive", { replace: true });
  }

  const facebookLogin = async () => {
    try {
      const response = await axios.get("/api/users/login/facebook");
      const loginUrl = response.data;
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
      <Button type="button" onClick={facebookLogin}>
        Se connecter avec Facebook
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
