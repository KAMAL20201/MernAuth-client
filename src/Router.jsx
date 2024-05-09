import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import HomePage from "./views/HomePage/HomePage";
import Home from "./pages/Home";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage children={<Home />} />} />
      <Route path="/about" element={<HomePage children={<About />} />} />
      <Route
        path="/profile"
        element={<HomePage children={<PrivateRoute component={Profile} />} />}
      />
      <Route path="/sign-in" element={<HomePage children={<SignIn />} />} />
      <Route path="/sign-up" element={<HomePage children={<SignUp />} />} />
    </Routes>
  );
};

export default Router;
