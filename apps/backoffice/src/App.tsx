import "./i18n";
import "./global/api/axios";

import { RouterProvider } from "react-router";

import router from "./routes";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
