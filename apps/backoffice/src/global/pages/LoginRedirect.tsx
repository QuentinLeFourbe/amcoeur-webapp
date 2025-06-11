import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAndStoreMicrosoftToken } from "../utils/auth";
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
        const token = await getAndStoreMicrosoftToken({
          clientId: import.meta.env.VITE_MS_CLIENT_ID,
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
