
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  specifications: string[];
  applications: string[];
}

interface ProductCategory {
  id: string;
  name: string;
  description: string;
  image: string;
  products: Product[];
}

interface ProductsData {
  categories: ProductCategory[];
  featured: string[];
}

interface ProductsSectionData {
  enabled: boolean;
  title: string;
  subtitle: string;
}

interface ProductsSectionProps {
  data: ProductsSectionData;
  productsData: ProductsData;
}

export const ProductsSection = ({ data, productsData }: ProductsSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  if (!data?.enabled) return null;

  const categories = productsData?.categories || [];

  // Get all products from all categories
  const getAllProducts = (): Product[] => {
    const allProducts: Product[] = [];
    categories.forEach(category => {
      (category.products || []).forEach(product => {
        allProducts.push(product);
      });
    });
    return allProducts;
  };

  // Get products to display based on selected category
  const getDisplayProducts = (): Product[] => {
    if (selectedCategory === 'all') {
      return getAllProducts();
    }
    const category = categories.find(cat => cat.id === selectedCategory);
    return category?.products || [];
  };

  const displayProducts = getDisplayProducts();

  const getGridClasses = (count: number) => {
    if (count === 1) return 'grid-cols-1 max-w-md mx-auto';
    if (count === 2) return 'grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto';
    return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600 mb-8 animate-fade-in-up">
            {data.subtitle}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto"></div>
        </div>

        {/* Category Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button
            variant={selectedCategory === 'all' ? "default" : "outline"}
            onClick={() => setSelectedCategory('all')}
            className="transition-all duration-300"
          >
            All Products
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="transition-all duration-300"
            >
              {category.name}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        {displayProducts.length > 0 ? (
          <div className={`grid ${getGridClasses(displayProducts.length)} gap-8`}>
            {displayProducts.map((product, index) => (
              <div 
                key={product.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2 animate-fade-in-up cursor-pointer"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedProduct(product)}
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
                    {product.description}
                  </p>
                  
                  {(product.applications || []).length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {product.applications.slice(0, 2).map((app, appIndex) => (
                        <Badge key={appIndex} variant="secondary" className="text-xs">
                          {app}
                        </Badge>
                      ))}
                      {product.applications.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{product.applications.length - 2} more
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">
              {selectedCategory === 'all' 
                ? "No products available" 
                : `No products available in ${categories.find(c => c.id === selectedCategory)?.name || 'this category'}`}
            </p>
          </div>
        )}

        {/* Product Detail Modal */}
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {selectedProduct && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-900">
                    {selectedProduct.name}
                  </DialogTitle>
                </DialogHeader>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-full h-80 object-cover rounded-lg"
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <p className="text-gray-600 leading-relaxed">
                      {selectedProduct.description}
                    </p>
                    
                    {(selectedProduct.specifications || []).length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 text-lg">Specifications</h4>
                        <ul className="space-y-2">
                          {selectedProduct.specifications.map((spec, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full mr-3 flex-shrink-0"></div>
                              {spec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {(selectedProduct.applications || []).length > 0 && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 text-lg">Applications</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProduct.applications.map((app, index) => (
                            <Badge key={index} variant="secondary">
                              {app}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-4">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        Request Quote for {selectedProduct.name}
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
