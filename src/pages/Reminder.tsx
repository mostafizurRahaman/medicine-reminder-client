import ActionButton from "../components/ActionButton";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import "react-day-picker/dist/style.css";
import {
   CommonModal,
   InputSelection,
   InputText,
   Loading,
   ReminderCard,
} from "../components";
import {
   ReminderCardProps,
   ReminderErrors,
   ReminderTypes,
} from "../types/interfaces";
import { ChangeEventType, onSubmitType } from "../types/types";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import toast from "react-hot-toast";
import { accessToken, baseURL } from "../configs/libs";
import { useQuery } from "@tanstack/react-query";
const Reminder = () => {
   const [showModal, setShowModal] = useState<boolean>(false);
   const { user, logOut } = useContext(AuthContext);
   const [loading, setLoading] = useState(false);

   const [formData, setFormData] = useState<ReminderTypes>({
      medicineName: "",
      userName: user?.name,
      email: user?.email,
      dosage: 0,
      frequency: "",
      phone: "",
      careTakerName: "",
      careTakerPhone: "",
      medicineTakingsDays: [],
      reminderStartDate: "",
      reminderEndDate: "",
      remindAt: "",
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

   const {
      data: reminders = [],
      isLoading,
      refetch,
   } = useQuery({
      queryKey: ["reminders", user?.email],
      queryFn: async () => {
         if (user?.email) {
            const res = await fetch(
               `${baseURL}/reminder/email?email=${user?.email}`,
               {
                  method: "GET",
                  headers: {
                     "content-type": "application/json",
                     authorization: `Bearer ${accessToken}`,
                  },
               }
            );
            if (res.status === 403 || res.status === 401) {
               return logOut();
            }
            const data = await res.json();
            console.log(data);
            return data.data;
         }
         return [];
      },
   });
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

   const createReminder: onSubmitType = async (e) => {
      e.preventDefault();
      const { careTakerName, careTakerPhone, ...others } = formData;
      try {
         setLoading(true);
         const res = await fetch(`${baseURL}/reminder`, {
            method: "POST",
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
            setFormData({} as ReminderTypes);
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

   const handleDelete = async (_id: string) => {
      try {
         console.log(_id);
         const res = await fetch(`${baseURL}/reminder/${_id}`, {
            method: "DELETE",
            headers: {
               "content-type": "application/json",
               authorization: `Bearer ${accessToken}`,
            },
         });
         if (res.status === 403 || res.status === 401) {
            return logOut();
         }

         const data = await res.json();
         if (data.status === "success") {
            toast.success(data.message);
            refetch();
         } else {
            toast.error(data.message);
         }
      } catch (err: any) {
         toast.error(err.message);
         console.log(err);
      }
   };

   console.log(reminders);
   return (
      <div>
         <div className="flex items-center justify-between px-5">
            <h1 className="text-2xl font-bold uppercase text-blue-500  ">
               My Reminders
            </h1>
            <ActionButton
               containerStyles="rounded-lg hover:scale-75 px-5 py-1 bg-blue-500 hover:bg-secondary  text-white "
               text="Create new"
               action={() => setShowModal(true)}
            ></ActionButton>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {reminders?.map((i: ReminderCardProps) => (
               <ReminderCard
                  key={i?._id}
                  handleDelete={handleDelete}
                  reminder={i}
                  refetch={refetch}
               ></ReminderCard>
            ))}
         </div>

         {showModal && (
            <CommonModal setShow={setShowModal}>
               <form className="pb-5" onSubmit={createReminder}>
                  <h1 className="text-2xl font-semibold uppercase  py-5">
                     Create Reminder
                  </h1>
                  <div className="grid grid-cols-1  md:grid-cols-2 gap-3 ">
                     <InputText
                        type="text"
                        name="medicineName"
                        label="Medicine Name"
                        placeholder="medicine name"
                        action={handleInput}
                        err={errors.medicineName}
                        containerStyles="border-[1.4px] rounded-md  border-black px-3 w-full py-1 placeholder:black "
                     ></InputText>
                     <InputText
                        type="number"
                        name="dosage"
                        label="Medicine dosage"
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
                        field="frequency"
                        options={["daily", "weekly", "monthly"]}
                        selectOp="Select frequency"
                     ></InputSelection>
                     <InputText
                        type="text"
                        name="phone"
                        label="your phone"
                        placeholder="your phone"
                        action={handlePhone}
                        err={errors.phone}
                        containerStyles="border-[1.4px] rounded-md  border-black px-3 w-full py-1 placeholder:black "
                     ></InputText>
                     <InputText
                        type="text"
                        name="careTakerName"
                        label="careTakerName"
                        placeholder="caretaker name"
                        action={handleInput}
                        err={errors.careTakerName}
                        containerStyles="border-[1.4px] rounded-md  border-black px-3 w-full py-1 placeholder:black "
                     ></InputText>
                     <InputText
                        type="text"
                        name="careTakerPhone"
                        label="caretaker phone"
                        placeholder="caretaker phone"
                        action={handlePhone}
                        err={errors.careTakerPhone}
                        containerStyles="border-[1.4px] rounded-md  border-black px-3 w-full py-1 placeholder:black "
                     ></InputText>
                     <InputText
                        type="date"
                        name="reminderStartDate"
                        label="Reminder Start Date "
                        placeholder="start Date"
                        action={handleReminderStartDate}
                        err={errors.reminderStartDate}
                        containerStyles="border-[1.4px] rounded-md  border-black px-3 w-full py-1 placeholder:black "
                     ></InputText>
                     <InputText
                        type="date"
                        name="reminderEndDate"
                        label="Reminder End Date "
                        placeholder="start Date"
                        action={handleReminderEndDate}
                        err={errors.reminderEndDate}
                        containerStyles="border-[1.4px] rounded-md  border-black px-3 w-full py-1 placeholder:black "
                     ></InputText>

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

export default Reminder;
