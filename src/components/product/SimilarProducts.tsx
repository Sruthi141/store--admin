import { useQuery } from '@tanstack/react-query';
import { fetchProductsByCategory, Product } from '@/services/api';
import { ProductCardSkeleton } from '@/components/ui/skeleton-loader';
import { useNavigate } from 'react-router-dom';

interface SimilarProductsProps {
  category: string;
  currentProductId: number;
  backTo?: string;
}

function SimilarProductCard({ product, backTo }: { product: Product; backTo?: string }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`, { state: { from: backTo } })}
      className="group border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-all cursor-pointer"
    >
      <div className="aspect-square relative overflow-hidden bg-muted">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>
      <div className="p-3 space-y-1">
        <h4 className="font-medium text-sm line-clamp-1">{product.title}</h4>
        <p className="font-semibold text-accent">${product.price.toFixed(2)}</p>
      </div>
    </div>
  );
}

export function SimilarProducts({ category, currentProductId, backTo }: SimilarProductsProps) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['similar-products', category],
    queryFn: () => fetchProductsByCategory(category, { limit: 7 }),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (error || !data) {
    return null;
  }

  const similarProducts = data.products.filter((p) => p.id !== currentProductId).slice(0, 6);

  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Similar Products</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {similarProducts.map((product) => (
          <SimilarProductCard key={product.id} product={product} backTo={backTo} />
        ))}
      </div>
    </div>
  );
}
