import { Link } from 'react-router-dom';
import {
  Package,
  Grid3X3,
  BarChart3,
  TrendingUp,
  Shield,
  Zap,
  ChevronDown,
  Boxes,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: Package,
    title: 'Inventory Tracking',
    description: 'Monitor stock levels in real-time with instant updates.',
  },
  {
    icon: Grid3X3,
    title: 'Category Management',
    description: 'Organize products into intuitive, searchable categories.',
  },
  {
    icon: BarChart3,
    title: 'Analytics Ready',
    description: 'Understand trends with clean and structured data views.',
  },
  {
    icon: TrendingUp,
    title: 'Smart Sorting',
    description: 'Sort by price, rating, availability, and more.',
  },
  {
    icon: Shield,
    title: 'Stock Status',
    description: 'Instantly identify low and out-of-stock products.',
  },
  {
    icon: Zap,
    title: 'Fast Search',
    description: 'Lightning-fast, debounced search for large inventories.',
  },
];

export default function Index() {
  const scrollToExplore = () => {
    const element = document.getElementById('explore');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="animate-fade-in">
      {/* HERO */}
      <section className="relative overflow-hidden py-20 md:py-28 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-accent/5" />

        <div className="relative max-w-4xl mx-auto px-4 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/15 text-accent text-sm font-semibold">
            <Boxes className="h-4 w-4" />
            StoreAdmin • Inventory Platform
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Smarter Inventory
            <span className="block text-accent mt-2">Faster Decisions</span>
          </h1>

          <section className="py-20 text-center">
            <div className="max-w-3xl mx-auto px-4 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Start browsing products and categories in seconds.
              </h2>

              <div className="flex flex-col items-center gap-2 pt-10 animate-bounce">
                <button
                  onClick={scrollToExplore}
                  className="flex flex-col items-center text-accent cursor-pointer"
                >
                  <span className="text-sm font-medium">Scroll to explore</span>
                  <ChevronDown className="h-6 w-6 mt-1" />
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Products", value: "1,000+" },
            { label: "Categories", value: "25+" },
            { label: "Avg Load Time", value: "< 1s" },
          ].map((stat, i) => (
            <div
              key={i}
              className="rounded-2xl border bg-background p-6 text-center shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-3xl font-bold text-accent">{stat.value}</h3>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Everything You Need
            </h2>
            <p className="text-muted-foreground mt-3">
              Designed for performance, usability, and clarity
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group rounded-2xl border bg-background p-6 shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-xl bg-accent/10 text-accent group-hover:scale-110 transition">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section id="explore" className="py-20 text-center">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to Explore Your Inventory?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern inventory and catalog management portal designed to replace
            spreadsheets with speed, clarity, and control.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 shadow-lg"
            >
              <Link to="/inventory">
                <Package className="h-5 w-5 mr-2" />
                Inventory Overview
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="shadow">
              <Link to="/catalogue">
                <Grid3X3 className="h-5 w-5 mr-2" />
                Browse Catalogue
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
