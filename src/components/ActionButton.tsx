import { buttonProps } from "../types/interfaces";

const ActionButton = ({
   containerStyles,
   text,
   action,
   children,
   isDisabled,
}: buttonProps) => {
   return (
      <button
         className={`  flex items-center justify-center gap-3 ${containerStyles} ${
            isDisabled && "bg-red-500 cursor-not-allowed"
         }`}
         disabled={isDisabled}
         onClick={action}
      >
         <span className="mb-0">{text}</span>
         {children && children}
      </button>
   );
};

export default ActionButton;
