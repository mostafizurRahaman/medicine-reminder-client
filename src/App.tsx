import router from "./routes/routes";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
function App() {
   return (
      <>
         <div className="max-w-[1440px] lg:mx-auto">
            <RouterProvider router={router}></RouterProvider>
            <Toaster></Toaster>
         </div>
      </>
   );
}

export default App;
