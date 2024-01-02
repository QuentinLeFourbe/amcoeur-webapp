import { createRef } from "react";
import IndexPage from "./pages";
import PageContainer from "./components/templates/PageContainer/PageContainer";
import { generatePagesRoutes } from "./utils/routes";
import GeneratedPage from "./pages/GeneratedPage";
import Preview from "./pages/Preview";

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
