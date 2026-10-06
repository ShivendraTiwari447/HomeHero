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

import MyBookings from "./pages/MyBookings";

import ProviderBookings from "./pages/ProviderBookings";

import CustomerDashboard from "./pages/CustomerDashboard";

import ProviderDashboard from "./pages/ProviderDashboard";

import AdminDashboard from "./pages/AdminDashboard";

import AdminUsers from "./pages/AdminUsers";

import AdminServices from "./pages/AdminServices";

import ProviderServices from "./pages/ProviderServices";

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
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Services */}
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/services/:id" element={<ServiceDetails />} />

      {/* Booking */}
      <Route path="/booking/:id" element={<Booking />} />

      {/* Customer */}
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route
        path="/customer-dashboard"
        element={<CustomerDashboard />}
      />

      {/* Provider */}
      <Route
        path="/provider-bookings"
        element={<ProviderBookings />}
      />

      <Route
        path="/provider-dashboard"
        element={<ProviderDashboard />}
      />

      <Route
        path="/provider-services"
        element={<ProviderServices />}
      />

      {/* Admin */}
      <Route
        path="/admin-dashboard"
        element={<AdminDashboard />}
      />

      <Route path="/admin-users" element={<AdminUsers />} />

      <Route
        path="/admin-services"
        element={<AdminServices />}
      />
    </Routes>
  );
}

export default App;