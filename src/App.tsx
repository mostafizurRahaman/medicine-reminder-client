import router from "./routes/routes";
import { RouterProvider } from "react-router-dom";

function App() {
   return (
      <>
         <div className="max-w-[1440px] lg:mx-auto">
            <RouterProvider router={router}></RouterProvider>
         </div>
      </>
   );
}

export default App;
