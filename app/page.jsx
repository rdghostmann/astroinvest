import CallToAction from "@/components/CallToAction/CallToAction";
import FAQ from "@/components/FAQ/FAQ";
import Footer7 from "@/components/Footer/Footer";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import InvestorsActivity from "@/components/InvestorActivity/InvestorActivity";
import Hero1 from "@/components/Jumbotron/Jumbotron2";
import OurAmazingFeatures from "@/components/OurAmazingFeatures/OurAmazingFeatures";
import CoinPriceMarqueeWidget from "@/components/CoinPriceMarqueeWidget/CoinPriceMarqueeWidget";
import OurAmazingFeatures2 from "@/components/OurAmazingFeatures/OurAmazingFeatures2";
import Asset from "@/models/Assets";
import { connectToDB } from "@/lib/connectDB";


export default async function Home() {

  await connectToDB();

  const assets = [
    { name: "Bitcoin", symbol: "BTC", network: "Bitcoin", depositAddress: "bc1qxyz..." },
    { name: "Ethereum", symbol: "ETH", network: "Ethereum", depositAddress: "0x123..." },
    { name: "Solana", symbol: "SOL", network: "Solana", depositAddress: "3abcxyz..." },
    { name: "Ripple", symbol: "XRP", network: "Ripple", depositAddress: "3abcxyz..." },
    { name: "Dogecoin", symbol: "DOGE", network: "Dogecoin", depositAddress: "3abcxyz..." },
    { name: "BNBChain", symbol: "BNB", network: "BEP20", depositAddress: "3abcxyz..." },
  ];
  try {

    await Asset.insertMany(assets);
    console.log("Assets Seeded!");
  } catch (error) {
    console.error("Seeding failed", error);
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      {/* <CoinPriceMarqueeWidget /> */}
      <Hero1 />
      {/* <OurAmazingFeatures2 /> */}
      <OurAmazingFeatures />
      <CallToAction />
      <InvestorsActivity />
      <HowItWorks />
      <FAQ />
      <Footer7 />
    </div>
  );
}
