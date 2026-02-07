const testimonials = [
  {
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    quote: 'Absolutely ecstatic with the results! The team delivered beyond our expectations, providing a platform that truly represents our vision.',
    name: 'AstroLK Sharma',
    role: 'Client',
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    quote: 'Professional, timely, and incredibly skilled. The project was handled with utmost care and the final product is flawless.',
    name: 'Rajeev',
    role: 'Client',
  },
  {
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    quote: 'A game-changer for our business. The attention to detail and technical expertise shown throughout the process was impressive.',
    name: 'Vinit Vijal',
    role: 'Client',
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
