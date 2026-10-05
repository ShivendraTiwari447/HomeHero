
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ServicesPage from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Booking from "./pages/Booking";

function Home() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/services" element={<ServicesPage />} />

      <Route
        path="/services/:id"
        element={<ServiceDetails />}
      />

      <Route
        path="/booking/:id"
        element={<Booking />}
      />
    </Routes>
  );
}

export default App;
