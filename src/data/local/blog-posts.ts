export type LocalBlogPost = {
  slug: string;
  title: string;
  date: string;
  category: string;
  image: string;
  content: string;
};

export const localBlogPosts: LocalBlogPost[] = [
  {
    slug: 'optimizing-nextjs-performance',
    title: 'Optimizing Next.js for Maximum Performance',
    date: 'Aug 28',
    category: 'Technical',
    image: '/images/blog-a.svg',
    content:
      '<p>Performance is a feature. Focus on route-level rendering strategy, image optimization, and minimal client JavaScript.</p><h2>Image Optimization</h2><p>Use <code>next/image</code> with clear dimensions and local assets when possible to avoid runtime fetch failures.</p><h2>Server Components</h2><p>Keep interactivity isolated to small client components to reduce hydration cost.</p>',
  },
  {
    slug: 'starting-web-design-career',
    title: 'Starting and Growing a Career in Web Design',
    date: 'Aug 28',
    category: 'Branding',
    image: '/images/blog-b.svg',
    content:
      '<p>Great design careers are built on fundamentals: typography, spacing, hierarchy, and taste developed through repetition.</p><h2>Start Small</h2><p>Recreate interfaces you admire and build a repeatable design process for real projects.</p>',
  },
  {
    slug: 'security-audits-necessity',
    title: 'Security Audits: Why Every Application Needs One',
    date: 'Oct 15',
    category: 'Security',
    image: '/images/blog-a.svg',
    content:
      '<p>Security is not a launch checklist item. It is a continuous practice across architecture, dependencies, and operations.</p><h2>Audit Scope</h2><p>Include threat modeling, penetration testing, and dependency review.</p>',
  },
  {
    slug: 'building-smart-ai-apps',
    title: 'How to Build Smart Applications With AI Integration',
    date: 'Oct 20',
    category: 'AI',
    image: '/images/blog-b.svg',
    content:
      '<p>Reliable AI features depend on context retrieval, safe fallbacks, and observability.</p><h2>RAG Basics</h2><p>Retrieve relevant context first, then prompt the model with constrained instructions.</p>',
  },
  {
    slug: 'top-design-tips-ux',
    title: 'Top Design Tips for Creating Engaging User Experiences',
    date: 'Nov 02',
    category: 'Design',
    image: '/images/blog-a.svg',
    content:
      '<p>Strong UX feels invisible. Users should complete tasks quickly, confidently, and without confusion.</p><h2>Micro-interactions</h2><p>Small feedback states can dramatically improve trust and clarity.</p>',
  },
  {
    slug: 'my-journey-into-tech',
    title: 'My Journey into Tech',
    date: 'Aug 28',
    category: 'Personal',
    image: '/images/blog-b.svg',
    content:
      '<p>From curiosity to production systems, the most important pattern was persistence and project-based learning.</p><h2>Learning Loop</h2><p>Ship small, get feedback, and iterate quickly.</p>',
  },
  {
    slug: 'my-first-pay-milestone',
    title: 'My First Pay: The Milestone That Changed Everything',
    date: 'Feb 10',
    category: 'Career',
    image: '/images/blog-a.svg',
    content:
      '<p>Your first paid project changes your mindset from learner to professional problem solver.</p><h2>Client Communication</h2><p>Clear expectations and timelines are as important as code quality.</p>',
  },
  {
    slug: 'my-journey-as-teacher',
    title: 'My Journey as a Teacher and Mentor in Tech',
    date: 'Mar 05',
    category: 'Teaching',
    image: '/images/blog-b.svg',
    content:
      '<p>Teaching sharpened my fundamentals and made me a better engineer by exposing conceptual gaps.</p><h2>Aha Moments</h2><p>Great mentoring breaks complex systems into simple mental models.</p>',
  },
];

export const personalCategories = new Set(['Personal', 'Career', 'Teaching']);
