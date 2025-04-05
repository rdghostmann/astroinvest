import CallToAction from "@/components/CallToAction/CallToAction";
import FAQ from "@/components/FAQ/FAQ";
import Footer7 from "@/components/Footer/Footer";
import HowItWorks from "@/components/HowItWorks/HowItWorks";
import InvestorsActivity from "@/components/InvestorActivity/InvestorActivity";
import Hero1 from "@/components/Jumbotron/Jumbotron2";
import OurAmazingFeatures from "@/components/OurAmazingFeatures/OurAmazingFeatures";
import CoinPriceMarqueeWidget from "@/components/CoinPriceMarqueeWidget/CoinPriceMarqueeWidget";
import AboutAstroInvest from "@/components/AboutAstroInvest/AboutAstroInvest";
import Fiat from "@/components/Fiat/Fiat";
import Stats from "@/components/OurStats/Stats";
import AffiliateProgram from "@/components/AffliateProgram/improved-affiliate-program";
import AchieveMore from "@/components/AchieveMore/AchieveMore";
import TrustPilot from "@/components/TrustPilot/TrustPilot";
import Header from "@/components/Bootstrap/Header/Header";
import Navbar1 from "@/components/Bootstrap/Nav/Nav";
import FinancialService from "@/components/Bootstrap/Financial-Service/FinancialService";
import Banner from "@/components/Bootstrap/Banner/Banner";
import WhoWeAre from "@/components/Bootstrap/WhoWeAre/WhoWeAre";
import Testimonial from "@/components/Bootstrap/Testimonial/Testimonial";
import Partners from "@/components/Bootstrap/Partners/Partners";
import RequestCallbackForm from "@/components/Bootstrap/RequestCallbackForm/RequestCallbackForm";
import OurSolution from "@/components/Bootstrap/OurSolution/OurSolution";
import Services from "@/components/Bootstrap/Services/Services";
import WhyChooseUs from "@/components/Bootstrap/WhyChooseUs/WhyChooseUs";
import ROIPlan from "@/components/ROIPlan/ROIPlan";
import OurTeam from "@/components/Bootstrap/OurTeam/OurTeam";
import Stats8 from "@/components/OurStats/Stats8";
import Stats2 from "@/components/OurStats/Stats2";
import InvestmentPlans from "@/components/Investment-Plans/Investment-Plans";

export default async function Home() {


  const OPTIONS = { align: 'start' }
  const SLIDE_COUNT = 6
  const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      {/* <Header /> */}
      <CoinPriceMarqueeWidget />
      <Navbar1 />
      {/* <Hero1 /> */}
      {/* <Stats /> */}
      <Partners />
      <FinancialService slides={SLIDES} options={OPTIONS} />
      {/* Why CHoose Us */}
      {/* <WhyChooseUs /> */}
      <OurSolution />
      <WhoWeAre />
      <HowItWorks />
      <OurTeam />
      <CallToAction />
      <Testimonial />
      <RequestCallbackForm />
      <TrustPilot />
      <InvestmentPlans />
      {/* <ROIPlan /> */}
      <Fiat />
      <AboutAstroInvest />
      <OurAmazingFeatures />
      <AchieveMore />
      <InvestorsActivity />
      <FAQ />
      <Footer7 />
    </div>
  );
}
