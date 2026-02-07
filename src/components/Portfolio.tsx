const projects = [
  {
    image: '/rekhaaji.png',
    category: 'WEB DEVELOPMENT',
    title: 'AstroRekhaaji',
    size: 'large',
    description: 'Production service platform built with Next.js, Tailwind CSS, Cloudflare D1/R2, and PayPal.'
  },
  {
    image: '/riva.png',
    category: 'WEB DEVELOPMENT',
    title: 'Riva Arts',
    size: 'large',
    description: 'Redesigned legacy website to improve visual appeal, brand perception, and client inquiry flows.'
  },
  {
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
    category: 'BLOCKCHAIN',
    title: 'Hive Bounty Platform',
    size: 'small',
    description: 'Decentralized bounty system for GitHub-linked issues, Top 10 at Hive Hackathon.'
  },
  {
    image: '/lksharma.png',
    category: 'E-COMMERCE',
    title: 'Astrol K Sharma',
    size: 'small',
    description: 'Shopify website redesign preserving business logic and payment integrations.'
  },
  {
    image: 'https://images.unsplash.com/photo-1621504450168-b8c034d14187?w=800&h=600&fit=crop',
    category: 'SMART CONTRACTS',
    title: 'Cross-Chain Bridge',
    size: 'small',
    description: 'EVM-based token bridge implementation with nonce tracking and validator logic.'
  }
];

const Portfolio = () => {
  return (
    <section id="projects" className="portfolio-section section-cream py-24">
      <div className="container mx-auto px-6 mb-12">
        <h2 className="text-4xl md:text-5xl font-display mb-4">Selected Projects</h2>
        <p className="text-muted-foreground max-w-xl">
          A collection of my work across Web Development, Blockchain, and Systems Programming.
        </p>
      </div>
      <div className="container mx-auto px-6">
        <div className="grid gap-6">
          {/* Top row - 2 large images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.slice(0, 2).map((project, index) => (
              <div
                key={index}
                className="portfolio-item group cursor-pointer relative overflow-hidden h-[400px] md:h-[500px] rounded-3xl"
              >
                <img
                  src={project.image}
                  alt={project.title || 'Project'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Badge */}
                <div className="absolute top-6 right-6">
                  <span className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-xs font-medium text-white/90 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                {/* Overlay Content */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <h3 className="text-white font-display text-3xl md:text-4xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {project.title}
                  </h3>
                  <p className="text-white/80 text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom row - 3 smaller images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.slice(2).map((project, index) => (
              <div
                key={index + 2}
                className="portfolio-item group cursor-pointer relative overflow-hidden h-[350px] md:h-[400px] rounded-3xl"
              >
                <img
                  src={project.image}
                  alt={project.category || 'Portfolio item'}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Badge */}
                <div className="absolute top-6 right-6">
                  <span className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-xs font-medium text-white/90 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                  <h3 className="text-white font-display text-2xl md:text-3xl mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {project.title}
                  </h3>
                  <p className="text-white/80 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


export default Portfolio;
