'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Journey = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />
            <main className="pt-32 pb-24">
                <div className="container mx-auto px-6">
                    {/* Header */}
                    <div className="max-w-4xl mb-20 animate-on-scroll">
                        <h1 className="font-display text-5xl md:text-7xl mb-8">My Journey</h1>
                        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                            From curious student to Founding Developer. A timeline of learning, building, and solving problems.
                        </p>
                    </div>

                    {/* Story Section */}
                    <div className="grid md:grid-cols-12 gap-12 mb-24">
                        <div className="md:col-span-4">
                            <h2 className="text-2xl font-display mb-4">The Beginning</h2>
                        </div>
                        <div className="md:col-span-8">
                            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                                My fascination with technology began with curiosity about how things work under the hood. This led me to pursue a B.Sc. (H) in Computer Science at Shaheed Sukhdev College of Business Studies, where I built my foundation in algorithms, data structures, and computer networks.
                            </p>
                            <p className="text-muted-foreground text-lg leading-relaxed">
                                I didn't just stop at theory. I dove into implementation, exploring various domains from competitive programming to full-stack development, always driven by the desire to build things that people actually use.
                            </p>
                        </div>
                    </div>

                    {/* Professional Timeline */}
                    <div className="grid md:grid-cols-12 gap-12 mb-24">
                        <div className="md:col-span-4">
                            <h2 className="text-2xl font-display mb-4">Professional Growth</h2>
                        </div>
                        <div className="md:col-span-8 space-y-12">

                            {/* QodeML */}
                            <div className="relative pl-8 border-l border-border">
                                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-primary" />
                                <span className="text-sm font-mono text-muted-foreground mb-2 block">Sep 2025 - Present</span>
                                <h3 className="text-2xl font-display mb-2">Founding Developer @ QodeML Labs</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Co-founded a tech agency focused on delivering high-quality web and AI solutions. This role pushed me to wear multiple hats—from lead developer to technical strategist. I learned the intricacies of shipping products that drive real business value, not just writing code.
                                </p>
                            </div>

                            {/* BlockSeBlock */}
                            <div className="relative pl-8 border-l border-border">
                                <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 rounded-full bg-muted-foreground" />
                                <span className="text-sm font-mono text-muted-foreground mb-2 block">Jul 2025 - Aug 2025</span>
                                <h3 className="text-2xl font-display mb-2">Blockchain Developer Intern @ BlockSeBlock</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Deep dived into the Internet Computer Protocol (ICP). Engineered a supply chain dApp using Rust canisters, tackling challenges in decentralized identity and data traceability. This experience solidified my interest in systems engineering and Web3.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Philosophy */}
                    <div className="bg-muted/30 rounded-3xl p-8 md:p-12">
                        <h2 className="text-3xl font-display mb-6">My Philosophy</h2>
                        <blockquote className="text-xl md:text-2xl font-light italic text-muted-foreground">
                            "Code is just a tool. The real craft is in understanding the problem and engineering a solution that is simple, scalable, and sustainable."
                        </blockquote>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Journey;
