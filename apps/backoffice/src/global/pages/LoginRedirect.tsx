import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAndStoreToken } from "../utils/auth";
import ErrorLabel from "../components/atoms/ErrorLabel/ErrorLabel";
import { css } from "../../../styled-system/css";
import useCurrentUrl from "../hooks/useCurrentUrl";
import { applyAuthToken } from "../api/axios";

function LoginRedirect() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const currentUrl = useCurrentUrl();

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getAndStoreToken({
          microsoftClientId: import.meta.env.VITE_MS_CLIENT_ID,
          googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          googleClientSecret: import.meta.env.VITE_GOOGLE_CLIENT_NOT_SO_SECRET,
          currentUrl,
        });
        applyAuthToken();
        if (token) {
          navigate("/", { replace: true });
        }
      } catch (err) {
        setError("Erreur lors de la récupation du jeton.");
        console.error(err);
      }
    };
    getToken();
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
