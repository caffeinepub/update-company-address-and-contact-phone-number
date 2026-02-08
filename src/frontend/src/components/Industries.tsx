import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import type { Industry } from '@/backend';

const Industries = () => {
  const { actor, isFetching: isActorFetching } = useActor();

  const { data: industries, isLoading } = useQuery<Industry[]>({
    queryKey: ['industries'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getIndustries();
      } catch (error) {
        console.error('Error fetching industries:', error);
        return [];
      }
    },
    enabled: !!actor && !isActorFetching
  });

  const defaultIndustries: Industry[] = [
    {
      id: '1',
      name: 'Steel Plants',
      description: 'Comprehensive solutions for steel manufacturing facilities including EOT cranes for material handling, hot billet shearing machines for cutting operations, and specialized equipment for continuous casting processes. Our machinery ensures efficient production flow and enhanced safety standards.'
    },
    {
      id: '2',
      name: 'Foundries',
      description: 'Heavy-duty equipment designed for foundry operations including overhead cranes for mold handling, material transport systems, and specialized machinery for metal casting processes. Built to withstand high temperatures and demanding operational conditions.'
    },
    {
      id: '3',
      name: 'Recycling Facilities',
      description: 'Advanced scrap shredding and processing equipment for metal recycling operations. Our shredders efficiently process various types of scrap metal, automobile parts, and industrial waste, maximizing recovery rates and operational efficiency.'
    },
    {
      id: '4',
      name: 'Manufacturing Plants',
      description: 'Versatile material handling solutions for diverse manufacturing environments. Our EOT cranes and lifting equipment enhance productivity, reduce manual labor, and improve workplace safety across automotive, machinery, and general manufacturing sectors.'
    },
    {
      id: '5',
      name: 'Shipyards',
      description: 'Heavy-capacity cranes and specialized lifting equipment for shipbuilding and repair operations. Engineered to handle massive loads with precision, ensuring safe and efficient construction and maintenance of marine vessels.'
    },
    {
      id: '6',
      name: 'Power Plants',
      description: 'Reliable material handling systems for power generation facilities. Our equipment supports maintenance operations, fuel handling, and heavy component installation with the highest safety and reliability standards required in the energy sector.'
    }
  ];

  const displayIndustries = industries && industries.length > 0 ? industries : defaultIndustries;

  const industryImages: Record<string, string> = {
    'Steel Plants': '/assets/generated/steel-plant.dim_1024x768.jpg',
    'Foundries': '/assets/generated/foundry-operations.dim_800x600.jpg',
    'Recycling Facilities': '/assets/generated/recycling-facility.dim_800x600.jpg',
    'Manufacturing Plants': '/assets/generated/manufacturing-team.dim_800x600.jpg',
    'Shipyards': '/assets/generated/steel-plant.dim_1024x768.jpg',
    'Power Plants': '/assets/generated/foundry-operations.dim_800x600.jpg'
  };

  if (isLoading) {
    return (
      <section id="industries" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-80" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="industries" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Industries We Serve
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Trusted by leading companies across diverse industrial sectors worldwide
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayIndustries.map((industry) => (
            <Card
              key={industry.id}
              className="overflow-hidden hover:shadow-industrial-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={industryImages[industry.name] || '/assets/generated/steel-plant.dim_1024x768.jpg'}
                  alt={industry.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{industry.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {industry.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industries;
