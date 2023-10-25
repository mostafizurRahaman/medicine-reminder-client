import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { RiArrowRightDoubleFill, RiArrowLeftDoubleFill } from "react-icons/ri";
import { AuthContext } from "../Context/AuthProvider";
// import styles from "./Dashboard.module.css";
const DashboardLayout = () => {
   const { open, setOpen } = useContext(AuthContext);
   return (
      <div className="flex relative ">
         <Sidebar></Sidebar>

         <div
            className={`w-full duration-500 ease-in-out p-5 `}
         >
            <div
               className={`   ${open ? "absolute left-[240px] md:static" : ""}`}
               onClick={() => setOpen((prev) => !prev)}
            >
               {open ? (
                  <RiArrowLeftDoubleFill size={30}></RiArrowLeftDoubleFill>
               ) : (
                  <RiArrowRightDoubleFill size={30}></RiArrowRightDoubleFill>
               )}
            </div>
            <Outlet></Outlet>
         </div>
      </div>
   );
};

export default DashboardLayout;
