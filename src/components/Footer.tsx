const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white/70 text-[12px] px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
      <span>© {new Date().getFullYear()} TheAgentStore.co · All rights reserved</span>
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
