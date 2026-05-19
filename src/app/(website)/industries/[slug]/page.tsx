import SectionHeading from "@/components/SectionHeading";
import AnimationWrapper from "@/components/AnimationWrapper";
import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const title = resolvedParams.slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `${title} | Adburd Industries`,
    description: `Expert digital marketing services for ${title}. Scale your business with Adburd.`,
  };
}

export default async function DynamicIndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const title = resolvedParams.slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="pt-32 pb-24">
      <div className="bg-dark py-24 text-white">
        <div className="container mx-auto px-6 md:px-12">
          <AnimationWrapper direction="up">
            <div className="flex items-center gap-3 text-primary mb-6">
              <Building2 className="w-6 h-6" />
              <span className="font-bold tracking-wider uppercase text-sm">Industry Expertise</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Digital Marketing for <br className="hidden md:block"/> {title}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mb-10">
              We understand the unique challenges of your industry. Our proven frameworks help you acquire more customers at a lower acquisition cost.
            </p>
            <Link
              href="/free-marketing-audit"
              className="inline-flex bg-primary hover:bg-primary-hover text-white text-lg font-medium py-3.5 px-8 rounded-xl transition-colors"
            >
              Get Your Industry Audit
            </Link>
          </AnimationWrapper>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 py-24">
        <SectionHeading title={`How we help ${title} grow`} centered />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 max-w-4xl mx-auto">
           <div className="bg-light p-8 rounded-2xl border border-border">
              <h3 className="text-xl font-bold text-dark mb-3">Targeted Lead Generation</h3>
              <p className="text-muted">We implement highly specific local and broad campaigns tailored to the exact search intent of your prospective customers.</p>
           </div>
           <div className="bg-light p-8 rounded-2xl border border-border">
              <h3 className="text-xl font-bold text-dark mb-3">Authority Building</h3>
              <p className="text-muted">Through content marketing and strategic PR, we position your brand as the definitive leader in your specific sector.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
