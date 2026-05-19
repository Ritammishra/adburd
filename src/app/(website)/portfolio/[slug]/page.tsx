import AnimationWrapper from "@/components/AnimationWrapper";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import Portfolio from "@/models/Portfolio";

async function getPortfolioItem(slug: string) {
  await connectDB();
  const portfolio = await Portfolio.findOne({ slug, status: "published" }).lean();
  if (!portfolio) return null;
  
  return {
    _id: portfolio._id.toString(),
    title: portfolio.title,
    content: portfolio.content,
    shortDescription: portfolio.shortDescription,
    featuredImage: portfolio.featuredImage,
    category: portfolio.category,
    industry: portfolio.industry,
    clientName: portfolio.clientName,
    projectUrl: portfolio.projectUrl,
    technologies: portfolio.technologies,
    results: portfolio.results,
    seo: {
      metaTitle: portfolio.seoTitle,
      metaDescription: portfolio.metaDescription,
    },
    createdAt: portfolio.createdAt,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const portfolio = await getPortfolioItem(resolvedParams.slug);
  
  if (!portfolio) {
    return {
      title: "Project Not Found | Adburd",
    };
  }

  return {
    title: portfolio.seo?.metaTitle || `${portfolio.title} | Adburd Portfolio`,
    description: portfolio.seo?.metaDescription || portfolio.shortDescription,
    openGraph: {
      images: [portfolio.featuredImage || ''],
    }
  };
}

export const revalidate = 60;

export default async function DynamicPortfolioPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const portfolio = await getPortfolioItem(resolvedParams.slug);

  if (!portfolio) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        <AnimationWrapper direction="up">
          <Link href="/portfolio" className="text-muted hover:text-primary font-medium flex items-center gap-2 mb-8 transition-colors inline-flex">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
          
          {portfolio.category && (
             <div className="text-primary font-bold tracking-wider uppercase text-sm mb-4">{portfolio.category}</div>
          )}
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-dark mb-6 leading-tight max-w-4xl">
            {portfolio.title}
          </h1>
          <p className="text-xl text-muted max-w-3xl mb-12 leading-relaxed">
             {portfolio.shortDescription}
          </p>
        </AnimationWrapper>

        {portfolio.featuredImage && (
          <AnimationWrapper direction="up" delay={0.1}>
            <div className="w-full rounded-3xl overflow-hidden mb-16 shadow-2xl border border-border/50">
              <img src={portfolio.featuredImage} alt={portfolio.title} className="w-full h-auto object-cover max-h-[70vh]" />
            </div>
          </AnimationWrapper>
        )}
      </div>

      {/* Main Content & Sidebar */}
      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            
            {/* Content Area */}
            <div className="lg:col-span-2">
               <AnimationWrapper direction="up" delay={0.2}>
                 <div 
                   className="prose prose-lg prose-blue max-w-none text-muted"
                   dangerouslySetInnerHTML={{ __html: portfolio.content || "<p>Detailed case study coming soon.</p>" }}
                 />
               </AnimationWrapper>
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-1">
               <div className="sticky top-32 space-y-8">
                  <AnimationWrapper direction="left" delay={0.3}>
                     <div className="bg-light p-8 rounded-2xl border border-border">
                        <h3 className="text-lg font-bold text-dark mb-6 border-b border-border pb-4">Project Details</h3>
                        
                        <dl className="space-y-4">
                           {portfolio.clientName && (
                              <div>
                                 <dt className="text-sm font-medium text-muted mb-1">Client</dt>
                                 <dd className="text-base font-bold text-dark">{portfolio.clientName}</dd>
                              </div>
                           )}
                           {portfolio.industry && (
                              <div>
                                 <dt className="text-sm font-medium text-muted mb-1">Industry</dt>
                                 <dd className="text-base font-bold text-dark">{portfolio.industry}</dd>
                              </div>
                           )}
                           {portfolio.projectUrl && (
                              <div>
                                 <dt className="text-sm font-medium text-muted mb-1">Website</dt>
                                 <dd>
                                    <a href={portfolio.projectUrl} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary-hover font-bold inline-flex items-center gap-1 transition-colors">
                                       Visit Live Site <ArrowUpRight className="w-4 h-4" />
                                    </a>
                                 </dd>
                              </div>
                           )}
                        </dl>
                     </div>
                  </AnimationWrapper>

                  {/* Results Box */}
                  {portfolio.results && portfolio.results.length > 0 && (
                     <AnimationWrapper direction="left" delay={0.4}>
                        <div className="bg-primary p-8 rounded-2xl text-white shadow-xl shadow-primary/20">
                           <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                              <CheckCircle2 className="w-5 h-5" /> Key Results
                           </h3>
                           <div className="space-y-6">
                              {portfolio.results.map((result: any, idx: number) => (
                                 <div key={idx}>
                                    <div className="text-3xl font-bold mb-1">{result.value}</div>
                                    <div className="text-sm font-medium text-white/80 uppercase tracking-wide">{result.label}</div>
                                 </div>
                              ))}
                           </div>
                        </div>
                     </AnimationWrapper>
                  )}

                  {/* Tech Stack */}
                  {portfolio.technologies && portfolio.technologies.length > 0 && (
                     <AnimationWrapper direction="left" delay={0.5}>
                        <div>
                           <h3 className="text-sm font-bold text-dark mb-4 uppercase tracking-wider">Technologies Used</h3>
                           <div className="flex flex-wrap gap-2">
                              {portfolio.technologies.map((tech: string, idx: number) => (
                                 <span key={idx} className="bg-light border border-border text-muted px-3 py-1.5 rounded-lg text-sm font-medium">
                                    {tech}
                                 </span>
                              ))}
                           </div>
                        </div>
                     </AnimationWrapper>
                  )}
               </div>
            </div>
         </div>
         
         {/* CTA Section */}
         <AnimationWrapper direction="up" delay={0.3}>
            <div className="mt-24 pt-16 border-t border-border">
               <div className="bg-dark p-12 rounded-[2rem] text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                  <div className="relative z-10">
                     <h3 className="text-3xl font-bold text-white mb-6">Ready to achieve similar results?</h3>
                     <p className="text-gray-400 mb-10 max-w-xl mx-auto text-lg">Partner with Adburd and let's build a data-driven strategy that scales your business to new heights.</p>
                     <Link href="/free-marketing-audit" className="inline-flex bg-primary hover:bg-primary-hover text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_4px_20px_rgba(37,99,235,0.4)] hover:shadow-[0_6px_25px_rgba(37,99,235,0.6)] hover:-translate-y-1">
                        Get Your Free Growth Audit
                     </Link>
                  </div>
               </div>
            </div>
         </AnimationWrapper>
      </div>
    </div>
  );
}
