import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CheckCircle2 } from 'lucide-react';
import { Product, ProductCategory } from '@/backend';

const Products = () => {
  const { actor, isFetching: isActorFetching } = useActor();

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      try {
        return await actor.getProducts();
      } catch (error) {
        console.error('Error fetching products:', error);
        return [];
      }
    },
    enabled: !!actor && !isActorFetching
  });

  const getCategoryLabel = (category: ProductCategory): string => {
    switch (category) {
      case ProductCategory.eotCranes:
        return 'EOT Cranes';
      case ProductCategory.billetShearingMachines:
        return 'Billet Shearing Machines';
      case ProductCategory.scrapShredders:
        return 'Scrap Shredders';
      default:
        return 'All Products';
    }
  };

  const getCategoryImage = (category: ProductCategory): string => {
    switch (category) {
      case ProductCategory.eotCranes:
        return '/assets/generated/eot-crane.dim_800x600.jpg';
      case ProductCategory.billetShearingMachines:
        return '/assets/generated/billet-shearing-machine.dim_800x600.jpg';
      case ProductCategory.scrapShredders:
        return '/assets/generated/scrap-shredder.dim_800x600.jpg';
      default:
        return '/assets/generated/eot-crane.dim_800x600.jpg';
    }
  };

  const defaultProducts: Product[] = [
    {
      id: '1',
      name: 'Electric Overhead Traveling Cranes',
      category: ProductCategory.eotCranes,
      description: 'Heavy-duty EOT cranes designed for efficient material handling in industrial environments. Built with precision engineering for maximum safety and reliability.',
      specifications: 'Capacity: 5-500 tons | Span: Up to 35m | Lifting Height: Up to 30m | Speed: Variable',
      applications: 'Steel plants, warehouses, manufacturing facilities, shipyards, and heavy machinery workshops',
      images: []
    },
    {
      id: '2',
      name: 'Hot Billet Shearing Machines',
      category: ProductCategory.billetShearingMachines,
      description: 'High-performance shearing machines for cutting hot billets with precision and efficiency. Engineered for continuous operation in demanding steel production environments.',
      specifications: 'Cutting Force: Up to 2000 tons | Billet Size: 100-300mm | Temperature: Up to 1200°C | Cycle Time: 10-15 seconds',
      applications: 'Steel mills, rolling mills, continuous casting plants, and metal forging operations',
      images: []
    },
    {
      id: '3',
      name: 'Industrial Scrap Shredders',
      category: ProductCategory.scrapShredders,
      description: 'Robust scrap shredding systems for efficient metal recycling. Designed to handle various types of scrap metal with high throughput and minimal maintenance.',
      specifications: 'Power: 200-1000 HP | Capacity: 10-100 tons/hour | Rotor Speed: 60-120 RPM | Feed Opening: Customizable',
      applications: 'Recycling facilities, scrap yards, automobile recycling, metal recovery plants, and waste management',
      images: []
    }
  ];

  const displayProducts = products && products.length > 0 ? products : defaultProducts;

  const categories: (ProductCategory | 'all')[] = [
    'all',
    ProductCategory.eotCranes,
    ProductCategory.billetShearingMachines,
    ProductCategory.scrapShredders
  ];

  if (isLoading) {
    return (
      <section id="products" className="py-20">
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto mb-12" />
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-96" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Our Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Industry-leading machinery engineered for performance, durability, and safety
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-12">
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat}>
                {cat === 'all' ? 'All' : getCategoryLabel(cat as ProductCategory)}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayProducts
                  .filter((product) => category === 'all' || product.category === category)
                  .map((product) => (
                    <Card key={product.id} className="overflow-hidden hover:shadow-industrial-lg transition-shadow duration-300">
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={getCategoryImage(product.category)}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground">
                          {getCategoryLabel(product.category)}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <CardDescription className="text-base">
                          {product.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-foreground">
                            Technical Specifications
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {product.specifications}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2 text-foreground flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-primary" />
                            Applications
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {product.applications}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Products;
