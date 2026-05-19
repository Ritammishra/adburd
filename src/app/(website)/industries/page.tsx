import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { ArrowRight, Building2, Stethoscope, Store } from "lucide-react";
import AnimationWrapper from "@/components/AnimationWrapper";

export const metadata = {
  title: "Industries We Serve | Adburd",
  description: "Specialized digital marketing solutions for Healthcare, Real Estate, Local Businesses, and more.",
};

const industries = [
  {
    name: "Healthcare",
    slug: "healthcare-digital-marketing",
    description: "Patient acquisition strategies for clinics, hospitals, and specialized practices.",
    icon: <Stethoscope className="w-8 h-8" />
  },
  {
    name: "Real Estate",
    slug: "real-estate-marketing",
    description: "Lead generation for developers, agencies, and independent realtors.",
    icon: <Building2 className="w-8 h-8" />
  },
  {
    name: "Local Businesses",
    slug: "local-business-marketing",
    description: "Hyper-local SEO and advertising to dominate your immediate geographical market.",
    icon: <Store className="w-8 h-8" />
  }
];

export default function IndustriesPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          title="Industries We Serve" 
          subtitle="We bring specialized knowledge and proven frameworks to your specific vertical." 
          centered 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {industries.map((ind, i) => (
             <AnimationWrapper key={ind.slug} direction="up" delay={i * 0.1}>
               <Link href={`/industries/${ind.slug}`} className="block bg-white border border-border rounded-2xl p-8 hover:-translate-y-2 hover:shadow-xl transition-all duration-300">
                  <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                    {ind.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-dark mb-3">{ind.name}</h3>
                  <p className="text-muted mb-6">{ind.description}</p>
                  <div className="flex items-center text-primary font-medium">
                    Learn more <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
               </Link>
             </AnimationWrapper>
          ))}
        </div>
      </div>
    </div>
  );
}
