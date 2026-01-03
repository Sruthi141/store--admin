import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchProductsByCategory } from '@/services/api';
import { CategoryCard } from '@/components/catalogue/CategoryCard';
import { CategoryCardSkeleton } from '@/components/ui/skeleton-loader';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Catalogue() {
  const navigate = useNavigate();

  // Fetch categories
  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const cats = await fetchCategories();

      // Fetch 1 product for each category to get image
      const images = await Promise.all(
        cats.map(async (cat) => {
          try {
            const products = await fetchProductsByCategory(cat.slug, { limit: 1 });
            return { slug: cat.slug, image: products.products[0]?.thumbnail || '' };
          } catch {
            return { slug: cat.slug, image: '' };
          }
        })
      );

      // Merge images with category info
      return cats.map((cat) => ({
        ...cat,
        image: images.find((i) => i.slug === cat.slug)?.image,
      }));
    },
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="animate-fade-in">
        <div className="flex items-center mb-2 gap-2">
          <ArrowLeft
            className="h-5 w-5 text-muted-foreground cursor-pointer"
            onClick={() => navigate('/')}
          />
          <h1 className="text-2xl md:text-3xl font-bold">Product Catalogue</h1>
        </div>
        <p className="text-muted-foreground mb-6">Loading categories...</p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <CategoryCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error || !categories) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold mb-2">Failed to load categories</h3>
        <p className="text-muted-foreground mb-4">
          There was an error fetching the catalogue data.
        </p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  // Main content
  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-2 gap-2">
        <ArrowLeft
          className="h-5 w-5 text-muted-foreground cursor-pointer"
          onClick={() => navigate('/')}
        />
        <h1 className="text-2xl md:text-3xl font-bold">Product Catalogue</h1>
      </div>
      <p className="text-muted-foreground mb-6">{categories.length} categories available</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            category={category}
            imageUrl={category.image}
          />
        ))}
      </div>
    </div>
  );
}
