"use client"
import React, { useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import WhyChooseUs from "./components/WhyChooseUs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import { motion } from "framer-motion";

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {loading ? (
        <LoadingScreen setLoading={setLoading} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Hero />
          <About />
          <WhyChooseUs />
          <Contact />
          <Footer />
        </motion.div>
      )}
    </div>
  );
};

export default App;
