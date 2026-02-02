import { useEffect, useRef } from "react";

interface AdBannerProps {
  slot?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export const AdBanner = ({ 
  slot = "auto", 
  format = "auto",
  className = "" 
}: AdBannerProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    if (isAdLoaded.current) return;
    
    try {
      if (window.adsbygoogle && adRef.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        isAdLoaded.current = true;
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <div 
      ref={adRef}
      className={`ad-container my-4 flex justify-center items-center min-h-[100px] bg-secondary/30 rounded-lg overflow-hidden ${className}`}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block", width: "100%", height: "auto" }}
        data-ad-client="ca-pub-3974947521634605"
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
};
