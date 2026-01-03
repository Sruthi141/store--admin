export function StockBadge({ stock }: { stock: number }) {
  if (stock === 0) {
    return (
      <span className="px-2 py-1 text-xs rounded bg-red-100 text-red-700">
        OUT OF STOCK
      </span>
    );
  }

  if (stock < 10) {
    return (
      <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
        LOW STOCK
      </span>
    );
  }

  return (
    <span className="px-2 py-1 text-xs rounded bg-green-100 text-green-700">
      IN STOCK
    </span>
  );
}
