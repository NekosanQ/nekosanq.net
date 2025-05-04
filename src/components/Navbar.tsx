import { useState } from 'react';
import { Menu, X } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-black shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="public//NekosanQ-Network.svg" alt="NekosanQ Logo" className="h-8 w-auto text-white filter invert" />
            <span className="text-2xl font-bold text-white">NekosanQ Network</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <a href="#" className="text-white hover:text-blue-400 transition">
              Home
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition">
              About
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition">
              Service
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition">
              Contact
            </a>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white hover:text-blue-400 focus:outline-none">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black shadow-md">
          <div className="flex flex-col px-4 py-2 space-y-2">
            <a href="#" className="text-white hover:text-blue-400 transition">
              Home
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition">
              About
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition">
              Service
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
