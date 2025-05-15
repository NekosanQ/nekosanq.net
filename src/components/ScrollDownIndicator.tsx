"use client";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const ScrollDownIndicator = () => {
  return (
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center">
      <p className="text-sm text-gray-500 mb-2"></p>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <FontAwesomeIcon
          icon={faChevronDown}
          className="text-gray-500 text-xl"
        />
      </motion.div>
    </div>
  );
}
export default ScrollDownIndicator;
