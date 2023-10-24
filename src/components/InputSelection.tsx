/* eslint-disable react/prop-types */
import { useState } from "react";
import { ChangeEventSelectionType } from "../types/types";

interface InputSelectionProps {
   label?: string;
   data: any;
   setData: any;
   field?: string;
   options: string[];
   selectOp: string;
}

const InputSelection = ({
   label,
   data,
   setData,
   field,
   options,
   selectOp,
}: InputSelectionProps) => {
   const [selected, setSelected] = useState("");

   const handeSelection: ChangeEventSelectionType = (e) => {
      const items = e.target.value;
      const name = e.target.name;
      if (!items) {
         return;
      }

      setSelected(items);
      setData({ ...data, [name]: items.trim().toLowerCase() });
      return;
   };

   return (
      <div className="flex flex-col gap-1 w-full">
         <label className="text-white capitalize font-semibold ">{label}</label>
         <select
            className="w-full rounded-md border-[1.5px]   border-black  -mb-1 px-3 py-[5px]  text-black placeholder:text-black font-normal text-base"
            onChange={handeSelection}
            name={field}
         >
            <option className="text-sm capitalize" value="" selected>
               {selectOp}
            </option>
            {options?.map((option: string, idx: number) => (
               <option
                  className="text-sm capitalize"
                  selected={selected === option}
                  key={idx}
                  value={option}
               >
                  {option}
               </option>
            ))}
         </select>
      </div>
   );
};

export default InputSelection;
