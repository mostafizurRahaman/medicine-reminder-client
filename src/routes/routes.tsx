import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import { Home, Login, Overview, Register, Reminder } from "../pages";
import PrivateRoute from "./privateRoute/privateRoute";

import DashboardLayout from "../Layout/DashboardLayout";

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
                  <DashboardLayout></DashboardLayout>
               </PrivateRoute>
            ),
            children: [
               {
                  path: "/dashboard/",
                  element: <Overview></Overview>,
               },
               {
                  path: "/dashboard/reminder",
                  element: <Reminder></Reminder>,
               },
            ],
         },
      ],
   },
]);

export default router;
