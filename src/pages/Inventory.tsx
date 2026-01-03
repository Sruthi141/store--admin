import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchCategories, searchProducts, fetchProductsByCategory } from '@/services/api';
import { useDebounce } from '@/hooks/useDebounce';
import { ProductTable } from '@/components/inventory/ProductTable';
import { ProductMobileList } from '@/components/inventory/ProductMobileList';
import { InventoryToolbar } from '@/components/inventory/InventoryToolbar';
import { ProductTableSkeleton } from '@/components/ui/skeleton-loader';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, AlertCircle, Package, ArrowLeft } from 'lucide-react';

const ITEMS_PER_PAGE = 20;

export default function Inventory() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('title-asc');
  const [page, setPage] = useState(0);
  const [stockFilter, setStockFilter] = useState<'all' | 'in' | 'out'>('all');

  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const [sortField, sortOrder] = sortBy.split('-') as [string, 'asc' | 'desc'];

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', debouncedSearch, selectedCategory, sortField, sortOrder, page],
    queryFn: async () => {
      if (debouncedSearch) return searchProducts(debouncedSearch, 100);
      if (selectedCategory !== 'all')
        return fetchProductsByCategory(selectedCategory, {
          limit: ITEMS_PER_PAGE,
          skip: page * ITEMS_PER_PAGE,
          sortBy: sortField,
          order: sortOrder,
        });
      return fetchProducts({
        limit: ITEMS_PER_PAGE,
        skip: page * ITEMS_PER_PAGE,
        sortBy: sortField,
        order: sortOrder,
      });
    },
  });

  const products = useMemo(() => {
    if (!data?.products) return [];

    let filtered = [...data.products];

    // Filter by stock
    if (stockFilter === 'in') filtered = filtered.filter(p => p.stock > 0);
    if (stockFilter === 'out') filtered = filtered.filter(p => p.stock === 0);

    // Sort client-side if searching
    if (debouncedSearch) {
      filtered.sort((a, b) => {
        if (sortField === 'title') return sortOrder === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
        if (sortField === 'price') return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        return 0;
      });
    }

    return filtered;
  }, [data?.products, debouncedSearch, sortField, sortOrder, stockFilter]);

  const totalPages = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0;

  return (
    <div className="animate-fade-in px-4 md:px-8 py-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        {/* Back Arrow */}
        <ArrowLeft
          className="h-6 w-6 text-gray-600 cursor-pointer hover:text-gray-800"
          onClick={() => navigate('/')}
        />
        <h1 className="text-3xl font-bold">Inventory Overview</h1>
      </div>

      {/* Toolbar */}
      <InventoryToolbar
        searchQuery={searchQuery}
        onSearchChange={(value) => { setSearchQuery(value); setPage(0); }}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={(value) => { setSelectedCategory(value); setPage(0); }}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Stock Filter */}
      <div className="flex gap-2 mb-4">
        <Button size="sm" variant={stockFilter === 'all' ? 'default' : 'outline'} onClick={() => setStockFilter('all')}>All</Button>
        <Button size="sm" variant={stockFilter === 'in' ? 'default' : 'outline'} onClick={() => setStockFilter('in')}>In Stock</Button>
        <Button size="sm" variant={stockFilter === 'out' ? 'default' : 'outline'} onClick={() => setStockFilter('out')}>Out of Stock</Button>
      </div>

      {/* Loading */}
      {isLoading ? (
        <>
          <ProductTableSkeleton />
          <div className="md:hidden grid grid-cols-2 gap-4 mt-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-4 border rounded-lg shadow animate-pulse bg-gray-100 h-48" />
            ))}
          </div>
        </>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-2">
          <AlertCircle className="h-16 w-16 text-destructive mb-4" />
          <h3 className="text-xl font-semibold text-destructive">Failed to load products</h3>
          <p className="text-muted-foreground">There was an error fetching the inventory data.</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center space-y-2">
          <Package className="h-16 w-16 text-gray-400 animate-bounce" />
          <h3 className="text-xl font-semibold text-gray-700">No products found</h3>
          <p className="text-gray-500 text-sm">
            {searchQuery ? `No results for "${searchQuery}"` : 'No products available in this category.'}
          </p>
          {searchQuery && (
            <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>Clear Search</Button>
          )}
        </div>
      ) : (
        <>
          {/* Product Table & Mobile List */}
          <ProductTable
  products={products}
  onToggleStock={(id) => {
    alert(`Added product with ID ${id} to cart!`);
    // or implement your local state update logic
  }}
  backTo="inventory"
/>
<ProductMobileList products={products} showStock={true} backTo="inventory" />

          {/* Pagination */}
          {!debouncedSearch && totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <p className="text-sm text-gray-500">Page {page + 1} of {totalPages}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg transition hover:bg-gray-100"
                  onClick={() => setPage(p => Math.max(0, p - 1))}
                  disabled={page === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" /> Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-lg transition hover:bg-gray-100"
                  onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= totalPages - 1}
                >
                  Next <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
