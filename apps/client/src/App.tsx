import { RouterProvider, createBrowserRouter } from "react-router-dom";
import IndexPage from "./pages";
import PageContainer from "./components/organisms/PageContainer/PageContainer";
import { generatePagesRoutes } from "./utils/routes";
import NotFoundPage from "./pages/404";

const router = createBrowserRouter([
  {
    element: <PageContainer />,
    children: [
      {
        path: "/",
        element: <IndexPage />,
      },
      ...generatePagesRoutes(),
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
