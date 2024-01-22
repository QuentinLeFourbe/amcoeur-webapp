import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import PageContainer from "./components/template/PageContainer/PageContainer";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ManagePages from "./pages/ManagePages";
import Index from "./pages/Index";
import ManagePage from "./pages/ManagePage";
import CreatePage from "./pages/CreatePage";
import { UserContext } from "./contexts/user";
import { UserData } from "./types/user";
import { getCurrentUser } from "./api/users";

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
  {
    path: "gestion-pages/:id",
    element: <ManagePage />,
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
      path: route.path,
      element: route.element,
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

  console.log({ user });
  return (
    <UserContext.Provider value={{ user, logoutUser, loginUser }}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </UserContext.Provider>
  );
}

export default App;
