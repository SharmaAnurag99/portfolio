export type LocalExperience = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export const localExperience: LocalExperience[] = [
  {
    role: 'Founding Developer',
    company: 'QodeML Labs',
    period: 'September 2024 - Present',
    description:
      'Co-founded and led development for a product-focused tech agency. Delivered web, AI, and software solutions for global clients.',
  },
  {
    role: 'Blockchain Developer Intern',
    company: 'BlockSeBlock',
    period: 'July 2025 - August 2025',
    description:
      'Worked on supply-chain product features on ICP with Rust canisters and integrated secure identity workflows.',
  },
  {
    role: 'Developer Advocate',
    company: 'HackQuest',
    period: 'March 2025 - August 2025',
    description:
      'Authored educational Web3 content, onboarded developers to Starknet hackathons, and supported community builders.',
  },
  {
    role: 'Research Intern',
    company: 'SSCBS, University of Delhi',
    period: 'June 2023 - September 2023',
    description:
      'Analyzed 1M+ crypto tweets using NLP pipelines and studied sentiment correlation with token movement.',
  },
];
