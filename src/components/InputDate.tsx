import { InputDateProps } from "../types/interfaces";
import ErrorMessage from "./ErrorMessage";

const InputDate = ({
   label,
   name,
   action,
   initialDate,
   err,
   containerStyles,
   disabled,
   min,
   max,
}: InputDateProps) => {
   return (
      <div className="flex items-start flex-col gap-1 ">
         <label className="text-base font-semibold  " htmlFor={name}>
            {label}
         </label>
         <input
            type="date"
            id={name}
            name={name}
            onChange={action}
            defaultValue={initialDate}
            className={containerStyles}
            disabled={disabled}
            min={min}
            max={max}
         />
         {err && <ErrorMessage text={err}></ErrorMessage>}
      </div>
   );
};

export default InputDate;
