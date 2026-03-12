export const dynamic = 'force-dynamic'
import { getPayload } from 'payload'
import configPromise from '../../payload.config'

/*
const staticSkills = [
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
*/

type SkillDoc = {
    name: string;
    category: string;
    image: any;
}

const Skills = async () => {
    const payload = await getPayload({ config: configPromise })
    const data = await payload.find({
        collection: 'skills',
        limit: 100,
    })

    const skillsData = data.docs as unknown as SkillDoc[];

    // Group skills by category
    const groupedSkills = skillsData.reduce((acc, skill) => {
        const cat = skill.category || "Technical Skills";
        if (!acc[cat]) {
            acc[cat] = [];
        }
        acc[cat].push(skill);
        return acc;
    }, {} as Record<string, SkillDoc[]>);

    // Ensure specific order if they exist
    const categoryOrder = ["Technical Skills", "Cloud & DevTools", "Coursework", "Soft Skills"];
    const displayCategories = categoryOrder.filter(c => groupedSkills[c]).map(c => ({
        category: c,
        items: groupedSkills[c]
    }));

    // Add any categories not in the predefined order
    Object.keys(groupedSkills).forEach(c => {
        if (!categoryOrder.includes(c)) {
            displayCategories.push({
                category: c,
                items: groupedSkills[c]
            });
        }
    });

    return (
        <section id="skills" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-display mb-6">Technical Skills</h2>
                    <p className="text-muted-foreground max-w-2xl text-lg">
                        A comprehensive list of technologies, tools, and areas of expertise I have developed over time.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {displayCategories.map((skillGroup, index) => (
                        <div key={index} className="bg-muted/30 rounded-2xl p-8 hover:bg-muted/50 transition-colors duration-300">
                            <h3 className="text-2xl font-display mb-6 text-foreground/90 pb-4 border-b border-border/50">
                                {skillGroup.category}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {skillGroup.items.map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-background border border-border px-4 py-2 rounded-full text-base font-medium text-foreground/80 hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                                    >
                                        {skill.name}
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
