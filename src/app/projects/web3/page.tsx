import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPayload } from 'payload';
import configPromise from '../../../../payload.config';

/*
const staticWeb3Projects = [
    {
        image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&h=600&fit=crop',
        title: 'Hive Bounty Platform',
        description: 'Decentralized bounty system for GitHub-linked issues with automated reward distribution. Ranked Top 10 at Hive Hackathon.',
        tags: ['Hive', 'Dhive.js', 'GitHub API', 'React']
    },
    {
        image: 'https://images.unsplash.com/photo-1621504450168-b8c034d14187?w=800&h=600&fit=crop',
        title: 'Cross-Chain Bridge Contract',
        description: 'EVM-based token bridge implementation with nonce tracking and validator approval logic. Tested in simulated multi-validator environment.',
        tags: ['Solidity', 'Foundry']
    },
    {
        image: 'https://images.unsplash.com/photo-1642104704074-907c0698b98d?w=800&h=600&fit=crop',
        title: 'Liquid Staking Token (LST) Contract',
        description: 'On-chain staking and LST mint/burn mechanism with real-time APR dashboard. Used by 150+ users.',
        tags: ['Solidity', 'Hardhat', 'React', 'Tailwind CSS']
    }
];
*/

export const dynamic = 'force-dynamic';

const Web3Projects = async () => {
    const payload = await getPayload({ config: configPromise });
    const data = await payload.find({
        collection: 'projects',
        where: { category: { equals: 'BLOCKCHAIN' } },
        depth: 1,
        limit: 100
    });

    const web3Projects = data.docs;

    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-24">
                <div className="container mx-auto px-6">
                    <div className="mb-16">
                        <h1 className="font-display text-5xl md:text-7xl mb-6">Web3 Projects</h1>
                        <p className="text-muted-foreground text-xl max-w-2xl">
                            Exploring the decentralized web with smart contracts, dApps, and blockchain solutions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {web3Projects.map((project: any, index: number) => {
                            const imageUrl = (typeof project.image === 'object' && project.image !== null ? project.image.url : null) || '/placeholder.svg'
                            const projectUrl = project.url || '#'
                            return (
                                <a key={index} href={projectUrl} target="_blank" rel="noreferrer" className="group cursor-pointer block">
                                    <div className="relative overflow-hidden rounded-3xl aspect-video mb-6 border border-border/50">
                                        <Image
                                            src={imageUrl}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                            <div className="bg-background/90 backdrop-blur-sm p-4 rounded-full">
                                                <ArrowUpRight className="w-6 h-6 text-foreground" />
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="font-display text-3xl mb-3">{project.title}</h3>
                                    <p className="text-muted-foreground mb-4 leading-relaxed">
                                        {project.content}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags?.map((tagObj: any, i: number) => (
                                            <span key={i} className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground">
                                                {tagObj.tag}
                                            </span>
                                        ))}
                                    </div>
                                </a>
                            )
                        })}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Web3Projects;
