import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getCodeVerifier } from "../utils/auth";
import { getAccessToken } from "../api/users";
import { useUserContext } from "../hooks/useUser";

type TokenResponse = {
  access_token: string;
  refresh_token: string;
  id_token: string;
};

function LoginRedirect() {
  const [searchParams] = useSearchParams();
  const { setAccessToken } = useUserContext() || {};
  const code = searchParams.get("code");

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
        } else {
          throw Error("No access token from token request");
        }
      } catch (err) {
        console.error(err);
      }
    };
    getAuthToken();
  }, []);

  return <div>Redirection en cours...</div>;
}

export default LoginRedirect;
