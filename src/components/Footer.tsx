const Footer = () => {
  return (
    <footer className="text-[12px] px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
      style={{
        background: "hsl(220 6% 88%)",
        color: "hsl(220 8% 50%)",
        boxShadow: "inset 0 2px 6px rgba(163,168,178,0.3)",
      }}
    >
      <span>© {new Date().getFullYear()} TheAgentStore.co · All rights reserved</span>
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
        <a href="#" className="hover:text-foreground transition-colors">Terms</a>
        <a href="#" className="hover:text-foreground transition-colors">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
