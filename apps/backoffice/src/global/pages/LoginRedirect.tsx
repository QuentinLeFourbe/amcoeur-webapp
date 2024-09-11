import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCodeVerifier } from "../utils/auth";
import { getAccessToken } from "../api/users";
import { useUserContext } from "../hooks/useUser";
import ErrorLabel from "../components/atoms/ErrorLabel/ErrorLabel";
import { css } from "../../../styled-system/css";

type TokenResponse = {
  access_token: string;
  refresh_token: string;
  id_token: string;
};

function LoginRedirect() {
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");
  const { setAccessToken } = useUserContext() || {};
  const code = searchParams.get("code");
  const navigate = useNavigate();

  if (!setAccessToken) {
    throw Error("No user context available");
  }

  useEffect(() => {
    const getAuthToken = async () => {
      try {
        const codeVerifier = getCodeVerifier();
        const { data } = await getAccessToken(code || "", codeVerifier || "");
        const tokenResponse = data as TokenResponse;
        if (tokenResponse) {
          setAccessToken(tokenResponse.id_token);
          navigate("/", { replace: true });
        } else {
          throw Error("No access token from token request");
        }
      } catch (err) {
        setError("Erreur lors de la récupation du jeton.");
        console.error(err);
      }
    };
    getAuthToken();
  }, []);

  return (
    <div
      className={css({
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
      })}
    >
      <p>Redirection en cours...</p>
      {error && <ErrorLabel>{error}</ErrorLabel>}
    </div>
  );
}

export default LoginRedirect;
