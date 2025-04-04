import Image from "next/image"
import Link from "next/link"
import About1 from "@/public/aboutX.png";
import AboutImg from "@/public/images/about-image.jpg";

export default function AboutSection() {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      {/* <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800">About Us</h2>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          As a Web Development Services We are Committed to Building Custom Web Solutions that Drive Business Success.
        </p>
      </div> */}

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
        <div className="w-full lg:w-1/2">
          <div className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src={About1}
              alt="Team collaborating on web development project"
              width={700}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-6">
          <p className="text-slate-700 text-lg">
            At <b>InvestFolio</b>, we specialize in delivering customized investment solutions designed to empower individuals and businesses on their journey to financial growth. With a strong focus on innovation and strategic foresight,
            we stay ahead of market trends and evolving opportunities to ensure our clients receive consistent, high-value results.
          </p>

          <p className="text-slate-700 text-lg">
            Our mission is centered on providing the tools and insights necessary for success in today’s dynamic financial landscape.
            We are committed to building portfolios that not only reflect each client's unique goals and risk appetite but also capture the
            true essence of smart, forward-thinking investment strategies. At InvestFolio, your financial future is our top priority.

          </p>

          <div className="pt-4">
            <Link
              href="/register"
              className="inline-block px-8 py-3 border-2 border-slate-800 rounded-md text-slate-800 font-medium hover:bg-slate-800 hover:text-white transition-colors"
            >
              Start Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

