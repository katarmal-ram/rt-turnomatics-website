
export const extractConfigFromSupabase = (siteData: any) => {
  // Extract site_config from Supabase sites table
  if (!siteData || !siteData.site_config) {
    throw new Error('Invalid site data from Supabase');
  }

  const config = siteData.site_config;
  
  // Ensure all required sections exist with proper structure
  const completeConfig = {
    site: config.site || {},
    theme: config.theme || {
      colors: {
        primary: '#2563eb',
        secondary: '#64748b',
        accent: '#f59e0b',
        background: '#ffffff',
        text: '#1f2937'
      },
      hero: {
        layout: 'default'
      }
    },
    navigation: config.navigation || { enabled: true, items: [] },
    sections: {
      hero: config.sections?.hero || { enabled: true },
      about: config.sections?.about || { enabled: true },
      features: config.sections?.features || { enabled: true },
      services: config.sections?.services || { enabled: true },
      products: config.sections?.products || { enabled: true },
      whyChooseUs: config.sections?.whyChooseUs || { enabled: true },
      gallery: config.sections?.gallery || { enabled: true },
      certifications: config.sections?.certifications || { enabled: false },
      testimonials: config.sections?.testimonials || { enabled: true },
      quote: config.sections?.quote || { enabled: true },
      contact: config.sections?.contact || { enabled: true }
    },
    footer: config.footer || { enabled: true },
    sectionsOrder: config.sectionsOrder || []
  };

  return completeConfig;
};

export const extractProductsFromSupabase = (siteData: any) => {
  // Extract products_config from Supabase sites table
  if (!siteData || !siteData.products_config) {
    return {
      categories: [],
      featured: []
    };
  }

  const products = siteData.products_config;
  
  // Ensure proper structure
  return {
    categories: products.categories || [],
    featured: products.featured || []
  };
};

export const validateConfigData = (config: any): boolean => {
  try {
    // Basic validation checks
    if (!config.site) return false;
    if (!config.sections) return false;
    if (!config.theme) return false;
    
    return true;
  } catch (error) {
    console.error('Config validation failed:', error);
    return false;
  }
};

export const validateProductsData = (products: any): boolean => {
  try {
    // Basic validation checks
    if (!Array.isArray(products.categories)) return false;
    if (!Array.isArray(products.featured)) return false;
    
    return true;
  } catch (error) {
    console.error('Products validation failed:', error);
    return false;
  }
};
