import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Header from "../components/organisms/Header";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <Header />
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Amcoeur</title>;
