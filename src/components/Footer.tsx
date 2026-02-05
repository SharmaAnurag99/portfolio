import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-20 section-dark border-t border-primary-foreground/10 overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-20">
          {/* Social Links */}
          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-primary-foreground/5 hover:bg-primary-foreground/10 text-primary-foreground transition-colors">
              <Github size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-primary-foreground/5 hover:bg-primary-foreground/10 text-primary-foreground transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full bg-primary-foreground/5 hover:bg-primary-foreground/10 text-primary-foreground transition-colors">
              <Twitter size={20} />
            </a>
            <a href="mailto:hello@example.com" className="p-3 rounded-full bg-primary-foreground/5 hover:bg-primary-foreground/10 text-primary-foreground transition-colors">
              <Mail size={20} />
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <a href="#" className="font-display text-xl text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Back to Top
            </a>
            <p className="text-primary-foreground/50 text-sm">
              © {new Date().getFullYear()} Sharma Anurag. All rights reserved.
            </p>
          </div>
        </div>

        {/* Grounded Massive Text */}
        <div className="w-full flex justify-center -mb-24 relative opacity-10">
          <h2 className="font-display text-[20vw] leading-none font-bold text-primary-foreground select-none pointer-events-none">
            SHARMA
          </h2>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
