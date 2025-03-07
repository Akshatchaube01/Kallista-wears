import React from "react";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

function Footer() {
  return (
    <motion.footer 
      className="bg-gray-900 text-gray-400 py-12"
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Footer Grid Layout */}
        <motion.div 
          className="grid md:grid-cols-4 gap-8"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          {/* About Section */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <h4 className="text-xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
              Kallista Wears
            </h4>
            <p className="text-sm">
              Elevating fashion to new heights with style and sustainability.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <h4 className="text-xl font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-500 transition duration-300">Home</a></li>
              <li><a href="#" className="hover:text-purple-500 transition duration-300">About</a></li>
              <li><a href="#" className="hover:text-purple-500 transition duration-300">Collections</a></li>
              <li><a href="#contact" className="hover:text-purple-500 transition duration-300">Contact</a></li>
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <h4 className="text-xl font-bold text-white mb-4">Support</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-purple-500 transition duration-300">FAQ</a></li>
              <li><a href="#" className="hover:text-purple-500 transition duration-300">Shipping</a></li>
              <li><a href="#" className="hover:text-purple-500 transition duration-300">Returns</a></li>
              <li><a href="#" className="hover:text-purple-500 transition duration-300">Size Guide</a></li>
            </ul>
          </motion.div>

          {/* Social Media */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <h4 className="text-xl font-bold text-white mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-500 transition duration-300">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-purple-500 transition duration-300">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-purple-500 transition duration-300">
                <Twitter className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright Section */}
        <motion.div 
          className="border-t border-gray-800 mt-8 pt-8 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <p>&copy; {new Date().getFullYear()} Kallista Wears. All rights reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}

export default Footer;
