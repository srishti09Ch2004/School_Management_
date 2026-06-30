// import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import WhyChoose from "../components/WhyChoose";
import DashboardRoles from "../components/DashboardRoles";
import Testimonials from "../components/Testimonials";
// import Footer from "../components/Footer";

function Home() {
  return (
    <>
      {/* <Header /> */}
      <Navbar />
      <Hero />
      <Features />
      <WhyChoose />
      <DashboardRoles />
      <Testimonials />
      {/* <Footer /> */}
    </>
  );
}

export default Home;