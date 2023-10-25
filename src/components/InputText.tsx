import { InputTextProps } from "../types/interfaces";
import ErrorMessage from "./ErrorMessage";

const InputText = ({
   type,
   label,
   name,
   placeholder,
   action,
   initialValue,
   err,
   containerStyles,
   disabled,
}: InputTextProps) => {
   return (
      <div className="flex items-start flex-col gap-1 ">
         <label className="text-base font-semibold  " htmlFor={name}>
            {label}
         </label>
         <input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            onChange={action}
            defaultValue={initialValue}
            className={containerStyles}
            disabled={disabled}
         />
         {err && <ErrorMessage text={err}></ErrorMessage>}
      </div>
   );
};

export default InputText;
