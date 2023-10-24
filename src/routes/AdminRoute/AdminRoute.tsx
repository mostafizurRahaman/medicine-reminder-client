import { useContext } from "react";
import { ChildrenProps } from "../../types/interfaces";
import { AuthContext } from "../../Context/AuthProvider";
import { Loading } from "../../components";
import { Location, Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }: ChildrenProps) => {
   const { user, loading } = useContext(AuthContext);
   const location: Location = useLocation();

   if (loading) {
      return <Loading></Loading>;
   }

   if (user?.email && user?.status === "active" && user?.role === "admin") {
      return children;
   }
   return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
