import "./App.css";
import { Route, Routes, Link, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import MyProfile from "./components/MyProfile";
import Settings from "./components/Settings";

function App() {
  const ProtectedRoute = ({ children, redirectTo }) => {
    return localStorage.getItem("loggedIn") ==='true' ? (
      children
    ) : (
      <Navigate to={redirectTo} />
    );
  };

  const LoggedIn = ({ children, redirectTo }) => {
    return localStorage.getItem("loggedIn"===false) ? (
      children
    ) : (
      <Navigate to={redirectTo} />
    );
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            // <LoggedIn redirectTo="/">
              <Login />
            // </LoggedIn>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            // <ProtectedRoute redirectTo="/login">
            <Home />
            // </ProtectedRoute>
          }
        />
        <Route
          path="/myprofile"
          element={
            <ProtectedRoute redirectTo="/login">
              <MyProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute redirectTo="/login">
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
