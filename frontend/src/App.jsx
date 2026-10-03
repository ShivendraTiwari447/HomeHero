
import "./App.css";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
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

export default App;

