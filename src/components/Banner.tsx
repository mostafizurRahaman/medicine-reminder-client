import { useNavigate } from "react-router-dom";
import ActionButton from "./ActionButton";
import { ClickEventType } from "../types/types";
import { useLottie } from "lottie-react";
import bannerImg from "../assets/banner.json";
import { BiPlus } from "react-icons/bi";

const Banner = () => {
   const navigate = useNavigate();
   const handleNavigation: ClickEventType = () => {
      navigate("/dashboard/reminder");
   };

   const options = {
      animationData: bannerImg,
      loop: true,
   };

   const { View } = useLottie(options);
   return (
      <header className="flex md:flex-row flex-col gap-10 md:gap-5 items-center justify-center w-full  px-5 h-[80vh]   lg:px-10 py-24 ">
         <div className="  py-7 w-full md:w-1/2 flex flex-col gap-3">
            <h1 className=" text-5xl md:text-7xl  font-semibold  capitalize   ">
               <small className=" text-2xl md:text-4xl text-info -mb-10">
                  {" "}
                  Use Medication Reminder
               </small>
               <br />
               <small className=" text-4xl md:text-6xl -mt-[20px] text-accent ">
                  Get Medicine At Time
               </small>
            </h1>
            <p className=" text-xl md:text-2xl capitalize">
               Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui
               dignissimos molestias alias quae, perspiciatis nesciunt
            </p>
            <ActionButton
               text="Add a New"
               children={
                  <BiPlus
                     className="tracking-widest text-white"
                     size={20}
                  ></BiPlus>
               }
               containerStyles="inline-block hover:bg-info mr-auto text-xl px-10 py-1 flex capitalize"
               action={handleNavigation}
            ></ActionButton>
         </div>
         <div className="w-full md:w-1/2 ">{View}</div>
      </header>
   );
};

export default Banner;
