import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import AnimationWrapper from "@/components/AnimationWrapper";

export const metadata = {
  title: "Case Studies | Adburd",
  description: "Real results from real clients. See how Adburd drives revenue and growth.",
};

const caseStudies = [
  {
    title: "SEO Traffic Growth Case Study",
    slug: "seo-traffic-growth-case-study",
    metric: "345%",
    metricLabel: "Organic Traffic Increase",
    category: "SEO"
  },
  {
    title: "Google Ads Lead Generation",
    slug: "google-ads-lead-generation-case-study",
    metric: "-42%",
    metricLabel: "Cost Per Acquisition",
    category: "PPC"
  },
  {
    title: "Website Redesign Conversion",
    slug: "website-redesign-conversion-case-study",
    metric: "2.5x",
    metricLabel: "Conversion Rate",
    category: "Web Dev"
  }
];

export default function CaseStudiesPage() {
  return (
    <div className="pt-32 pb-24 bg-light min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          title="Our Results" 
          subtitle="Don't just take our word for it. Explore how we've helped businesses just like yours achieve predictable growth." 
          centered 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {caseStudies.map((study, i) => (
             <AnimationWrapper key={study.slug} direction="up" delay={i * 0.1}>
               <Link href={`/case-studies/${study.slug}`} className="block bg-white rounded-2xl overflow-hidden border border-border hover:shadow-xl transition-all duration-300 group">
                  <div className="h-48 bg-primary/5 flex items-center justify-center p-8 relative overflow-hidden">
                     <div className="absolute inset-0 bg-subtle-glow opacity-50"></div>
                     <div className="relative z-10 text-center">
                        <div className="text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">{study.metric}</div>
                        <div className="text-sm font-medium uppercase tracking-wider text-muted">{study.metricLabel}</div>
                     </div>
                  </div>
                  <div className="p-8">
                     <div className="text-xs font-bold text-primary mb-3 uppercase tracking-wider">{study.category}</div>
                     <h3 className="text-xl font-bold text-dark mb-4">{study.title}</h3>
                     <div className="flex items-center text-dark font-medium group-hover:text-primary transition-colors">
                        Read Case Study <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
                     </div>
                  </div>
               </Link>
             </AnimationWrapper>
          ))}
        </div>
      </div>
    </div>
  );
}
