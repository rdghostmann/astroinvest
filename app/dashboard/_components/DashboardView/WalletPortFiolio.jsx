"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { fetchMarketPrices } from "@/lib/actions"; // or /lib/cache

const WalletPortfolio = ({ userWallets, initialMarketPrices }) => {
  const [marketPrices, setMarketPrices] = useState(initialMarketPrices);
  const [previousPrices, setPreviousPrices] = useState(initialMarketPrices);

  useEffect(() => {
    const interval = setInterval(async () => {
      const newPrices = await fetchMarketPrices();
      setPreviousPrices(marketPrices);
      setMarketPrices(newPrices);
    }, 10000); // match cache duration

    return () => clearInterval(interval);
  }, [marketPrices]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {userWallets.length > 0 ? (
        userWallets.map((wallet) => {
          const coinKey = wallet.name?.toLowerCase() || "unknown";
          const coinName = coinKey.toUpperCase();
          const balance = wallet.balance || 0;
          
          console.log("Coin:", coinName);

          const currentPrice = marketPrices?.[coinKey]?.usd || 0;
          const previousPrice = previousPrices?.[coinKey]?.usd || currentPrice;
          const percentChange = marketPrices?.[coinKey]?.usd_24h_change || 0;

          const balanceUSD = (balance * currentPrice);
          const priceChange = currentPrice - previousPrice;
          const isRising = priceChange > 0;

          return (
            <Card
              key={wallet.id}
              className=" shadow-sm p-6 rounded-2xl border border-gray-100 shadow-black shadow-md text-white"
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center">
                  <img
                    src={`/crypto/${coinKey}.png`} // Adjust this path according to your public folder structure
                    alt={`${coinName} logo`}
                    className="w-6 h-6 mr-2"
                  />
                  <h4 className="font-semibold text-gray-800">{coinName}</h4>
                </div>
                <p className="text-gray-500 text-sm">
                  {balance} {coinName}
                </p>
              </div>

              <div className="text-gray-600 text-sm mb-2">
                1 {coinName} = ${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-lg font-medium text-blue-700">
                    ${balanceUSD.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className={`text-sm font-semibold ${percentChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {percentChange >= 0 ? "+" : ""}
                    {percentChange.toFixed(2)}% (24h)
                  </p>
                </div>

                <div className={`text-sm font-medium ${isRising ? "text-green-600" : "text-red-600"}`}>
                  {isRising ? "↑" : "↓"} ${priceChange.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </Card>
          );
        })
      ) : (
        <Card className="col-span-full bg-white shadow-md p-6 rounded-lg">
          <p className="text-gray-500">No assets found.</p>
        </Card>
      )}
    </div>
  );
};

export default WalletPortfolio;
