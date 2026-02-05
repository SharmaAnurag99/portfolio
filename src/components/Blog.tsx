import { ArrowRight } from 'lucide-react';

const posts = [
  {
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    category: 'Help',
    date: 'Aug 28',
    title: 'Create a Landing Page That Performs Great',
  },
  {
    image: 'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&h=600&fit=crop',
    category: 'Branding',
    date: 'Aug 28',
    title: 'Starting and Growing a Career in Web Design',
  },
  {
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=800&h=600&fit=crop',
    category: 'Design',
    date: 'Aug 28',
    title: 'How Can Designers Prepare for the Future?',
  },
];

const Blog = () => {
  return (
    <section id="blog" className="blog-section py-24 section-cream">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-5xl md:text-6xl mb-16 animate-on-scroll">Stories</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <article 
              key={index} 
              className="blog-card group cursor-pointer"
            >
              <div className="relative overflow-hidden rounded-2xl mb-6">
                <img
                  src={post.image}
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
              <a 
                href="#" 
                className="inline-flex items-center gap-2 text-sm font-medium group/link"
              >
                Read more 
                <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
