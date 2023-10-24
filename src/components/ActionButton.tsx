import { buttonProps } from "../types/interfaces";

const ActionButton = ({
   containerStyles,
   text,
   action,
   children,
}: buttonProps) => {
   return (
      <button
         className={` btn flex items-center justify-center gap-3 ${containerStyles}`}
         onClick={action}
      >
         <span className="mb-0">{text}</span>
         {children && children}
      </button>
   );
};

export default ActionButton;
