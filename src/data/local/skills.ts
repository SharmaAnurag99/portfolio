export type LocalSkillGroup = {
  category: string;
  items: { name: string }[];
};

export const localSkills: LocalSkillGroup[] = [
  {
    category: 'Technical Skills',
    items: [
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'Python' },
      { name: 'C++' },
      { name: 'ReactJS' },
      { name: 'Next.js' },
      { name: 'Node.js' },
      { name: 'REST APIs' },
      { name: 'TailwindCSS' },
      { name: 'SQL' },
      { name: 'MongoDB' },
      { name: 'Rust' },
    ],
  },
  {
    category: 'Cloud & DevTools',
    items: [
      { name: 'Cloudflare (D1, R2)' },
      { name: 'Supabase' },
      { name: 'Git' },
      { name: 'Linux' },
      { name: 'Docker' },
      { name: 'Agile' },
    ],
  },
  {
    category: 'Coursework',
    items: [
      { name: 'Data Structures & Algorithms' },
      { name: 'DBMS' },
      { name: 'Computer Networks' },
      { name: 'Machine Learning' },
      { name: 'Artificial Intelligence' },
      { name: 'Deep Learning' },
      { name: 'Data Mining' },
    ],
  },
  {
    category: 'Soft Skills',
    items: [
      { name: 'Communication' },
      { name: 'Teamwork' },
      { name: 'Problem-Solving' },
      { name: 'Leadership' },
      { name: 'Adaptability' },
      { name: 'Time Management' },
    ],
  },
];
