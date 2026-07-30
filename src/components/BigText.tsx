"use client";

import React, { useEffect, useState } from "react";
import { ReactTyped } from "react-typed";
import SocialLink from "./SocialMediaLink";

const BigText: React.FC = () => {
  const [isEyebrowDone, setIsEyebrowDone] = useState(false);
  const [isTitleDone, setIsTitleDone] = useState(false);
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
    <div className="hero-copy mx-auto mt-40 flex w-full max-w-5xl flex-col items-center px-5 text-center md:mt-80 lg:items-start lg:text-left">
      <div className="flex w-full flex-col items-center [&_.typed-cursor]:hidden lg:items-start">
        <p className="mb-4 min-h-[1rem] text-[10px] font-medium uppercase tracking-[0.42em] text-emerald-300/80">
          {prefersReducedMotion ? (
            "Developer · Student · Creator"
          ) : (
            <ReactTyped
              key="hero-eyebrow-typed"
              strings={["Developer · Student · Creator"]}
              typeSpeed={34}
              showCursor
              cursorChar="|"
              onComplete={() => setIsEyebrowDone(true)}
            />
          )}
        </p>

        <h1 className="hero-title text-5xl font-normal tracking-[-0.055em] md:text-7xl lg:text-[5.6rem]">
          {prefersReducedMotion ? (
            "I'm NekosanQ"
          ) : isEyebrowDone ? (
            <ReactTyped
              key="hero-title-typed"
              strings={["I'm NekosanQ"]}
              typeSpeed={58}
              showCursor
              cursorChar="|"
              onComplete={() => setIsTitleDone(true)}
            />
          ) : (
            <span aria-hidden="true">&nbsp;</span>
          )}
        </h1>

        <p className="mt-5 min-h-[3rem] max-w-md text-sm font-light leading-relaxed tracking-[0.02em] text-slate-400 md:text-lg">
          {prefersReducedMotion ? (
            "A developer and a student with many hobbies..."
          ) : isTitleDone ? (
            <ReactTyped
              key="hero-description-typed"
              strings={["A developer and a student with many hobbies..."]}
              typeSpeed={30}
              startDelay={220}
              showCursor
              cursorChar="_"
              onComplete={() => setIsTypedDone(true)}
            />
          ) : (
            <span aria-hidden="true">&nbsp;</span>
          )}
        </p>
      </div>

      {(isTypedDone || prefersReducedMotion) && (
        <div className="mt-8">
          <SocialLink />
        </div>
      )}
    </div>
  );
};

export default BigText;
