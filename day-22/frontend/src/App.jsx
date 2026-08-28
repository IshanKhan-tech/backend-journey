import React from "react";
import FaceExpression from "./features/expression/component/FaceExpression";
import { RouterProvider } from "react-router-dom";
import router from "./app.routes";
import { AuthProvider } from "./features/auth/auth.context";
import { SongContextProvider } from "./features/home/song.context";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <SongContextProvider>
          <RouterProvider router={router} />
        </SongContextProvider>
      </AuthProvider>
    </div>
  );
};

export default App;
