import { createContext, useEffect, useState } from "react";
import { AuthInfoType, ChildrenProps, User } from "../types/interfaces";
import { baseURL } from "../configs/libs";
const accessToken = localStorage.getItem("accessToken");
export const AuthContext = createContext({} as AuthInfoType);

const AuthProvider = ({ children }: ChildrenProps) => {
   const [user, setUser] = useState<User | null>(null);
   // const [token, setToken] = useState<string | null>(null);
   const [loading, setLoading] = useState<boolean>(true);

   useEffect(() => {
      fetch(`${baseURL}/user/me`, {
         headers: {
            "content-type": "application/json",
            authorization: `Bearer ${accessToken}`,
         },
      })
         .then((res) => res.json())
         .then((data) => {
            console.log(data);
            if (data.status === "success") {
               setUser(data.data);
               setLoading(false);
            }
         })
         .catch((err) => {
            console.log(err);
            setLoading(false);
         })
         .finally(() => {
            setLoading(false);
         });
   }, []);

   const logOut = () => {
      localStorage.removeItem("accessToken");
      setUser(null);
   };
   const authInfo: AuthInfoType = { user, setUser, loading, logOut };
   return (
      <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
   );
};

export default AuthProvider;
