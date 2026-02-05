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
    <section className="section-dark py-12 overflow-hidden">
      <div className="relative">
        <div className="flex items-center marquee">
          {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="flex-shrink-0 mx-16 text-primary-foreground/40 text-3xl md:text-4xl font-light tracking-wide font-display uppercase"
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
