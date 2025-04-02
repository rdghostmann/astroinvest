"use client"
import useEmblaCarousel from "embla-carousel-react"
import AutoScroll from "embla-carousel-auto-scroll"
import team01 from "@/public/images/team_01.jpg";
import team02 from "@/public/images/team_02.jpg";
import team03 from "@/public/images/team_03.jpg";
import Image from "next/image";

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    content:
      "Working with this team has transformed our business. The attention to detail and creative solutions have exceeded our expectations.",
    avatar: team01,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO, TechStart",
    content:
      "Incredible service and support. They've been instrumental in helping us achieve our goals and scale our operations.",
    avatar: team01,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Product Manager",
    content:
      "The team's expertise and dedication have made all the difference. They're not just vendors, they're partners in our success.",
    avatar: team01,
  },
  {
    id: 4,
    name: "David Kim",
    role: "CTO, InnovateCorp",
    content:
      "We've seen remarkable results since we started working together. Their strategic approach has helped us navigate complex challenges.",
    avatar: team01,
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "Operations Manager",
    content:
      "Responsive, reliable, and results-driven. I couldn't ask for a better team to work with on our critical projects.",
    avatar: team01,
  },
  {
    id: 6,
    name: "James Wilson",
    role: "Finance Director",
    content:
      "Their insights have been invaluable to our growth strategy. The ROI on our partnership has been exceptional.",
    avatar: team01,
  },
]

// More testimonials for the second row
const moreTestimonials = [
  {
    id: 7,
    name: "Olivia Martinez",
    role: "HR Director",
    content:
      "The level of professionalism and expertise is outstanding. They've helped us build a stronger, more cohesive team.",
    avatar: team01,
  },
  {
    id: 8,
    name: "Daniel Lee",
    role: "Creative Director",
    content:
      "Their creative approach and technical skills have elevated our brand presence significantly in the market.",
    avatar: team01,
  },
  {
    id: 9,
    name: "Sophia Garcia",
    role: "Sales Manager",
    content:
      "Since implementing their strategies, we've seen a 40% increase in conversion rates. The results speak for themselves.",
    avatar: team01,
  },
  {
    id: 10,
    name: "Robert Taylor",
    role: "IT Director",
    content: "Their technical knowledge and problem-solving abilities have saved us countless hours and resources.",
    avatar: team01,
  },
  {
    id: 11,
    name: "Jennifer Brown",
    role: "Customer Success",
    content:
      "Our customers have noticed the difference in quality and service since we started working with this amazing team.",
    avatar: team01,
  },
  {
    id: 12,
    name: "Thomas Wright",
    role: "Strategy Consultant",
    content:
      "Strategic, thoughtful, and effective. They've become an essential part of our long-term business planning.",
    avatar: team01,
  },
]

export default function TestimonialCarousel() {
  // First carousel (scrolling left)
  const [emblaRef1, emblaApi1] = useEmblaCarousel({ loop: true }, [AutoScroll({ direction: "backward", speed: 1 })])

  // Second carousel (scrolling right)
  const [emblaRef2, emblaApi2] = useEmblaCarousel({ loop: true }, [AutoScroll({ direction: "forward", speed: 1 })])

  return (
    <div className="w-full py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h6 className="text-sm text-blue-600 text-center">TESTIMONIAL</h6>
        <h2 className="text-3xl font-bold text-indigo-900 text-center mb-12">What Our Clients Say</h2>

        {/* First row - scrolling left */}
        <div className="overflow-hidden mb-8 max-w-6xl mx-auto" ref={emblaRef1}>
          <div className="flex">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="flex-none min-w-[250px] md:min-w-[350px] px-4">
                <div className="bg-white rounded-lg shadow-lg p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">&ldquo;{testimonial.content}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Second row - scrolling right */}
        <div className="overflow-hidden max-w-6xl mx-auto" ref={emblaRef2}>
          <div className="flex">
            {moreTestimonials.map((testimonial) => (
              <div key={testimonial.id} className="flex-none min-w-[250px] md:min-w-[350px] px-4">
                <div className="bg-white rounded-lg shadow-lg p-6 h-full">
                  <div className="flex items-center mb-4">
                    <div className="mr-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                      <p className="text-gray-600 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">&ldquo;{testimonial.content}&rdquo;</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

