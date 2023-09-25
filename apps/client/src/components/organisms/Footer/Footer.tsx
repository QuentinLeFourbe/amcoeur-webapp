import { css } from "../../../../styled-system/css";
import Link from "../../atoms/Link/Link";

function Footer() {
  return (
    <footer className={footer}>
      <div className={verticalFlex}>
        <div className={groupLinks}>
          <Link secondary to="/mentions-legals">
            Mentions légales
          </Link>
          <Link secondary to="/contact">
            Contactez-nous
          </Link>
        </div>
        <p>Amcoeur - Copyright 2023</p>
      </div>
      <img src="https://picsum.photos/75/75" alt="logo" />
    </footer>
  );
}

const footer = css({
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "50px",
  marginTop: "auto",
  color: "textSecondary",
  backgroundColor: "footerBackground",
  height: "200px",
  padding: "0 10vw",
});

const groupLinks = css({
  display: "flex",
  flexFlow: "row wrap",
  alignItems: "center",
  gap: "50px",
});

const verticalFlex = css({
  display: "flex",
  flexFlow: "column nowrap",
  alignItems: "center",
  justifyContent: "center",
  gap: "50px",
});

export default Footer;
