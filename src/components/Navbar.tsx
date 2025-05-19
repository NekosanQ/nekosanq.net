'use client';
import { useState, useEffect, memo, useCallback } from 'react';
import { Menu, X } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCircleUser, faCircleNodes, faEnvelope, IconDefinition } from '@fortawesome/free-solid-svg-icons';

type Section = { id: string; name: string; icon: IconDefinition; external?: string };

const sections: Section[] = [
  { id: 'home', name: 'Home', icon: faHome },
  { id: 'about', name: 'About', icon: faCircleUser },
  { id: 'service', name: 'Service', icon: faCircleNodes },
  { id: 'contact', name: 'Contact', icon: faEnvelope, external: 'https://twitter.com/nekosanq_ts' }
];

const getLinkClasses = (isActive: boolean, isMobile: boolean) => {
  const base = `flex items-center space-x-${isMobile ? '3' : '2'} transition`;
  const text = 'text-white font-normal';
  const decoDesktop = `relative after:content-[''] after:absolute after:left-0 after:bottom-[-3px]
    after:h-[1px] after:bg-white after:transition-all after:duration-300 hover:after:w-full ${isActive ? 'after:w-full' : 'after:w-0'}`;
  const decoMobile = isActive ? ' underline' : '';
  return `${base} ${text} ${isMobile ? decoMobile : decoDesktop}`;
};

const NavItem = memo(
  ({ section, isActive, isMobile, onCloseMobile }: { section: Section; isActive: boolean; isMobile: boolean; onCloseMobile?: () => void }) => {
    const { id, name, icon, external } = section;
    const isHome = id === 'home';
    const href = external ?? `#${id}`;
    const commonProps = {
      className: getLinkClasses(isActive, isMobile),
      ...(isMobile ? { onClick: onCloseMobile } : {})
    };

    if (isHome) {
      return (
        <button
          key={`home${isMobile ? '-mobile' : ''}`}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            isMobile && onCloseMobile?.();
          }}
          {...commonProps}
        >
          <FontAwesomeIcon icon={icon} className={isMobile ? 'text-lg' : 'text-base'} />
          <span>{name}</span>
        </button>
      );
    }

    return (
      <a
        key={`${id}${isMobile ? '-mobile' : ''}`}
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...commonProps}
      >
        <FontAwesomeIcon icon={icon} className={isMobile ? 'text-lg' : 'text-base'} />
        <span>{name}</span>
      </a>
    );
  }
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState('home');

  const handleScroll = useCallback(() => {
    const midpoint = window.scrollY + window.innerHeight / 2;
    for (const section of sections) {
      const element = document.getElementById(section.id);
      if (element && midpoint >= element.offsetTop && midpoint < element.offsetTop + element.offsetHeight) {
        setActiveId(section.id);
        break;
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const closeMobile = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-opacity-70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-20 items-center">
        {/* Logo */}
        <img src="/icon.svg" alt="Logo" className="h-12 w-auto filter invert" />

        {/* Desktop */}
        <div className="hidden md:flex space-x-10 text-lg leading-none">
          {sections.map((section) => (
            <NavItem key={section.id} section={section} isActive={activeId === section.id} isMobile={false} />
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white hover:text-emerald-500 focus:outline-none" onClick={() => setIsOpen((o) => !o)}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden px-4 py-2 space-y-2 text-xl text-white transition-all duration-300 ease-in-out ${
          isOpen
            ? 'opacity-100 max-h-screen translate-y-0 pointer-events-auto bg-black bg-opacity-50 border border-white'
            : 'opacity-0 max-h-0 -translate-y-4 pointer-events-none'
        }`}
        style={{
          filter: isOpen ? 'drop-shadow(0 0 8px rgba(255,255,255,0.7))' : undefined,
          borderRadius: 8
        }}
      >
        {sections.map((section) => (
          <NavItem key={section.id} section={section} isActive={activeId === section.id} isMobile={true} onCloseMobile={closeMobile} />
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
