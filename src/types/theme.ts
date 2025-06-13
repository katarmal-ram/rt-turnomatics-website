export interface NavigationConfig {
  style: 'solid' | 'transparent' | 'glass' | 'minimal' | 'floating' | 'centered' | 'modern' | 'split';
  position: 'top' | 'side';
  logo?: {
    position: 'left' | 'center';
    size: 'sm' | 'md' | 'lg';
  };
}

export interface HeroConfig {
  layout: 'centered' | 'split' | 'carousel' | 'video' | 'minimal' | 'gradient' | 'form';
  backgroundType: 'color' | 'gradient' | 'image' | 'video';
  overlay?: {
    enabled: boolean;
    color: string;
    opacity: number;
  };
  content?: {
    alignment: 'left' | 'center' | 'right';
    maxWidth: string;
  };
  // Additional optional properties for video layouts
  videoUrl?: string;
  posterImage?: string;
  backgroundImage?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  // Carousel-specific properties
  images?: string[];
  interval?: number;
  // Split layout properties
  imagePosition?: 'left' | 'right';
  contentAlignment?: 'left' | 'center' | 'right';
  // Gradient properties
  gradient?: string;
}

export interface TypographyConfig {
  headingFont: string;
  bodyFont: string;
  scale: number;
  lineHeight: number;
  letterSpacing: number;
}

export interface EffectsConfig {
  animations: boolean;
  parallax: boolean;
  smoothScrolling: boolean;
  borderRadius: number;
  shadowIntensity: 'none' | 'light' | 'medium' | 'strong';
  gradients: boolean;
}

export interface ColorConfig {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  muted: string;
  border?: string;
  success?: string;
  warning?: string;
  error?: string;
}

export interface ThemeConfig {
  id: string;
  name: string;
  description?: string;
  category: 'business' | 'creative' | 'tech' | 'minimal' | 'luxury' | 'nature' | 'vintage' | 'futuristic' | 'bold';
  colors: ColorConfig;
  typography: TypographyConfig;
  navigation: NavigationConfig;
  hero: HeroConfig;
  effects: EffectsConfig;
  spacing?: {
    section: string;
    container: string;
  };
  components?: {
    buttons: {
      style: 'rounded' | 'square' | 'pill';
      size: 'sm' | 'md' | 'lg';
    };
    cards: {
      style: 'minimal' | 'elevated' | 'bordered';
      spacing: 'tight' | 'normal' | 'loose';
    };
  };
}

export const defaultThemes: ThemeConfig[] = [
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    description: 'Clean and professional with blue accents',
    category: 'business',
    colors: {
      primary: '#3b82f6',
      secondary: '#1e40af',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#1f2937',
      muted: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      scale: 1.0,
      lineHeight: 1.6,
      letterSpacing: 0
    },
    navigation: {
      style: 'solid',
      position: 'top',
      logo: {
        position: 'left',
        size: 'md'
      }
    },
    hero: {
      layout: 'centered',
      backgroundType: 'gradient',
      overlay: {
        enabled: false,
        color: '#000000',
        opacity: 0.3
      },
      content: {
        alignment: 'center',
        maxWidth: '4xl'
      }
    },
    effects: {
      animations: true,
      parallax: false,
      smoothScrolling: true,
      borderRadius: 8,
      shadowIntensity: 'medium',
      gradients: true
    },
    spacing: {
      section: 'py-16',
      container: 'max-w-7xl mx-auto px-4'
    },
    components: {
      buttons: {
        style: 'rounded',
        size: 'md'
      },
      cards: {
        style: 'elevated',
        spacing: 'normal'
      }
    }
  },
  {
    id: 'creative-purple',
    name: 'Creative Purple',
    description: 'Vibrant and artistic with purple gradients',
    category: 'creative',
    colors: {
      primary: '#8b5cf6',
      secondary: '#7c3aed',
      accent: '#f59e0b',
      background: '#fafafa',
      text: '#111827',
      muted: '#6b7280',
      border: '#e5e7eb',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    },
    typography: {
      headingFont: 'Poppins',
      bodyFont: 'Inter',
      scale: 1.1,
      lineHeight: 1.7,
      letterSpacing: 0
    },
    navigation: {
      style: 'glass',
      position: 'top',
      logo: {
        position: 'left',
        size: 'md'
      }
    },
    hero: {
      layout: 'split',
      backgroundType: 'gradient',
      overlay: {
        enabled: true,
        color: '#8b5cf6',
        opacity: 0.1
      },
      content: {
        alignment: 'left',
        maxWidth: '2xl'
      }
    },
    effects: {
      animations: true,
      parallax: true,
      smoothScrolling: true,
      borderRadius: 12,
      shadowIntensity: 'strong',
      gradients: true
    },
    spacing: {
      section: 'py-20',
      container: 'max-w-6xl mx-auto px-6'
    },
    components: {
      buttons: {
        style: 'pill',
        size: 'lg'
      },
      cards: {
        style: 'elevated',
        spacing: 'loose'
      }
    }
  },
  {
    id: 'tech-dark',
    name: 'Tech Dark',
    description: 'Sleek dark theme perfect for tech companies',
    category: 'tech',
    colors: {
      primary: '#06b6d4',
      secondary: '#0891b2',
      accent: '#f59e0b',
      background: '#0f172a',
      text: '#f8fafc',
      muted: '#94a3b8',
      border: '#334155',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      scale: 1.0,
      lineHeight: 1.6,
      letterSpacing: 0.5
    },
    navigation: {
      style: 'transparent',
      position: 'top',
      logo: {
        position: 'left',
        size: 'md'
      }
    },
    hero: {
      layout: 'video',
      backgroundType: 'color',
      overlay: {
        enabled: true,
        color: '#000000',
        opacity: 0.5
      },
      content: {
        alignment: 'center',
        maxWidth: '4xl'
      }
    },
    effects: {
      animations: true,
      parallax: false,
      smoothScrolling: true,
      borderRadius: 6,
      shadowIntensity: 'light',
      gradients: false
    },
    spacing: {
      section: 'py-16',
      container: 'max-w-7xl mx-auto px-4'
    },
    components: {
      buttons: {
        style: 'square',
        size: 'md'
      },
      cards: {
        style: 'bordered',
        spacing: 'normal'
      }
    }
  },
  {
    id: 'minimal-white',
    name: 'Minimal White',
    description: 'Clean minimalist design with lots of whitespace',
    category: 'minimal',
    colors: {
      primary: '#000000',
      secondary: '#374151',
      accent: '#f59e0b',
      background: '#ffffff',
      text: '#111827',
      muted: '#9ca3af',
      border: '#f3f4f6',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      scale: 0.9,
      lineHeight: 1.8,
      letterSpacing: 0
    },
    navigation: {
      style: 'minimal',
      position: 'top',
      logo: {
        position: 'left',
        size: 'sm'
      }
    },
    hero: {
      layout: 'minimal',
      backgroundType: 'color',
      overlay: {
        enabled: false,
        color: '#000000',
        opacity: 0
      },
      content: {
        alignment: 'center',
        maxWidth: '3xl'
      }
    },
    effects: {
      animations: false,
      parallax: false,
      smoothScrolling: true,
      borderRadius: 4,
      shadowIntensity: 'none',
      gradients: false
    },
    spacing: {
      section: 'py-24',
      container: 'max-w-4xl mx-auto px-8'
    },
    components: {
      buttons: {
        style: 'square',
        size: 'sm'
      },
      cards: {
        style: 'minimal',
        spacing: 'tight'
      }
    }
  },
  {
    id: 'luxury-gold',
    name: 'Luxury Gold',
    description: 'Elegant and sophisticated with gold accents',
    category: 'luxury',
    colors: {
      primary: '#d97706',
      secondary: '#92400e',
      accent: '#fbbf24',
      background: '#1f2937',
      text: '#f9fafb',
      muted: '#d1d5db',
      border: '#374151',
      success: '#10b981',
      warning: '#f59e0b',
      error: '#ef4444'
    },
    typography: {
      headingFont: 'Playfair Display',
      bodyFont: 'Inter',
      scale: 1.2,
      lineHeight: 1.6,
      letterSpacing: 1
    },
    navigation: {
      style: 'floating',
      position: 'top',
      logo: {
        position: 'center',
        size: 'lg'
      }
    },
    hero: {
      layout: 'carousel',
      backgroundType: 'image',
      overlay: {
        enabled: true,
        color: '#000000',
        opacity: 0.4
      },
      content: {
        alignment: 'center',
        maxWidth: '5xl'
      }
    },
    effects: {
      animations: true,
      parallax: true,
      smoothScrolling: true,
      borderRadius: 16,
      shadowIntensity: 'strong',
      gradients: true
    },
    spacing: {
      section: 'py-20',
      container: 'max-w-6xl mx-auto px-6'
    },
    components: {
      buttons: {
        style: 'pill',
        size: 'lg'
      },
      cards: {
        style: 'elevated',
        spacing: 'loose'
      }
    }
  }
];
