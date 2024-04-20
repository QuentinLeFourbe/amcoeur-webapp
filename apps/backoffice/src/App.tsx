import {  RouterProvider } from "react-router-dom";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { UserData } from "./global/types/user";
import { getCurrentUser } from "./global/api/users";
import { UserContext } from "./global/contexts/user";
import router from "./routes"

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
