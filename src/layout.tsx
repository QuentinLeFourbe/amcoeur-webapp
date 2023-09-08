import React from "react";
import PageContainer from "./components/organisms/PageContainer/PageContainer";

export const wrapPageElement = ({ element }: any) => {
  return <PageContainer>{element}</PageContainer>;
};
