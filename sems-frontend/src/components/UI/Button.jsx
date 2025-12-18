import React from "react";
import { motion } from "framer-motion";

const Button = ({ children, ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
      className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold shadow-md hover:shadow-xl transition-all"

    >
      {children}
    </motion.button>
  );
};

export default Button;
