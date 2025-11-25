import React, { useContext } from "react";
import AuthProvider from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../provider/AuthContext";

const PrivateRoute = ({children}) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-green-600 font-semibold">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
  }
  return children;
};

export default PrivateRoute;
