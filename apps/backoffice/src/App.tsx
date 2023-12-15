import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageContainer from "./components/template/PageContainer/PageContainer";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ManagePages from "./pages/ManagePages";
import Index from "./pages/Index";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";

const pagesRoutes = [
  { path: "/", element: <Index /> },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/gestion-pages",
    element: <ManagePages />,
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

const router = createBrowserRouter(appRoutes);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
