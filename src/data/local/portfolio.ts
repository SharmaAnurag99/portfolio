export type LocalPortfolioProject = {
  image: string;
  category: string;
  title: string;
  content: string;
};

export const localPortfolioProjects: LocalPortfolioProject[] = [
  {
    image: '/images/project-a.svg',
    category: 'WEB DEVELOPMENT',
    title: 'AstroRekhaaji',
    content:
      'Production service platform built with Next.js, Tailwind CSS, Cloudflare D1/R2, and PayPal.',
  },
  {
    image: '/images/project-b.svg',
    category: 'WEB DEVELOPMENT',
    title: 'Riva Arts',
    content:
      'Redesigned legacy website to improve visual appeal, brand perception, and client inquiry flows.',
  },
  {
    image: '/images/project-c.svg',
    category: 'BLOCKCHAIN',
    title: 'Hive Bounty Platform',
    content:
      'Decentralized bounty system for GitHub-linked issues, Top 10 at Hive Hackathon.',
  },
  {
    image: '/images/project-b.svg',
    category: 'E-COMMERCE',
    title: 'Astrol K Sharma',
    content:
      'Shopify website redesign preserving business logic and payment integrations.',
  },
  {
    image: '/images/project-a.svg',
    category: 'SMART CONTRACTS',
    title: 'Cross-Chain Bridge',
    content:
      'EVM-based token bridge implementation with nonce tracking and validator logic.',
  },
];
