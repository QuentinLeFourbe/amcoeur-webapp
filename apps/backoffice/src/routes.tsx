import { createBrowserRouter } from "react-router-dom";

import AdoptionDetails from "./adoptions/pages/AdoptionDetails";
import AdoptionsDashboard from "./adoptions/pages/AdoptionsDashboard";
import CreateAdoption from "./adoptions/pages/CreateAdoption";
import UpdateAdoption from "./adoptions/pages/UpdateAdoption";
import AnswersDashboard from "./answers/pages/AnswersDashboard";
import ViewAnswer from "./answers/pages/ViewAnswer";
import CreatePage from "./contentPages/pages/CreatePage";
import HomePageManagement from "./contentPages/pages/HomePageManagement";
import ManagePage from "./contentPages/pages/ManagePage";
import ManagePages from "./contentPages/pages/ManagePages";
import CreateForm from "./forms/pages/CreateForm";
import FormsDashboard from "./forms/pages/FormsDashboard";
import FormsManagement from "./forms/pages/FormsManagement";
import UpdateForm from "./forms/pages/UpdateForm";
import PageContainer from "./global/components/template/PageContainer/PageContainer";
import StaticPageContainer from "./global/components/template/StaticPageContainer/StaticPageContainer";
import InactiveAccount from "./global/pages/InactiveAccount";
import Index from "./global/pages/Index";
import Login from "./global/pages/Login";
import LoginRedirect from "./global/pages/LoginRedirect";
import NotFound from "./global/pages/NotFound";
import ManageUsers from "./users/pages/ManageUsers";

const commonRoutes = [
  {
    path: "",
    element: <Index />,
  },
  {
    path: "login",
    element: <Login />,
  },
  { path: "inactive", element: <InactiveAccount /> },
  {
    path: "*",
    element: <NotFound />,
  },
];

const pagesRoutes = {
  path: "pages",
  children: [
    { path: "creer", element: <CreatePage /> },
    { path: "page-accueil", element: <HomePageManagement /> },
    {
      path: ":id",
      element: <ManagePage />,
    },
    {
      path: "",
      element: <ManagePages />,
    },
  ],
};

const formsRoutes = {
  path: "formulaires",
  children: [
    {
      path: "*",
      element: <FormsDashboard />,
      children: [
        {
          path: "*",
          element: <FormsManagement />,
        },
        { path: "reponses/:formId", element: <AnswersDashboard /> },
      ],
    },
    { path: "creer", element: <CreateForm /> },
    { path: "modifier/:id", element: <UpdateForm /> },
    { path: "reponses/:formId/:answerId", element: <ViewAnswer /> },
  ],
};

const adoptionsRoutes = {
  path: "adoptions",
  children: [
    { path: "creer", element: <CreateAdoption /> },
    { path: "modifier/:id", element: <UpdateAdoption /> },
    { path: ":id", element: <AdoptionDetails /> },
    {
      path: "",
      element: <AdoptionsDashboard />,
    },
  ],
};

const usersRoutes = {
  path: "users",
  element: <ManageUsers />,
};

const appRoutes = [
  {
    element: <StaticPageContainer />,
    children: [
      {
        path: "login/redirect",
        element: <LoginRedirect />,
      },
    ],
  },
  {
    element: <PageContainer />,
    children: [
      adoptionsRoutes,
      pagesRoutes,
      formsRoutes,
      usersRoutes,
      ...commonRoutes,
    ],
  },
];

const router = createBrowserRouter(appRoutes);
export default router;
