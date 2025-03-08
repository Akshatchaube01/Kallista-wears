"use client"
import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Star, Clock } from "lucide-react";

const features = [
  {
    icon: <ShoppingBag size={48} className="text-purple-500" />,
    title: "Premium Quality",
    desc: "Carefully selected materials and expert craftsmanship",
  },
  {
    icon: <Star size={48} className="text-purple-500" />,
    title: "Unique Designs",
    desc: "Exclusive collections that stand out",
  },
  {
    icon: <Clock size={48} className="text-purple-500" />,
    title: "Fast Delivery",
    desc: "Quick and reliable shipping worldwide",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 px-4 bg-gray-900">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h2
          className="text-4xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Why Choose Us
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center bg-gray-800 rounded-lg p-6 shadow-lg hover:bg-gray-700 transition duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-gray-700 rounded-full mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
