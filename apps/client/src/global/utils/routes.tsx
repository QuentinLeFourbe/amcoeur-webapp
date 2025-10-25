import { ComponentType } from "react";
import { createRef } from "react";

type module = {
  [key: string]: unknown;
};

const modules: module = import.meta.glob("../pages/*.mdx", { eager: true });

export const generatePagesRoutes = () => {
  return Object.keys(modules).map((path) => {
    const pageName = path?.split("/")?.pop()?.replace(".mdx", "");
    const PageComponent = (modules[path] as module).default as ComponentType;
    return {
      path: `/${pageName}`,
      element: <PageComponent />,
      nodeRef: createRef<HTMLDivElement>(),
    };
  });
};
