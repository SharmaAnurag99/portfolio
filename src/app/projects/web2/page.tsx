'use client';

import { ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const web2Projects = [
    {
        image: '/rekhaaji.png',
        title: 'AstroRekhaaji',
        description: 'Production service platform built with Next.js, Tailwind CSS, Cloudflare D1/R2, and PayPal. Features lead capture, email workflows, and end-to-end payment integration.',
        tags: ['Next.js', 'Tailwind', 'Cloudflare D1', 'R2', 'Nodemailer', 'PayPal'],
        link: 'https://astrorekhaaji.com'
    },
    {
        image: '/riva.png',
        title: 'Riva Arts',
        description: 'Complete redesign of a legacy website to improve visual appeal, brand perception, and client inquiry flows.',
        tags: ['Next.js', 'Tailwind', 'Supabase', 'Nodemailer', 'SEO'],
        link: 'https://www.rivaarts.in'
    },
    {
        image: '/lksharma.png',
        title: 'Astrol K Sharma',
        description: 'Full UI/UX redesign of a live Shopify website under strict constraints. Focused on performance, responsiveness, and usability without disrupting operations.',
        tags: ['Shopify', 'Liquid', 'eCommerce', 'UI/UX'],
        link: 'https://astrolksharma.com'
    },
    {
        image: '/aristohawk.png',
        title: 'Aristo Hawk HR',
        description: 'Business website for HR services with conversion-focused design, lead inquiry flows, and SEO-friendly information architecture.',
        tags: ['Gatsby', 'SEO', 'React'],
        link: 'https://aristohawkhr.com'
    },
    {
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop',
        title: 'Art Show',
        description: 'An interactive digital art gallery and exhibition platform designed for showcasing creative portfolios.',
        tags: ['React', 'Next.js', 'Tailwind'],
        link: 'https://artShow.sharmaanurag.in'
    },
    {
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=600&fit=crop',
        title: 'Elite Cafe',
        description: 'Modern and elegant restaurant website featuring a sleek online menu and automated reservation system.',
        tags: ['Web Design', 'UI/UX', 'Frontend'],
        link: 'https://elite-cafe.sharmaanurag.in'
    },
    {
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop',
        title: 'Travel Agency',
        description: 'Comprehensive travel booking platform and destination guide with a clean, user-friendly interface.',
        tags: ['Travel', 'Booking', 'Next.js'],
        link: 'https://travelAgengy.sharmaanurag.in'
    },
    {
        image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&h=600&fit=crop',
        title: 'Mojito Cafe',
        description: 'A vibrant web presentation showcasing premium beverages, mixology services, and elegant cafe aesthetics.',
        tags: ['Web Design', 'Next.js', 'React'],
        link: 'https://mojito.sharmaanurag.in'
    }
];

const Web2Projects = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-24">
                <div className="container mx-auto px-6">
                    <div className="mb-16">
                        <h1 className="font-display text-5xl md:text-7xl mb-6">Web2 Projects</h1>
                        <p className="text-muted-foreground text-xl max-w-2xl">
                            A collection of traditional full-stack web applications, e-commerce platforms, and digital experiences.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {web2Projects.map((project, index) => (
                            <a
                                key={index}
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group cursor-pointer block"
                            >
                                <div className="relative overflow-hidden rounded-3xl aspect-video mb-6 border border-border/50">
                                    <Image
                                        src={project.image}
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
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="px-3 py-1 bg-muted rounded-full text-xs font-medium text-muted-foreground">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Web2Projects;
