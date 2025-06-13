
import { HeroCentered } from "./hero/HeroCentered";
import { HeroSplit } from "./hero/HeroSplit";
import { HeroMinimal } from "./hero/HeroMinimal";
import { HeroGradient } from "./hero/HeroGradient";
import { HeroCarousel } from "./hero/HeroCarousel";
import { HeroVideo } from "./hero/HeroVideo";
import { HeroForm } from "./hero/HeroForm";

interface HeroSectionProps {
  data: {
    enabled: boolean;
    headline: string;
    subheadline: string;
    primaryCTA: {
      text: string;
      link: string;
    };
    secondaryCTA: {
      text: string;
      link: string;
    };
    backgroundImage?: string;
    layout?: 'centered' | 'split' | 'minimal' | 'gradient' | 'carousel' | 'video' | 'form';
    images?: string[];
    videoUrl?: string;
    formTitle?: string;
    formFields?: Array<{
      type: 'email' | 'text' | 'textarea' | 'phone';
      placeholder: string;
      required?: boolean;
    }>;
    submitText?: string;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
    interval?: number;
  };
}

export const HeroSection = ({ data }: HeroSectionProps) => {
  if (!data.enabled) return null;

  const layout = data.layout || 'centered';

  switch (layout) {
    case 'carousel':
      return <HeroCarousel data={{
        ...data,
        images: data.images || [data.backgroundImage || ''].filter(Boolean),
      }} />;
    case 'video':
      return <HeroVideo data={{
        ...data,
        videoUrl: data.videoUrl || '',
      }} />;
    case 'form':
      return <HeroForm data={{
        ...data,
        formTitle: data.formTitle || 'Contact Us',
        formFields: data.formFields || [
          { type: 'text', placeholder: 'Your Name', required: true },
          { type: 'email', placeholder: 'Your Email', required: true },
          { type: 'textarea', placeholder: 'Your Message', required: false }
        ],
        submitText: data.submitText || 'Submit'
      }} />;
    case 'split':
      return <HeroSplit data={{
        ...data,
        backgroundImage: data.backgroundImage || ''
      }} />;
    case 'minimal':
      return <HeroMinimal data={data} />;
    case 'gradient':
      return <HeroGradient data={data} />;
    case 'centered':
    default:
      return <HeroCentered data={{
        ...data,
        backgroundImage: data.backgroundImage || ''
      }} />;
  }
};
