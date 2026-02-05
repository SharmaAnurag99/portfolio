
const skills = [
    {
        category: "Technical Skills",
        items: ["JavaScript", "TypeScript", "Python", "C++", "ReactJS", "Next.js", "Node.js", "REST APIs", "TailwindCSS", "SQL", "MongoDB", "Rust"]
    },
    {
        category: "Cloud & DevTools",
        items: ["Cloudflare (D1, R2)", "Supabase", "Git", "Linux", "Docker", "Agile"]
    },
    {
        category: "Coursework",
        items: ["Data Structures & Algorithms", "DBMS", "Computer Networks", "Machine Learning", "Artificial Intelligence", "Deep Learning", "Data Mining"]
    },
    {
        category: "Soft Skills",
        items: ["Communication", "Teamwork", "Problem-Solving", "Leadership", "Adaptability", "Time Management"]
    }
];

const Skills = () => {
    return (
        <section id="skills" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-display mb-6">Technical Skills</h2>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        A comprehensive list of technologies and tools I work with.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {skills.map((skillGroup, index) => (
                        <div key={index} className="bg-muted/30 rounded-2xl p-8 hover:bg-muted/50 transition-colors duration-300">
                            <h3 className="text-xl font-display mb-6 text-primary">{skillGroup.category}</h3>
                            <div className="flex flex-wrap gap-2">
                                {skillGroup.items.map((item, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-background border border-border px-3 py-1.5 rounded-full text-sm text-foreground/80"
                                    >
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
