import { useState, useEffect } from 'react';
import { Menu, X, Search, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeConfig } from '@/types/theme';
import { useScrollSpy } from '@/hooks/useScrollSpy';

interface NavigationItem {
  text: string;
  link: string;
}

interface NavigationProps {
  data: {
    items: NavigationItem[];
  };
  siteName: string;
  logo?: string;
  theme?: ThemeConfig;
  previewDevice?: 'desktop' | 'tablet' | 'mobile';
  isIsolated?: boolean;
}

export const Navigation = ({
  data,
  siteName,
  logo,
  theme,
  previewDevice = 'desktop',
  isIsolated = false
}: NavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [backgroundLuminance, setBackgroundLuminance] = useState(0.5);

  // Safely extract navigation items
  const navigationItems = data?.items || [];
  const sectionIds = navigationItems
    .map(item => item?.link?.replace('#', ''))
    .filter(id => id && id !== '') || [];
  const activeSection = useScrollSpy(sectionIds, 120);
  const isMobileLayout = previewDevice === 'tablet' || previewDevice === 'mobile';

  console.log('Navigation received data:', data);
  console.log('Navigation items:', navigationItems);

  // Smart background detection for transparent navbar
  useEffect(() => {
    if (!theme || !theme.navigation || theme.navigation.style !== 'transparent') return;
    const detectBackgroundLuminance = () => {
      const scrollY = window.scrollY;
      // Get elements at the detection point
      const elementsAtPoint = document.elementsFromPoint(window.innerWidth / 2, 80);
      let detectedLuminance = 0.5;
      for (const element of elementsAtPoint) {
        const styles = window.getComputedStyle(element);
        const bgColor = styles.backgroundColor;
        if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
          detectedLuminance = calculateLuminanceFromColor(bgColor);
          break;
        }
      }
      setBackgroundLuminance(detectedLuminance);
    };
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      detectBackgroundLuminance();
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [theme]);
  
  const calculateLuminanceFromColor = (color: string): number => {
    // Parse RGB values from color string
    const rgb = color.match(/\d+/g);
    if (!rgb || rgb.length < 3) return 0.5;
    const [r, g, b] = rgb.map(Number);
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  };
  
  const scrollToSection = (link: string) => {
    // Always allow navigation - remove the isIsolated check that was preventing navigation
    if (link === '#' || link === '#home' || link === '#hero') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      const element = document.querySelector(link);
      if (element) {
        const navHeight = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: elementPosition - navHeight,
          behavior: 'smooth'
        });
      }
    }
    setIsMenuOpen(false);
  };

  const getNavigationStyles = () => {
    // Add safety check for theme.navigation
    if (!theme || !theme.navigation) {
      return {
        background: 'bg-white/95 backdrop-blur-md',
        text: 'text-gray-900',
        border: 'border-gray-200',
        mobileBackground: 'bg-white'
      };
    }
    const isDarkTheme = backgroundLuminance < 0.5;
    switch (theme.navigation.style) {
      case 'transparent':
        // Smart color detection for transparent navbar
        const smartTextColor = isDarkTheme ? 'text-white' : 'text-gray-900';
        const smartBackground = isScrolled ? isDarkTheme ? 'bg-gray-900/90' : 'bg-white/90' : 'bg-transparent';
        return {
          background: `${smartBackground} backdrop-blur-md`,
          text: smartTextColor,
          border: isScrolled ? isDarkTheme ? 'border-gray-700/50' : 'border-gray-200/50' : 'border-transparent',
          mobileBackground: isDarkTheme ? 'bg-gray-900/95' : 'bg-white/95'
        };
      case 'glass':
        return {
          background: isDarkTheme ? 'bg-gray-900/20 backdrop-blur-md' : 'bg-white/20 backdrop-blur-md',
          text: isDarkTheme ? 'text-white' : 'text-gray-900',
          border: isDarkTheme ? 'border-white/20' : 'border-black/20',
          mobileBackground: isDarkTheme ? 'bg-gray-900/95' : 'bg-white/95'
        };
      case 'floating':
        return {
          background: isDarkTheme ? 'bg-gray-800/95 shadow-lg rounded-full mx-4 mt-4 backdrop-blur-md' : 'bg-white/95 shadow-lg rounded-full mx-4 mt-4 backdrop-blur-md',
          text: isDarkTheme ? 'text-white' : 'text-gray-900',
          border: isDarkTheme ? 'border-gray-700' : 'border-gray-200',
          mobileBackground: isDarkTheme ? 'bg-gray-800' : 'bg-white'
        };
      case 'centered':
        return {
          background: isDarkTheme ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm',
          text: isDarkTheme ? 'text-white' : 'text-gray-900',
          border: isDarkTheme ? 'border-gray-700' : 'border-gray-200',
          mobileBackground: isDarkTheme ? 'bg-gray-900' : 'bg-white'
        };
      case 'modern':
        return {
          background: isDarkTheme ? 'bg-gray-900/98 backdrop-blur-sm shadow-sm' : 'bg-white/98 backdrop-blur-sm shadow-sm',
          text: isDarkTheme ? 'text-white' : 'text-gray-900',
          border: isDarkTheme ? 'border-gray-800' : 'border-gray-100',
          mobileBackground: isDarkTheme ? 'bg-gray-900' : 'bg-white'
        };
      case 'split':
        return {
          background: isDarkTheme ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm',
          text: isDarkTheme ? 'text-white' : 'text-gray-900',
          border: isDarkTheme ? 'border-gray-700' : 'border-gray-200',
          mobileBackground: isDarkTheme ? 'bg-gray-900' : 'bg-white'
        };
      case 'solid':
      default:
        return {
          background: isDarkTheme ? 'bg-gray-900/95 backdrop-blur-sm' : 'bg-white/95 backdrop-blur-sm',
          text: isDarkTheme ? 'text-white' : 'text-gray-900',
          border: isDarkTheme ? 'border-gray-700' : 'border-gray-200',
          mobileBackground: isDarkTheme ? 'bg-gray-900' : 'bg-white'
        };
    }
  };
  
  const navStyles = getNavigationStyles();
  
  const renderNavigationContent = () => {
    // Add safety check for theme.navigation
    const navStyle = theme?.navigation?.style || 'solid';
    
    switch (navStyle) {
      case 'centered':
        return <div className="flex items-center justify-between w-full">
            {/* Left Actions */}
            <div className="flex items-center space-x-2">
              
            </div>
            
            {/* Center - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              {/* Only render logo container if logo exists */}
              {(logo || siteName) && <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('#')}>
                  {logo && <img src={logo} alt={`${siteName} logo`} className="h-8 w-8 object-contain" />}
                  <h1 className={`text-xl font-bold ${navStyles.text}`}>{siteName}</h1>
                </div>}
              
              {!isMobileLayout && <div className="flex items-center space-x-1">
                  {navigationItems.map((item, index) => {
                const isActive = item?.link && activeSection === item.link.replace('#', '');
                return <button key={index} onClick={() => item?.link && scrollToSection(item.link)} className={`${navStyles.text} px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isActive ? 'bg-current/10' : 'hover:bg-current/5'}`}>
                        {item?.text || 'Menu Item'}
                      </button>;
              })}
                </div>}
            </div>
            
            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              
              {isMobileLayout && <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${navStyles.text} hover:bg-current/10`}>
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>}
            </div>
          </div>;
      case 'split':
        return <div className="flex items-center justify-between w-full">
            {/* Left - Logo */}
            {(logo || siteName) && <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('#')}>
                {logo && <img src={logo} alt={`${siteName} logo`} className="h-8 w-8 object-contain" />}
                <h1 className={`text-xl font-bold ${navStyles.text}`}>{siteName}</h1>
              </div>}
            
            {/* Center - Navigation */}
            {!isMobileLayout && <div className="flex items-center space-x-1">
                {navigationItems.map((item, index) => {
              const isActive = item?.link && activeSection === item.link.replace('#', '');
              return <button key={index} onClick={() => item?.link && scrollToSection(item.link)} className={`${navStyles.text} px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isActive ? 'bg-current/10' : 'hover:bg-current/5'}`}>
                      {item?.text || 'Menu Item'}
                    </button>;
            })}
              </div>}
            
            {/* Right - Actions */}
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" className={`${navStyles.text} hover:bg-current/10`}>
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className={`${navStyles.text} hover:bg-current/10`}>
                <User className="h-4 w-4" />
              </Button>
              {isMobileLayout && <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${navStyles.text} hover:bg-current/10`}>
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>}
            </div>
          </div>;
      default:
        return <div className="flex items-center justify-between w-full">
            {/* Logo and Site Name - Only render if logo or siteName exists */}
            {(logo || siteName) && <div className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-all duration-200" onClick={() => scrollToSection('#')}>
                {logo && <img src={logo} alt={`${siteName} logo`} className="h-8 w-8 object-contain transition-transform duration-200 hover:scale-105" />}
                <h1 className={`text-2xl font-bold ${navStyles.text} transition-colors duration-200`}>
                  {siteName}
                </h1>
              </div>}
            
            {/* Desktop Navigation */}
            {!isMobileLayout && <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {navigationItems.map((item, index) => {
                const isActive = item?.link && activeSection === item.link.replace('#', '');
                return <button key={index} onClick={() => item?.link && scrollToSection(item.link)} className={`${navStyles.text} px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 relative group hover:scale-105 ${isActive ? 'bg-current/10 shadow-sm' : 'hover:bg-current/5'}`}>
                        {item?.text || 'Menu Item'}
                        {isActive && <div className="absolute bottom-0 left-1/2 w-1/2 h-0.5 bg-current transform -translate-x-1/2 rounded-full transition-all duration-300" />}
                      </button>;
              })}
                </div>
              </div>}

            {/* Mobile menu button */}
            {isMobileLayout && <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${navStyles.text} hover:bg-current/10 hover:scale-105 transition-all duration-200`}>
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>}
          </div>;
    }
  };
  
  return <nav className={`fixed top-0 w-full z-50 border-b transition-all duration-500 ease-in-out ${navStyles.background} ${navStyles.border}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          {renderNavigationContent()}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <div className="animate-fade-in">
          <div className={`px-4 pt-2 pb-6 space-y-2 shadow-lg ${navStyles.mobileBackground} backdrop-blur-md border-t border-current/10`}>
            {navigationItems.map((item, index) => {
          const isActive = item?.link && activeSection === item.link.replace('#', '');
          return <button key={index} onClick={() => item?.link && scrollToSection(item.link)} className={`${navStyles.text} block px-4 py-3 rounded-md text-base font-medium w-full text-left transition-all duration-200 hover:scale-[1.02] ${isActive ? 'bg-current/15 shadow-sm' : 'hover:bg-current/8'}`}>
                  {item?.text || 'Menu Item'}
                </button>;
        })}
            
            <div className="pt-4 border-t border-current/20 space-y-2">
              <Button variant="ghost" className={`${navStyles.text} justify-start w-full hover:bg-current/10 hover:scale-[1.02] transition-all duration-200`}>
                <Search className="h-4 w-4 mr-3" />
                Search
              </Button>
              <Button variant="ghost" className={`${navStyles.text} justify-start w-full hover:bg-current/10 hover:scale-[1.02] transition-all duration-200`}>
                <User className="h-4 w-4 mr-3" />
                Account
              </Button>
            </div>
          </div>
        </div>}
    </nav>;
};
