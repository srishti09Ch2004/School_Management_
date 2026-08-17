import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Demo from "./pages/Demo";

import About from "./components/About";
import Modules from "./components/Modules";
import Contact from "./components/Contact";
import Pricing from "./components/Pricing";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard";
import TeacherDashboard from "./pages/Dashboard/Teacher/TeacherDashboard";
import StudentDashboard from "./pages/Dashboard/Student/StudentDashboard";
import ParentDashboard from "./pages/Dashboard/Parent/ParentDashboard";
import PrincipalDashboard from "./pages/Dashboard/Principal/PrincipalDashboard";


function App() {
  const location = useLocation();

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname.startsWith("/admin") ||
    location.pathname.startsWith("/teacher") ||
    location.pathname.startsWith("/student") ||
    location.pathname.startsWith("/parent") ||
    location.pathname.startsWith("/principal");

  return (
    <>
      <Toaster position="top-right" />

      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        <Route
  path="/teacher"
  element={
    <ProtectedRoute allowedRole="teacher">
      <TeacherDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/student"
  element={
    <ProtectedRoute allowedRole="student">
      <StudentDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/parent"
  element={
    <ProtectedRoute allowedRole="parent">
      <ParentDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/principal"
  element={
    <ProtectedRoute allowedRole="principal">
      <PrincipalDashboard />
    </ProtectedRoute>
  }
/>
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;