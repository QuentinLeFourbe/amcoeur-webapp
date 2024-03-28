import { css, cx } from "../../../../../styled-system/css";
// import BurgerIcon from "../../../assets/icons/burger.svg?react";
import AmcoeurLogo from "../../../assets/icons/amcoeur_logo_light.webp";
import Link from "../../atoms/Link/Link";

const headerLinks = [
  {
    name: "Gestion des pages",
    href: "/gestion-pages",
  },
  {
    name: "Formulaires",
    href: "/formulaires",
  }
];

type HeaderProps = {
  isUserLoggedIn: boolean;
  logout: () => void;
};

function Header({ isUserLoggedIn, logout }: HeaderProps) {
  return (
    <header className={header}>
      {isUserLoggedIn ? (
        <>
          <div className={cx(logoContainer)}>
            <LogoLink src={AmcoeurLogo} href="/" />
          </div>
          <div className={primaryLinksContainer}>
            {headerLinks.map((link, index) => (
              <Link key={index} to={link.href} variant="primary">
                {link.name}
              </Link>
            ))}
          </div>
          <div className={disconnectContainer}>
            <Link onClick={logout} variant="primary">
              Se déconnecter
            </Link>
          </div>
        </>
      ) : (
        <div className={cx(logoContainer)}>
          <LogoLink src={AmcoeurLogo} href="#" />
        </div>
      )}
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

const header = css({
  position: "sticky",
  top: "0",
  display: "flex",
  flexFlow: "row wrap",
  alignItems: "center",
  gap: "10px",
  padding: "25px 10vw",
  background: "backgrounds.primary.medium",
  zIndex: "50",
});

const primaryLinksContainer = css({
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-around",
  alignItems: "center",
  gap: "100px",
});

const logoContainer = css({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginRight: "100px",

  "& img": {
    width: "75px",
    height: "75px",
    objectFit: "contain",
  },
});

const disconnectContainer = css({
  marginLeft: "auto",
});

export default Header;
