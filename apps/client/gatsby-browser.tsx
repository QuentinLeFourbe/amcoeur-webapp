import "./src/styles/index.css";
import React from "react";
import PageContainer from "./src/components/organisms/PageContainer/PageContainer";

export const wrapPageElement = ({ element }: any) => {
  return <PageContainer>{element}</PageContainer>;
};
