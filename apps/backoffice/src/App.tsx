import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import PageContainer from "./global/components/template/PageContainer/PageContainer";
import ManagePages from "./contentPages/pages/ManagePages";
import CreatePage from "./contentPages/pages/CreatePage";
import HomePageManagement from "./contentPages/pages/HomePageManagement";
import ManagePage from "./contentPages/pages/ManagePage";
import { UserData } from "./global/types/user";
import { getCurrentUser } from "./global/api/users";
import { UserContext } from "./global/contexts/user";
import Index from "./global/pages/Index";
import Login from "./global/pages/Login";
import NotFound from "./global/pages/NotFound";
import FormsDashboard from "./forms/pages/FormsDashboard";
import FormsManagement from "./forms/pages/FormsManagement";
import QuestionsManagement from "./forms/pages/QuestionsManagement";

const pagesRoutes = [
  {
    path: "",
    element: <Index />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "gestion-pages",
    element: <ManagePages />,
  },
  { path: "gestion-pages/creer", element: <CreatePage /> },
  { path: "gestion-pages/page-accueil", element: <HomePageManagement /> },
  {
    path: "gestion-pages/:id",
    element: <ManagePage />,
  },
  {
    path: "formulaires",
    element: <FormsDashboard />,
    children: [
      {
        path: "",
        element: <FormsManagement />,
      },
      { path: "questions", element: <QuestionsManagement /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

const appRoutes = [
  {
    element: <PageContainer />,
    children: pagesRoutes.map((route) => ({
      ...route
    })),
  },
];

const router = createBrowserRouter(appRoutes, { basename: "/administration" });

const queryClient = new QueryClient();

function App() {
  const [user, setUser] = useState<UserData | null>(null);

  const logoutUser = () => {
    setUser(null);
  };

  const loginUser = (user: UserData) => {
    setUser(user);
  };

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const currentUser = await getCurrentUser();
        if (!currentUser || !currentUser.data) {
          router.navigate("/login");
        } else {
          setUser(currentUser.data);
        }
      } catch (error) {
        setUser(null);
        router.navigate("/login");
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <UserContext.Provider value={{ user, logoutUser, loginUser }}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserContext.Provider>
  );
}

export default App;
