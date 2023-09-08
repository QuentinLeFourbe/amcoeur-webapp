import React from "react";
import { css, cx } from "../../../../styled-system/css";
import BurgerIcon from "../../../assets/icons/burger.svg";
import FacebookIcon from "../../../assets/icons/facebook.svg";
import { Link } from "gatsby";

function Header() {
  return (
    <header className={header}>
      <div className={logoContainer}>
        <LogoLink src="https://via.placeholder.com/75" href="/" />
        <button className={burgerButton}>
          <BurgerIcon />
        </button>
      </div>
      <div className={linksContainer}>
        <Link className={headerLink} to="/soutenir-animaux">
          Soutenir les animaux
        </Link>
        <Link className={headerLink} to="/besoin-aide">
          Besoin d'aide
        </Link>
        <Link className={headerLink} to="/donate">
          Donations
        </Link>
        <Link className={headerLink} to="/contact">
          Nous contacter
        </Link>
      </div>
      <a
        className={css({ width: "30px", height: "30px" })}
        href="https://www.facebook.com/amcoeur.protection.animaux"
        target="_blank"
      >
        <FacebookIcon />
      </a>
    </header>
  );
}

type LogoLinkProps = {
  src: string;
  href: string;
};
const LogoLink = ({ src, href }: LogoLinkProps) => (
  <Link to={href}>
    <img src={src} alt="logo" />
  </Link>
);

const headerLink = css({
  textDecoration: "none",
  fontWeight: "600",
  color: "textPrimary",
  "&:hover": {
    color: "textSecondary",
  },
});

const flexRow = css({
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-between",
  alignItems: "center",
});

const logoContainer = css({
  display: "flex",
  flexFlow: "row wrap",
  alignItems: "center",
  justifyContent: "center",
  gap: "15px",
});

const header = cx(
  flexRow,
  css({
    padding: " 25px 10vw",
    background: "backgroundPrimary",
    gap: "10px",
  })
);

const linksContainer = cx(flexRow, css({ gap: "30px" }));

const burgerButton = css({
  background: "none",
  border: "none",
  cursor: "pointer",
  width: "40px",
  height: "40px",
});

export default Header;
