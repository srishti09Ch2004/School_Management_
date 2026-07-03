import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./components/About";
import Modules from "./components/Modules";
import Contact from "./components/Contact";
import Pricing from "./components/Pricing";

function App() {
    const location = useLocation();
    const hideLayout = location.pathname === "/login";

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>

       {!hideLayout && <Footer />}
    </>
  );
}

export default App;