import { createRef } from "react";
import IndexPage from "./global/pages";
import { generatePagesRoutes } from "./global/utils/routes";
import Preview from "./generated/pages/Preview";
import GeneratedPage from "./generated/pages/GeneratedPage";
import PageContainer from "./global/components/templates/PageContainer/PageContainer";
import AdoptionsDashboard from "./adoptions/pages/AdoptionsDashboard";
import AdoptionDetail from "./adoptions/pages/AdoptionDetail";

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
    path: "/adoptions",
    element: <AdoptionsDashboard />,
    nodeRef: createRef<HTMLDivElement>(),
  },
  {
    path: "/adoptions/:id",
    element: <AdoptionDetail />,
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
