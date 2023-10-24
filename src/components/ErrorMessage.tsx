import { BiSolidErrorCircle } from "react-icons/bi";

const ErrorMessage = ({ text }: { text: string }) => {
   return (
      <div className="flex items-center  text-xs justify-center ">
         <BiSolidErrorCircle
            className=" text-red-500"
            size={16}
         ></BiSolidErrorCircle>
         <span className="text-xs text-red-500">{text}</span>
      </div>
   );
};

export default ErrorMessage;
