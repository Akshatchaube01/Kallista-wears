"use client"
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  setLoading: (loading: boolean) => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ setLoading }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 500); // Small delay before transition
          return 100;
        }
        return prev + 10; // Increment progress
      });
    }, 200); // Speed of loading

    return () => clearInterval(interval);
  }, [setLoading]);

  return (
    <motion.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-gray-900 text-white z-50"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress === 100 ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-2xl font-bold mb-4">Loading...</h1>
      <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-purple-500"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ ease: "linear", duration: 0.2 }}
        ></motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;
