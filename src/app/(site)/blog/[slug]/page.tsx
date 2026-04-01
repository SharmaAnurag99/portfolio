import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';
import { getPayload } from 'payload';
import configPromise from '../../../../../payload.config';
import { RichText } from '@payloadcms/richtext-lexical/react'
import { resolveMediaUrl } from '@/lib/media';
import { useCmsContent } from '@/lib/use-cms-content';
import { localBlogPosts } from '@/data/local/blog-posts';


/*
// Dummy content database (in a real app, this comes from a CMS or MDX files)
const BLOG_DATABASE: Record<string, { title: string, date: string, category: string, image: string, content: React.ReactNode }> = {
    'optimizing-nextjs-performance': {
        title: 'Optimizing Next.js for Maximum Performance',
        date: 'Aug 28',
        category: 'Technical',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&h=800&fit=crop',
        content: (
            <>
                <p>In modern web development, performance isn't just a luxury—it's a requirement. When working with Next.js, developers are handed a powerful set of tools out of the box, but knowing how to squeeze every ounce of performance out of them is what separates good applications from great ones.</p>

                <h2>The Power of Image Optimization</h2>
                <p>One of the most immediate gains you can achieve in a Next.js application is by properly utilizing the <code>next/image</code> component. Traditional <code>&lt;img&gt;</code> tags load the original asset size regardless of the viewport. Next.js, however, automatically optimizes images, serves them in modern formats like WebP or AVIF, and ensures they are responsive.</p>

                <p>Beyond formats, it prevents Cumulative Layout Shift (CLS) by forcing developers to define aspect ratios or sizes, ensuring that the page doesn't jump around as images load in over slower connections.</p>

                <h2>Server Components vs Client Components</h2>
                <p>With the introduction of the App Router, understanding the boundary between Server and Client components is crucial. By default, components in the <code>app</code> directory are Server Components. This means their Javascript is never sent to the browser, significantly reducing the bundle size.</p>

                <p>The rule of thumb is simple: push the client boundary down as far as possible. Only use <code>"use client"</code> on the specific granular components that require interactivity, state (`useState`), or browser APIs.</p>

                <blockquote>
                    "Performance is a feature. It needs to be prioritized, designed, and built just like any other feature in your application."
                </blockquote>

                <h2>Proper Font Loading</h2>
                <p>Custom fonts often cause visual jarring when they load (FOUT - Flash of Unstyled Text). Next.js has a built-in <code>next/font</code> module that optimizes fonts automatically. It downloads them at build time and hosts them alongside your static assets, completely eliminating external network requests to Google Fonts during page load.</p>

                <p>By implementing these foundational optimizations—Image handling, Server Components, and Local Fonts—you lay down a robust performance baseline that easily achieves high Lighthouse scores.</p>
            </>
        )
    },
    'starting-web-design-career': {
        title: 'Starting and Growing a Career in Web Design',
        date: 'Aug 28',
        category: 'Branding',
        image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1600&h=800&fit=crop',
        content: (
            <>
                <p>Breaking into web design can feel overwhelming. There are endless tools, evolving trends, and a constant debate over whether designers should learn how to code. But building a successful career in this space usually comes down to mastering a few core fundamentals rather than jumping on every new hype train.</p>

                <h2>Start with the Fundamentals, Not the Tools</h2>
                <p>Figma, Sketch, Framer—these are just tools. They change. They update. They get replaced. What doesn't change are the fundamental principles of design: Typography, Color Theory, Spacing (Whitespace), and Visual Hierarchy.</p>

                <p>Before you learn Auto-Layout in Figma, learn why a 16px base font with a 1.5 line height looks readable. Before learning how to make complex interactive components, understand why pushing elements apart creates visual groupings for the user.</p>

                <h2>The Importance of Taste</h2>
                <p>As Ira Glass famously said, beginners suffer from a "taste gap." Your taste is good—which is why you appreciate good design—but your skills haven't caught up yet. The only way to close that gap is volume.</p>

                <p>Recreate designs you love pixel-by-pixel. Don't trace them; rebuild them from scratch. You will quickly realize how much subtle drop-shadow, specific padding, and precise color-picking goes into making something look "professional."</p>

                <h2>Should Designers Code?</h2>
                <p>You don't need to be a full-stack engineer, but understanding HTML, CSS, and how the browser renders elements is a superpower. A designer who understands the box model (margin, padding, border) designs interfaces that are actually buildable, saving developers countless headaches and making you a far more valuable asset to any product team.</p>
            </>
        )
    },
    'security-audits-necessity': {
        title: 'Security Audits: Why Every Application Needs One',
        date: 'Oct 15',
        category: 'Security',
        image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=1600&h=800&fit=crop',
        content: (
            <>
                <p>We often build applications with the "happy path" in mind. We imagine users clicking the buttons in the right order, submitting valid data, and gently interacting with our interfaces. But the internet is not a gentle place.</p>

                <h2>The Illusion of Security Through Obscurity</h2>
                <p>A common misconception is that if code isn't public, it's safe. "No one knows how our internal API works, so they can't exploit it." This is security through obscurity, and it is a notoriously brittle defense. Attackers don't need your source code to map out your application's surface area; automated tools do that in minutes.</p>

                <h2>What a Security Audit Actually Entails</h2>
                <p>A proper security audit goes far beyond running a vulnerability scanner. It involves:</p>
                <ul>
                    <li><strong>Architecture Review:</strong> Looking at the macro level to see if data flows securely between services.</li>
                    <li><strong>Dependency Checking:</strong> Often, the code you write is safe, but the thousands of NPM packages you rely on are not. Supply chain attacks are becoming increasingly common.</li>
                    <li><strong>Penetration Testing:</strong> Actively trying to break into the system (with permission) using the exact same tools and methodologies malicious actors use.</li>
                </ul>

                <h2>The Cost of Doing Nothing</h2>
                <p>The cost of an audit might seem high to a startup or a small business. However, the cost of a data breach—in term of regulatory fines, loss of customer trust, and engineering downtime—is exponential. Investing in routine security checkups is no longer an enterprise luxury; it's a fundamental operational requirement.</p>
            </>
        )
    },
    'building-smart-ai-apps': {
        title: 'How to Build Smart Applications With AI Integration',
        date: 'Oct 20',
        category: 'AI',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1600&h=800&fit=crop',
        content: (
            <>
                <p>The barrier to integrating Artificial Intelligence into everyday applications has virtually disappeared. A few years ago, adding AI meant hiring specialized machine learning engineers and spending months training models. Today, it mostly means making a well-structured HTTP request to an API.</p>

                <h2>Beyond the Chatbot</h2>
                <p>When people think of AI integration, they immediate think of chat interfaces. While Chat is powerful, the real magic happens when AI is invisible. Think about features like:</p>
                <ul>
                    <li>Automatically categorizing and tagging user-uploaded images.</li>
                    <li>Summarizing long financial reports into 3 bullet points on a dashboard.</li>
                    <li>Smart search that understands intent (semantic search) rather than just exact keyword matching.</li>
                </ul>

                <h2>The Context Problem</h2>
                <p>Large Language Models (LLMs) are incredibly smart, but they suffer from amnesia. They only know what you tell them in the active prompt. Building smart applications often involves mastering "RAG" (Retrieval-Augmented Generation).</p>

                <p>Instead of just sending a user's question to the AI, a smart application will first search its own database for relevant information, package that information up with the user's question, and say to the AI: "Based ONLY on this context I'm providing you, answer the user's question."</p>

                <h2>Graceful Degradation</h2>
                <p>AI models occasionally hallucinate or timeout. A well-built application expects this. Always design your UI to handle situations where the AI fails to respond or returns mangled data. Never put AI directly in the critical path of your core business logic without a fallback.</p>
            </>
        )
    },
    'top-design-tips-ux': {
        title: 'Top Design Tips for Creating Engaging User Experiences',
        date: 'Nov 02',
        category: 'Design',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&h=800&fit=crop',
        content: (
            <>
                <p>User Experience (UX) is the invisible hand that guides a visitor through a digital space. When it's bad, the user notices immediately and leaves. When it's exceptional, the user doesn't notice it at all—they just accomplish their goal feeling satisfied.</p>

                <h2>Designing for the Thumb</h2>
                <p>Over half of all web traffic comes from mobile devices. Yet, many interfaces are still designed on large desktop monitors and "shrunk down" for mobile. Real mobile design considers how humans hold phones. The bottom half of the screen is easily reachable by the thumb; the top corners require adjusting your grip. Critical actions (like 'Buy Now' or navigation menus) should be anchored near the bottom.</p>

                <h2>The Power of Micro-interactions</h2>
                <p>Static websites feel dead. Micro-interactions breathe life into them. When a user hovers over a button, it should react. When a form submits, a subtle loading spinner should appear instantly to acknowledge the click. These small visual cues provide constant reassurance to the user that the system is listening to them.</p>

                <blockquote>
                    "Good design is actually a lot harder to notice than poor design, in part because good design fits our needs so well that the design is invisible." - Don Norman
                </blockquote>

                <h2>Accessibility IS User Experience</h2>
                <p>Contrast ratios, readable font sizes, and keyboard navigability aren't just "compliance checkboxes"—they are fundamental to good UX. If a user has to squint to read low-contrast gray text on a white background, your UX has failed, regardless of how trendy it looks on Dribbble.</p>
            </>
        )
    },
    'my-journey-into-tech': {
        title: 'My Journey into Tech',
        date: 'Aug 28',
        category: 'Personal',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1600&h=800&fit=crop',
        content: (
            <>
                <p>Everyone's entry into the technology industry is unique. Unlike medicine or law, there is rarely a strictly defined, singular path to becoming a software engineer or a designer. My journey was no different—a winding road of curiosity, frustration, and eventual breakthroughs.</p>

                <h2>The Initial Spark</h2>
                <p>I didn't grow up writing code. I was always fascinated by computers, but primarily as a consumer of software, not a creator. It wasn't until I stumbled upon a basic HTML/CSS tutorial that the illusion shattered. The realization that the entire web was just text documents intricately linked together was a paradigm shift.</p>

                <p>I started building terrible, beautifully horrific websites. Blinking text, clashing colors, and broken layouts. But they were mine. The feedback loop of writing a line of code, hitting refresh, and seeing the screen change instantly was intoxicating.</p>

                <h2>The Valley of Despair</h2>
                <p>Moving from basic markup to actual programming (JavaScript, in my case) was a brutal awakening. Following tutorials felt easy, but staring at a blank editor trying to build something from scratch felt impossible. This is what developers call "Tutorial Hell."</p>

                <p>I spent months feeling like I was an impostor who just didn't have the "engineering brain." The concept of async/await, closures, and state management felt like trying to read a foreign language.</p>

                <h2>Breaking Through</h2>
                <p>The turning point wasn't a sudden burst of genius; it was persistence and building a real project. I decided to build something I actually needed. I broke the project down into microscopic problems. When I got stuck, I read documentations instead of just copying Stack Overflow answers. Over time, the syntax faded into the background, and the logical problem-solving took over. That was the moment I realized I had truly become an engineer.</p>
            </>
        )
    },
    'my-first-pay-milestone': {
        title: 'My First Pay: The Milestone That Changed Everything',
        date: 'Feb 10',
        category: 'Career',
        image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1600&h=800&fit=crop',
        content: (
            <>
                <p>There are very few moments in a career quite as validating as receiving your first paycheck for writing code or designing an interface. It marks a transition from "enthusiastic hobbyist" to "professional."</p>

                <h2>The Hustle for the First Client</h2>
                <p>Finding that first person willing to part with their money in exchange for your digital skills is incredibly difficult. You don't have a portfolio of paid work to show them. You're effectively asking them to trust you based on blind faith and personal projects.</p>

                <p>My first gig came through a friend of a friend who needed a simple landing page for their local business. I severely undercharged. I spent easily three times the amount of hours I estimated on it. But that didn't matter.</p>

                <h2>The Reality of Client Work</h2>
                <p>Working on that first project taught me more in three weeks than I had learned in three months of tutorials. I quickly learned that writing the code was only 40% of the job. The other 60% was communication: managing expectations, interpreting vague feedback ("Can you make it pop more?"), and handling scope creep.</p>

                <h2>The Money Hit the Account</h2>
                <p>When the final invoice was paid and the money hit my account, the amount was negligible. But the symbolic value was astronomical. Someone had a real-world problem, and I used tools I taught myself to solve it, and they compensated me for it. It proved the model worked. If I could do it once, I could do it a hundred times.</p>
            </>
        )
    },
    'my-journey-as-teacher': {
        title: 'My Journey as a Teacher and Mentor in Tech',
        date: 'Mar 05',
        category: 'Teaching',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1600&h=800&fit=crop',
        content: (
            <>
                <p>They say that to truly master a subject, you must teach it to someone else. My pivot into mentoring and teaching wasn't entirely planned, but it became one of the most rewarding phases of my career in technology.</p>

                <h2>The Empathy of the Beginner</h2>
                <p>When you are an expert, something called the "curse of knowledge" sets in. You forget what it feels like to not know what a variable is. You forget the extreme cognitive overload of trying to learn Git, the terminal, syntax, and logic all at the exact same time.</p>

                <p>Teaching forces you to step back across the bridge and remember the struggle. It forces you to deconstruct complex technical jargon into relatable analogies. Explaining an API as a "waiter taking an order to the kitchen and bringing the food back" works vastly better than launching into technical definitions.</p>

                <h2>The "Aha" Moment</h2>
                <p>There is a specific look in a student's eyes when a concept finally clicks. They go from frustrated and confused to illuminated. Witnessing that "Aha" moment—knowing you helped guide them to it—is an addictive feeling. </p>

                <h2>Learning by Teaching</h2>
                <p>Teaching exposed the gaps in my own knowledge. When a student asks a seemingly simple question like, "But *why* does the CSS cascade behave that way in this specific edge case?", you realize you've been relying on muscle memory rather than deep understanding. Teaching forced me back into the documentation, making me a substantially sharper engineer in my day-to-day work.</p>
            </>
        )
    }
};
*/

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    // Await params in Next.js 15+
    const resolvedParams = await params;
    const cmsEnabled = useCmsContent();
    const post = cmsEnabled
        ? (await (await getPayload({ config: configPromise })).find({
            collection: 'blogs',
            where: { slug: { equals: resolvedParams.slug } },
            depth: 1,
            limit: 1
        })).docs[0]
        : localBlogPosts.find((entry) => entry.slug === resolvedParams.slug);

    // If the slug doesn't match any of our dummy posts, show a 404 page
    if (!post) {
        notFound();
    }

    const imageUrl = cmsEnabled ? resolveMediaUrl(post.image) : post.image

    return (
        <div className="min-h-screen bg-[#fafafa]">
            <Header />

            <main className="pt-32 pb-24">
                <article>
                    {/* Header Section */}
                    <header className="container mx-auto px-6 max-w-4xl text-center mb-12">
                        <Link href="/blog" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-10 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Stories
                        </Link>

                        <div className="flex items-center justify-center gap-3 mb-6">
                            <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1 bg-primary/10 rounded-full">
                                {post.category}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                {post.date}
                            </span>
                        </div>

                        <h1 className="font-display leading-tight text-5xl md:text-6xl lg:text-7xl mb-12 text-[#111]">
                            {post.title}
                        </h1>
                    </header>

                    {/* Hero Image */}
                    <div className="w-full max-w-6xl mx-auto px-6 mb-16">
                        <div className="relative aspect-[2/1] w-full rounded-2xl overflow-hidden shadow-sm">
                            <Image
                                src={imageUrl as string}
                                alt={post.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </div>

                    {/* Medium-style Body Content */}
                    <div className="container mx-auto px-6 max-w-[680px]">
                        {/* 
              This prose class is custom tailored to mimic Medium's reading experience:
              Serif font for paragraphs, sans-serif for headings, generous line height, and large text.
            */}
                        <div className="
              prose prose-lg md:prose-xl max-w-none
              prose-p:font-serif prose-p:leading-[1.8] prose-p:text-[#242424] prose-p:font-normal prose-p:tracking-normal
              prose-headings:font-display prose-headings:text-[#111] prose-headings:font-bold
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-blockquote:border-l-[3px] prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-[#242424] prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:my-10
              prose-li:font-serif prose-li:text-[#242424]
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            ">
                            {cmsEnabled && post.content && typeof post.content === 'object' ? (
                                <RichText data={post.content} />
                            ) : (
                                <div dangerouslySetInnerHTML={{ __html: post.content as string }} />
                            )}
                        </div>

                        <hr className="my-16 border-border" />

                        <div className="flex justify-between items-center text-sm font-sans text-muted-foreground">
                            <span>Thanks for reading!</span>
                            <div className="flex gap-4">
                                <button className="hover:text-foreground transition-colors">Share</button>
                                <button className="hover:text-foreground transition-colors">Copy Link</button>
                            </div>
                        </div>
                    </div>
                </article>
            </main>

            <Footer />
        </div>
    );
}
