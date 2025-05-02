'use client'

import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function BackToTop() {
  const [visible, setVisible] = useState<boolean>(false);

  const toggleVisible = (): void => {
    const scrolled: number = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);
    return () => window.removeEventListener("scroll", toggleVisible);
  }, []);

  return (
    <button
      className={` hidden md:block fixed bottom-5 right-5 bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-full shadow-lg z-[96] lg:z-[96] ${
        visible ? "block" : "hidden"
      }`}
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <FaArrowUp />
    </button>
  );
};
