import "./App.css";
import { Route, Routes, Link, useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Profile from "./components/Profile";


function App() {

 

  return (
    <div className="App">
      <h1>Webapp</h1>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myprofile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
