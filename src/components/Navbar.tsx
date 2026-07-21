"use client";
import { useState, useEffect, memo, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faCircleUser, faCircleNodes, faEnvelope, IconDefinition } from "@fortawesome/free-solid-svg-icons";

type Section = { id: string; name: string; icon: IconDefinition; external?: string };

const sections: Section[] = [
  { id: "home", name: "Home", icon: faHome },
  { id: "about", name: "About", icon: faCircleUser },
  { id: "service", name: "Service", icon: faCircleNodes },
  { id: "contact", name: "Contact", icon: faEnvelope, external: "https://twitter.com/nekosanq_ts" }
];

const getLinkClasses = (isActive: boolean, isMobile: boolean) => {
  const base = `flex items-center space-x-${isMobile ? "3" : "2"} transition-colors duration-200`;
  const text = "text-white font-medium";
  const decoDesktop = `relative after:content-[''] after:absolute after:left-0 after:bottom-[-3px]
    after:h-[2px] after:bg-white after:transition-all after:duration-300 hover:after:w-full ${isActive ? "after:w-full" : "after:w-0"}`;
  const decoMobile = isActive ? " underline" : "";
  return `${base} ${text} ${isMobile ? decoMobile : decoDesktop}`;
};

const NavItem = memo(
  ({ section, isActive, isMobile, onCloseMobile }: { section: Section; isActive: boolean; isMobile: boolean; onCloseMobile?: () => void }) => {
    const { id, name, icon, external } = section;
    const isHome = id === "home";
    const href = external ?? `#${id}`;
    const commonProps = {
      className: getLinkClasses(isActive, isMobile),
      ...(isMobile ? { onClick: onCloseMobile } : {})
    };

    if (isHome) {
      return (
        <button
          key={`home${isMobile ? "-mobile" : ""}`}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            isMobile && onCloseMobile?.();
          }}
          {...commonProps}
        >
          <FontAwesomeIcon icon={icon} className={isMobile ? "text-lg" : "text-base"} />
          <span>{name}</span>
        </button>
      );
    }

    return (
      <a
        key={`${id}${isMobile ? "-mobile" : ""}`}
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        {...commonProps}
      >
        <FontAwesomeIcon icon={icon} className={isMobile ? "text-lg" : "text-base"} />
        <span>{name}</span>
      </a>
    );
  }
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

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
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const closeMobile = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-white/5 bg-black/20 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between h-16 items-center">
        {/* Logo */}
        <img src="/icon.svg" alt="Logo" className="h-9 w-auto filter invert" />

        {/* Desktop */}
        <div className="hidden md:flex space-x-8 text-base leading-none">
          {sections.map((section) => (
            <NavItem key={section.id} section={section} isActive={activeId === section.id} isMobile={false} />
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="rounded-lg p-1.5 text-white transition-colors hover:bg-white/10 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 md:hidden"
          onClick={() => setIsOpen((o) => !o)}
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden mx-3 space-y-1 rounded-xl border border-white/15 px-4 py-3 text-base text-white shadow-xl backdrop-blur-md transition-all duration-300 ease-in-out ${
          isOpen
            ? "opacity-100 max-h-screen translate-y-0 pointer-events-auto bg-slate-950/90"
            : "opacity-0 max-h-0 -translate-y-4 pointer-events-none"
        }`}
      >
        {sections.map((section) => (
          <NavItem key={section.id} section={section} isActive={activeId === section.id} isMobile={true} onCloseMobile={closeMobile} />
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
