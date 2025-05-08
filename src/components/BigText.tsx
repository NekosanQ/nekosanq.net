'use client';
import React, { useState } from 'react';
import { ReactTyped } from 'react-typed';
import { motion } from 'framer-motion';

const BigText: React.FC = () => {
  const [showSecondText, setShowSecondText] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [showEtc, setShowEtc] = useState(false);

  return (
    <div className="text-center text-white text-5xl mt-40 font-caveat">
      {/* First Typed Message */}
      <ReactTyped
        strings={['Welcome to <br/>NekosanQ Network!']}
        typeSpeed={50}
        showCursor={false}
        contentType="html"
        onComplete={() => {
          setShowSecondText(true);
          setTimeout(() => setShowCards(true), 2000);
        }}
      />

      <div className="my-10"></div>

      {/* Second Typed Message */}
      {showSecondText && (
        <ReactTyped
          strings={["I'm NekosanQ, a student with many interests."]}
          typeSpeed={50}
          showCursor={false}
          contentType="html"
          onComplete={() => {
            setTimeout(() => setShowEtc(true), 1000);
          }}
        />
      )}
      {/* Animation Cards */}
      {showCards && (
        <div className="mt-16 space-y-6 text-3xl font-normal font-caveat">
          <div className="flex flex-wrap justify-center gap-6">
            {['Programming', 'Game(many)', 'Drums', 'Beatbox'].map((title, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.3, duration: 0.6 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: '0 10px 30px rgba(255, 255, 255, 0.7)'
                }}
                className="bg-transparent text-white p-6 rounded-2xl w-48 h-16 flex items-center justify-center text-center sm:w-44
                     border-2 border-white shadow-lg shadow-white/15"
              >
                {title}
              </motion.div>
            ))}
          </div>
        </div>
      )}
      <div className="my-10"></div>
      {/* "etc..."*/}
      {showEtc && <ReactTyped strings={['etc...']} typeSpeed={50} showCursor={false} contentType="html" />}
    </div>
  );
};

export default BigText;
