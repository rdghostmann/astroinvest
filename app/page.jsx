import CallToAction from "@/components/CallToAction/CallToAction";
import FAQ from "@/components/FAQ/FAQ";
import Footer7 from "@/components/Footer/Footer";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import InvestorsActivity from "@/components/InvestorActivity/InvestorActivity";
import Hero1 from "@/components/Jumbotron/Jumbotron2";
import OurAmazingFeatures from "@/components/OurAmazingFeatures/OurAmazingFeatures";
import CoinPriceMarqueeWidget from "@/components/CoinPriceMarqueeWidget/CoinPriceMarqueeWidget";
import OurAmazingFeatures2 from "@/components/OurAmazingFeatures/OurAmazingFeatures2";
import AboutAstroInvest from "@/components/AboutAstroInvest/AboutAstroInvest";
import Fiat from "@/components/Fiat/Fiat";
import Stats from "@/components/OurStats/Stats";
import AffiliateProgram from "@/components/AffliateProgram/improved-affiliate-program";
import AchieveMore from "@/components/AchieveMore/AchieveMore";
import TrustPilot from "@/components/TrustPilot/TrustPilot";
import Header from "@/components/Bootstrap/Header/Header";
import { Navbar1 } from "@/components/Bootstrap/Nav/Nav";
import FinancialService from "@/components/Bootstrap/Financial-Service/FinancialService";
import Banner from "@/components/Bootstrap/Banner/Banner";
import WhoWeAre from "@/components/Bootstrap/WhoWeAre/WhoWeAre";

export default async function Home() {



  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <Header />
      <Navbar1 />
      <CoinPriceMarqueeWidget />
      <Banner />
      <CallToAction />
      <FinancialService />
      <WhoWeAre />
      {/* <Hero1 /> */}
      <TrustPilot />
      <Stats />
      <AboutAstroInvest />
      <OurAmazingFeatures />
      <Fiat />
      <AchieveMore />
      <InvestorsActivity />
      <AffiliateProgram />
      <HowItWorks />
      <FAQ />
      <Footer7 />
    </div>
  );
}
