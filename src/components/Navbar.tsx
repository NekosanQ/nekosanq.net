'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCircleUser, faCircleNodes, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/NekosanQ-Network.svg" alt="NekosanQ-Network-Logo" className="h-12 w-auto text-white filter invert" />
          </div>
          <div className="hidden md:flex space-x-10 text-lg leading-none">
            {[
              { name: 'Home', icon: faHome },
              { name: 'About', icon: faCircleUser },
              { name: 'Service', icon: faCircleNodes },
              { name: 'Contact', icon: faEnvelope }
            ].map((item) => (
              <a
                key={item.name}
                href="#"
                className="relative flex items-center space-x-2 text-white font-normal after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:w-0 after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full"
              >
              <FontAwesomeIcon icon={item.icon} className="text-base" />
              <span>{item.name}</span>
              </a>
            ))}
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
};

export default Navbar;
