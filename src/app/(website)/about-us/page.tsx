import SectionHeading from "@/components/SectionHeading";
import AnimationWrapper from "@/components/AnimationWrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "About Us",
  description: "Learn more about Adburd, a premium digital marketing agency driving revenue for small and medium-sized businesses.",
};

export default function AboutUs() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading title="About Adburd" subtitle="We are not just another digital marketing agency. We are your growth partners." centered />
        
        <div className="max-w-4xl mx-auto mt-16 space-y-8 text-lg text-muted">
          <AnimationWrapper direction="up">
            <p>
              Adburd was founded on a simple premise: most digital marketing agencies fail to deliver measurable ROI for their clients. We saw an industry filled with empty promises, vanity metrics, and cookie-cutter strategies that did nothing to move the needle for businesses.
            </p>
          </AnimationWrapper>
          <AnimationWrapper direction="up" delay={0.1}>
            <p>
              We decided to build an agency that operates differently. An agency that treats your budget with the same respect as our own. An agency that focuses on the only metric that truly matters: revenue.
            </p>
          </AnimationWrapper>
          <AnimationWrapper direction="up" delay={0.2}>
            <p>
              Today, Adburd is a premium, full-service digital marketing partner for small and medium-sized businesses across India. Our team of specialists across SEO, PPC, Social Media, and Web Development work in synergy to build holistic marketing engines that consistently generate high-quality leads and sales.
            </p>
          </AnimationWrapper>
        </div>

        <AnimationWrapper direction="up" delay={0.3} className="text-center mt-16">
           <Link href="/free-marketing-audit" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold hover:bg-primary-hover transition-colors">
              Work With Us <ArrowRight className="w-5 h-5" />
           </Link>
        </AnimationWrapper>
      </div>
    </div>
  );
}
