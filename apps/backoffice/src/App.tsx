import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageContainer from "./components/template/PageContainer/PageContainer";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ManagePages from "./pages/ManagePages";

const pagesRoutes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/manage-pages",
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

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
