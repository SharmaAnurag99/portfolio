'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const blogs = [
    {
        date: 'February 4, 2026',
        title: 'Why I chose Next.js for my Portfolio',
        excerpt: 'Exploring the performance benefits and developer experience of the App Router and Server Components.',
        category: 'Engineering'
    },
    {
        date: 'January 15, 2026',
        title: 'Understanding Rust Ownership Model',
        excerpt: 'A deep dive into memory safety without garbage collection and how it changes the way we think about system programming.',
        category: 'Rust'
    },
    {
        date: 'December 20, 2025',
        title: 'The Future of Decentralized Identity',
        excerpt: 'How Internet Identity on ICP is paving the way for a password-less future in Web3.',
        category: 'Web3'
    }
];

const Blog = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-24">
                <div className="container mx-auto px-6">
                    <div className="mb-16">
                        <h1 className="font-display text-5xl md:text-7xl mb-6">Thoughts</h1>
                        <p className="text-muted-foreground text-xl max-w-2xl">
                            Notes on engineering, design, and the technologies I'm exploring.
                        </p>
                    </div>

                    <div className="grid gap-12 max-w-4xl">
                        {blogs.map((post, index) => (
                            <article key={index} className="group cursor-pointer border-b border-border pb-12 last:border-0 hover:opacity-80 transition-opacity">
                                <div className="flex items-center gap-4 mb-4 text-sm">
                                    <span className="font-mono text-muted-foreground">{post.date}</span>
                                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full font-medium text-xs">
                                        {post.category}
                                    </span>
                                </div>
                                <h2 className="font-display text-3xl md:text-4xl mb-4 group-hover:underline decoration-1 underline-offset-4">
                                    {post.title}
                                </h2>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {post.excerpt}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Blog;
