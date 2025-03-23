import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children})=>{
  const {token,error} = useSelector((state)=>state.auth);

  return token ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute;