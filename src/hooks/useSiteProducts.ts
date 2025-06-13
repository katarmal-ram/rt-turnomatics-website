
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ProductsData } from './useProducts';

export const useSiteProducts = (siteId?: string) => {
  const [products, setProducts] = useState<ProductsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (siteId) {
          // Fetch from Supabase
          const { data, error } = await supabase
            .from('sites')
            .select('products_config')
            .eq('id', siteId)
            .single();

          if (error) {
            throw new Error('Site not found');
          }

          setProducts(data.products_config as unknown as ProductsData);
        } else {
          // Fallback to demo products
          const response = await fetch('/products.json');
          if (!response.ok) {
            throw new Error('Failed to load demo products');
          }
          const data = await response.json();
          setProducts(data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [siteId]);

  return { products, loading, error };
};
