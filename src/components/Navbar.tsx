"use client";
import { useState, useEffect, memo, useCallback } from "react";
import Image from "next/image";
import brandIcon from "../../public/icon.svg";
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
  const base = isMobile
    ? "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200"
    : "relative flex items-center gap-1.5 px-3 py-2 text-[11px] font-medium tracking-[0.08em] transition-colors duration-300";
  const state = isActive ? "text-emerald-300" : "text-slate-400 hover:text-slate-100";
  return `${base} ${state}`;
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
            if (isMobile) onCloseMobile?.();
          }}
          {...commonProps}
        >
          <FontAwesomeIcon icon={icon} className={isMobile ? "text-sm" : "text-[10px]"} />
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
        <FontAwesomeIcon icon={icon} className={isMobile ? "text-sm" : "text-[10px]"} />
        <span>{name}</span>
      </a>
    );
  }
);

NavItem.displayName = "NavItem";

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
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const closeMobile = () => setIsOpen(false);

  return (
    <nav className="fixed left-0 top-0 z-50 w-full pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-20 sm:px-7 lg:px-10">
        <div className="top-brand-shell flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full">
          <Image src={brandIcon} alt="NekosanQ" className="top-brand-icon h-8 w-8 rounded-full object-cover opacity-90" unoptimized priority />
        </div>

        <div className="nav-capsule hidden min-h-10 items-center gap-0.5 rounded-xl px-2 py-1 md:flex">
          {sections.map((section) => (
            <NavItem key={section.id} section={section} isActive={activeId === section.id} isMobile={false} />
          ))}
        </div>

        <button
          className="rounded-full border border-white/10 bg-black/35 p-2 text-slate-200 backdrop-blur-md transition-colors hover:border-emerald-300/40 hover:text-emerald-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60 md:hidden"
          onClick={() => setIsOpen((o) => !o)}
          aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div
        className={`mx-3 space-y-1 overflow-hidden rounded-2xl border border-white/10 px-3 py-3 text-white shadow-2xl backdrop-blur-xl transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? "pointer-events-auto max-h-screen translate-y-0 bg-[#050908]/95 opacity-100"
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
