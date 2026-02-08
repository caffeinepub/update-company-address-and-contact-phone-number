import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { Building2, Target, Award } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const About = () => {
  const { actor, isFetching: isActorFetching } = useActor();

  const { data: companyInfo, isLoading } = useQuery({
    queryKey: ['companyInfo'],
    queryFn: async () => {
      if (!actor) return null;
      try {
        return await actor.getCompanyInfo();
      } catch (error) {
        console.error('Error fetching company info:', error);
        return null;
      }
    },
    enabled: !!actor && !isActorFetching
  });

  if (isLoading) {
    return (
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto mb-12" />
          <div className="grid md:grid-cols-2 gap-8">
            <Skeleton className="h-64" />
            <Skeleton className="h-64" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            About Infrapulse
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Decades of experience in manufacturing world-class industrial equipment
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Company Image */}
          <div className="relative rounded-lg overflow-hidden shadow-industrial-lg">
            <img
              src="/assets/generated/manufacturing-team.dim_800x600.jpg"
              alt="Infrapulse Manufacturing Team"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-3 text-foreground flex items-center gap-2">
                <Building2 className="h-6 w-6 text-primary" />
                Our History
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {companyInfo?.history || 
                  'With decades of experience in heavy industrial manufacturing, Infrapulse has established itself as a trusted partner for steel plants, foundries, and recycling facilities worldwide. Our commitment to quality and innovation has made us a leader in the industry.'}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-3 text-foreground flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Our Mission
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {companyInfo?.missionStatement || 
                  'To deliver superior industrial machinery that enhances operational efficiency, safety, and productivity for our clients. We are dedicated to engineering excellence and customer satisfaction in every project we undertake.'}
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-3 text-foreground flex items-center gap-2">
                <Award className="h-6 w-6 text-primary" />
                Our Capabilities
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {companyInfo?.capabilities || 
                  'Our state-of-the-art manufacturing facilities are equipped with advanced technology and operated by skilled engineers and technicians. We offer custom design, precision manufacturing, installation, and comprehensive after-sales support.'}
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-2">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Countries Served</div>
            </CardContent>
          </Card>
          <Card className="border-2">
            <CardContent className="pt-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">100%</div>
              <div className="text-sm text-muted-foreground">Quality Assured</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
