import React from 'react';
import Navbar from './components/Navbar';
import StarBackground from './components/StarBackground';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black/[95%] text-white relative overflow-hidden">
      <StarBackground />
      <Navbar />
      <main className="pt-16 px-4 text-white relative z-10"></main>
    </div>
  );
};

export default App;
