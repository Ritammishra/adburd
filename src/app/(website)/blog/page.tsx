import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimationWrapper from "@/components/AnimationWrapper";
import connectDB from "@/lib/db";
import Blog from "@/models/Blog";

export const metadata = {
  title: "Blog | Digital Marketing Insights | Adburd",
  description: "Read the latest insights, strategies, and trends in digital marketing from the experts at Adburd.",
};

async function getPublishedBlogs() {
  await connectDB();
  // Fetch only published blogs, sort by newest
  const blogs = await Blog.find({ status: "published" }).sort({ createdAt: -1 }).lean();
  return blogs.map(blog => ({
    _id: blog._id.toString(),
    title: blog.title,
    slug: blog.slug,
    category: "Article", // Placeholder for now until we fully integrate Category relationships
    excerpt: blog.excerpt,
    featuredImage: blog.featuredImage,
  }));
}

// Ensure the page is dynamically rendered or revalidated so new blogs appear
export const revalidate = 60; // Revalidate every 60 seconds

export default async function BlogPage() {
  const blogPosts = await getPublishedBlogs();

  return (
    <div className="pt-32 pb-24 bg-light min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          title="Digital Marketing Insights" 
          subtitle="Actionable strategies, expert opinions, and the latest trends to help you scale your business." 
          centered 
        />
        
        {blogPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {blogPosts.map((post: any, i: number) => (
              <AnimationWrapper key={post.slug} direction="up" delay={i * 0.1}>
                <Link href={`/blog/${post.slug}`} className="group block bg-white rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300">
                  <div className="aspect-[16/9] w-full bg-gradient-to-tr from-primary/10 to-primary/5 relative overflow-hidden">
                    {post.featuredImage ? (
                      <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300"></div>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="text-sm font-semibold text-primary mb-3">{post.category}</div>
                    <h3 className="text-xl font-bold text-dark mb-4 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                    {post.excerpt && (
                      <p className="text-muted text-sm mb-4 line-clamp-2">{post.excerpt}</p>
                    )}
                    <div className="text-primary text-sm flex items-center font-medium">
                      Read article <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </AnimationWrapper>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-muted">
            <p className="text-lg">No published articles yet. Check back soon!</p>
          </div>
        )}
      </div>
    </div>
  );
}
