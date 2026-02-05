const testimonials = [
  {
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    quote: 'Financial planners help people to knowledge in about how to invest and in save their moneye the most efficient way eve plan ners help people tioniio know ledige in about how.',
    name: 'ZONATHON DOE',
    role: 'CEO & Founder X',
  },
  {
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    quote: 'Asian planners help people to knowledge in about how to invest and in save their moneye the most efficient way eve plan ners help people tioniio know ledige in about how.',
    name: 'MARTIN SMITH',
    role: 'CEO & Founder Google',
  },
  {
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    quote: 'Hello planners help people to knowledge in about how to invest and in save their moneye the most efficient way eve plan ners help people tioniio know ledige in about how.',
    name: 'METHAIL DEV',
    role: 'Managing Director - Paydesk',
  },
  {
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face',
    quote: 'Financial planners help people to knowledge in about how to invest and in save their moneye the most efficient way eve plan ners help people tioniio know ledige in about how.',
    name: 'ELIANA TWEET',
    role: 'CEO & Founder Tesla',
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    quote: 'Yelp planners help people to knowledge in about how to invest and in save their moneye the most efficient way eve plan ners help people tioniio know ledige in about how.',
    name: 'HENRY CLARK',
    role: 'Founder Oxyzen',
  },
];

const Testimonials = () => {
  return (
    <section className="testimonials-section py-24 section-cream">
      <div className="container mx-auto px-6">
        <h2 className="font-display text-5xl md:text-7xl mb-16 animate-on-scroll">
          TESTINOMIALS
        </h2>
        
        {/* First row - 2 cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {testimonials.slice(0, 2).map((testimonial, index) => (
            <div 
              key={index} 
              className="testimonial-card bg-muted/50 p-8 rounded-3xl"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover mb-6"
              />
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                {testimonial.quote}
              </p>
              <div>
                <h4 className="font-display text-xl md:text-2xl">{testimonial.name}</h4>
                <p className="text-muted-foreground text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Second row - 3 cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.slice(2).map((testimonial, index) => (
            <div 
              key={index} 
              className="testimonial-card bg-muted/50 p-8 rounded-3xl"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-14 h-14 rounded-full object-cover mb-6"
              />
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                {testimonial.quote}
              </p>
              <div>
                <h4 className="font-display text-xl">{testimonial.name}</h4>
                <p className="text-muted-foreground text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
