import { createRef } from "react";
import IndexPage from "./pages";
import PageContainer from "./components/organisms/PageContainer/PageContainer";
import { generatePagesRoutes } from "./utils/routes";
import NotFoundPage from "./pages/404";

export const pagesRoutes = [
  {
    path: "/",
    element: <IndexPage />,
    nodeRef: createRef<HTMLDivElement>(),
  },
  ...generatePagesRoutes(),
  {
    path: "*",
    element: <NotFoundPage />,
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
