export type LocalProject = {
  image: string;
  title: string;
  content: string;
  tags: { tag: string }[];
  url: string;
};

export const localWeb2Projects: LocalProject[] = [
  {
    image: '/images/project-a.svg',
    title: 'AstroRekhaaji',
    content:
      'Production service platform built with Next.js, Tailwind CSS, Cloudflare D1/R2, and PayPal.',
    tags: [{ tag: 'Next.js' }, { tag: 'Tailwind' }, { tag: 'Cloudflare' }, { tag: 'PayPal' }],
    url: 'https://astrorekhaaji.com',
  },
  {
    image: '/images/project-b.svg',
    title: 'Riva Arts',
    content:
      'Complete redesign of a legacy website to improve visual appeal and client inquiry flows.',
    tags: [{ tag: 'Next.js' }, { tag: 'Tailwind' }, { tag: 'Supabase' }, { tag: 'SEO' }],
    url: 'https://www.rivaarts.in',
  },
  {
    image: '/images/project-c.svg',
    title: 'Astrol K Sharma',
    content:
      'Full UI/UX redesign on live Shopify stack with strong focus on performance and conversion.',
    tags: [{ tag: 'Shopify' }, { tag: 'Liquid' }, { tag: 'Ecommerce' }, { tag: 'UI/UX' }],
    url: 'https://astrolksharma.com',
  },
  {
    image: '/images/project-b.svg',
    title: 'Aristo Hawk HR',
    content:
      'Business website for HR services with conversion-first IA and SEO-friendly structure.',
    tags: [{ tag: 'Gatsby' }, { tag: 'React' }, { tag: 'SEO' }],
    url: 'https://aristohawkhr.com',
  },
];
