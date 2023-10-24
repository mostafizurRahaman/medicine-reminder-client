import { SyncLoader } from "react-spinners";

const Loading = () => {
   return (
      <div
         className={`flex  justify-center items-center h-screen absolute  top-0 left-0 w-full`}
      >
         <SyncLoader></SyncLoader>
      </div>
   );
};

export default Loading;
