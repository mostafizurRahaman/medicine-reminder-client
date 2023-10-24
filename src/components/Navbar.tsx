import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { AuthContext } from "../Context/AuthProvider";
const Navbar = () => {
   const { user, logOut } = useContext(AuthContext);
   const [show, setShow] = useState<boolean>(true);
   return (
      <div className="flex items-center justify-between px-5 h-20 bg-primary shadow-[5px_5px_5px_5px_#ddd] sticky top-0 left-0">
         <div className="text-info text-3xl font-semibold italic z-[99999]">
            Medication <span className="text-accent">Reminder</span>
         </div>
         <div className="flex gap-3">
            <nav
               className={`fixed top-20 left-0 md:static  capitalize flex md:flex-row flex-col items-start md:px-0 px-5 w-[230px] md:w-auto bg-info bg-opacity-90 md:bg-transparent md:items-center gap-3 h-[100vh]  md:h-auto    duration-500 ease-in-out transition-all text-xl font-medium ${
                  show ? "left-0" : "left-[-999px] z-[99999]"
               }  `}
            >
               <Link
                  className=" text-white md:text-info md:hover:text-accent"
                  to="/home"
               >
                  home
               </Link>
               {user?.email ? (
                  <>
                     <Link
                        className="text-primary md:text-info md:hover:text-accent"
                        to="/dashboard"
                     >
                        dashboard
                     </Link>
                     <button
                        className="text-primary md:text-info md:hover:text-accent"
                        onClick={logOut}
                     >
                        Logout
                     </button>
                  </>
               ) : (
                  <Link
                     className="text-primary md:text-info md:hover:text-accent"
                     to="/login"
                  >
                     login
                  </Link>
               )}
            </nav>
            <div
               className="md:hidden block text-accent hover:text-info "
               onClick={() => setShow((prev) => !prev)}
            >
               {show ? (
                  <IoCloseCircleOutline
                     className="text-red-500"
                     size={25}
                  ></IoCloseCircleOutline>
               ) : (
                  <FaBars size={25}></FaBars>
               )}
            </div>
         </div>
      </div>
   );
};

export default Navbar;
