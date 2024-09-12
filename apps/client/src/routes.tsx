import { createRef } from "react";
import IndexPage from "./global/pages";
import { generatePagesRoutes } from "./global/utils/routes";
import Preview from "./generated/pages/Preview";
import GeneratedPage from "./generated/pages/GeneratedPage";
import PageContainer from "./global/components/templates/PageContainer/PageContainer";

export const pagesRoutes = [
  {
    path: "/",
    element: <IndexPage />,
    nodeRef: createRef<HTMLDivElement>(),
  },
  ...generatePagesRoutes(),
  {
    path: "/preview/:id",
    element: <Preview />,
    nodeRef: createRef<HTMLDivElement>(),
  },
  {
    path: "*",
    element: <GeneratedPage />,
    nodeRef: createRef<HTMLDivElement>(),
  },
];

export const appRoutes = [
  {
    element: <PageContainer />,
    children: pagesRoutes.map((route) => ({
      path: route.path,
      element: route.element,
    })),
  },
];
