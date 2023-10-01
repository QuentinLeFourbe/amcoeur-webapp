import { useEffect, useState } from "react";
import { css, cx } from "../../../../styled-system/css";
import FacebookIcon from "../../../assets/icons/facebook.svg?react";
import { Link } from "react-router-dom";
import AmcoeurLogo from "../../../assets/images/amcoeur-logo.webp";

function Header() {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0 && !scrolling) {
        setScrolling(true);
      } else if (window.scrollY === 0 && scrolling) {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolling]);

  return (
    <>
      <header
        className={cx(
          header,
          scrolling ? headerOnScrollPadding : headerScrollTopPadding
        )}
      >
        <div className={cx(logoContainer, scrolling && logoReduced)}>
          <LogoLink src={AmcoeurLogo} href="/" />
        </div>
        <div className={linksContainer}>
          <Link className={cx(headerLink, textLink)} to="/qui-sommes-nous">
            Qui sommes-nous
          </Link>
          <Link className={cx(headerLink, textLink)} to="/besoin-aide">
            Maltraitance
          </Link>
          <Link className={cx(headerLink, textLink)} to="/donate">
            Donations
          </Link>
          <Link className={cx(headerLink, textLink)} to="/contact">
            Nous contacter
          </Link>
        </div>

        <a
          className={cx(css({ width: "30px", height: "30px" }), textLink)}
          href="https://www.facebook.com/amcoeur.protection.animaux"
          target="_blank"
        >
          <FacebookIcon />
        </a>
      </header>
      <div className={maintenanceBanner}>Site en cours de construction</div>
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

const headerLink = css({
  textDecoration: "none",
  fontWeight: "bold",
  fontFamily: "body",
  fontSize: "1.2rem",
});

const textLink = css({
  color: "textPrimary",
  transition: "color 0.2s ease-in-out",
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

const header = cx(
  flexRow,
  css({
    background: "backgrounds.primary.extraLight",
    gap: "10px",
    position: "sticky",
    zIndex: "100",
    top: "0",
  })
);

const headerScrollTopPadding = css({
  padding: "25px 10vw",
});

const headerOnScrollPadding = css({
  padding: "10px 10vw",
});

const linksContainer = css({
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-around",
  alignItems: "center",
  gap: "100px",
});

const maintenanceBanner = css({
  background: "yellow",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "black",
});

const logoContainer = css({
  width: "75px",
  height: "75px",
});

const logoReduced = css({
  width: "50px",
  height: "50px",
});

export default Header;
