import { css, cx } from "../../../../../styled-system/css";
// import BurgerIcon from "../../../assets/icons/burger.svg?react";
import AmcoeurLogo from "../../../assets/icons/amcoeur_logo_light.webp";
import Link from "../../atoms/Link/Link";

type HeaderProps = {
  isUserLoggedIn: boolean;
  isUserInactive: boolean;
  isUserAdmin: boolean;
  logout: () => void;
};

function Header({
  isUserLoggedIn,
  isUserInactive,
  isUserAdmin,
  logout,
}: HeaderProps) {
  let headerLinks: { name: string; href: string }[] = [];
  if (!isUserInactive) {
    headerLinks = [
      ...headerLinks,
      {
        name: "Gestion des pages",
        href: "/pages",
      },
      {
        name: "Formulaires",
        href: "/formulaires",
      },
    ];
  }
  if (isUserAdmin) {
    headerLinks.push({ name: "Utilisateurs", href: "/users" });
  }
  return (
    <header className={header}>
      {isUserInactive ? (
        <div className={cx(logoContainer)}>
          <LogoLink src={AmcoeurLogo} href="#" />
        </div>
      ) : (
        <div className={cx(logoContainer)}>
          <LogoLink src={AmcoeurLogo} href="/" />
        </div>
      )}
      <div className={primaryLinksContainer}>
        {headerLinks.map((link, index) => (
          <Link key={index} to={link.href} variant="primary">
            {link.name}
          </Link>
        ))}
      </div>
      {isUserLoggedIn && (
        <div className={disconnectContainer}>
          <Link onClick={logout} variant="primary">
            Se déconnecter
          </Link>
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
