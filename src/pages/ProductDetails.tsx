import { useParams, Link, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '@/services/api';
import { ProductGallery } from '@/components/product/ProductGallery';
import { SimilarProducts } from '@/components/product/SimilarProducts';
import { StockBadge } from '@/components/ui/stock-badge';
import { RatingStars } from '@/components/ui/rating-stars';
import { SkeletonLoader } from '@/components/ui/skeleton-loader';
import { Button } from '@/components/ui/button';
import { ChevronLeft, AlertCircle, Tag, Truck } from 'lucide-react';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id || '0', 10);
  const location = useLocation();

  const from = location.state?.from || 'inventory'; // default to inventory
  const backPath = from === 'catalogue' ? '/catalogue' : '/inventory';
  const backText = from === 'catalogue' ? 'Back to Catalogue' : 'Back to Inventory';

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductById(productId),
    enabled: productId > 0,
  });

  if (isLoading) {
    return (
      <div className="animate-fade-in space-y-8">
        <SkeletonLoader className="h-8 w-48" />
        <div className="grid lg:grid-cols-2 gap-8">
          <SkeletonLoader className="aspect-square rounded-lg" />
          <div className="space-y-4">
            <SkeletonLoader className="h-10 w-3/4" />
            <SkeletonLoader className="h-6 w-1/2" />
            <SkeletonLoader className="h-24 w-full" />
            <SkeletonLoader className="h-12 w-32" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
        <AlertCircle className="h-12 w-12 text-destructive mb-4" />
        <h3 className="text-lg font-semibold mb-2">Product not found</h3>
        <p className="text-muted-foreground mb-4">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link to={backPath}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            {backText}
          </Link>
        </Button>
      </div>
    );
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <div className="animate-fade-in space-y-8">
      <Link
        to={backPath}
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        {backText}
      </Link>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        <ProductGallery images={product.images} title={product.title} />

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-secondary text-xs font-medium capitalize">
                {product.category}
              </span>
              {product.brand && (
                <span className="text-sm text-muted-foreground">
                  {product.brand}
                </span>
              )}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>
          </div>

          <RatingStars rating={product.rating} />

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discountPercentage > 0 && (
              <>
                <span className="text-lg text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-success/10 text-success text-sm font-medium">
                  <Tag className="h-3 w-3 mr-1" />
                  {product.discountPercentage.toFixed(0)}% OFF
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-4 py-4 border-y">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">
                <strong>{product.stock}</strong> in stock
              </span>
            </div>
            <StockBadge stock={product.stock} />
          </div>

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t">
        <SimilarProducts
          category={product.category}
          currentProductId={product.id}
          backTo={from}
        />
      </div>
    </div>
  );
}
