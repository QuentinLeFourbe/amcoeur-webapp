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
import QuestionsManagement from "./questions/pages/QuestionsManagement";
import CreateQuestion from "./questions/pages/CreateQuestion";
import UpdateQuestion from "./questions/pages/UpdateQuestion";
import CreateForm from "./forms/pages/CreateForm";
import UpdateForm from "./forms/pages/UpdateForm";

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

const questionsRoutes = {
  path: "questions",
  children: [
    {
      path: "*",
      element: <FormsDashboard />,
      children: [
        {
          path: "*",
          element: <QuestionsManagement />,
        },
      ],
    },
    { path: "creer", element: <CreateQuestion /> },
    { path: ":id/modifier", element: <UpdateQuestion /> },
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
      ],
    },
    { path: "creer", element: <CreateForm /> },
    { path: "modifier/:id", element: <UpdateForm /> },
    questionsRoutes,
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
