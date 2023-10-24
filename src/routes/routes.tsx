import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import { Home, Login, Register } from "../pages";
import PrivateRoute from "./privateRoute/privateRoute";
import Dashborad from "../pages/Dashborad";

const router = createBrowserRouter([
   {
      path: "/",
      element: <MainLayout />,
      children: [
         {
            path: "/",
            element: <Home></Home>,
         },
         {
            path: "/home",
            element: <Home></Home>,
         },
         {
            path: "/login",
            element: <Login></Login>,
         },
         {
            path: "/register",
            element: <Register></Register>,
         },
         {
            path: "/dashboard",
            element: (
               <PrivateRoute>
                  <Dashborad></Dashborad>
               </PrivateRoute>
            ),
         },
      ],
   },
]);

export default router;
