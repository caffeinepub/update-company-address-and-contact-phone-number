import { ArrowRight, Factory, Wrench, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-banner.dim_1200x400.jpg"
          alt="Industrial Manufacturing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
            <span className="text-primary font-semibold text-sm">
              Leading Industrial Equipment Manufacturer
            </span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
            Infrapulse — Engineering the{' '}
            <span className="text-primary">Future of Industrial Solutions</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Specializing in EOT cranes, hot billet shearing machines, and scrap shredders 
            for steel plants, foundries, and recycling facilities worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="text-lg px-8 py-6 shadow-industrial"
            >
              Get a Quote
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => {
                const element = document.getElementById('products');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-lg px-8 py-6"
            >
              View Products
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-card border rounded-lg shadow-xs">
              <Factory className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Custom Manufacturing</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card border rounded-lg shadow-xs">
              <Wrench className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Expert Installation</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-card border rounded-lg shadow-xs">
              <Shield className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Quality Assured</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
