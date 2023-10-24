import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import { Home, Login, Register } from "../pages";

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
      ],
   },
]);



export  default router; 