
import { useState, useEffect } from 'react';

export const useSiteConfig = () => {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const response = await fetch('/config.json');
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error('Failed to load site configuration:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  return { config, loading };
};
