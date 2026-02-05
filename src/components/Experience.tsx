
const experiences = [
    {
        role: "Founding Developer",
        company: "QodeML Labs",
        period: "September 2024 – Present",
        description: "Co-founded and led development for a product-focused tech agency. Delivered real-world web, AI, and software solutions for global clients. Owned product planning, UI/UX, development, deployment, and support. Worked closely with founders and business teams on requirements, delivery, and growth. Contributed to lead generation, client acquisition, and recurring revenue."
    },
    {
        role: "Blockchain Developer Intern",
        company: "BlockSeBlock",
        period: "July 2025 – August 2025",
        description: "Worked on a supply-chain product built on Internet Computer (ICP). Translated logistics requirements into backend features using Rust canisters. Integrated Internet Identity for secure authentication. Collaborated across frontend and backend to deliver end-to-end product flows. Participated in testing and iterative product improvements."
    },
    {
        role: "Developer Advocate",
        company: "HackQuest",
        period: "March 2025 – August 2025",
        description: "Selected in the top 5% of global applicants. Authored 5+ Web3 educational threads and completed 12 Zealy quests. Onboarded 30+ developers into Starknet hackathons. Supported builders with technical guidance and community engagement."
    },
    {
        role: "Research Intern",
        company: "SSCBS, University of Delhi",
        period: "June 2023 – September 2023",
        description: "Analyzed 1M+ cryptocurrency tweets using Python and NLP. Built sentiment analysis pipelines with 85% classification accuracy. Studied correlation between sentiment trends and token price movements. Applied LLM-based models for enhanced trend forecasting."
    }
];

const Experience = () => {
    return (
        <section id="experience" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-display mb-6">Work Experience</h2>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        A timeline of my professional journey and the value I've delivered across different roles.
                    </p>
                </div>

                <div className="relative">
                    {/* Vertical line - hidden on mobile, visible on md+ */}
                    <div className="hidden md:block absolute left-[300px] top-0 bottom-0 w-px bg-border"></div>

                    <div className="space-y-16">
                        {experiences.map((exp, index) => (
                            <div key={index} className="relative grid md:grid-cols-[300px_1fr] gap-8 md:gap-0">
                                {/* Date/Period */}
                                <div className="md:pr-12 relative">
                                    {/* Dot on the line */}
                                    <div className="hidden md:block absolute right-[-5px] top-2 w-2.5 h-2.5 rounded-full bg-primary z-10 ring-4 ring-background"></div>
                                    <span className="text-muted-foreground font-medium">{exp.period}</span>
                                </div>

                                {/* Content */}
                                <div className="md:pl-12 group">
                                    <h3 className="text-2xl font-display mb-1 group-hover:text-primary transition-colors duration-300">
                                        {exp.role}
                                    </h3>
                                    <div className="text-lg font-medium mb-4 text-foreground/80">
                                        {exp.company}
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed max-w-2xl">
                                        {exp.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
