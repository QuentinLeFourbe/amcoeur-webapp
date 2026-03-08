import { css } from "../../../styled-system/css";
import { Clock, Mail, CheckCircle2, LogOut } from "lucide-react";
import AmcoeurLogo from "../assets/icons/amcoeur_logo_light.webp";
import { logout } from "../api/axios";

function InactiveAccount() {
  return (
    <div className={fullScreenContainer}>
      {/* Background Glow */}
      <div className={pinkGlowStyle} />

      <div className={cardStyle}>
        <div className={headerStyle}>
          <img src={AmcoeurLogo} alt="Amcoeur Logo" className={logoStyle} />
          <h1 className={titleStyle}>Compte en attente</h1>
          <div className={dividerStyle} />
        </div>

        <div className={contentStyle}>
          <div className={statusWrapperStyle}>
            <Clock size={48} className={css({ color: "amcoeurPale", animation: "pulse 2s infinite" })} />
            <p className={mainTextStyle}>
              Bonjour ! Votre compte a bien été créé, mais il est actuellement <strong>en attente d'activation</strong> par un administrateur.
            </p>
          </div>

          <div className={infoBoxStyle}>
            <div className={infoItemStyle}>
              <CheckCircle2 size={24} className={css({ color: "amcoeurRose", flexShrink: 0 })} />
              <p>Une notification a été envoyée aux responsables de l'association.</p>
            </div>
            <div className={infoItemStyle}>
              <Mail size={24} className={css({ color: "amcoeurRose", flexShrink: 0 })} />
              <p>Vous recevrez un accès complet dès que Roger ou Quentin auront validé votre profil.</p>
            </div>
          </div>

          <div className={css({ display: "flex", flexDirection: "column", gap: "1rem", alignItems: "center" })}>
            <p className={footerTextStyle}>
              Merci pour votre patience et pour votre engagement envers nos petits protégés.
            </p>
            <button onClick={() => logout()} className={logoutButtonStyle}>
              <LogOut size={16} />
              <span>Se déconnecter</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const logoutButtonStyle = css({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  padding: "0.5rem 1rem",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  color: "rgba(255, 255, 255, 0.4)",
  borderRadius: "8px",
  border: "1px solid rgba(255, 255, 255, 0.1)",
  fontSize: "xs",
  fontWeight: "bold",
  cursor: "pointer",
  transition: "all 0.2s",
  marginTop: "0.5rem",

  "&:hover": {
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    color: "#f87171",
    borderColor: "rgba(239, 68, 68, 0.2)",
  }
});

export default InactiveAccount;

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

const cardStyle = css({
  position: "relative",
  zIndex: 1,
  width: "100%",
  maxWidth: "520px",
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
  width: "80px",
  height: "80px",
  objectFit: "contain",
  opacity: 0.8,
});

const titleStyle = css({
  fontSize: "2xl",
  fontWeight: "900",
  color: "white",
  textTransform: "uppercase",
  letterSpacing: "widest",
  textAlign: "center",
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

const statusWrapperStyle = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.5rem",
  textAlign: "center",
});

const mainTextStyle = css({
  color: "white",
  fontSize: "lg",
  lineHeight: "relaxed",
  "& strong": {
    color: "amcoeurRose",
  }
});

const infoBoxStyle = css({
  display: "flex",
  flexDirection: "column",
  gap: "1.25rem",
  padding: "1.5rem",
  backgroundColor: "rgba(255, 255, 255, 0.03)",
  borderRadius: "20px",
  border: "1px solid rgba(255, 255, 255, 0.05)",
});

const infoItemStyle = css({
  display: "flex",
  gap: "1rem",
  alignItems: "center",
  fontSize: "sm",
  color: "amcoeurPale",
  lineHeight: "1.4",
});

const footerTextStyle = css({
  textAlign: "center",
  color: "rgba(255, 255, 255, 0.4)",
  fontSize: "xs",
  fontStyle: "italic",
});
