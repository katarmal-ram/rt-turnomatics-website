
import { useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  specifications: string[];
  applications: string[];
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  products: Product[];
}

export interface ProductsData {
  categories: ProductCategory[];
  featured: string[];
}

export const useProducts = () => {
  const [products, setProducts] = useState<ProductsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products.json');
        if (!response.ok) {
          throw new Error('Failed to load products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};
