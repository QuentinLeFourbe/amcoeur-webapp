import React from "react";
import { css } from "../../../../styled-system/css";

type FooterProps = {};

function Footer() {
  return <footer className={footer}>Footer</footer>;
}

const footer = css({
  display: "flex",
  flexFlow: "row nowrap",
  justifyContent: "center",
  alignItems: "center",
  gap: "50px",
  marginTop: "auto",
  padding: "100px 0",
  backgroundColor: "backgroundPrimary",
});

export default Footer;
