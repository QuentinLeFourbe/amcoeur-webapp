import { css } from "../../../../../styled-system/css";
import AmcoeurLogo from "../../../assets/icons/amcoeur_logo_light.webp";

function Footer() {
  return (
    <footer className={footer}>
      <p>Amcoeur - Copyright 2023</p>
      <img className={logoStyle} src={AmcoeurLogo} alt="logo" />
    </footer>
  );
}

const logoStyle = css({
  height: "100px",
  width: "100px",
  objectFit: "contain",
});

const footer = css({
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "50px",
  marginTop: "auto",
  color: "textSecondary",
  backgroundColor: "backgrounds.primary.light",
  height: "200px",
  padding: "50px 10vw",
});

export default Footer;
