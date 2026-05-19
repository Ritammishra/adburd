import SectionHeading from "@/components/SectionHeading";
import AnimationWrapper from "@/components/AnimationWrapper";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: "Our Process | Adburd",
  description: "Discover our proven 4-step framework for predictable digital growth.",
};

export default function OurProcess() {
  return (
    <div className="pt-32 pb-24 bg-light min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <SectionHeading title="Our Process" subtitle="A predictable framework for scaling your revenue." centered />
        
        <div className="relative mt-20">
           {/* Vertical Line */}
           <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border hidden md:block"></div>
           
           <div className="space-y-16">
              <AnimationWrapper direction="up">
                 <div className="relative pl-0 md:pl-24">
                    <div className="absolute left-0 top-0 w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center text-2xl font-bold hidden md:flex z-10 shadow-lg">1</div>
                    <div className="bg-white p-8 rounded-2xl border border-border">
                       <h3 className="text-2xl font-bold text-dark mb-4">Discovery & Audit</h3>
                       <p className="text-muted text-lg">We begin by tearing down your current digital presence. We analyze your competitors, evaluate your technical foundations, and identify the low-hanging fruit where you're losing money. This forms the baseline for our custom strategy.</p>
                    </div>
                 </div>
              </AnimationWrapper>

              <AnimationWrapper direction="up" delay={0.1}>
                 <div className="relative pl-0 md:pl-24">
                    <div className="absolute left-0 top-0 w-16 h-16 bg-white border-2 border-primary text-primary rounded-2xl flex items-center justify-center text-2xl font-bold hidden md:flex z-10">2</div>
                    <div className="bg-white p-8 rounded-2xl border border-border">
                       <h3 className="text-2xl font-bold text-dark mb-4">Strategy Development</h3>
                       <p className="text-muted text-lg">Based on the audit, we craft a multi-channel roadmap tailored to your specific business goals. We set clear KPIs, outline the required budget, and project the expected return on investment. No guesswork, just data.</p>
                    </div>
                 </div>
              </AnimationWrapper>

              <AnimationWrapper direction="up" delay={0.2}>
                 <div className="relative pl-0 md:pl-24">
                    <div className="absolute left-0 top-0 w-16 h-16 bg-white border-2 border-primary text-primary rounded-2xl flex items-center justify-center text-2xl font-bold hidden md:flex z-10">3</div>
                    <div className="bg-white p-8 rounded-2xl border border-border">
                       <h3 className="text-2xl font-bold text-dark mb-4">Precision Execution</h3>
                       <p className="text-muted text-lg">Our specialists deploy the strategy. Whether it's restructuring your Google Ads account, publishing SEO-optimized content, or launching a new high-converting landing page, our team executes with extreme attention to detail.</p>
                    </div>
                 </div>
              </AnimationWrapper>

              <AnimationWrapper direction="up" delay={0.3}>
                 <div className="relative pl-0 md:pl-24">
                    <div className="absolute left-0 top-0 w-16 h-16 bg-white border-2 border-primary text-primary rounded-2xl flex items-center justify-center text-2xl font-bold hidden md:flex z-10">4</div>
                    <div className="bg-white p-8 rounded-2xl border border-border">
                       <h3 className="text-2xl font-bold text-dark mb-4">Scale & Optimize</h3>
                       <p className="text-muted text-lg">We don't "set it and forget it." We continuously monitor the data, conduct rigorous A/B testing, and optimize the campaigns to lower your acquisition costs and increase your overall volume month over month.</p>
                    </div>
                 </div>
              </AnimationWrapper>
           </div>
        </div>

        <AnimationWrapper direction="up" delay={0.4} className="mt-20 text-center">
           <Link href="/free-marketing-audit" className="inline-flex items-center justify-center bg-primary text-white text-lg font-bold py-4 px-10 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:bg-primary-hover hover:-translate-y-1">
              Start Step 1: Free Audit <ArrowRight className="w-5 h-5 ml-2" />
           </Link>
        </AnimationWrapper>
      </div>
    </div>
  );
}
