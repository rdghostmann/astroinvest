import CallToAction from "@/components/CallToAction/CallToAction";
import FAQ from "@/components/FAQ/FAQ";
import Footer7 from "@/components/Footer/Footer";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import InvestorsActivity from "@/components/InvestorActivity/InvestorActivity";
import Hero1 from "@/components/Jumbotron/Jumbotron2";
import OurAmazingFeatures from "@/components/OurAmazingFeatures/OurAmazingFeatures";
import CoinPriceMarqueeWidget from "@/components/CoinPriceMarqueeWidget/CoinPriceMarqueeWidget";
import OurAmazingFeatures2 from "@/components/OurAmazingFeatures/OurAmazingFeatures2";


export default function Home() {


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
