import AnimationWrapper from "@/components/AnimationWrapper";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const title = resolvedParams.slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());
  return {
    title: `${title} | Adburd Case Studies`,
    description: `Read how Adburd achieved massive growth for our client in this detailed case study.`,
  };
}

export default async function DynamicCaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const title = resolvedParams.slug.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase());

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <AnimationWrapper direction="up">
          <Link href="/case-studies" className="text-primary font-medium hover:underline mb-8 inline-block">&larr; Back to Case Studies</Link>
          <div className="text-sm font-bold text-muted uppercase tracking-wider mb-4">Case Study</div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-dark mb-8 leading-tight">
            {title}
          </h1>
          
          <div className="flex flex-wrap gap-8 py-8 border-y border-border mb-12">
            <div>
               <div className="text-sm text-muted mb-1">Industry</div>
               <div className="font-bold text-dark">Healthcare / Real Estate</div>
            </div>
            <div>
               <div className="text-sm text-muted mb-1">Services Provided</div>
               <div className="font-bold text-dark">SEO, PPC, Web Dev</div>
            </div>
            <div>
               <div className="text-sm text-muted mb-1">Timeline</div>
               <div className="font-bold text-dark">6 Months</div>
            </div>
          </div>
        </AnimationWrapper>

        <AnimationWrapper direction="up" delay={0.1}>
          <div className="prose prose-lg prose-blue max-w-none text-muted">
            <h2 className="text-2xl font-bold text-dark mb-4 mt-8">The Challenge</h2>
            <p className="mb-6">
               Before working with Adburd, the client was heavily reliant on referrals and traditional marketing. Their digital presence was practically non-existent, and previous attempts at running Google Ads had resulted in high cost-per-acquisition (CPA) with very low lead quality.
            </p>

            <h2 className="text-2xl font-bold text-dark mb-4 mt-8">The Strategy</h2>
            <p className="mb-6">
               We implemented a full-funnel approach. First, we completely overhauled their website to be conversion-focused. Then, we launched highly targeted search campaigns focusing purely on bottom-of-funnel intent keywords. Simultaneously, we began a robust technical and local SEO campaign to build long-term organic authority.
            </p>

            <div className="bg-light p-8 rounded-2xl border border-border my-10 flex flex-col md:flex-row items-center justify-around gap-8 text-center">
               <div>
                  <div className="text-4xl font-bold text-primary mb-2">345%</div>
                  <div className="text-sm font-medium text-dark uppercase tracking-wider">Increase in Traffic</div>
               </div>
               <div className="hidden md:block w-px h-16 bg-border"></div>
               <div>
                  <div className="text-4xl font-bold text-primary mb-2">-42%</div>
                  <div className="text-sm font-medium text-dark uppercase tracking-wider">Decrease in CPA</div>
               </div>
            </div>

            <h2 className="text-2xl font-bold text-dark mb-4 mt-8">The Results</h2>
            <p className="mb-6">
               Within 6 months, the client saw a 345% increase in highly qualified organic traffic and a 42% decrease in their CPA from paid campaigns. The quality of leads improved drastically, allowing their sales team to close deals at a much higher rate.
            </p>
          </div>
        </AnimationWrapper>

        <AnimationWrapper direction="up" delay={0.2} className="mt-16 bg-dark rounded-3xl p-10 text-center">
           <h3 className="text-2xl font-bold text-white mb-4">Want results like this?</h3>
           <p className="text-gray-400 mb-8 max-w-lg mx-auto">Let us show you exactly how we can replicate this success for your business.</p>
           <Link href="/free-marketing-audit" className="inline-flex bg-primary hover:bg-primary-hover text-white font-bold py-4 px-8 rounded-xl transition-all">
              Get Your Free Audit
           </Link>
        </AnimationWrapper>
      </div>
    </div>
  );
}
