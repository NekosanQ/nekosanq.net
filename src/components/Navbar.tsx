import { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/NekosanQ-Network.svg" alt="NekosanQ-Network-Logo" className="h-10 w-auto text-white filter invert" />
            <span className="text-4xl font-bold text-white font-caveat">NekosanQ Network</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-10 text-2xl">
            <a href="#" className="text-white hover:text-blue-400 transition font-caveat">
              Home
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition font-caveat">
              About
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition font-caveat">
              Service
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition font-caveat">
              Contact
            </a>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white hover:text-blue-400 focus:outline-none">
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden shadow-md">
          <div className="flex flex-col px-4 py-2 space-y-2 text-xl">
            <a href="#" className="text-white hover:text-blue-400 transition font-caveat">
              Home
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition font-caveat">
              About
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition font-caveat">
              Service
            </a>
            <a href="#" className="text-white hover:text-blue-400 transition font-caveat">
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
