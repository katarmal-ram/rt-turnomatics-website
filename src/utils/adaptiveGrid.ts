
export const getAdaptiveGridClasses = (itemCount: number) => {
  if (itemCount === 0) {
    return {
      container: "max-w-2xl mx-auto",
      grid: "grid-cols-1",
      spacing: "gap-4",
      padding: "py-12"
    };
  }
  
  if (itemCount === 1) {
    return {
      container: "max-w-2xl mx-auto",
      grid: "grid-cols-1",
      spacing: "gap-6",
      padding: "py-16"
    };
  }
  
  if (itemCount === 2) {
    return {
      container: "max-w-4xl mx-auto",
      grid: "grid-cols-1 md:grid-cols-2",
      spacing: "gap-8",
      padding: "py-16"
    };
  }
  
  if (itemCount === 3) {
    return {
      container: "max-w-6xl mx-auto",
      grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      spacing: "gap-6",
      padding: "py-20"
    };
  }
  
  if (itemCount === 4) {
    return {
      container: "max-w-7xl mx-auto",
      grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      spacing: "gap-6",
      padding: "py-20"
    };
  }
  
  if (itemCount === 5) {
    return {
      container: "max-w-7xl mx-auto",
      grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      spacing: "gap-6",
      padding: "py-20"
    };
  }
  
  if (itemCount === 6) {
    return {
      container: "max-w-7xl mx-auto",
      grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      spacing: "gap-6",
      padding: "py-20"
    };
  }
  
  if (itemCount === 7) {
    return {
      container: "max-w-7xl mx-auto",
      grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      spacing: "gap-6",
      padding: "py-20"
    };
  }
  
  // 8+ items
  return {
    container: "max-w-7xl mx-auto",
    grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    spacing: "gap-6",
    padding: "py-20"
  };
};

export const getSectionClasses = (itemCount: number, sectionType: 'card' | 'feature' | 'list' = 'card') => {
  const base = getAdaptiveGridClasses(itemCount);
  
  if (sectionType === 'feature' && itemCount <= 3) {
    return {
      ...base,
      grid: itemCount === 1 ? "grid-cols-1" : itemCount === 2 ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
    };
  }
  
  return base;
};

// Enhanced grid for products section with special layouts
export const getProductGridClasses = (itemCount: number) => {
  if (itemCount === 0) {
    return {
      container: "max-w-2xl mx-auto",
      grid: "grid-cols-1",
      spacing: "gap-4"
    };
  }
  
  if (itemCount === 1) {
    return {
      container: "max-w-2xl mx-auto",
      grid: "grid-cols-1",
      spacing: "gap-6"
    };
  }
  
  if (itemCount === 2) {
    return {
      container: "max-w-4xl mx-auto",
      grid: "grid-cols-1 md:grid-cols-2",
      spacing: "gap-8"
    };
  }
  
  if (itemCount === 3) {
    return {
      container: "max-w-6xl mx-auto",
      grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      spacing: "gap-6"
    };
  }
  
  if (itemCount === 4) {
    return {
      container: "max-w-7xl mx-auto",
      grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
      spacing: "gap-6"
    };
  }
  
  if (itemCount === 5) {
    return {
      container: "max-w-7xl mx-auto",
      grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      spacing: "gap-6",
      specialLayout: "5-items" // 3-2 layout
    };
  }
  
  if (itemCount === 6) {
    return {
      container: "max-w-7xl mx-auto",
      grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      spacing: "gap-6",
      specialLayout: "6-items" // 3-3 layout
    };
  }
  
  if (itemCount === 7) {
    return {
      container: "max-w-7xl mx-auto",
      grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
      spacing: "gap-6",
      specialLayout: "7-items" // 4-3 layout
    };
  }
  
  // 8+ items - standard grid
  return {
    container: "max-w-7xl mx-auto",
    grid: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    spacing: "gap-6"
  };
};
