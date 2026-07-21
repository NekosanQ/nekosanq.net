"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const ScrollDownIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY < 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    isVisible && (
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <FontAwesomeIcon icon={faChevronDown} className="scroll-indicator text-slate-500 text-3xl" />
      </div>
    )
  );
};

export default ScrollDownIndicator;
