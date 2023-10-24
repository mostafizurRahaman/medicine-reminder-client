import { useLottie } from "lottie-react";
import { InputSelection, Loading } from "../components";
import InputText from "../components/InputText";
import { RegisterError, RegisterType } from "../types/interfaces";
import { ChangeEventType, onSubmitType } from "../types/types";
import { useState } from "react";
import register from "../assets/register.json";
import ActionButton from "../components/ActionButton";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { baseURL } from "../configs/libs";
import toast from "react-hot-toast";
import ErrorMessage from "../components/ErrorMessage";
const Register = () => {
   const [formData, setFormData] = useState<RegisterType>({
      name: "",
      email: "",
      phone: "",
      password: "",
      role: "",
      confirm: "",
   });

   const [errors, setErrors] = useState<RegisterError>({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirm: "",
      role: "",
      general: "",
   });
   const navigate: NavigateFunction = useNavigate();

   const [loading, setLoading] = useState(false);
   const options = {
      animationData: register,
      loop: true,
   };

   const { View } = useLottie(options);
   const handleName: ChangeEventType = (e) => {
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
   const handleEmail: ChangeEventType = (e) => {
      const name = e?.target?.name;
      const value = e.target.value.trim();
      if (!value.length) {
         setErrors({ ...errors, [name]: "email shouldn't be empty" });
         setFormData({ ...formData, [name]: "" });
      } else if (
         !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
      ) {
         setErrors({ ...errors, [name]: "Please provide a email" });
         setFormData({ ...formData, [name]: "" });
      } else {
         setErrors({ ...errors, [name]: "" });
         setFormData({ ...formData, [name]: value });
      }
   };

   const handlePassword: ChangeEventType = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      if (value.length <= 0) {
         setErrors({ ...errors, [name]: "password shouldn'b be empty  " });
         setFormData({ ...formData, [name]: "" });
      } else if (!/[A-Z]/.test(value)) {
         setErrors({ ...errors, [name]: "must have a  capital letter " });
         setFormData({ ...formData, [name]: "" });
      } else if (!/[a-z]/.test(value)) {
         setErrors({ ...errors, [name]: "must  have a small letter " });
         setFormData({ ...formData, [name]: "" });
      } else if (!/[0-9]/.test(value)) {
         setErrors({ ...errors, [name]: "must  have a digit" });
         setFormData({ ...formData, [name]: "" });
      } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~]/.test(value)) {
         setErrors({ ...errors, [name]: "must  have a special character" });
         setFormData({ ...formData, [name]: "" });
      } else if (value.length <= 8) {
         setErrors({
            ...errors,
            [name]: "password must be 8 character or more",
         });
         setFormData({ ...formData, [name]: "" });
      } else {
         if (formData.confirm) {
            if (formData.password === formData.confirm) {
               setErrors({ ...errors, [name]: "Password not matched" });
               setFormData({ ...formData, [name]: "" });
            } else {
               setErrors({ ...errors, [name]: "" });
               setFormData({ ...formData, [name]: value });
            }
         } else {
            setErrors({ ...errors, [name]: "" });
            setFormData({ ...formData, [name]: value });
         }
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
   const handleConfirm: ChangeEventType = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      if (value.length <= 0) {
         setErrors({ ...errors, [name]: "password shouldn'b be empty  " });
         setFormData({ ...formData, [name]: "" });
      } else if (!/[A-Z]/.test(value)) {
         setErrors({ ...errors, [name]: "must have a  capital letter " });
         setFormData({ ...formData, [name]: "" });
      } else if (!/[a-z]/.test(value)) {
         setErrors({ ...errors, [name]: "must  have a small letter " });
         setFormData({ ...formData, [name]: "" });
      } else if (!/[0-9]/.test(value)) {
         setErrors({ ...errors, [name]: "must  have a digit" });
         setFormData({ ...formData, [name]: "" });
      } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~]/.test(value)) {
         setErrors({ ...errors, [name]: "must  have a special character" });
         setFormData({ ...formData, [name]: "" });
      } else if (value.length <= 8) {
         setErrors({
            ...errors,
            [name]: "password must be 8 character or more",
         });
         setFormData({ ...formData, [name]: "" });
      } else {
         if (formData.password) {
            if (formData.password === formData.confirm) {
               setErrors({ ...errors, [name]: "Password not matched" });
               setFormData({ ...formData, [name]: "" });
            } else {
               setErrors({ ...errors, [name]: "" });
               setFormData({ ...formData, [name]: value });
            }
         } else {
            setErrors({ ...errors, [name]: "" });
            setFormData({ ...formData, [name]: value });
         }
      }
   };

   console.log(formData, errors);

   const handleSubmit: onSubmitType = async (e) => {
      setErrors({ ...errors, general: "" });
      setLoading(true);
      e.preventDefault();
      const { confirm, ...user } = formData;
      try {
         const res = await fetch(`${baseURL}/user/sign-up`, {
            method: "POST",
            headers: {
               "content-type": "application/json",
            },
            body: JSON.stringify(user),
         });
         const data = await res.json();
         if (data.status === "success") {
            toast.success(data.message);
            setLoading(false);
            navigate("/login");
         } else {
            setLoading(false);
            toast.error(data.message);
            setErrors({ ...errors, general: data.message });
         }
      } catch (err: any) {
         setLoading(false);
         toast.error(err?.message);
         setErrors({ ...errors, general: err.message });
         console.log(err);
      }
   };

   return (
      <div className="  min-h-screen flex items-center justify-center">
         <div className="md:w-1/2 w-full px-5 md:px-10">
            <form
               onSubmit={handleSubmit}
               className="grid grid-cols-2 gap-3 bg-white px-5 py-10 rounded-2xl shadow-[3px_3px_3px_3px_#ddd] relative"
            >
               <h1 className=" text-accent col-span-2 text-4xl font-bold capitalize">
                  Sign Up
               </h1>
               <InputText
                  type="text"
                  label="Your Name"
                  name="name"
                  placeholder="Enter your name"
                  action={handleName}
                  containerStyles="inputText"
                  err={errors.name}
               ></InputText>
               <InputText
                  type="email"
                  label="Your Email"
                  name="email"
                  placeholder="Enter your email"
                  action={handleEmail}
                  err={errors.email}
                  containerStyles="inputText"
               ></InputText>
               <InputText
                  type="password"
                  label="Your password"
                  name="password"
                  placeholder="Enter your password"
                  action={handlePassword}
                  containerStyles="inputText"
                  err={errors.password}
               ></InputText>
               <InputText
                  type="password"
                  label="Your confirm"
                  name="confirm"
                  placeholder="Enter your confirm"
                  action={handleConfirm}
                  containerStyles="inputText"
                  err={errors.confirm}
               ></InputText>
               <InputText
                  type="text"
                  label="Your phon"
                  name="your phone"
                  placeholder="Enter your phone number"
                  action={handlePhone}
                  containerStyles="inputText"
                  err={errors.phone}
               ></InputText>
               <InputSelection
                  label="Select role"
                  data={formData}
                  setData={setFormData}
                  field="role"
                  options={["patient"]}
                  selectOp="Select your Role"
               ></InputSelection>
               <ActionButton
                  text="Sign Up"
                  containerStyles="bg-accent hover:bg-black text-white   px-3  rounded-lg  text-semibold text-lg font-medium py-1 mx-auto col-span-2 mt-5"
                  isDisabled={
                     !formData.name ||
                     !formData.email ||
                     !formData.password ||
                     !formData.confirm ||
                     !formData.phone ||
                     !formData.role
                  }
               ></ActionButton>
               <div className="col-span-2 text-sm text-center">
                  Already have an account? please{" "}
                  <Link
                     to="/login"
                     className=" text-accent hover:text-info duration-300"
                  >
                     login
                  </Link>
               </div>
               <div className="col-span-2 text-sm text-center">
                  {errors.general && (
                     <ErrorMessage text={errors.general}></ErrorMessage>
                  )}
               </div>
            </form>
         </div>
         <div className="md:w-1/2 w-full flex items-center justify-center">
            <div className=" -z-[1] max-w-[3/5]">{View}</div>
         </div>
         {loading && <Loading></Loading>}
      </div>
   );
};

export default Register;
