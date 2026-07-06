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

import AdminDashboard from "./pages/Dashboard/Admin/AdminDashboard";

function App() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname.startsWith("/admin");

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

        {/* Dashboard */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default App;