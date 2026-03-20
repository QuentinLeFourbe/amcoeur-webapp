import { HeartHandshake,ShieldCheck } from "lucide-react";

import { css } from "../../../styled-system/css";
import AmcoeurLogo from "../assets/icons/amcoeur_logo_light.webp";
import AuthButton from "../components/atoms/AuthButton/AuthButton";
import { getGoogleLoginUrl, getMicrosoftLoginUrl } from "../utils/auth";

function Login() {
  const microsoftLogin = async () => {
    try {
      const loginUrl = await getMicrosoftLoginUrl({
        clientId: import.meta.env.VITE_MS_CLIENT_ID,
        redirectUri: `${window.location.origin}/login/redirect`,
      });
      window.location.href = loginUrl.toString();
    } catch {
      // ignore
    }
  };

  const googleLogin = async () => {
    try {
      const loginUrl = await getGoogleLoginUrl({
        clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        redirectUri: `${window.location.origin}/login/redirect`,
      });
      window.location.href = loginUrl.toString();
    } catch {
      // ignore
    }
  };

  return (
    <div className={fullScreenContainer}>
      {/* Background Glow */}
      <div className={pinkGlowStyle} />

      <div className={loginCardStyle}>
        <div className={headerStyle}>
          <img src={AmcoeurLogo} alt="Amcoeur Logo" className={logoStyle} />
          <h1 className={titleStyle}>Espace Bénévole</h1>
          <div className={dividerStyle} />
        </div>

        <div className={contentStyle}>
          <p className={welcomeTextStyle}>
            Bienvenue sur l&apos;espace de gestion du site de l&apos;association Amcoeur.
          </p>

          <div className={buttonGroupStyle}>
            <AuthButton
              variants={{ provider: "microsoft" }}
              onClick={microsoftLogin}
              label="Connexion avec Microsoft"
            />
            <AuthButton
              variants={{ provider: "google" }}
              onClick={googleLogin}
              label="Connexion avec Google"
            />
          </div>

          <div className={infoBoxStyle}>
            <div className={infoItemStyle}>
              <ShieldCheck size={24} className={css({ color: "amcoeurRose", flexShrink: 0 })} />
              <p>La validation de votre compte sera effectuée par un responsable après votre première connexion.</p>
            </div>
            <div className={infoItemStyle}>
              <HeartHandshake size={24} className={css({ color: "amcoeurRose", flexShrink: 0 })} />
              <p>En cas de difficulté, rapprochez-vous de Roger ou de Quentin.</p>
            </div>
          </div>
        </div>
      </div>
      
      <footer className={footerStyle}>
        Association Amcoeur © {new Date().getFullYear()} — Tous droits réservés
      </footer>
    </div>
  );
}

export default Login;

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
  padding: "2rem",
});

const pinkGlowStyle = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "600px",
  height: "600px",
  backgroundColor: "rgba(225, 29, 72, 0.05)",
  borderRadius: "full",
  filter: "blur(100px)",
  zIndex: 0,
});

const loginCardStyle = css({
  position: "relative",
  zIndex: 1,
  width: "100%",
  maxWidth: "480px",
  backgroundColor: "rgba(255, 255, 255, 0.02)",
  backdropFilter: "blur(10px)",
  borderRadius: "32px",
  border: "1px solid",
  borderColor: "rgba(255, 255, 255, 0.05)",
  padding: "3rem",
  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  display: "flex",
  flexDirection: "column",
  gap: "2.5rem",
});

const headerStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.5rem",
});

const logoStyle = css({
  width: "100px",
  height: "100px",
  objectFit: "contain",
  filter: "drop-shadow(0 0 10px rgba(225, 29, 72, 0.2))",
});

const titleStyle = css({
  fontSize: "2xl",
  fontWeight: "900",
  color: "white",
  textTransform: "uppercase",
  letterSpacing: "widest",
});

const dividerStyle = css({
  width: "40px",
  height: "4px",
  backgroundColor: "amcoeurRose",
  borderRadius: "full",
});

const contentStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "2rem",
});

const welcomeTextStyle = css({
  textAlign: "center",
  color: "amcoeurPale",
  fontSize: "md",
  lineHeight: "relaxed",
});

const buttonGroupStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "100%",
  "& button": {
    width: "100%!",
    justifyContent: "center!",
  }
});

const infoBoxStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1.25rem",
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  borderRadius: "16px",
  border: "1px solid rgba(255, 255, 255, 0.05)",
});

const infoItemStyle = css({
  display: "flex",
  gap: "0.75rem",
  alignItems: "flex-start",
  fontSize: "xs",
  color: "rgba(255, 255, 255, 0.5)",
  lineHeight: "1.4",
});

const footerStyle = css({
  marginTop: "2rem",
  fontSize: "xs",
  color: "rgba(255, 255, 255, 0.2)",
  zIndex: 1,
});
