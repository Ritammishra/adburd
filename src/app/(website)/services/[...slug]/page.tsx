import SectionHeading from "@/components/SectionHeading";
import AnimationWrapper from "@/components/AnimationWrapper";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import Service from "@/models/Service";

async function getService(slug: string) {
  await connectDB();
  const service = await Service.findOne({ slug, status: "published" }).lean();
  if (!service) return null;
  
  return {
    _id: service._id.toString(),
    title: service.title,
    slug: service.slug,
    shortDescription: service.shortDescription,
    content: service.content,
    featuredImage: service.featuredImage,
    features: service.features,
    seo: {
      metaTitle: service.seoTitle,
      metaDescription: service.metaDescription,
    }
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug.join("/") : resolvedParams.slug;
  const service = await getService(slug);
  
  if (!service) {
    return {
      title: "Service Not Found | Adburd",
    };
  }

  return {
    title: service.seo?.metaTitle || `${service.title} | Adburd Services`,
    description: service.seo?.metaDescription || service.shortDescription,
    openGraph: {
      images: [service.featuredImage || ''],
    }
  };
}

export const revalidate = 60;

export default async function DynamicServicePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const resolvedParams = await params;
  const slug = Array.isArray(resolvedParams.slug) ? resolvedParams.slug.join("/") : resolvedParams.slug;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      {/* Hero Section for Service */}
      <div className="bg-subtle-glow py-20 border-b border-border relative overflow-hidden">
        {service.featuredImage && (
           <div className="absolute inset-0 z-0 opacity-10">
              <img src={service.featuredImage} alt={service.title} className="w-full h-full object-cover" />
           </div>
        )}
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-3xl">
            <AnimationWrapper direction="up">
              <div className="text-primary font-bold tracking-wider uppercase text-sm mb-4">Adburd Services</div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-dark mb-6">
                {service.title}
              </h1>
              <p className="text-xl text-muted mb-8">
                {service.shortDescription}
              </p>
              <Link
                href="/free-marketing-audit"
                className="inline-flex bg-primary hover:bg-primary-hover text-white text-lg font-medium py-3.5 px-8 rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] transition-all"
              >
                Get a Free Audit
              </Link>
            </AnimationWrapper>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-6 md:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          <div className="lg:col-span-2 space-y-12 text-lg text-muted">
            <AnimationWrapper direction="up">
              <h2 className="text-3xl font-bold text-dark mb-6">Why invest in {service.title}?</h2>
              <div 
                className="prose prose-lg prose-blue max-w-none"
                dangerouslySetInnerHTML={{ __html: service.content || "<p>Detailed service information coming soon.</p>" }}
              />
            </AnimationWrapper>

            {service.features && service.features.length > 0 && (
              <AnimationWrapper direction="up" delay={0.1}>
                <div className="bg-light p-8 rounded-3xl border border-border mt-12">
                  <h3 className="text-2xl font-bold text-dark mb-6">Our Approach</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {service.features.map((item: string, i: number) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                        <span className="font-medium text-dark">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimationWrapper>
            )}
          </div>

          <div className="lg:col-span-1">
            <AnimationWrapper direction="left" delay={0.2}>
              <div className="bg-dark p-8 rounded-2xl border border-border sticky top-32 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[50px] rounded-full group-hover:bg-primary/30 transition-colors"></div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Ready to scale?</h3>
                <p className="text-gray-400 mb-8 text-base relative z-10 leading-relaxed">
                  Stop wasting budget on strategies that don't convert. Let us show you exactly how our {service.title} can grow your business.
                </p>
                <Link
                  href="/contact-us"
                  className="flex items-center justify-center w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-xl transition-colors font-bold text-lg relative z-10"
                >
                  Book a Consultation <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
