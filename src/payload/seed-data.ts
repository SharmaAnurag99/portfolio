export const mediaSeedFiles = {
  profile: { filePath: 'public/images/profile.svg', alt: 'Profile photo illustration' },
  avatarA: { filePath: 'public/images/avatar-a.svg', alt: 'Avatar A illustration' },
  avatarB: { filePath: 'public/images/avatar-b.svg', alt: 'Avatar B illustration' },
  projectA: { filePath: 'public/images/project-a.svg', alt: 'Project A thumbnail' },
  projectB: { filePath: 'public/images/project-b.svg', alt: 'Project B thumbnail' },
  projectC: { filePath: 'public/images/project-c.svg', alt: 'Project C thumbnail' },
  blogA: { filePath: 'public/images/blog-a.svg', alt: 'Blog A cover' },
  blogB: { filePath: 'public/images/blog-b.svg', alt: 'Blog B cover' },
} as const

export const testimonialsSeed = [
  {
    name: 'LK Sharma',
    role: 'AstroScientist',
    content:
      'Absolutely ecstatic with the results. The platform captured our vision and improved our client onboarding flow.',
    imageKey: 'avatarA',
  },
  {
    name: 'Rajeev',
    role: 'Client',
    content:
      'Professional, timely, and highly skilled delivery. The final product felt polished and stable from day one.',
    imageKey: 'avatarB',
  },
  {
    name: 'Vinit Vijal',
    role: 'Founder, QodeML Labs',
    content:
      'A game changer for our business. Strong technical depth with clear communication throughout the process.',
    imageKey: 'avatarA',
  },
  {
    name: 'Alkaif Ansari',
    role: 'ML Engineer',
    content:
      'Our old platform was transformed into a modern and fast web app. Great attention to detail and UX quality.',
    imageKey: 'avatarB',
  },
] as const

export const projectsSeed = [
  {
    category: 'WEB DEVELOPMENT',
    title: 'AstroRekhaaji',
    content: 'Production service platform built with Next.js, Tailwind CSS, Cloudflare D1/R2, and PayPal.',
    url: 'https://astrorekhaaji.com',
    githubUrl: '',
    tags: [{ tag: 'Next.js' }, { tag: 'Cloudflare' }, { tag: 'Payments' }],
    imageKey: 'projectA',
  },
  {
    category: 'WEB DEVELOPMENT',
    title: 'Riva Arts',
    content: 'Redesigned legacy website to improve visual appeal, brand perception, and client inquiry flows.',
    url: 'https://www.rivaarts.in',
    githubUrl: '',
    tags: [{ tag: 'UI/UX' }, { tag: 'Branding' }],
    imageKey: 'projectB',
  },
  {
    category: 'WEB DEVELOPMENT',
    title: 'Elite Cafe',
    content: 'Modern restaurant website with online menu and reservation-focused customer flow.',
    url: 'https://elite-cafe.sharmaanurag.in',
    githubUrl: '',
    tags: [{ tag: 'Landing Page' }, { tag: 'Performance' }],
    imageKey: 'projectC',
  },
  {
    category: 'E-COMMERCE',
    title: 'Astrol K Sharma',
    content: 'Shopify website redesign preserving business logic and payment integrations.',
    url: 'https://astrolksharma.com',
    githubUrl: '',
    tags: [{ tag: 'Shopify' }, { tag: 'Payments' }],
    imageKey: 'projectB',
  },
  {
    category: 'WEB DEVELOPMENT',
    title: 'ArtShowcase',
    content: 'Interactive digital art gallery and exhibition platform for showcasing creative portfolios.',
    url: 'https://artshow.sharmaanurag.in',
    githubUrl: '',
    tags: [{ tag: 'Creative Tech' }, { tag: 'Gallery' }],
    imageKey: 'projectA',
  },
] as const

export const skillsSeed = [
  { category: 'Technical Skills', items: ['JavaScript', 'TypeScript', 'Python', 'C++', 'ReactJS', 'Next.js', 'Node.js', 'REST APIs', 'TailwindCSS', 'SQL', 'MongoDB', 'Rust'] },
  { category: 'Cloud & DevTools', items: ['Cloudflare (D1, R2)', 'Supabase', 'Git', 'Linux', 'Docker', 'Agile'] },
  { category: 'Coursework', items: ['Data Structures & Algorithms', 'DBMS', 'Computer Networks', 'Machine Learning', 'Artificial Intelligence', 'Deep Learning', 'Data Mining'] },
  { category: 'Soft Skills', items: ['Communication', 'Teamwork', 'Problem-Solving', 'Leadership', 'Adaptability', 'Time Management'] },
] as const

export const educationSeed = [
  {
    title: 'Founding Developer at QodeML Labs',
    content:
      'Co-founded and led development for a product-focused tech agency. Delivered web, AI, and software solutions for global clients.\n\nSeptember 2024 - Present',
    imageKey: 'profile',
  },
  {
    title: 'Blockchain Developer Intern at BlockSeBlock',
    content:
      'Worked on supply-chain product features on ICP with Rust canisters and integrated secure identity workflows.\n\nJuly 2025 - August 2025',
    imageKey: 'profile',
  },
  {
    title: 'Developer Advocate at HackQuest',
    content:
      'Authored educational Web3 content, onboarded developers to Starknet hackathons, and supported community builders.\n\nMarch 2025 - August 2025',
    imageKey: 'profile',
  },
  {
    title: 'Research Intern at SSCBS, University of Delhi',
    content:
      'Analyzed 1M+ crypto tweets using NLP pipelines and studied sentiment correlation with token movement.\n\nJune 2023 - September 2023',
    imageKey: 'profile',
  },
] as const

export const blogsSeed = [
  { slug: 'optimizing-nextjs-performance', title: 'Optimizing Next.js for Maximum Performance', date: 'Aug 28', category: 'Technical', content: '<p>Performance is a feature. Focus on route-level rendering strategy, image optimization, and minimal client JavaScript.</p>', imageKey: 'blogA' },
  { slug: 'starting-web-design-career', title: 'Starting and Growing a Career in Web Design', date: 'Aug 28', category: 'Branding', content: '<p>Great design careers are built on fundamentals: typography, spacing, hierarchy, and taste developed through repetition.</p>', imageKey: 'blogB' },
  { slug: 'security-audits-necessity', title: 'Security Audits: Why Every Application Needs One', date: 'Oct 15', category: 'Security', content: '<p>Security is not a launch checklist item. It is a continuous practice across architecture, dependencies, and operations.</p>', imageKey: 'blogA' },
  { slug: 'building-smart-ai-apps', title: 'How to Build Smart Applications With AI Integration', date: 'Oct 20', category: 'AI', content: '<p>Reliable AI features depend on context retrieval, safe fallbacks, and observability.</p>', imageKey: 'blogB' },
  { slug: 'top-design-tips-ux', title: 'Top Design Tips for Creating Engaging User Experiences', date: 'Nov 02', category: 'Design', content: '<p>Strong UX feels invisible. Users should complete tasks quickly, confidently, and without confusion.</p>', imageKey: 'blogA' },
  { slug: 'my-journey-into-tech', title: 'My Journey into Tech', date: 'Aug 28', category: 'Personal', content: '<p>From curiosity to production systems, the most important pattern was persistence and project-based learning.</p>', imageKey: 'blogB' },
  { slug: 'my-first-pay-milestone', title: 'My First Pay: The Milestone That Changed Everything', date: 'Feb 10', category: 'Career', content: '<p>Your first paid project changes your mindset from learner to professional problem solver.</p>', imageKey: 'blogA' },
  { slug: 'my-journey-as-teacher', title: 'My Journey as a Teacher and Mentor in Tech', date: 'Mar 05', category: 'Teaching', content: '<p>Teaching sharpened my fundamentals and made me a better engineer by exposing conceptual gaps.</p>', imageKey: 'blogB' },
] as const
