import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimationWrapper from "@/components/AnimationWrapper";
import connectDB from "@/lib/db";
import Portfolio from "@/models/Portfolio";

export const metadata = {
  title: "Portfolio & Case Studies | Adburd",
  description: "Explore our premium digital marketing and development portfolio. See the real revenue-driving results we deliver.",
};

async function getPublishedPortfolios() {
  await connectDB();
  // Fetch only published portfolio items, sort by newest
  const portfolios = await Portfolio.find({ status: "published" }).sort({ createdAt: -1 }).lean();
  return portfolios.map(portfolio => ({
    _id: portfolio._id.toString(),
    title: portfolio.title,
    slug: portfolio.slug,
    category: portfolio.category,
    shortDescription: portfolio.shortDescription,
    featuredImage: portfolio.featuredImage,
  }));
}

export const revalidate = 60; // Revalidate every 60 seconds

export default async function PortfolioPage() {
  const portfolios = await getPublishedPortfolios();

  return (
    <div className="pt-32 pb-24 bg-light min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          title="Our Portfolio" 
          subtitle="Discover how we've transformed businesses with high-converting websites and data-driven marketing campaigns." 
          centered 
        />
        
        {portfolios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {portfolios.map((item: any, i: number) => (
              <AnimationWrapper key={item.slug} direction="up" delay={i * 0.1}>
                <Link href={`/portfolio/${item.slug}`} className="group block bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[4/3] w-full bg-gradient-to-tr from-primary/10 to-primary/5 relative overflow-hidden">
                    {item.featuredImage ? (
                      <img src={item.featuredImage} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300 flex items-center justify-center">
                         <span className="text-primary font-bold text-xl opacity-20">{item.category || "Project"}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    {item.category && (
                      <div className="text-xs font-bold text-primary mb-3 uppercase tracking-wider">{item.category}</div>
                    )}
                    <h3 className="text-xl font-bold text-dark mb-4 group-hover:text-primary transition-colors line-clamp-2">{item.title}</h3>
                    {item.shortDescription && (
                      <p className="text-muted text-sm mb-6 line-clamp-2">{item.shortDescription}</p>
                    )}
                    <div className="text-primary text-sm flex items-center font-bold">
                      View Case Study <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </AnimationWrapper>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-muted">
            <p className="text-lg">No published projects yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
