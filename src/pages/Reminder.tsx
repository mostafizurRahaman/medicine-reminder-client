import ActionButton from "../components/ActionButton";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import "react-day-picker/dist/style.css";
import { CommonModal, InputText } from "../components";
import { ReminderErrors, ReminderTypes } from "../types/interfaces";
import { ChangeEventType } from "../types/types";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
const Reminder = () => {
   const [showModal, setShowModal] = useState<boolean>(false);
   const { user } = useContext(AuthContext);

   const [formData, setFormData] = useState<ReminderTypes>({
      medicineName: "",
      userName: user?.name,
      email: user?.email,
      dosage: 0,
      phone: "",
      careTakerName: "",
      careTakerPhone: "",
      medicineTakingsDays: [],
      reminderDate: "",
      remindAt: "",
   });
   const [errors, setErrors] = useState<ReminderErrors>({
      medicineName: "",
      dosage: "",
      phone: "",
      careTakerName: "",
      careTakerPhone: "",
      medicineTakingsDays: "",
      reminderDate: "",
      remindAt: "",
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
      if (phone === "") {
         setErrors({ ...errors, phone: "phone number should't be empty" });
         setFormData({ ...formData, phone: "" });
      } else if (!/^[\d-\s]+$/.test(phone)) {
         setErrors({ ...errors, phone: "number should be valid" });
         setFormData({ ...formData, phone: "" });
      } else {
         setErrors({ ...errors, phone: "" });
         setFormData({ ...formData, phone: phone });
      }
   };

   const handleReminderDate: ChangeEventType = (e) => {
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

   const handleRemindAt: ChangeEventType = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      const currentTime = new Date().getTime();
      const selectedDate = new Date(formData.reminderDate);
      selectedDate.setHours(parseInt(value?.split(":")[0]));
      selectedDate.setMinutes(parseInt(value?.split(":")[1]));
      const selectTime = selectedDate.getTime();
      console.log(currentTime, selectTime);

      if (!value) {
         setErrors({ ...errors, [name]: "please select a time" });
         setFormData({ ...formData, [name]: "" });
      } else if (selectTime - currentTime < 0) {
         setErrors({
            ...errors,
            [name]: "reminder time shouldn't be previous time",
         });
         setFormData({ ...formData, [name]: "" });
      } else {
         setErrors({
            ...errors,
            [name]: "",
         });
         setFormData({ ...formData, [name]: value });
      }
   };
   console.log(formData, errors);

   return (
      <div className="flex items-center justify-between px-5">
         <h1 className="text-2xl font-bold uppercase text-blue-500 ">
            My Reminders
         </h1>
         <ActionButton
            containerStyles="rounded-lg hover:scale-75 px-5 py-1 bg-blue-500 hover:bg-secondary  text-white "
            text="Create new"
            action={() => setShowModal(true)}
         ></ActionButton>

         {showModal && (
            <CommonModal setShow={setShowModal}>
               <form className="">
                  <h1>Create Reminder</h1>
                  <div className="grid  md:grid-cols-2 gap-3 ">
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
                        name="reminderDate"
                        label="Reminder Date "
                        placeholder="Reminder Date"
                        action={handleReminderDate}
                        err={errors.reminderDate}
                        containerStyles="border-[1.4px] rounded-md  border-black px-3 w-full py-1 placeholder:black "
                     ></InputText>
                     <InputText
                        type="time"
                        name="remindAt"
                        label="ReminderAt"
                        placeholder="ReminderAt"
                        action={handleRemindAt}
                        err={errors.remindAt}
                        containerStyles="border-[1.4px] rounded-md  border-black px-3 w-full py-1 placeholder:black "
                        disabled={!formData?.reminderDate}
                     ></InputText>
                  </div>
               </form>
            </CommonModal>
         )}
      </div>
   );
};

export default Reminder;
