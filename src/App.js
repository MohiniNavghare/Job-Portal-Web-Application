import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

const MainPage = lazy(() => import("./pages/MainPage"));
const JobInfoPage = lazy(() => import("./pages/JobInfoPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

function App(){
  return <BrowserRouter>
    <Navbar />
    <Suspense fallback={<div className="route-loading"><div className="spinner"/><p>Loading...</p></div>}>
      <Routes>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/job-info" element={<JobInfoPage/>}/>
        <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Routes>
    </Suspense>
  </BrowserRouter>
}
export default App;
