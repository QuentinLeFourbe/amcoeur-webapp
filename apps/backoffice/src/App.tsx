import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useCurrentUser } from "./global/hooks/useUser";

function App() {
  const { data: { data: currentUser } = {}, isSuccess } = useCurrentUser();

  if (isSuccess) {
    if (!currentUser) {
      router.navigate("/login", { replace: true });
    } else if (currentUser.isActive === false) {
      router.navigate("/inactive", { replace: true });
    }
  }

  return <RouterProvider router={router} />;
}

export default App;
