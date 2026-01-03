import { Product } from '@/services/api';
import { ProductCard } from './ProductCard';

interface ProductMobileListProps {
  products: Product[];
  showStock?: boolean;
  onToggleStock?: (id: number) => void;
  backTo?: string;
}

export function ProductMobileList({ products, showStock = false, onToggleStock, backTo }: ProductMobileListProps) {
  return (
    <div className="md:hidden grid grid-cols-2 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          showStock={showStock}
          onToggleStock={onToggleStock}
          backTo={backTo}
        />
      ))}
    </div>
  );
}
