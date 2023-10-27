import format from "date-fns/format";
import {
   ReminderCardProps,
   ReminderErrors,
   ReminderTypes,
} from "../types/interfaces";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { ChangeEventType, deleteType, onSubmitType } from "../types/types";
import {
   ActionButton,
   CommonModal,
   InputDate,
   InputSelection,
   InputText,
   Loading,
} from ".";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { accessToken, baseURL } from "../configs/libs";
import toast from "react-hot-toast";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";

const ReminderCard = ({
   reminder,
   handleDelete,
   refetch,
}: {
   reminder: ReminderCardProps;
   handleDelete: deleteType;
   refetch: (
      options?: RefetchOptions | undefined
   ) => Promise<QueryObserverResult<any, Error>>;
}) => {
   const {
      _id,
      medicineName,
      dosage,
      frequency,
      phone,
      reminderStartDate,
      reminderEndDate,
      remindAt,
      careTaker,
      medicineTakingsDays,
      status,
   } = reminder;

   const [showModal, setShowModal] = useState<boolean>(false);
   const { user, logOut } = useContext(AuthContext);

   const showTime = (time: string) => {
      const minSlot = parseInt(time.split(":")[1]);
      const hourSlot = parseInt(time.split(":")[0]);
      const date = new Date();
      date.setHours(hourSlot);
      date.setMinutes(minSlot);
      return format(date, "hh: mm aa");
   };

   const [loading, setLoading] = useState(false);

   const [formData, setFormData] = useState<ReminderTypes>({
      medicineName: medicineName,
      userName: reminder?.userName,
      email: reminder?.email,
      dosage: dosage,
      frequency: frequency,
      phone: phone,
      careTakerName: careTaker?.name,
      careTakerPhone: careTaker?.phone,
      medicineTakingsDays: [...reminder.medicineTakingsDays],
      reminderStartDate: reminderStartDate,
      reminderEndDate: reminderEndDate,
      remindAt: remindAt,
   });
   const [errors, setErrors] = useState<ReminderErrors>({
      medicineName: "",
      dosage: "",
      frequency: "",
      phone: "",
      careTakerName: "",
      careTakerPhone: "",
      medicineTakingsDays: "",
      reminderStartDate: "",
      reminderEndDate: "",
      remindAt: "",
   });
   const weeks: string[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

   const handleInput: ChangeEventType = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      if (!value?.length) {
         setErrors({ ...errors, [name]: `${name} shouldn't be empty` });
         setFormData({ ...formData, [name]: "" });
      } else {
         setErrors({ ...errors, [name]: `` });
         setFormData({ ...formData, [name]: value });
      }
   };

   const handleNumber: ChangeEventType = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      if (!e.target.value) {
         setErrors({ ...errors, [name]: `Please provide ${name}` });
         setFormData({ ...formData, [name]: "" });
      } else if (!/^[1-9]\d*$/.test(value)) {
         setErrors({ ...errors, [name]: `please provide a positive number` });
         setFormData({ ...formData, [name]: "" });
      } else {
         setErrors({ ...errors, [name]: `` });
         setFormData({ ...formData, [name]: parseInt(value) });
      }
   };

   const handlePhone: ChangeEventType = (e) => {
      const phone: string = e.target.value;
      const name: string = e.target.name;
      if (phone === "") {
         setErrors({ ...errors, [name]: "phone number should't be empty" });
         setFormData({ ...formData, phone: "" });
      } else if (!/^[\d-\s]+$/.test(phone)) {
         setErrors({ ...errors, [name]: "number should be valid" });
         setFormData({ ...formData, [name]: "" });
      } else {
         setErrors({ ...errors, [name]: "" });
         setFormData({ ...formData, [name]: phone });
      }
   };

   const handleReminderStartDate: ChangeEventType = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      const date = new Date().getTime();
      const inputDate = new Date(value).getTime();

      if (!value) {
         setErrors({ ...errors, [name]: "please select a date" });
         setFormData({ ...formData, [name]: "" });
      } else if (inputDate - date < 0) {
         setErrors({
            ...errors,
            [name]: `${name} shouldn't be previous date`,
         });
         setFormData({ ...formData, [name]: "" });
      } else {
         setErrors({ ...errors, [name]: "" });
         setFormData({ ...formData, [name]: new Date(value).toISOString() });
      }
   };
   const handleReminderEndDate: ChangeEventType = (e) => {
      if (!formData.reminderStartDate) {
         e.target.value = "";
         return toast.error("At first select an start date");
      }
      const name = e.target.name;
      const value = e.target.value;
      const startDate = new Date(formData?.reminderStartDate).getTime();
      const inputDate = new Date(value).getTime();

      if (!value) {
         setErrors({ ...errors, [name]: "please select a date" });
         setFormData({ ...formData, [name]: "" });
      } else if (inputDate - startDate <= 0) {
         setErrors({
            ...errors,
            [name]: ` select ${name} reminderDate after start date`,
         });
         setFormData({ ...formData, [name]: "" });
      } else {
         setErrors({ ...errors, [name]: "" });
         setFormData({ ...formData, [name]: new Date(value).toISOString() });
      }
   };

   const handleRemindAt: ChangeEventType = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      if (!value) {
         setErrors({ ...errors, [name]: "please select a time" });
         setFormData({ ...formData, [name]: "" });
      } else {
         setErrors({
            ...errors,
            [name]: "",
         });
         setFormData({ ...formData, [name]: value });
      }
   };

   const updateReminder: onSubmitType = async (e) => {
      e.preventDefault();
      const { careTakerName, careTakerPhone, ...others } = formData;
      try {
         setLoading(true);
         const res = await fetch(`${baseURL}/reminder/${reminder._id}`, {
            method: "PATCH",
            headers: {
               "content-type": "application/json",
               authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
               ...others,
               careTaker: {
                  name: careTakerName,
                  phone: careTakerPhone,
               },
            }),
         });
         if (res.status === 403 || res.status === 401) {
            setLoading(false);
            return logOut();
         }
         const data = await res.json();
         if (data.status === "success") {
            setLoading(false);
            toast.success(data.message);
            setShowModal(false);
            refetch();
         } else {
            setLoading(false);
            toast.error(data.message);
         }
      } catch (err: any) {
         setLoading(false);
         toast.error(err?.message);
         console.log(err);
      }
   };

   const getDefaultDate = (date: string | Date) => {
      date = new Date(date);
      return format(new Date(date), `yyyy-${new Date(date).getMonth() + 1}-dd`);
   };

   return (
      <div className="bg-white px-5 py-5 shadow-[15px_15px_16px_#ddd,_15px_15px_16px_#ffffff] border-[1.4px] border-blue-300 my-5 rounded-lg  relative ">
         <div className="flex justify-between items-center">
            <h3 className="text-sm capitalize  font-bold italic">
               Medicine Info:
            </h3>
            <p
               className={` px-2 text-xs font-medium py-1 rounded-md ${
                  status ? "bg-green-500 text-white" : "bg-red-500 text-white"
               }`}
            >
               {status}
            </p>
         </div>
         <div className="flex  justify-between text-sm items-end">
            <div className="text-sm uppercase mb-3 font-semibold">
               <p className=" capitalize">
                  {medicineName}, {dosage} dosage {frequency}
               </p>
               <p>phone: {phone}</p>
            </div>
         </div>
         <div>
            <h3 className="text-sm font-bold ">Reminder Info: </h3>
            <div className="font-medium text-sm ">
               <p>
                  <span>
                     Duration :{" "}
                     {format(new Date(reminderStartDate), "dd MMM yyyy ")} to{" "}
                     {format(new Date(reminderEndDate), "dd MMM yyyy ")}
                  </span>
               </p>
               <p>remind At: {showTime(remindAt)}</p>
            </div>
         </div>
         <div className="flex gap-1 my-2">
            {medicineTakingsDays.map((i: string, idx: number) => (
               <span
                  className={`px-2 capitalize gap-1 font-medium text-white  py-1 rounded-md text-xs   ${
                     idx % 2 === 0 ? "bg-blue-400" : "bg-green-500"
                  } `}
                  key={i}
               >
                  {i}
               </span>
            ))}
         </div>
         <div>
            {careTaker?.name && (
               <div>
                  {" "}
                  <h3 className="font-bold text-sm">Caretaker Info :</h3>
                  <div className="flex  gap-1 text-sm items-center font-medium ">
                     <p>{careTaker?.name} , </p>
                     <p> {careTaker?.phone}</p>
                  </div>
               </div>
            )}
         </div>
         <div className="flex items-center gap-1 absolute bottom-3 right-3 ">
            <RiDeleteBin5Fill
               onClick={() => handleDelete(_id as string)}
               size={20}
               className="text-red-500 inline-block"
            ></RiDeleteBin5Fill>
            <BiEdit
               onClick={() => setShowModal(true)}
               className="text-green-500 inline-block"
               size={20}
            ></BiEdit>
         </div>
         {showModal && (
            <CommonModal setShow={setShowModal}>
               <form className="pb-5" onSubmit={updateReminder}>
                  <h1 className="text-2xl font-semibold uppercase  py-5">
                     Create Reminder
                  </h1>
                  <div className="grid grid-cols-1  md:grid-cols-2 gap-3 ">
                     <InputText
                        type="text"
                        name="medicineName"
                        label="Medicine Name"
                        initialValue={formData.medicineName}
                        placeholder="medicine name"
                        action={handleInput}
                        err={errors.medicineName}
                        containerStyles="border-[1.4px] rounded-md  border-black px-3 w-full py-1 placeholder:black "
                     ></InputText>
                     <InputText
                        type="number"
                        name="dosage"
                        label="Medicine dosage"
                        initialValue={`${formData.dosage}`}
                        placeholder="medicine dosage"
                        action={handleNumber}
                        err={errors.dosage}
                        containerStyles="border-[1.4px] rounded-md  border-black px-3 w-full py-1 placeholder:black "
                     ></InputText>
                     <InputSelection
                        label="frequency"
                        labelStyles="text-black"
                        data={formData}
                        setData={setFormData}
                        initialValue={formData?.frequency}
                        field="frequency"
                        options={["daily", "weekly", "monthly"]}
                        selectOp="Select frequency"
                     ></InputSelection>
                     <InputText
                        type="text"
                        name="phone"
                        label="your phone"
                        placeholder="your phone"
                        initialValue={formData.phone}
                        action={handlePhone}
                        err={errors.phone}
                        containerStyles="border-[1.4px] rounded-md  border-black px-3 w-full py-1 placeholder:black "
                     ></InputText>
                     <InputText
                        type="text"
                        name="careTakerName"
                        label="careTakerName"
                        placeholder="caretaker name"
                        initialValue={formData.careTakerName}
                        action={handleInput}
                        err={errors.careTakerName}
                        containerStyles="border-[1.4px] rounded-md  border-black px-3 w-full py-1 placeholder:black "
                     ></InputText>
                     <InputText
                        type="text"
                        name="careTakerPhone"
                        label="caretaker phone"
                        placeholder="caretaker phone"
                        initialValue={formData.careTakerPhone}
                        action={handlePhone}
                        err={errors.careTakerPhone}
                        containerStyles="border-[1.4px] rounded-md  border-black px-3 w-full py-1 placeholder:black "
                     ></InputText>
                     <InputDate
                        name="reminderStartDate"
                        label="Reminder Start Date "
                        initialDate={getDefaultDate(formData.reminderStartDate)}
                        action={handleReminderStartDate}
                        err={errors.reminderStartDate}
                        containerStyles="border-[1.4px] rounded-md  border-black px-3 w-full py-1 placeholder:black "
                     ></InputDate>
                     <InputDate
                        name="reminderEndDate"
                        label="Reminder End Date "
                        initialDate={getDefaultDate(formData.reminderEndDate)}
                        action={handleReminderEndDate}
                        err={errors.reminderEndDate}
                        containerStyles="border-[1.4px] rounded-md  border-black px-3 w-full py-1 placeholder:black "
                     ></InputDate>

                     <div className="grid grid-cols-4 md:grid-cols-7 place-items-start gap-1 ">
                        <label
                           htmlFor="Days"
                           className=" col-span-4 md:col-span-7 text-lg font-semibold "
                        >
                           medicineTakingsDays
                        </label>
                        {weeks.map((i) => (
                           <div
                              key={i}
                              className="flex text-xs flex-row-reverse gap-1 capitalize items-center justify-start"
                           >
                              <label htmlFor={i}>{i}</label>
                              <input
                                 type="checkbox"
                                 id={i}
                                 value={i}
                                 checked={
                                    !!formData?.medicineTakingsDays?.includes(i)
                                 }
                                 onClick={() => {
                                    const value = i;
                                    const isExits =
                                       formData.medicineTakingsDays.find(
                                          (item) => item === value
                                       );
                                    const rest =
                                       formData.medicineTakingsDays.filter(
                                          (item) => item !== value
                                       );
                                    if (isExits) {
                                       setFormData({
                                          ...formData,
                                          medicineTakingsDays: [...rest],
                                       });
                                    } else {
                                       setFormData({
                                          ...formData,
                                          medicineTakingsDays: [...rest, i],
                                       });
                                    }
                                 }}
                              />
                           </div>
                        ))}
                     </div>
                     <InputText
                        type="time"
                        label="RemindAt"
                        name="remindAt"
                        initialValue={reminder.remindAt}
                        containerStyles="border-[1.4px] rounded-md  border-black px-3 w-full py-1 placeholder:black"
                        action={handleRemindAt}
                     ></InputText>
                     <div className="md:col-span-2 flex justify-end">
                        <ActionButton
                           containerStyles="text-sm bg-accent uppercase text-white px-5 py-1 rounded-lg  hover:bg-black hover:tracking-widest "
                           isDisabled={
                              !formData?.medicineName ||
                              !formData?.dosage ||
                              !formData?.phone ||
                              !formData?.careTakerName ||
                              !formData?.careTakerPhone ||
                              !formData?.remindAt ||
                              formData?.medicineTakingsDays?.length < 1 ||
                              !formData?.reminderEndDate ||
                              !formData.reminderEndDate
                           }
                           text="save"
                        ></ActionButton>
                     </div>
                  </div>
                  {loading && <Loading></Loading>}
               </form>
            </CommonModal>
         )}
      </div>
   );
};

export default ReminderCard;
