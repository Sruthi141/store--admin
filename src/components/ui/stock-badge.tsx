import { cn } from '@/lib/utils';

interface StockBadgeProps {
  stock: number;
}

export function StockBadge({ stock }: StockBadgeProps) {
  const getStockStatus = () => {
    if (stock === 0) return { label: 'Out of Stock', variant: 'destructive' };
    if (stock < 10) return { label: 'Low Stock', variant: 'warning' };
    return { label: 'In Stock', variant: 'success' };
  };

  const { label, variant } = getStockStatus();

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        variant === 'success' && 'bg-success/10 text-success',
        variant === 'warning' && 'bg-warning/10 text-warning',
        variant === 'destructive' && 'bg-destructive/10 text-destructive'
      )}
    >
      {label}
    </span>
  );
}
