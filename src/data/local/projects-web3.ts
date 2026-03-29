import type { LocalProject } from './projects-web2';

export const localWeb3Projects: LocalProject[] = [
  {
    image: '/images/project-c.svg',
    title: 'Hive Bounty Platform',
    content:
      'Decentralized bounty system for GitHub-linked issues with automated reward distribution.',
    tags: [{ tag: 'Hive' }, { tag: 'Dhive.js' }, { tag: 'GitHub API' }, { tag: 'React' }],
    url: '#',
  },
  {
    image: '/images/project-a.svg',
    title: 'Cross-Chain Bridge Contract',
    content:
      'EVM-based token bridge implementation with nonce tracking and validator approval logic.',
    tags: [{ tag: 'Solidity' }, { tag: 'Foundry' }],
    url: '#',
  },
  {
    image: '/images/project-b.svg',
    title: 'Liquid Staking Token Contract',
    content:
      'On-chain staking with LST mint/burn mechanics and real-time APR dashboard integration.',
    tags: [{ tag: 'Solidity' }, { tag: 'Hardhat' }, { tag: 'React' }, { tag: 'Tailwind' }],
    url: '#',
  },
];
