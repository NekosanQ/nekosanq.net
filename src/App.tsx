import React from 'react';
import Navbar from './components/Navbar';
import StarBackground from './components/StarBackground';
import BigText from './components/BigText';

import './App.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black/[95%] text-white relative overflow-hidden">
      {/* 背景レイヤー */}
      <div className="absolute inset-0 z-0">
        <StarBackground />
      </div>

      {/* 前面のUI */}
      <div className="relative z-10">
        <Navbar />
        <BigText />
        <main className="pt-16 px-4">{/* メインコンテンツをここに追加 */}</main>
      </div>
    </div>
  );
};

export default App;
