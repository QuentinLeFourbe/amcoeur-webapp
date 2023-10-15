import { useEffect, useState } from "react";
import { css, cx } from "../../../../styled-system/css";
import FacebookIcon from "../../../assets/icons/facebook.svg?react";
import BurgerIcon from "../../../assets/icons/burger.svg?react";
import AmcoeurLogo from "../../../assets/images/am-logo.webp";
import Link from "../../atoms/Link/Link";
import SecondaryPanel from "./SecondaryPanel";

const headerLinks = [
  {
    name: "Qui sommes-nous",
    href: "/qui-sommes-nous",
  },
  {
    name: "Donations",
    href: "/donate",
  },
  {
    name: "Nous contacter",
    href: "/contact",
  },
];

function Header() {
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && !scrolling) {
        setScrolling(true);
      } else if (window.scrollY === 0 && scrolling) {
        setScrolling(false);
      }
    };

    const closeMenu = () => {
      setMenuOpen(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", closeMenu);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", closeMenu);
    };
  }, [scrolling]);

  return (
    <>
      <header className={header}>
        <div
          className={cx(
            primaryHeader,
            scrolling ? headerOnScrollPadding : headerScrollTopPadding
          )}
        >
          <div className={cx(logoContainer, scrolling && logoReduced)}>
            <LogoLink src={AmcoeurLogo} href="/" />
            <button
              className={burgerIcon}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <BurgerIcon />
            </button>
          </div>
          <div className={primaryLinksContainer}>
            {headerLinks.map((link, index) => (
              <Link key={index} to={link.href} type="primary">
                {link.name}
              </Link>
            ))}
          </div>

          <a
            className={facebookLogo}
            href="https://www.facebook.com/amcoeur.protection.animaux"
            target="_blank"
          >
            <FacebookIcon />
          </a>
        </div>
        <SecondaryPanel isOpen={menuOpen} />
      </header>
    </>
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

const facebookLogo = css({
  width: "30px",
  height: "30px",
  color: "textPrimary",
  transition: "color 0.2s ease-in-out",
  "&:hover": {
    color: "textSecondary",
  },
});

const header = css({
  position: "sticky",
  top: "0",
  zIndex: "10",
});

const headerScrollTopPadding = css({
  padding: "25px 10vw",
});

const headerOnScrollPadding = css({
  padding: "10px 10vw",
});

const primaryHeader = css({
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-between",
  alignItems: "center",
  background: "backgrounds.primary.extraLight",
  gap: "10px",
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

  "& img": {
    width: "75px",
    height: "75px",
    objectFit: "contain",
  },
});

const logoReduced = css({
  "& img": {
    width: "50px",
    height: "50px",
  },
});

const burgerIcon = css({
  marginRight: "auto",
  width: "40px",
  height: "40px",
  cursor: "pointer",
  "&svg": {
    width: "100%",
    height: "100%",

    "&:hover": {
      color: "white",
      backgroundColor: "green",
    },
  },
});

export default Header;
