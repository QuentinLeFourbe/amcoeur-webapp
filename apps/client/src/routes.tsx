import { createRef } from "react";

import AdoptionDetail from "./adoptions/pages/AdoptionDetail";
import AdoptionsDashboard from "./adoptions/pages/AdoptionsDashboard";
import GeneratedPage from "./generated/pages/GeneratedPage";
import Preview from "./generated/pages/Preview";
import PageContainer from "./global/components/templates/PageContainer/PageContainer";
import IndexPage from "./global/pages";
import { generatePagesRoutes } from "./global/utils/routes";

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
