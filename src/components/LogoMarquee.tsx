const logos = [
  { name: 'Next.js', text: 'Next.js' },
  { name: 'React', text: 'React' },
  { name: 'TypeScript', text: 'TypeScript' },
  { name: 'Tailwind', text: 'Tailwind CSS' },
  { name: 'Node.js', text: 'Node.js' },
  { name: 'Solidity', text: 'Solidity' },
  { name: 'Rust', text: 'Rust' },
  { name: 'PostgreSQL', text: 'PostgreSQL' },
  { name: 'AWS', text: 'AWS' },
];

const LogoMarquee = () => {
  return (
    <section
      aria-label="Stack & tools"
      className="relative py-14 overflow-hidden border-y border-border"
    >
      <div className="container mx-auto px-6 mb-8">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
          — Toolchain · daily drivers
        </span>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-r from-[hsl(var(--background))] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-40 z-10 bg-gradient-to-l from-[hsl(var(--background))] to-transparent pointer-events-none" />
        <div className="flex items-center marquee">
          {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-12 md:mx-16 text-foreground/35 text-2xl md:text-4xl font-light tracking-wide font-display uppercase"
            >
              {logo.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoMarquee;
