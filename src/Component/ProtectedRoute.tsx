import React, { useContext, useEffect, useState } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { HackathonContext } from "../context/hackathonContext";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

const ProtectedRoute: React.FC = () => {
 
  const location = useLocation();

  const { userAuth } = useContext(HackathonContext);

  if(!userAuth) return <Navigate to="/signin" state={{ from: location }} replace  />;

  if(userAuth) return <Outlet />;
};

export default ProtectedRoute;
