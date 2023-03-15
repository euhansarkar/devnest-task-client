import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layouts/Main/Main";
import Create from "../../Pages/Create/Create";
import DashBoard from "../../Pages/DashBoard/DashBoard";
import Home from "../../Pages/Home/Home/Home";
import LogIn from "../../Pages/LogIn/LogIn";
import Profile from "../../Pages/Profile/Profile";
import Register from "../../Pages/Register/Register";

export const router = createBrowserRouter([
  {
    path: `/`,
    element: <Main />,
    children: [
      {
        path: `/`,
        element: <Home />,
      },
      {
        path: `/dashboard`,
        element: <DashBoard />,
        loader: async () => fetch(`db.json`),
      },
      {
        path: `/profile`,
        element: <Profile />,
      },
      {
        path: `/create`,
        element: <Create />,
      },
     
    ],
  },
  {
    path: `/register`,
    element: <Register />,
  },
  {
    path: `/login`,
    element: <LogIn />,
  },
]);