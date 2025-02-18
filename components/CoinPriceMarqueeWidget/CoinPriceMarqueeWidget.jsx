"use client";
import React, { useEffect } from "react";

const CoinPriceMarqueeWidget = () => {
  useEffect(() => {
    // Dynamically create the script tag for proper hydration
    const script = document.createElement("script");
    script.src = "https://widgets.coingecko.com/gecko-coin-price-marquee-widget.js";
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="max-w-full overflow-x-hidden">
      <gecko-coin-price-marquee-widget 
        locale="en"
        outlined="true"
        coin-ids=""
        initial-currency="usd"
        vce-ready=""
      ></gecko-coin-price-marquee-widget>
    </div>
  );
};

export default CoinPriceMarqueeWidget;
