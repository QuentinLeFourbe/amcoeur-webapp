import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { css } from "../../../styled-system/css";
import { getAccessToken } from "../api/users";
import ErrorLabel from "../components/atoms/ErrorLabel/ErrorLabel";
import { useUserContext } from "../hooks/useUser";
import { getCodeVerifier } from "../utils/auth";

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
  const userPreviousPage = searchParams.get("state");
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
          if (userPreviousPage && !userPreviousPage.endsWith("/login")) {
            navigate(userPreviousPage, { replace: true });
          } else {
            navigate("/", { replace: true });
          }
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
      {error && (
        <div>
          <ErrorLabel>{error}</ErrorLabel>
        </div>
      )}
    </div>
  );
}

export default LoginRedirect;
