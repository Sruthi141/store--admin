import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductsByCategory, fetchCategories, searchProducts } from '@/services/api';
import { useDebounce } from '@/hooks/useDebounce';
import { ProductTable } from '@/components/inventory/ProductTable';
import { ProductMobileList } from '@/components/inventory/ProductMobileList';
import { InventoryToolbar } from '@/components/inventory/InventoryToolbar';
import { ProductTableSkeleton, ProductCardSkeleton } from '@/components/ui/skeleton-loader';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, AlertCircle, Package } from 'lucide-react';

const ITEMS_PER_PAGE = 20;

export default function CategoryDrillDown() {
  const { category } = useParams<{ category: string }>();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('title-asc');
  const [page, setPage] = useState(0);

  const debouncedSearch = useDebounce(searchQuery, 300);
  const [sortField, sortOrder] = sortBy.split('-') as [string, 'asc' | 'desc'];

  // Fetch all categories for toolbar and header
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  const categoryInfo = categories.find((c) => c.slug === category);

  // Fetch products by category or search
  const { data, isLoading, error } = useQuery({
    queryKey: ['category-products', category, sortField, sortOrder, page, debouncedSearch],
    queryFn: async () => {
      if (debouncedSearch) {
        const results = await searchProducts(debouncedSearch, 100);
        return {
          ...results,
          products: results.products.filter((p) => p.category === category),
        };
      }
      return fetchProductsByCategory(category!, {
        limit: ITEMS_PER_PAGE,
        skip: page * ITEMS_PER_PAGE,
        sortBy: sortField,
        order: sortOrder,
      });
    },
    enabled: !!category,
  });

  const products = useMemo(() => {
    if (!data?.products) return [];

    if (debouncedSearch) {
      return [...data.products].sort((a, b) => {
        if (sortField === 'title') {
          return sortOrder === 'asc'
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        }
        if (sortField === 'price') {
          return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
        }
        return 0;
      });
    }

    return data.products;
  }, [data?.products, debouncedSearch, sortField, sortOrder]);

  const totalPages = data ? Math.ceil(data.total / ITEMS_PER_PAGE) : 0;

  return (
    <div className="animate-fade-in">
      {/* Back Link */}
      <Link
        to="/catalogue"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Catalogue
      </Link>

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold capitalize">
            {categoryInfo?.name || category}
          </h1>
          <p className="text-muted-foreground mt-1">
            {data ? `${data.total} products` : 'Loading...'}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <InventoryToolbar
        searchQuery={searchQuery}
        onSearchChange={(value) => {
          setSearchQuery(value);
          setPage(0);
        }}
        categories={categories}
        selectedCategory="all"
        onCategoryChange={() => {}}
        sortBy={sortBy}
        onSortChange={setSortBy}
        showCategoryFilter={false}
      />

      {/* Loading / Error / Empty / Products */}
      {isLoading ? (
        <>
          <ProductTableSkeleton />
          <div className="md:hidden grid grid-cols-2 gap-4 mt-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <AlertCircle className="h-12 w-12 text-destructive mb-4" />
          <h3 className="text-lg font-semibold mb-2">Failed to load products</h3>
          <p className="text-muted-foreground mb-4">
            There was an error fetching products for this category.
          </p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Package className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground">
            {searchQuery
              ? `No results for "${searchQuery}" in this category`
              : 'No products available in this category'}
          </p>
        </div>
      ) : (
        <>
          <ProductTable products={products} backTo="catalogue" />
          <ProductMobileList products={products} backTo="catalogue" />

          {/* Pagination */}
          {!debouncedSearch && totalPages > 1 && (
            <div className="flex items-center justify-between mt-6 pt-6 border-t">
              <p className="text-sm text-muted-foreground">
                Page {page + 1} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= totalPages - 1}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
