import { useNavigate } from 'react-router-dom';
import { Product } from '@/services/api';
import { StockBadge } from '@/components/ui/stock-badge';
import { RatingStars } from '@/components/ui/rating-stars';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
  showStock?: boolean;                // ✅ optional
  onToggleStock?: (id: number) => void; // ✅ optional Add button
  backTo?: string; // optional back destination
}

export function ProductCard({ product, showStock = false, onToggleStock, backTo }: ProductCardProps) {
  const navigate = useNavigate();

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock < 10;

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`, { state: { from: backTo } })}
      className={`border rounded-lg overflow-hidden bg-card hover:shadow-lg transition-all cursor-pointer group ${
        isOutOfStock ? 'opacity-70 cursor-not-allowed' : ''
      }`}
    >
      <div className="aspect-square relative overflow-hidden bg-muted">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.discountPercentage > 10 && (
          <span className="absolute top-2 left-2 bg-success text-success-foreground text-xs font-medium px-2 py-1 rounded-md">
            -{product.discountPercentage.toFixed(0)}%
          </span>
        )}
      </div>

      <div className="p-4 space-y-2">
        <div>
          <h3 className="font-medium text-sm line-clamp-1">{product.title}</h3>
          <p className="text-xs text-muted-foreground capitalize">
            {product.brand || product.category}
          </p>
        </div>

        <RatingStars rating={product.rating} />

        <div className="flex items-center justify-between">
          <span className="font-semibold">${product.price.toFixed(2)}</span>
          {showStock && <StockBadge stock={product.stock} />}
        </div>

        {showStock && isLowStock && (
          <p className="text-xs text-yellow-600">⚠ Only {product.stock} left</p>
        )}

        {onToggleStock && (
          <Button
            size="sm"
            disabled={isOutOfStock}
            onClick={(e) => {
              e.stopPropagation(); // prevent navigating to product page
              onToggleStock(product.id);
            }}
            className="w-full mt-2"
          >
            {isOutOfStock ? 'Unavailable' : 'Add'}
          </Button>
        )}
      </div>
    </div>
  );
}
