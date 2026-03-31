export type LocalPortfolioProject = {
  image: string;
  category: string;
  title: string;
  content: string;
  url: string;
};

export const localPortfolioProjects: LocalPortfolioProject[] = [
  {
    image: '/images/project-a.svg',
    category: 'WEB DEVELOPMENT',
    title: 'AstroRekhaaji',
    content:
      'Production service platform built with Next.js, Tailwind CSS, Cloudflare D1/R2, and PayPal.',
    url: 'https://astrorekhaaji.com',
  },
  {
    image: '/images/project-b.svg',
    category: 'WEB DEVELOPMENT',
    title: 'Riva Arts',
    content:
      'Redesigned legacy website to improve visual appeal, brand perception, and client inquiry flows.',
    url: 'https://www.rivaarts.in',
  },
  {
    image: '/images/project-b.svg',
    category: 'WEB DEVELOPMENT',
    title: 'Elite Cafe',
    content:
      'Modern restaurant website with online menu and reservation-focused customer flow.',
    url: 'https://elite-cafe.sharmaanurag.in',
  },
  {
    image: '/images/project-b.svg',
    category: 'E-COMMERCE',
    title: 'Astrol K Sharma',
    content:
      'Shopify website redesign preserving business logic and payment integrations.',
    url: 'https://astrolksharma.com',
  },
  {
    image: '/images/project-a.svg',
    category: 'WEB DEVELOPMENT',
    title: 'ArtShowcase',
    content:
      'Interactive digital art gallery and exhibition platform for showcasing creative portfolios.',
    url: 'https://artshow.sharmaanurag.in',
  },
];
