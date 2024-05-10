import React from "react";
import { Navigate } from "react-router-dom";
import { getCookie } from "../../utils/constants";

const PrivateRoute = ({ component: Component }) => {
  const accessTokenCookie = getCookie("access_token");

  return accessTokenCookie ? <Component /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
