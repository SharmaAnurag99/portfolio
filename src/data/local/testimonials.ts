export type LocalTestimonial = {
  image: string;
  content: string;
  name: string;
  role: string;
};

export const localTestimonials: LocalTestimonial[] = [
  {
    image: '/images/avatar-a.svg',
    content:
      'Absolutely ecstatic with the results. The platform captured our vision and improved our client onboarding flow.',
    name: 'LK Sharma',
    role: 'AstroScientist',
  },
  {
    image: '/images/avatar-b.svg',
    content:
      'Professional, timely, and highly skilled delivery. The final product felt polished and stable from day one.',
    name: 'Rajeev',
    role: 'Client',
  },
  {
    image: '/images/avatar-a.svg',
    content:
      'A game changer for our business. Strong technical depth with clear communication throughout the process.',
    name: 'Vinit Vijal',
    role: 'Founder, QodeML Labs',
  },
  {
    image: '/images/avatar-b.svg',
    content:
      'Our old platform was transformed into a modern and fast web app. Great attention to detail and UX quality.',
    name: 'Alkaif Ansari',
    role: 'ML Engineer',
  },
];
