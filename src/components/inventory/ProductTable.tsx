import { useNavigate } from 'react-router-dom';
import { Product } from '@/services/api';
import { StockBadge } from '@/components/ui/stock-badge';
import { RatingStars } from '@/components/ui/rating-stars';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductTableProps {
  products: Product[];
  onToggleStock?: (id: number) => void; // ✅ added
  backTo?: string; // optional back destination
}

export function ProductTable({ products, onToggleStock, backTo }: ProductTableProps) {
  const navigate = useNavigate();

  const handleRowClick = (product: Product) => {
    if (product.stock === 0) return; // prevent navigation
    navigate(`/product/${product.id}`, { state: { from: backTo } });
  };

  return (
    <div className="hidden md:block border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left p-4 text-sm text-muted-foreground">Product</th>
            <th className="text-left p-4 text-sm text-muted-foreground">Brand</th>
            <th className="text-left p-4 text-sm text-muted-foreground">Category</th>
            <th className="text-left p-4 text-sm text-muted-foreground">Price</th>
            <th className="text-left p-4 text-sm text-muted-foreground">Discount</th>
            <th className="text-left p-4 text-sm text-muted-foreground">Rating</th>
            <th className="text-left p-4 text-sm text-muted-foreground">Stock</th>
            <th className="text-left p-4 text-sm text-muted-foreground">Status</th>
            <th className="text-left p-4 text-sm text-muted-foreground">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y">
          {products.map((product) => {
            const isOutOfStock = product.stock === 0;
            const isLowStock = product.stock > 0 && product.stock < 10;

            return (
              <tr
                key={product.id}
                onClick={() => handleRowClick(product)}
                className={cn(
                  'transition-colors',
                  isOutOfStock
                    ? 'bg-muted/30 cursor-not-allowed'
                    : 'hover:bg-muted/30 cursor-pointer'
                )}
              >
                {/* Product */}
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="h-10 w-10 rounded-md object-cover bg-muted"
                      loading="lazy"
                    />
                    <span className="font-medium text-sm truncate max-w-[200px]">
                      {product.title}
                    </span>
                  </div>
                </td>

                <td className="p-4 text-sm text-muted-foreground">{product.brand || '—'}</td>

                <td className="p-4">
                  <span className="inline-flex px-2 py-1 rounded-md bg-secondary text-xs font-medium capitalize">
                    {product.category}
                  </span>
                </td>

                <td className="p-4 text-sm font-medium">${product.price.toFixed(2)}</td>

                <td className="p-4">
                  <span className={cn(
                    'text-sm',
                    product.discountPercentage > 10
                      ? 'text-success font-medium'
                      : 'text-muted-foreground'
                  )}>
                    {product.discountPercentage.toFixed(0)}%
                  </span>
                </td>

                <td className="p-4">
                  <RatingStars rating={product.rating} />
                </td>

                <td className="p-4 text-sm">
                  {product.stock}
                  {isLowStock && (
                    <p className="text-xs text-yellow-600 mt-1">⚠ Only {product.stock} left</p>
                  )}
                </td>

                <td className="p-4">
                  <StockBadge stock={product.stock} />
                </td>

                <td className="p-4">
                  <Button
                    size="sm"
                    disabled={isOutOfStock}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleStock?.(product.id);
                    }}
                  >
                    {isOutOfStock ? 'Unavailable' : 'Add'}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
