'use client';

import { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-display text-3xl tracking-tight">
            Sharma
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link href="/" className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity">
              HOME
            </Link>

            <Link href="/journey" className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity">
              JOURNEY
            </Link>

            {/* Projects Dropdown */}
            <div
              className="relative group"
              onMouseEnter={() => setIsProjectsOpen(true)}
              onMouseLeave={() => setIsProjectsOpen(false)}
            >
              <button className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity flex items-center gap-1">
                PROJECTS
                <ChevronDown size={14} className={`transition-transform duration-200 ${isProjectsOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <div className={`absolute top-full text-left left-0 pt-4 w-48 transition-all duration-200 ${isProjectsOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}>
                <div className="bg-background border border-border rounded-xl shadow-xl overflow-hidden flex flex-col p-2">
                  <Link href="/projects/web2" className="text-sm px-4 py-2 hover:bg-muted rounded-lg transition-colors">
                    Web2 Projects
                  </Link>
                  <Link href="/projects/web3" className="text-sm px-4 py-2 hover:bg-muted rounded-lg transition-colors">
                    Web3 Projects
                  </Link>
                </div>
              </div>
            </div>

            <Link href="/blog" className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity">
              BLOG
            </Link>

            <Link href="/#contact" className="text-sm font-medium tracking-wide hover:opacity-60 transition-opacity">
              CONTACT
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-in slide-in-from-top-4 fade-in duration-200">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-sm font-medium tracking-wide py-2" onClick={() => setIsOpen(false)}>
                HOME
              </Link>
              <Link href="/journey" className="text-sm font-medium tracking-wide py-2" onClick={() => setIsOpen(false)}>
                JOURNEY
              </Link>

              <div className="py-2">
                <span className="text-sm font-medium tracking-wide text-muted-foreground block mb-2">PROJECTS</span>
                <div className="pl-4 flex flex-col gap-3 border-l-2 border-border ml-1">
                  <Link href="/projects/web2" className="text-sm" onClick={() => setIsOpen(false)}>Web2 Projects</Link>
                  <Link href="/projects/web3" className="text-sm" onClick={() => setIsOpen(false)}>Web3 Projects</Link>
                </div>
              </div>

              <Link href="/blog" className="text-sm font-medium tracking-wide py-2" onClick={() => setIsOpen(false)}>
                BLOG
              </Link>
              <Link href="/#contact" className="text-sm font-medium tracking-wide py-2" onClick={() => setIsOpen(false)}>
                CONTACT
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;
