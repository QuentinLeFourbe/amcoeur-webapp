import "./i18n";
import "./i18n";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";

import { trackEvent } from "./global/utils/metrics";
import { appRoutes } from "./routes";

const router = createBrowserRouter(appRoutes);

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    trackEvent(); // Tracks session on mount
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
