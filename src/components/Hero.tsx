import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center pt-32 pb-20 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 z-10">

        {/* Main Name Heading */}
        <div className="flex flex-col items-center justify-center mb-16 md:mb-24">
          <h1 className="hero-title font-display text-[15vw] leading-[0.8] text-center tracking-tight flex flex-col md:block">
            <span className="inline-block relative z-10">SHARMA</span>
            <span className="inline-block text-muted-foreground/30 md:ml-8 relative z-0">ANURAG</span>
          </h1>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">

          {/* Left: Role & description */}
          <div className="md:col-span-4 order-2 md:order-1 ">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium tracking-wide mb-3">
                Founding Developer @ QodeML Labs
              </span>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-sm">
                Web and software developer experienced in building production-grade Next.js applications with a focus on performance, SEO, and scalability.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Button size="lg" className="rounded-full border-2 px-8 hover:bg-white hover:text-black">
                Get in Touch
              </Button>
              <span className="text-sm text-muted-foreground font-medium">
                Based in India
              </span>
            </div>
          </div>

          {/* Center: Visual / Image Placeholder */}
          <div className="md:col-span-4 order-1 md:order-2 flex justify-center ">
            <div className="relative w-[350px] h-[450px] mt-[-100px] -translate-y-12 rotate-3 hover:rotate-0 transition-all duration-500 hover:translate-y-0 rounded-3xl overflow-hidden border-4 border-muted/20 grayscale hover:grayscale-0 transition-all duration-500">

              {/* Use this img tag when you have a photo */}
              <img src="/myphoto.png" alt="Anurag Sharma" className="object-cover w-full h-full" />
            </div>
          </div>

          {/* Right: Reviews / Social Proof */}
          <div className="md:col-span-4 order-3 flex flex-col items-start md:items-end text-left md:text-right">
            <div className="flex -space-x-3 mb-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-background bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
                  C{i}
                </div>
              ))}
            </div>
            <p className="font-medium text-lg">Trusted by Clients</p>
            <p className="text-muted-foreground text-sm">Delivering excellence in every project.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
