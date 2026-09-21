import React from "react";
import { Navigate, useLocation } from "react-router-dom";
function ProtectedRoute({children}){const location=useLocation(); const user=localStorage.getItem("psk_current_user"); return user?children:<Navigate to="/login" replace state={{from:location.pathname}}/>}
export default ProtectedRoute;
