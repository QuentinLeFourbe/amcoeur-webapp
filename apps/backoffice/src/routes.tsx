import { createBrowserRouter } from "react-router-dom";
import PageContainer from "./global/components/template/PageContainer/PageContainer";
import ManagePages from "./contentPages/pages/ManagePages";
import CreatePage from "./contentPages/pages/CreatePage";
import HomePageManagement from "./contentPages/pages/HomePageManagement";
import ManagePage from "./contentPages/pages/ManagePage";
import Index from "./global/pages/Index";
import Login from "./global/pages/Login";
import NotFound from "./global/pages/NotFound";
import FormsDashboard from "./forms/pages/FormsDashboard";
import FormsManagement from "./forms/pages/FormsManagement";
import CreateForm from "./forms/pages/CreateForm";
import UpdateForm from "./forms/pages/UpdateForm";
import AnswersDashboard from "./answers/pages/AnswersDashboard";
import ViewAnswer from "./answers/pages/ViewAnswer";

const commonRoutes = [
  {
    path: "",
    element: <Index />,
  },
  {
    path: "login",
    element: <Login />,
  },
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

const appRoutes = [
  {
    element: <PageContainer />,
    children: [pagesRoutes, formsRoutes, ...commonRoutes],
  },
];

const router = createBrowserRouter(appRoutes, { basename: "/administration" });
export default router;