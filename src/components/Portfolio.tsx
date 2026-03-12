// const projects = [
//   {
//     image: '/thumbnails/astrorekhaaji.png',
//     category: 'WEB DEVELOPMENT',
//     title: 'AstroRekhaaji',
//     size: 'large',
//     description: 'Production service platform built with Next.js, Tailwind CSS, Cloudflare D1/R2, and PayPal.'
//   },
//   {
//     image: '/thumbnails/riva_arts.png',
//     category: 'WEB DEVELOPMENT',
//     title: 'Riva Arts',
//     size: 'large',
//     description: 'Redesigned legacy website to improve visual appeal, brand perception, and client inquiry flows.'
//   },
//   {
//     image: '/thumbnails/hive_bounty.png',
//     category: 'BLOCKCHAIN',
//     title: 'Hive Bounty Platform',
//     size: 'small',
//     description: 'Decentralized bounty system for GitHub-linked issues, Top 10 at Hive Hackathon.'
//   },
//   {
//     image: '/thumbnails/astrol_k_sharma.png',
//     category: 'E-COMMERCE',
//     title: 'Astrol K Sharma',
//     size: 'small',
//     description: 'Shopify website redesign preserving business logic and payment integrations.'
//   },
//   {
//     image: '/thumbnails/cross_chain_bridge.png',
//     category: 'SMART CONTRACTS',
//     title: 'Cross-Chain Bridge',
//     size: 'small',
const staticProjects = [
  {
    image: '/thumbnails/astrorekhaaji.png',
    category: 'WEB DEVELOPMENT',
    title: 'AstroRekhaaji',
    size: 'large',
    description: 'Production service platform built with Next.js, Tailwind CSS, Cloudflare D1/R2, and PayPal.'
  },
  {
    image: '/thumbnails/riva_arts.png',
    category: 'WEB DEVELOPMENT',
    title: 'Riva Arts',
    size: 'large',
    description: 'Redesigned legacy website to improve visual appeal, brand perception, and client inquiry flows.'
  },
  {
    image: '/thumbnails/hive_bounty.png',
    category: 'BLOCKCHAIN',
    title: 'Hive Bounty Platform',
    size: 'small',
    description: 'Decentralized bounty system for GitHub-linked issues, Top 10 at Hive Hackathon.'
  },
  {
    image: '/thumbnails/astrol_k_sharma.png',
    category: 'E-COMMERCE',
    title: 'Astrol K Sharma',
    size: 'small',
    description: 'Shopify website redesign preserving business logic and payment integrations.'
  },
  {
    image: '/thumbnails/cross_chain_bridge.png',
    category: 'SMART CONTRACTS',
    title: 'Cross-Chain Bridge',
    size: 'small',
    description: 'EVM-based token bridge implementation with nonce tracking and validator logic.'
  }
];

import { getPayload } from 'payload'
import configPromise from '../../payload.config'

const Portfolio = async () => {
  const payload = await getPayload({ config: configPromise })

  const { docs: projects } = await payload.find({
    collection: 'projects',
    depth: 1,
    limit: 5,
    sort: '-createdAt'
  })

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
            {projects.slice(0, 2).map((project: any, index: number) => {
              const imageUrl = (typeof project.image === 'object' && project.image !== null ? project.image.url : null) || '/placeholder.svg'
              return (
                <div
                  key={index}
                  className="portfolio-item group cursor-pointer relative overflow-hidden h-[400px] md:h-[500px] rounded-3xl"
                >
                  <img
                    src={imageUrl}
                    alt={project.title || 'Project'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Badge */}
                  <div className="absolute top-6 right-6">
                    <span className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-xs font-medium text-white/90 uppercase tracking-wider">
                      FEATURED
                    </span>
                  </div>

                  {/* Overlay Content */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <h3 className="text-white font-display text-3xl md:text-4xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {project.title}
                    </h3>
                    <p className="text-white/80 text-lg translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      {project.content}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Bottom row - 3 smaller images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.slice(2).map((project: any, index: number) => {
              const imageUrl = (typeof project.image === 'object' && project.image !== null ? project.image.url : null) || '/placeholder.svg'
              return (
                <div
                  key={index + 2}
                  className="portfolio-item group cursor-pointer relative overflow-hidden h-[350px] md:h-[400px] rounded-3xl"
                >
                  <img
                    src={imageUrl}
                    alt={'Portfolio item'}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Badge */}
                  <div className="absolute top-6 right-6">
                    <span className="px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-xs font-medium text-white/90 uppercase tracking-wider">
                      PROJECT
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6">
                    <h3 className="text-white font-display text-2xl md:text-3xl mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {project.title}
                    </h3>
                    <p className="text-white/80 text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 line-clamp-2">
                      {project.content}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="mt-20 border-t border-border/50 pt-16">
          <h3 className="font-display text-3xl md:text-4xl mb-8">Coming Soon</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 rounded-3xl bg-muted/30 border border-border/50 flex flex-col justify-center min-h-[250px] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h4 className="font-display text-2xl mb-3">AI Projects</h4>
              <p className="text-muted-foreground">
                Exploring the frontiers of machine learning, generative AI, and intelligent agents. Stay tuned for innovative prototypes and tools.
              </p>
              <div className="mt-6 flex items-center text-sm font-medium text-primary">
                <span>In Development</span>
                <span className="ml-2 flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-muted/30 border border-border/50 flex flex-col justify-center min-h-[250px] relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h4 className="font-display text-2xl mb-3">Security Audits</h4>
              <p className="text-muted-foreground">
                Comprehensive vulnerability assessments, smart contract audits, and penetration testing methodologies to ensure robust system security.
              </p>
              <div className="mt-6 flex items-center text-sm font-medium text-primary">
                <span>Planning Phase</span>
                <span className="ml-2 flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" style={{ animationDelay: '0.5s' }}></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Portfolio;
