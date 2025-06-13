
import { useParams } from 'react-router-dom';
import { useSiteConfig } from "@/hooks/useSiteConfig";
import { useSiteProducts } from "@/hooks/useSiteProducts";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Navigation } from "@/components/sections/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { WhyChooseUsSection } from "@/components/sections/WhyChooseUsSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { CertificationsSection } from "@/components/sections/CertificationsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { QuoteSection } from "@/components/sections/QuoteSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/sections/Footer";
import { InfrastructureSection } from "@/components/sections/InfrastructureSection";
import { LeadershipSection } from "@/components/sections/LeadershipSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CSRSection } from "@/components/sections/CSRSection";
import { AwardsSection } from "@/components/sections/AwardsSection";
import { TechnologySection } from "@/components/sections/TechnologySection";
import { NewsSection } from "@/components/sections/NewsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { QualitySection } from "@/components/sections/QualitySection";
import { EnvironmentSection } from "@/components/sections/EnvironmentSection";
import { DownloadCatalogSection } from "@/components/sections/DownloadCatalogSection";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { useEffect } from 'react';
import { defaultThemes } from "@/types/theme";

const App = () => {
  const { siteId } = useParams();
  const { config, loading: configLoading, error: configError } = useSiteConfig(siteId);
  const { products, loading: productsLoading, error: productsError } = useSiteProducts(siteId);

  const loading = configLoading || productsLoading;
  const error = configError || productsError;

  // Apply theme styles
  useEffect(() => {
    if (config?.theme) {
      const theme = config.theme;
      const root = document.documentElement;
      
      root.style.setProperty('--primary-color', theme.colors.primary);
      root.style.setProperty('--secondary-color', theme.colors.secondary);
      root.style.setProperty('--accent-color', theme.colors.accent);
      root.style.setProperty('--background-color', theme.colors.background);
      root.style.setProperty('--text-color', theme.colors.text);
    }
  }, [config?.theme]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <LoadingSpinner 
            logo={config?.site?.logo} 
            size="lg" 
            className="mx-auto mb-4" 
          />
          <h2 className="text-2xl font-semibold text-gray-700">Loading...</h2>
        </div>
      </div>
    );
  }

  if (error || !config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-red-600 mb-4">Error Loading Site</h2>
          <p className="text-gray-600">{error || 'Failed to load configuration'}</p>
        </div>
      </div>
    );
  }

  const theme = config.theme || defaultThemes[0];
  const businessName = config?.site?.title?.split(' - ')[0] || config?.site?.title || 'Business Name';

  // Enhanced dynamic section rendering
  const renderDynamicSection = (section: any) => {
    if (!section?.enabled || (section.data && section.data.enabled === false)) return null;

    try {
      switch (section.type) {
        case 'infrastructure':
          return <InfrastructureSection key={section.id} data={section.data} />;
        case 'leadership':
          return <LeadershipSection key={section.id} data={section.data} />;
        case 'process':
          return <ProcessSection key={section.id} data={section.data} />;
        case 'csr':
          return <CSRSection key={section.id} data={section.data} />;
        case 'awards':
          return <AwardsSection key={section.id} data={section.data} />;
        case 'technology':
          return <TechnologySection key={section.id} data={section.data} />;
        case 'news':
          return <NewsSection key={section.id} data={section.data} />;
        case 'faq':
          return <FAQSection key={section.id} data={section.data} />;
        case 'quality':
          return <QualitySection key={section.id} data={section.data} />;
        case 'environment':
          return <EnvironmentSection key={section.id} data={section.data} />;
        case 'download-catalog':
          return <DownloadCatalogSection key={section.id} data={section.data} />;
        default:
          console.warn(`Unknown section type: ${section.type}`);
          return null;
      }
    } catch (error) {
      console.error(`Error rendering section ${section.type}:`, error);
      return (
        <div key={section.id} className="py-16 px-4 bg-red-50 border border-red-200">
          <div className="max-w-7xl mx-auto text-center">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Section Error</h3>
            <p className="text-red-600">Failed to render {section.type} section</p>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen" style={{ 
      backgroundColor: theme.colors.background,
      color: theme.colors.text 
    }}>
      
      <Navigation 
        data={config?.navigation || { items: [] }} 
        siteName={businessName} 
        logo={config?.site?.logo}
        theme={theme}
      />
      
      <div id="hero">
        <HeroSection data={{ ...config?.sections?.hero, layout: theme.hero?.layout }} />
      </div>
      
      {config?.sections?.about?.enabled && (
        <div id="about">
          <AboutSection data={config.sections.about} />
        </div>
      )}
      
      {config?.sections?.features?.enabled && (
        <div id="features">
          <FeaturesSection data={config.sections.features} />
        </div>
      )}
      
      {config?.sections?.services?.enabled && (
        <div id="services">
          <ServicesSection data={config.sections.services} />
        </div>
      )}
      
      {config?.sections?.products?.enabled && (
        <div id="products">
          <ProductsSection data={config.sections.products} productsData={products} />
        </div>
      )}
      
      {config?.sections?.whyChooseUs?.enabled && (
        <div id="why-choose-us">
          <WhyChooseUsSection data={config.sections.whyChooseUs} />
        </div>
      )}

      {/* ADDITIONAL SECTIONS - Render from sectionsOrder array */}
      {config?.sectionsOrder && config.sectionsOrder.length > 0 && config.sectionsOrder.map((section: any) => {
        const sectionElement = renderDynamicSection(section);
        return sectionElement ? (
          <div key={section.id} id={section.type}>
            {sectionElement}
          </div>
        ) : null;
      })}
      
      {config?.sections?.gallery?.enabled && (
        <div id="gallery">
          <GallerySection data={config.sections.gallery} />
        </div>
      )}
      
      {config?.sections?.certifications?.enabled && (
        <div id="certifications">
          <CertificationsSection data={config.sections.certifications} />
        </div>
      )}
      
      {config?.sections?.testimonials?.enabled && (
        <div id="testimonials">
          <TestimonialsSection data={config.sections.testimonials} />
        </div>
      )}
      
      {config?.sections?.quote?.enabled && (
        <div id="request-quote">
          <QuoteSection data={config.sections.quote} />
        </div>
      )}
      
      {config?.sections?.contact?.enabled && (
        <div id="contact">
          <ContactSection data={config.sections.contact} />
        </div>
      )}
      
      <Footer 
        data={config?.footer || { 
          enabled: true, 
          copyright: `© ${new Date().getFullYear()} ${businessName}. All rights reserved.`,
          socialLinks: [],
          quickLinks: []
        }} 
        businessName={businessName} 
      />
    </div>
  );
};
export default App;
