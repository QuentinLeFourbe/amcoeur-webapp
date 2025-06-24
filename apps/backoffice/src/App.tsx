import { RouterProvider } from "react-router-dom";

import router from "./routes";
import "./global/api/axios";

function App() {
  return <RouterProvider router={router} />;
}

export default App;
