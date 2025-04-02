import AboutAstroInvest from "@/components/AboutAstroInvest/AboutAstroInvest";
import OurSolution from "@/components/Bootstrap/OurSolution/OurSolution";
import Footer7 from "@/components/Footer/Footer";
import OurAmazingFeatures from "@/components/OurAmazingFeatures/OurAmazingFeatures";
import { CircleArrowRight, Files, Settings } from "lucide-react";

import PageHeadingImg from "@/public/images/page-heading-bg.jpg";

export default function Page() {
  return (
    <>
      <div
        className="page-heading header-text relative mx-auto h-fit py-24 w-full bg-fixed bg-cover bg-center bg-no-repeat shadow-lg"
        style={{
          backgroundImage: `url(${PageHeadingImg.src})`,
        }}
      >
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center text-center text-white">
            <h1 className="text-4xl font-bold text-pool">About Us</h1>
            <span className="mt-2 text-lg">We have over 20 years of experience</span>
          </div>
        </div>
      </div>
      <AboutAstroInvest />
      <OurAmazingFeatures />
      <OurSolution />
      <Footer7 />
    </>
  );
}


{/* <AboutAstroInvest />
<section className="py-10 px-5">
  <div className="container flex flex-col gap-28">
    <div className="flex flex-col gap-6 md:gap-20">
      <div className="max-w-xl">
        <h2 className="mb-2.5 text-3xl font-semibold md:text-5xl">
          We make creating software ridiculously easy
        </h2>
        <p className="text-muted-foreground">
          We aim to help empower 1,000,000 teams to create their own
          software. Here is how we plan on doing it.
        </p>
      </div>
      <div className="grid gap-10 md:grid-cols-3">
        <div className="flex flex-col">
          <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
            <Files className="size-5" />
          </div>
          <h3 className="mb-3 mt-2 text-lg font-semibold">
            Being radically open
          </h3>
          <p className="text-muted-foreground">
            We believe there’s no room for big egos and there’s always time
            to help each other. We strive to give and receive feedback,
            ideas, perspectives
          </p>
        </div>
        <div className="flex flex-col">
          <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
            <CircleArrowRight className="size-5" />
          </div>
          <h3 className="mb-3 mt-2 text-lg font-semibold">
            Moving the needle
          </h3>
          <p className="text-muted-foreground">
            Boldly, bravely and with clear aims. We seek out the big
            opportunities and double down on the most important things to
            work on.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="mb-5 flex size-12 items-center justify-center rounded-2xl bg-accent">
            <Settings className="size-5" />
          </div>
          <h3 className="mb-3 mt-2 text-lg font-semibold">
            Optimizing for empowerment
          </h3>
          <p className="text-muted-foreground">
            We believe that everyone should be empowered to do whatever they
            think is in the company&apos;s best interests.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>

<OurAmazingFeatures />
<OurSolution />
<Footer7 /> */}