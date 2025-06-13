
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2, VolumeX, AlertCircle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface HeroVideoProps {
  data: {
    enabled: boolean;
    headline: string;
    subheadline: string;
    primaryCTA: { text: string; link: string };
    secondaryCTA: { text: string; link: string };
    videoUrl: string;
    posterImage?: string;
    autoPlay?: boolean;
    muted?: boolean;
    loop?: boolean;
  };
}

export const HeroVideo = ({ data }: HeroVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(data.muted !== false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [canPlay, setCanPlay] = useState(false);
  const [loadTimeout, setLoadTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadStart = () => {
      setIsLoading(true);
      setHasError(false);
      
      // Set a timeout for loading
      const timeout = setTimeout(() => {
        if (isLoading) {
          setHasError(true);
          setIsLoading(false);
          console.error('Video loading timeout');
        }
      }, 10000); // 10 second timeout
      
      setLoadTimeout(timeout);
    };

    const handleCanPlay = () => {
      setIsLoading(false);
      setCanPlay(true);
      setHasError(false);
      
      if (loadTimeout) {
        clearTimeout(loadTimeout);
        setLoadTimeout(null);
      }
      
      // Auto-play if enabled and muted (browser requirement)
      if (data.autoPlay && data.muted !== false) {
        video.play().catch((error) => {
          console.error('Autoplay failed:', error);
          setHasError(true);
        });
      }
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      setCanPlay(false);
      
      if (loadTimeout) {
        clearTimeout(loadTimeout);
        setLoadTimeout(null);
      }
      
      console.error('Video error occurred');
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    const handleLoadedData = () => {
      setIsLoading(false);
      setCanPlay(true);
      setHasError(false);
      
      if (loadTimeout) {
        clearTimeout(loadTimeout);
        setLoadTimeout(null);
      }
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Cleanup timeout on unmount
    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      
      if (loadTimeout) {
        clearTimeout(loadTimeout);
      }
    };
  }, [data.autoPlay, data.muted, data.videoUrl, isLoading, loadTimeout]);

  // Reset states when video URL changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    setCanPlay(false);
    setIsPlaying(false);
  }, [data.videoUrl]);

  const togglePlay = () => {
    if (videoRef.current && canPlay) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((error) => {
          console.error('Play failed:', error);
          setHasError(true);
        });
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const scrollToSection = (link: string) => {
    const element = document.querySelector(link);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  if (!data.enabled) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Video Background */}
      {data.videoUrl && !hasError ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay={data.autoPlay && data.muted !== false}
          muted={isMuted}
          loop={data.loop}
          poster={data.posterImage}
          playsInline
          preload="metadata"
        >
          <source src={data.videoUrl} type="video/mp4" />
          <source src={data.videoUrl.replace('.mp4', '.webm')} type="video/webm" />
          <source src={data.videoUrl.replace('.mp4', '.mov')} type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
      ) : (
        // Fallback background
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: data.posterImage 
              ? `url(${data.posterImage})` 
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
        />
      )}

      <div className="absolute inset-0 bg-black/60" />

      {/* Loading State */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="text-white text-center">
            <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-4"></div>
            <p>Loading video...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute top-4 right-4 z-20 bg-red-500/90 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-4 w-4" />
          <span className="text-sm">Video failed to load</span>
        </div>
      )}

      {/* Video Controls */}
      {canPlay && !hasError && data.videoUrl && (
        <div className="absolute bottom-4 right-4 z-20 flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
            onClick={togglePlay}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </Button>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
          {data.headline}
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-4xl mx-auto animate-fade-in">
          {data.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection(data.primaryCTA.link)}
          >
            {data.primaryCTA.text}
          </Button>
          <Button 
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection(data.secondaryCTA.link)}
          >
            {data.secondaryCTA.text}
          </Button>
        </div>
      </div>
    </section>
  );
};
