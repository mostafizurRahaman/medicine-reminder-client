import { AiOutlineCloseCircle } from "react-icons/ai";
import { CommonModalProps } from "../types/interfaces";

const CommonModal = ({
   children,
   setShow,
   containerStyles,
}: CommonModalProps) => {
   return (
      <div className="fixed top-0 left-0 w-full h-[110vh] flex items-center justify-center bg-accent bg-opacity-50 ">
         <div
            className={`duration-500 transition-all ease-in-out py-3  px-2 overflow-hidden overflow-y-scroll  max-h-[75vh] rounded-md z-[999] bg-primary  relative ${
               containerStyles ? containerStyles : "w-[85%] md:w-[60%]"
            }`}
         >
            <div
               className="w-5 h-5 rounded-full  right-5 top-5 absolute text-red-500 font-bold  "
               onClick={() => setShow(false)}
            >
               <AiOutlineCloseCircle
                  size={30}
                  className="hover:scale-95 pointer"
               />
            </div>
            {children && children}
         </div>
      </div>
   );
};

export default CommonModal;
