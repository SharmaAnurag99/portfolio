import { ArrowUpRight, Code2, Database, Terminal, Workflow } from 'lucide-react';

const services = [
  {
    number: '01',
    title: 'FULL STACK DEVELOPMENT',
    description: 'Building scalable, production-ready web applications using modern frameworks. Focus on performance, SEO, and seamless user experiences.',
    icon: Code2,
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
    className: "md:col-span-2",
  },
  {
    number: '02',
    title: 'BLOCKCHAIN SOLUTIONS',
    description: 'Developing secure smart contracts and decentralized applications (dApps) on Ethereum and ICP.',
    icon: Database,
    tags: ["Solidity", "Rust", "Web3.js", "Foundry"],
    className: "md:col-span-1",
  },
  {
    number: '03',
    title: 'SYSTEMS ENGINEERING',
    description: 'Leveraging Rust for high-performance, memory-safe backend services and system tools optimizing for efficiency.',
    icon: Terminal,
    tags: ["Rust", "Actix", "Tokio", "Low-level Systems"],
    className: "md:col-span-1",
  },
  {
    number: '04',
    title: 'TECHNICAL STRUCTURE',
    description: 'Providing architectural guidance and code audits to ensure your software is robust, secure, and ready for scale.',
    icon: Workflow,
    tags: ["Architecture", "System Design", "Cloud Architecture"],
    className: "md:col-span-2",
  },
];

const Services = () => {
  return (
    <section id="services" className="services-section py-24 section-cream">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-6xl font-display mb-6">What I Do</h2>
            <p className="text-muted-foreground max-w-xl text-lg">
              Delivering specialized technical solutions to solve complex business problems with precision and creativity.
            </p>
          </div>
          <div className="hidden md:block pb-2">
            <span className="text-xs font-mono border border-border px-3 py-1 rounded-full uppercase tracking-widest">
              Service Catalog 2026
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`service-card group relative p-8 md:p-10 rounded-3xl border border-border bg-background transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 overflow-hidden ${service.className}`}
            >
              {/* Hover Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <service.icon className="w-6 h-6 text-foreground" strokeWidth={1.5} />
                    </div>
                    <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground border border-border px-3 py-1 rounded-full bg-background/50 backdrop-blur-sm">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl mb-4 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md">
                    {service.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] md:text-xs font-medium px-2.5 py-1 rounded-md bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Corner Icon */}
              <div className="absolute top-8 right-8 text-foreground/20 group-hover:text-foreground transition-colors duration-300">
                <ArrowUpRight className="w-6 h-6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
