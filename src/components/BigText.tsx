"use client";

import React, { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import SocialLink from "./SocialMediaLink";

const BigText: React.FC = () => {
  const [isTypedDone, setIsTypedDone] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);
    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return (
    <div className="hero-copy mx-auto mt-40 flex max-w-5xl flex-col items-center px-5 text-center md:mt-80 lg:items-start">
      <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.42em] text-emerald-300/80">Developer · Student · Creator</p>
      <h1 className="hero-title text-5xl font-normal tracking-[-0.055em] md:text-7xl lg:text-[5.6rem]">
        {prefersReducedMotion ? "I'm NekosanQ" : <ReactTyped strings={["I'm NekosanQ"]} typeSpeed={58} showCursor cursorChar="|" />}
      </h1>

      <p className="mt-5 max-w-md text-sm font-light leading-relaxed tracking-[0.02em] text-slate-400 md:text-lg">
        {prefersReducedMotion ? (
          "A developer and a student with many hobbies..."
        ) : (
          <ReactTyped
            strings={["A developer and a student with many hobbies..."]}
            typeSpeed={30}
            startDelay={1000}
            showCursor
            cursorChar="_"
            onComplete={() => setIsTypedDone(true)}
          />
        )}
      </p>

      {(isTypedDone || prefersReducedMotion) && (
        <div className="mt-8 opacity-100 transition-opacity duration-1000 ease-out">
          <SocialLink />
        </div>
      )}
    </div>
  );
};

export default BigText;
