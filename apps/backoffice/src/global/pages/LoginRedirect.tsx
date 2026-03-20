import { ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { css } from "../../../styled-system/css";
import { applyAuthToken } from "../api/axios";
import AmcoeurLogo from "../assets/icons/amcoeur_logo_light.webp";
import ErrorLabel from "../components/atoms/ErrorLabel/ErrorLabel";
import Spinner from "../components/atoms/Spinner/Spinner";
import useCurrentUrl from "../hooks/useCurrentUrl";
import { getAndStoreToken } from "../utils/auth";

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
          // Petit délai artificiel pour une transition plus fluide visuellement
          setTimeout(() => navigate("/", { replace: true }), 800);
        }
      } catch {
        setError("Erreur lors de la récupération de votre session.");
      }
    };
    getToken();
  }, [currentUrl, navigate]);

  return (
    <div className={fullScreenContainer}>
      {/* Background Glow */}
      <div className={pinkGlowStyle} />

      <div className={contentStyle}>
        <img src={AmcoeurLogo} alt="Amcoeur Logo" className={logoStyle} />
        
        <div className={statusWrapperStyle}>
          {!error ? (
            <>
              <Spinner size={48} color="amcoeurRose" />
              <div className={textWrapperStyle}>
                <h1 className={titleStyle}>Sécurisation de la session</h1>
                <p className={subtitleStyle}>Vérification de vos identifiants en cours...</p>
              </div>
            </>
          ) : (
            <div className={errorWrapperStyle}>
              <ShieldAlert size={48} className={css({ color: "#ef4444", marginBottom: "1.5rem" })} />
              <ErrorLabel>{error}</ErrorLabel>
              <button 
                onClick={() => navigate("/login")} 
                className={retryButtonStyle}
              >
                Retour à la connexion
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginRedirect;

const fullScreenContainer = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  width: "100%",
  backgroundColor: "amcoeurDark",
  position: "relative",
  overflow: "hidden",
});

const pinkGlowStyle = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  height: "500px",
  backgroundColor: "rgba(225, 29, 72, 0.05)",
  borderRadius: "full",
  filter: "blur(100px)",
  zIndex: 0,
});

const contentStyle = css({
  position: "relative",
  zIndex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "3rem",
});

const logoStyle = css({
  width: "80px",
  height: "80px",
  objectFit: "contain",
  filter: "grayscale(1) brightness(2)",
  opacity: 0.5,
});

const statusWrapperStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "2rem",
  textAlign: "center",
});

const textWrapperStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});

const titleStyle = css({
  fontSize: "xl",
  fontWeight: "bold",
  color: "white",
  letterSpacing: "wide",
});

const subtitleStyle = css({
  fontSize: "sm",
  color: "amcoeurPale",
  opacity: 0.8,
});

const errorWrapperStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: "300px",
});

const retryButtonStyle = css({
  marginTop: "2rem",
  padding: "0.75rem 1.5rem",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  color: "white",
  borderRadius: "10px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  fontSize: "sm",
  cursor: "pointer",
  transition: "all 0.2s",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    transform: "translateY(-1px)",
  }
});
