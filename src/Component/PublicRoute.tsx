import React, { useContext, useEffect } from "react";
import {  Outlet, useLocation, useNavigate } from "react-router-dom";
import { HackathonContext } from "../context/hackathonContext";

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

const PublicRoute: React.FC = () => {
 
  const location = useLocation();
  const navigate = useNavigate();

  const { userAuth } = useContext(HackathonContext);

  
  useEffect(() => {
    const from = location.state?.from.pathname || '/admin-staff';
    if(userAuth && from && from !== location.pathname) navigate(from, {replace: true});

  }, [userAuth, location, navigate]);

  if (!userAuth) return <Outlet />;
};

export default PublicRoute;
