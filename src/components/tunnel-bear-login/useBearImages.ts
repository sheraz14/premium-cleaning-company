import { useState, useEffect } from 'react';

interface BearImages {
  watchBearImages: string[];
  hideBearImages: string[];
  peakBearImages: string[];
}

// Helper to generate image URLs from public folder
function getBearImageUrls(type: 'watch' | 'hide' | 'peak', count: number) {
  return Array.from({ length: count }, (_, i) => {
    return `/images/tunnel-bear/${type}_bear_${i}.png`;
  });
}

export function useBearImages(): BearImages {
  const [watchBearImages, setWatchBearImages] = useState<string[]>([]);
  const [hideBearImages, setHideBearImages] = useState<string[]>([]);
  const [peakBearImages, setPeakBearImages] = useState<string[]>([]);

  useEffect(() => {
    // You may need to adjust the counts if you add/remove images
    setWatchBearImages(getBearImageUrls('watch', 21));
    setHideBearImages(getBearImageUrls('hide', 6));
    setPeakBearImages(getBearImageUrls('peak', 4));
  }, []);

  return {
    watchBearImages,
    hideBearImages,
    peakBearImages  
  };
} 