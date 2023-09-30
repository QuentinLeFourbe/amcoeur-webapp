import { useEffect, useState } from "react";
import { css, cx } from "../../../../styled-system/css";
import FacebookIcon from "../../../assets/icons/facebook.svg?react";
import { Link } from "react-router-dom";

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
      <header className={cx(header, scrolling && logoReduced)}>
        <div className={logoContainer}>
          <LogoLink
            src="https://p6.storage.canalblog.com/68/37/351410/78717808.jpg"
            href="/"
          />
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
  fontWeight: "600",
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
    background: "headerBackground",
    gap: "10px",
    position: "sticky",
    zIndex: "100",
    top: "0",
  })
);

const linksContainer = cx(flexRow, css({ gap: "30px" }));

// const burgerButton = css({
//   background: "none",
//   border: "none",
//   cursor: "pointer",
//   width: "40px",
//   height: "40px",
// });

const maintenanceBanner = css({
  background: "yellow",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "black",
});

const logoLinkClass = css({
  width: "75px",
  height: "75px",
});
const logoReduced = css({
  "& img": {
    width: "50px",
    height: "50px",
  },
});

export default Header;
