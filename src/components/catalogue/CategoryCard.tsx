import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategoryCardProps {
  category: {
    slug: string;
    name: string;
  };
  imageUrl?: string;
}

export function CategoryCard({ category, imageUrl }: CategoryCardProps) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/catalogue/${category.slug}`)}
      className="group border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-muted">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="font-semibold text-primary-foreground capitalize text-lg">
            {category.name}
          </h3>
        </div>
      </div>
      <div className="p-4 flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Browse products</span>
        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
      </div>
    </div>
  );
}
