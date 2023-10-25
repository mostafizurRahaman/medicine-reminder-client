import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const Sidebar = () => {
   const { open } = useContext(AuthContext);
   return (
      <div
         className={`w-[230px]  h-screen bg-accent shadow-[2px_2px_2px_2px_#ddd] duration-1000 ease-in-out  absolute ${
            open ? "top-0 left-0 md:static" : "top-0 -left-[999px]"
         } `}
      >
         <div className="flex text-base font-medium text-white flex-col  ">
            <NavLink
               to="/dashboard/"
               className={({ isActive }) =>
                  isActive
                     ? "bg-white text-accent block border-b-[1.3px] border-b-black w-full py-2 text-center"
                     : "block border-b-[1.3px] border-b-black w-full py-2 text-center font-medium hover:text-accent  hover:bg-white"
               }
            >
               Overview
            </NavLink>
            <NavLink
               to="/dashboard/reminder"
               className={({ isActive }) =>
                  isActive
                     ? "bg-white text-accent block border-b-[1.3px] border-b-black w-full py-2 text-center"
                     : "block border-b-[1.3px] border-b-black w-full py-2 text-center font-medium hover:text-accent  hover:bg-white"
               }
            >
               Reminder
            </NavLink>
         </div>
      </div>
   );
};

export default Sidebar;
