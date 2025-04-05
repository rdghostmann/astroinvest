"use client";

import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { fetchMarketPrices } from "@/lib/actions";

const WalletPortfolio = ({ userWallets, initialMarketPrices }) => {
  const [marketPrices, setMarketPrices] = useState(initialMarketPrices);
  const [previousPrices, setPreviousPrices] = useState(initialMarketPrices);

  useEffect(() => {
    const interval = setInterval(async () => {
      const newPrices = await fetchMarketPrices();
      setPreviousPrices(marketPrices);
      setMarketPrices(newPrices);
    }, 5000); // Fetch new prices every 5 seconds

    return () => clearInterval(interval);
  }, [marketPrices]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {userWallets.length > 0 ? (
        userWallets.map((wallet) => {
          const coinName = wallet.name?.toUpperCase() || "UNKNOWN";
          const balance = wallet.balance || 0;
          const priceUSD = marketPrices?.[coinName.toLowerCase()]?.usd || 0;
          const previousPriceUSD = previousPrices?.[coinName.toLowerCase()]?.usd || priceUSD;
          const balanceUSD = (balance * priceUSD).toFixed(2);
          const priceChange = priceUSD - previousPriceUSD;
          const isRising = priceChange > 0;

          return (
            <Card key={wallet.id} className="bg-white shadow-md p-6 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-gray-900">{coinName}</h4>
                  <p className="text-gray-600 text-sm">{balance} {coinName}</p>
                </div>
                <div className="text-right">
                  <p className="text-blue-600 font-medium">${balanceUSD} USD</p>
                  <p className={`text-sm ${isRising ? "text-green-500" : "text-red-500"}`}>
                    {isRising ? "▲" : "▼"} {priceChange.toFixed(2)} USD
                  </p>
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
