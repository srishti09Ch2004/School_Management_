import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Demo from "./pages/Demo";

import About from "./components/About";
import Modules from "./components/Modules";
import Contact from "./components/Contact";
import Pricing from "./components/Pricing";

import AdminDashboard from "./pages/Dashboard/AdminDashboard";
// Future me
// import TeacherDashboard from "./pages/Dashboard/TeacherDashboard";
// import StudentDashboard from "./pages/Dashboard/StudentDashboard";
// import ParentDashboard from "./pages/Dashboard/ParentDashboard";
// import PrincipalDashboard from "./pages/Dashboard/PrincipalDashboard";

function App() {
  const location = useLocation();

  const dashboardRoutes = [
    "/admin",
    "/teacher",
    "/student",
    "/parent",
    "/principal",
  ];

  const hideLayout =
    location.pathname === "/login" ||
    dashboardRoutes.includes(location.pathname);

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminDashboard />} />

        {/* Future Routes */}
        {/* <Route path="/teacher" element={<TeacherDashboard />} /> */}
        {/* <Route path="/student" element={<StudentDashboard />} /> */}
        {/* <Route path="/parent" element={<ParentDashboard />} /> */}
        {/* <Route path="/principal" element={<PrincipalDashboard />} /> */}
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;