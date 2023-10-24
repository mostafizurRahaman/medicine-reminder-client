import { useLottie } from "lottie-react";
import { Loading } from "../components";
import InputText from "../components/InputText";
import { LoginError, LoginType } from "../types/interfaces";
import { ChangeEventType, onSubmitType } from "../types/types";
import { useContext, useState } from "react";
import register from "../assets/register.json";
import ActionButton from "../components/ActionButton";
import {
   Link,
   Location,
   NavigateFunction,
   useLocation,
   useNavigate,
} from "react-router-dom";
import { baseURL } from "../configs/libs";
import toast from "react-hot-toast";
import ErrorMessage from "../components/ErrorMessage";
import { AuthContext } from "../Context/AuthProvider";
const Login = () => {
   const {setUser} = useContext(AuthContext); 
   const [formData, setFormData] = useState<LoginType>({
      email: "",
      password: "",
   });

   const [errors, setErrors] = useState<LoginError>({
      email: "",
      password: "",
      general: "",
   });
   const location: Location = useLocation();
   const from: string = location?.state?.from.pathname || "/dashboard";
   const navigate: NavigateFunction = useNavigate();

   const [loading, setLoading] = useState(false);
   const options = {
      animationData: register,
      loop: true,
   };

   const { View } = useLottie(options);

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
      } else {
         setErrors({ ...errors, [name]: "" });
         setFormData({ ...formData, [name]: value });
      }
   };

   const handleSubmit: onSubmitType = async (e) => {
      setErrors({ ...errors, general: "" });
      setLoading(true);
      e.preventDefault();

      try {
         const res = await fetch(`${baseURL}/user/sign-in`, {
            method: "POST",
            headers: {
               "content-type": "application/json",
            },
            body: JSON.stringify(formData),
         });
         const data = await res.json();
         if (data.status === "success") {
            toast.success(data.message);
            setUser(data.data);
            setLoading(false);
            localStorage.setItem("accessToken", data.data.accessToken);
            navigate(from, { replace: true });
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
               className="grid grid-cols-1 gap-3 bg-white px-5 py-10 rounded-2xl shadow-[3px_3px_3px_3px_#ddd] relative"
            >
               <h1 className=" text-accent text-4xl font-bold capitalize">
                  Sign In
               </h1>

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

               <ActionButton
                  text="Sign In"
                  containerStyles="bg-accent hover:bg-black text-white   px-3  rounded-lg  text-semibold text-lg font-medium py-1 mx-auto  mt-5"
                  isDisabled={!formData.email || !formData.password}
               ></ActionButton>
               <div className=" text-sm text-center gap-1">
                  have No account? please
                  <Link
                     to="/register"
                     className=" text-accent hover:text-info duration-300"
                  >
                     Sign IN
                  </Link>
               </div>
               <div className=" text-sm text-center">
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

export default Login;
