const BASE_URL = 'https://dummyjson.com';

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface Category {
  slug: string;
  name: string;
  url: string;
}

export async function fetchProducts(params: {
  limit?: number;
  skip?: number;
  sortBy?: string;
  order?: 'asc' | 'desc';
}): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();
  if (params.limit) searchParams.set('limit', params.limit.toString());
  if (params.skip) searchParams.set('skip', params.skip.toString());
  if (params.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params.order) searchParams.set('order', params.order);

  const response = await fetch(`${BASE_URL}/products?${searchParams.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
}

export async function searchProducts(query: string, limit = 20): Promise<ProductsResponse> {
  const response = await fetch(`${BASE_URL}/products/search?q=${encodeURIComponent(query)}&limit=${limit}`);
  if (!response.ok) throw new Error('Failed to search products');
  return response.json();
}

export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) throw new Error('Failed to fetch product');
  return response.json();
}

export async function fetchCategories(): Promise<Category[]> {
  const response = await fetch(`${BASE_URL}/products/categories`);
  if (!response.ok) throw new Error('Failed to fetch categories');
  return response.json();
}

export async function fetchProductsByCategory(
  category: string,
  params: { limit?: number; skip?: number; sortBy?: string; order?: 'asc' | 'desc' } = {}
): Promise<ProductsResponse> {
  const searchParams = new URLSearchParams();
  if (params.limit) searchParams.set('limit', params.limit.toString());
  if (params.skip) searchParams.set('skip', params.skip.toString());
  if (params.sortBy) searchParams.set('sortBy', params.sortBy);
  if (params.order) searchParams.set('order', params.order);

  const response = await fetch(`${BASE_URL}/products/category/${encodeURIComponent(category)}?${searchParams.toString()}`);
  if (!response.ok) throw new Error('Failed to fetch products by category');
  return response.json();
}
