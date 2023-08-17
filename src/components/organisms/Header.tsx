import React from "react";
import { css, cx } from "../../../styled-system/css";

type HeaderProps = {
  logoSrc?: string;
  logoAlt?: string;
};

function Header({}) {
  return (
    <header className={header}>
      <div>
        <LogoImage />
      </div>
      <div>
        <HeaderLink>Soutenir les animaux</HeaderLink>
        <HeaderLink>Besoin d'aide</HeaderLink>
        <HeaderLink>Donations</HeaderLink>
        <HeaderLink>Nous contacter</HeaderLink>
      </div>
      <div>Facebook</div>
    </header>
  );
}

const LogoImage = () => <img src="https://via.placeholder.com/75" alt="logo" />;

type HeaderLinkProps = {
  children: React.ReactNode;
};
const HeaderLink = ({ children }: HeaderLinkProps) => {
  return <a href="/">{children}</a>;
};

const flexRow = css({
  display: "flex",
  flexFlow: "row wrap",
  justifyContent: "space-between",
  alignItems: "center",
});

const header = cx(
  flexRow,
  css({
    padding: " 25px 10vw",
    border: "1px solid black",
    background: "#FDAFD5",
  })
);

export default Header;
