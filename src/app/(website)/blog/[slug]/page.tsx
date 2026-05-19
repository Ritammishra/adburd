import AnimationWrapper from "@/components/AnimationWrapper";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";

async function getBlogPost(slug: string) {
  await connectDB();
  const blog = await Blog.findOne({ slug, status: "published" }).lean();
  if (!blog) return null;
  
  return {
    _id: blog._id.toString(),
    title: blog.title,
    content: blog.content,
    excerpt: blog.excerpt,
    featuredImage: blog.featuredImage,
    seo: blog.seo,
    createdAt: blog.createdAt,
  };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = await getBlogPost(resolvedParams.slug);
  
  if (!blog) {
    return {
      title: "Blog Not Found | Adburd",
    };
  }

  return {
    title: blog.seo?.metaTitle || `${blog.title} | Adburd Blog`,
    description: blog.seo?.metaDescription || blog.excerpt || `Read our latest insights on ${blog.title}.`,
    openGraph: {
      images: [blog.seo?.ogImage || blog.featuredImage || ''],
    }
  };
}

export const revalidate = 60;

export default async function DynamicBlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = await getBlogPost(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  const dateStr = new Date(blog.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl">
        <AnimationWrapper direction="up">
          <Link href="/blog" className="text-muted hover:text-primary font-medium flex items-center gap-2 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          
          <div className="text-primary font-bold tracking-wider uppercase text-sm mb-4">Digital Marketing Insight</div>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-dark mb-6 leading-tight">
            {blog.title}
          </h1>
          
          <div className="flex items-center gap-4 text-sm text-muted mb-10 pb-10 border-b border-border">
            <div className="font-medium text-dark">By Adburd Editorial Team</div>
            <div>•</div>
            <div>{dateStr}</div>
            {/* Estimate read time later */}
          </div>
          
          {blog.featuredImage && (
            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10">
              <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover" />
            </div>
          )}
        </AnimationWrapper>

        <AnimationWrapper direction="up" delay={0.1}>
          <div 
            className="prose prose-lg prose-blue max-w-none text-muted"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </AnimationWrapper>
        
        <AnimationWrapper direction="up" delay={0.2}>
           <div className="mt-16 pt-10 border-t border-border">
              <div className="bg-light p-10 rounded-3xl border border-border text-center">
                 <h3 className="text-2xl font-bold text-dark mb-4">Tired of reading? Let's talk results.</h3>
                 <p className="text-muted mb-8 max-w-md mx-auto">Get a free, custom-tailored marketing audit and discover exactly how we can scale your business.</p>
                 <Link href="/free-marketing-audit" className="inline-flex bg-primary hover:bg-primary-hover text-white font-bold py-4 px-8 rounded-xl transition-all shadow-[0_4px_14px_0_rgba(37,99,235,0.39)]">
                    Get My Free Audit
                 </Link>
              </div>
           </div>
        </AnimationWrapper>
      </div>
    </div>
  );
}
