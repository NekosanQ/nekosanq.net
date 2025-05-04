// App.tsx
import React from 'react';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <main className="pt-16 px-4 text-white">
      </main>
    </div>
  );
};

export default App;
