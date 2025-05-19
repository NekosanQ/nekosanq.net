'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCircleUser, faCircleNodes, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const sections = [
  { name: 'Home', icon: faHome, id: 'home' },
  { name: 'About', icon: faCircleUser, id: 'about' },
  { name: 'Service', icon: faCircleNodes, id: 'service' },
  { name: 'Contact', icon: faEnvelope, id: 'contact' }
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.name);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsOpen(false);
    setActiveSection('Home');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-opacity-70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src="/icon.svg" alt="Nekonnection-Logo" className="h-12 w-auto filter invert" />
          </div>
          <div className="hidden md:flex space-x-10 text-lg leading-none">
            {sections.map((item) => {
              if (item.name === 'Home') {
                return (
                  <button
                    key="Home"
                    onClick={scrollToTop}
                    className={`relative flex items-center space-x-2 text-white font-normal after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full ${
                      activeSection === 'Home' ? 'after:w-full' : 'after:w-0'
                    }`}
                  >
                    <FontAwesomeIcon icon={faHome} className="text-base" />
                    <span>Home</span>
                  </button>
                );
              } else if (item.name === 'Contact') {
                return (
                  <a
                    key="Contact"
                    href="https://twitter.com/nekosanq_ts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center space-x-2 text-white font-normal after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full after:w-0"
                  >
                    <FontAwesomeIcon icon={item.icon} className="text-base" />
                    <span>Contact</span>
                  </a>
                );
              }
              return (
                <a
                  key={item.name}
                  href={`#${item.id}`}
                  className={`relative flex items-center space-x-2 text-white font-normal after:content-[''] after:absolute after:left-0 after:bottom-[-3px] after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full ${
                    activeSection === item.name ? 'after:w-full' : 'after:w-0'
                  }`}
                >
                  <FontAwesomeIcon icon={item.icon} className="text-base" />
                  <span>{item.name}</span>
                </a>
              );
            })}

          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white hover:text-emerald-500 focus:outline-none">
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with animation */}
      <div
        className={`md:hidden px-4 py-2 space-y-2 text-xl text-white transition-all duration-300 ease-in-out
          ${
            isOpen
              ? 'opacity-100 max-h-screen translate-y-0 pointer-events-auto bg-black bg-opacity-50 border border-white'
              : 'opacity-0 max-h-0 -translate-y-4 pointer-events-none'
          }`}
        style={{
          filter: isOpen ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.7))' : undefined,
          borderRadius: '8px'
        }}
      >
        {sections.map((item) => {
          if (item.name === 'Home') {
            return (
              <button
                key="Home-mobile"
                onClick={scrollToTop}
                className={`flex items-center space-x-3 transition ${activeSection === 'Home' ? 'underline' : ''}`}
              >
                <FontAwesomeIcon icon={faHome} className="text-lg" />
                <span>Home</span>
              </button>
            );
          } else if (item.name === 'Contact') {
            return (
              <a
                key="Contact-mobile"
                href="https://twitter.com/nekosanq_ts"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center space-x-3 transition after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full after:w-0"
              >
                <FontAwesomeIcon icon={item.icon} className="text-lg" />
                <span>Contact</span>
              </a>

            );
          }
          return (
            <a
              key={item.name}
              href={`#${item.id}`}
              onClick={() => setIsOpen(false)}
              className={`flex items-center space-x-3 transition ${activeSection === item.name ? 'underline' : ''}`}
            >
              <FontAwesomeIcon icon={item.icon} className="text-lg" />
              <span>{item.name}</span>
            </a>
          );
        })}

      </div>
    </nav>
  );
};

export default Navbar;
