import { RouterProvider } from "react-router";
import { appRoutes } from "./app.routes.jsx";

const App = () => {

  return (
    <RouterProvider router={appRoutes} />
  );
};

export default App;