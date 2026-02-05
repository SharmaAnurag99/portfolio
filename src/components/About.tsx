const About = () => {
  return (
    <section id="about" className="py-24 section-dark">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 items-start">
          {/* Left label */}
          <div className="md:col-span-3 animate-on-scroll">
            <h2 className="text-lg font-medium text-primary-foreground">About Me</h2>
          </div>

          {/* Main content */}
          <div className="md:col-span-9 animate-on-scroll">
            <p className="text-2xl md:text-3xl lg:text-4xl text-primary-foreground/80 leading-relaxed font-light">
              I am a <span className="text-primary-foreground font-medium">Full Stack & Blockchain Developer</span> passionate about building scalable, high-performance applications. With experience in <span className="italic">Next.js, Rust, and Solidity</span>, I help startups and businesses turn complex requirements into shipping products.
            </p>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-primary-foreground font-display text-xl mb-4">Contact</h3>
                <a href="mailto:sharmaanurag9969@gmail.com" className="block text-primary-foreground/60 hover:text-primary-foreground transition-colors">sharmaanurag9969@gmail.com</a>
                <p className="text-primary-foreground/60">+91 83185 29481</p>
              </div>
              <div>
                <h3 className="text-primary-foreground font-display text-xl mb-4">Education</h3>
                <p className="text-primary-foreground/80 font-medium">B.Sc. (H) Computer Science</p>
                <p className="text-primary-foreground/60">Shaheed Sukhdev College of Business Studies, DU</p>
                <p className="text-primary-foreground/60 text-sm mt-1">2022 – 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
