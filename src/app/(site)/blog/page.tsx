import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { getPayload } from 'payload';
// Path depends on nesting level, for `app/blog/page.tsx` it's `../../payload.config`
import configPromise from '../../../../payload.config';
import { resolveMediaUrl } from '@/lib/media';
import { useCmsContent } from '@/lib/use-cms-content';
import { localBlogPosts, personalCategories } from '@/data/local/blog-posts';

/*
const staticTechnicalPosts = [
    {
        slug: 'optimizing-nextjs-performance',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        category: 'Technical',
        date: 'Aug 28',
        title: 'Optimizing Next.js for Maximum Performance',
    },
    {
        slug: 'starting-web-design-career',
        image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=600&fit=crop',
        category: 'Branding',
        date: 'Aug 28',
        title: 'Starting and Growing a Career in Web Design',
    },
    {
        slug: 'security-audits-necessity',
        image: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800&h=600&fit=crop',
        category: 'Security',
        date: 'Oct 15',
        title: 'Security Audits: Why Every Application Needs One',
    },
    {
        slug: 'building-smart-ai-apps',
        image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
        category: 'AI',
        date: 'Oct 20',
        title: 'How to Build Smart Applications With AI Integration',
    },
    {
        slug: 'top-design-tips-ux',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
        category: 'Design',
        date: 'Nov 02',
        title: 'Top Design Tips for Creating Engaging User Experiences',
    },
];

const staticPersonalPosts = [
    {
        slug: 'my-journey-into-tech',
        image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
        category: 'Personal',
        date: 'Aug 28',
        title: 'My Journey into Tech',
    },
    {
        slug: 'my-first-pay-milestone',
        image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop',
        category: 'Career',
        date: 'Feb 10',
        title: 'My First Pay: The Milestone That Changed Everything',
    },
    {
        slug: 'my-journey-as-teacher',
        image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop',
        category: 'Teaching',
        date: 'Mar 05',
        title: 'My Journey as a Teacher and Mentor in Tech',
    }
];
*/


const Blog = async () => {
    const cmsEnabled = useCmsContent();
    let technicalPosts: any[] = [];
    let personalPosts: any[] = [];

    if (cmsEnabled) {
        const payload = await getPayload({ config: configPromise });
        const techData = await payload.find({
            collection: 'blogs',
            where: {
                and: [
                    { category: { not_equals: 'Personal' } },
                    { category: { not_equals: 'Career' } },
                    { category: { not_equals: 'Teaching' } }
                ]
            },
            depth: 1,
            limit: 100
        });
        technicalPosts = techData.docs;

        const personalData = await payload.find({
            collection: 'blogs',
            where: {
                or: [
                    { category: { equals: 'Personal' } },
                    { category: { equals: 'Career' } },
                    { category: { equals: 'Teaching' } }
                ]
            },
            depth: 1,
            limit: 100
        });
        personalPosts = personalData.docs;
    } else {
        technicalPosts = localBlogPosts.filter((post) => !personalCategories.has(post.category));
        personalPosts = localBlogPosts.filter((post) => personalCategories.has(post.category));
    }

    const visibleTechnicalPosts = technicalPosts;
    const visiblePersonalPosts = personalPosts;

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

                    {/* Technical Section */}
                    <div className="mb-20">
                        <h3 className="font-display text-3xl md:text-4xl mb-8">Technical</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {visibleTechnicalPosts.map((post: any, index: number) => {
                                const imageUrl = cmsEnabled ? resolveMediaUrl(post.image) : post.image
                                return (
                                    <article key={index} className="blog-card group cursor-pointer">
                                        <div className="relative overflow-hidden rounded-2xl mb-6">
                                            <img
                                                src={imageUrl}
                                                alt={post.title}
                                                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex items-center gap-4 mb-3">
                                            <span className="text-xs font-medium px-3 py-1 bg-muted rounded-full">
                                                {post.category}
                                            </span>
                                            <span className="text-sm text-muted-foreground">Posted on {post.date}</span>
                                        </div>
                                        <h3 className="font-display text-2xl mb-4 group-hover:translate-x-2 transition-transform duration-300">
                                            {post.title}
                                        </h3>
                                        <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-medium group/link hover:text-primary transition-colors">
                                            Read more
                                            <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                                        </Link>
                                    </article>
                                )
                            })}
                        </div>
                    </div>

                    {/* Personal Section */}
                    <div>
                        <h3 className="font-display text-3xl md:text-4xl mb-8">Personal</h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {visiblePersonalPosts.map((post: any, index: number) => {
                                const imageUrl = cmsEnabled ? resolveMediaUrl(post.image) : post.image
                                return (
                                    <article key={index} className="blog-card group cursor-pointer">
                                        <div className="relative overflow-hidden rounded-2xl mb-6">
                                            <img
                                                src={imageUrl}
                                                alt={post.title}
                                                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="flex items-center gap-4 mb-3">
                                            <span className="text-xs font-medium px-3 py-1 bg-muted rounded-full">
                                                {post.category}
                                            </span>
                                            <span className="text-sm text-muted-foreground">Posted on {post.date}</span>
                                        </div>
                                        <h3 className="font-display text-2xl mb-4 group-hover:translate-x-2 transition-transform duration-300">
                                            {post.title}
                                        </h3>
                                        <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-sm font-medium group/link hover:text-primary transition-colors">
                                            Read more
                                            <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                                        </Link>
                                    </article>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Blog;
