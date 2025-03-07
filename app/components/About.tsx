import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="py-20 px-4 bg-gray-800">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80"
            alt="Fashion Store"
            className="rounded-lg shadow-2xl"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center md:text-left mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            About Us
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            At Kallista Wears, we believe that fashion is more than just clothing – 
            it's a form of self-expression that empowers individuals to showcase their unique personality. 
            Founded with a passion for style and quality, we've been crafting exceptional fashion pieces that 
            combine contemporary designs with timeless elegance.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed mt-4">
            Our commitment to sustainability and ethical fashion sets us apart, 
            ensuring that every piece not only looks good but feels good to wear and own.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
