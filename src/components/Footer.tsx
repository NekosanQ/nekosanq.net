const Footer = () => {
  return (
    <footer className="relative z-10 mx-auto mt-40 w-full px-5 pb-10 pt-16 text-center md:mt-56">
      <p className="text-[10px] font-light uppercase tracking-[0.18em] text-slate-600">
        &copy; 2022 - {new Date().getFullYear()} NekosanQ. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
