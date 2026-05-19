import Link from "next/link";
import { ArrowRight, BarChart3, LineChart, Megaphone, MonitorSmartphone, Palette, CheckCircle2, XCircle } from "lucide-react";
import AnimationWrapper from "@/components/AnimationWrapper";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import MetricCard from "@/components/MetricCard";
import connectDB from "@/lib/db";
import Service from "@/models/Service";
import * as LucideIcons from "lucide-react";

export const revalidate = 60;

async function getPublishedServices() {
  await connectDB();
  const services = await Service.find({ status: "published" }).sort({ createdAt: -1 }).limit(6).lean();
  return services.map(service => ({
    _id: service._id.toString(),
    title: service.title,
    slug: service.slug,
    shortDescription: service.shortDescription,
    iconName: service.iconName || "Star",
  }));
}

export default async function Home() {
  const services = await getPublishedServices();
  return (
    <>
      {/* SECTION 2 - HERO */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-subtle-glow">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <AnimationWrapper direction="up">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-dark leading-tight mb-6">
                  Digital marketing that actually <span className="text-primary">drives revenue.</span>
                </h1>
              </AnimationWrapper>
              
              <AnimationWrapper direction="up" delay={0.1}>
                <p className="text-xl text-muted mb-8 max-w-lg">
                  We are a premium full-service digital marketing agency dedicated to scaling small and medium-sized businesses across India through data-driven strategies.
                </p>
              </AnimationWrapper>
              
              <AnimationWrapper direction="up" delay={0.2}>
                <div className="flex flex-col sm:flex-row gap-4 mb-10">
                  <Link
                    href="/free-marketing-audit"
                    className="bg-primary hover:bg-primary-hover text-white text-lg font-medium py-3.5 px-8 rounded-xl text-center shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Get Free Audit
                  </Link>
                  <Link
                    href="/case-studies"
                    className="bg-white hover:bg-light text-dark border border-border text-lg font-medium py-3.5 px-8 rounded-xl text-center shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    View Case Studies
                  </Link>
                </div>
              </AnimationWrapper>

              <AnimationWrapper direction="up" delay={0.3}>
                <div className="flex items-center gap-6 text-sm font-medium text-muted">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    No long contracts
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Transparent reporting
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    ROI-focused
                  </div>
                </div>
              </AnimationWrapper>
            </div>

            {/* Right Form Card */}
            <AnimationWrapper direction="left" delay={0.2} className="relative">
              {/* Decorative blobs behind the card */}
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
              
              <div className="bg-white border border-border rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)] relative z-10">
                <h3 className="text-2xl font-bold text-dark mb-2">Request Your Free Audit</h3>
                <p className="text-muted mb-6">Discover exactly what's holding your business back online.</p>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-dark">Name</label>
                      <input type="text" className="w-full bg-light border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="John Doe" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-dark">Phone</label>
                      <input type="tel" className="w-full bg-light border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="+91 98765 43210" />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-dark">Email Address</label>
                    <input type="email" className="w-full bg-light border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="john@company.com" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-dark">Website URL</label>
                    <input type="text" className="w-full bg-light border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all" placeholder="https://yourcompany.com" />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-dark">Primary Goal</label>
                    <select className="w-full bg-light border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none">
                      <option>More Qualified Leads</option>
                      <option>Increase eCommerce Sales</option>
                      <option>Better Local Visibility</option>
                      <option>Brand Awareness</option>
                    </select>
                  </div>

                  <button type="submit" className="w-full bg-dark hover:bg-black text-white font-medium py-3.5 rounded-xl transition-all mt-2">
                    Request My Audit
                  </button>
                </form>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* SECTION 3 - TRUST METRICS */}
      <section className="py-12 border-y border-border bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-border">
            <AnimationWrapper direction="up" delay={0.1} className="text-center px-4">
              <div className="text-4xl font-bold text-dark mb-1">150+</div>
              <div className="text-sm text-muted font-medium uppercase tracking-wider">Clients Served</div>
            </AnimationWrapper>
            <AnimationWrapper direction="up" delay={0.2} className="text-center px-4">
              <div className="text-4xl font-bold text-dark mb-1">3.5x</div>
              <div className="text-sm text-muted font-medium uppercase tracking-wider">Average ROI</div>
            </AnimationWrapper>
            <AnimationWrapper direction="up" delay={0.3} className="text-center px-4">
              <div className="text-4xl font-bold text-dark mb-1">200%</div>
              <div className="text-sm text-muted font-medium uppercase tracking-wider">Growth Rate</div>
            </AnimationWrapper>
            <AnimationWrapper direction="up" delay={0.4} className="text-center px-4">
              <div className="text-4xl font-bold text-dark mb-1">4.9/5</div>
              <div className="text-sm text-muted font-medium uppercase tracking-wider">Client Rating</div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* SECTION 4 - RESULTS SECTION */}
      <section className="py-24 bg-light">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeading 
            title="Numbers our clients actually celebrate." 
            subtitle="We don't just report on vanity metrics like impressions or clicks. We focus strictly on the metrics that directly impact your bottom line."
            centered
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <MetricCard value="245%" label="Increase in Qualified Leads" delay={0.1} />
            <MetricCard value="4.2x" label="Return on Ad Spend" delay={0.2} />
            <MetricCard value="180%" label="Consultation Booking Growth" delay={0.3} />
          </div>
        </div>
      </section>

      {/* SECTION 5 - PROBLEM/SOLUTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <AnimationWrapper direction="up">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-dark mb-6">
                  Stop wasting budget on agencies that don't care.
                </h2>
                <p className="text-lg text-muted mb-8">
                  Most businesses have been burned by digital marketing agencies before. You're promised the world during the sales pitch, but once you sign, you're handed over to a junior account manager and see little to no results.
                </p>
                <p className="text-lg text-muted mb-8">
                  At Adburd, we treat your budget like our own. We partner with serious businesses that are ready to scale, and we deliver transparent, measurable growth.
                </p>
                <Link
                  href="/why-adburd"
                  className="inline-flex items-center font-semibold text-primary hover:text-primary-hover transition-colors"
                >
                  Learn why we are different <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </AnimationWrapper>
            </div>
            
            <AnimationWrapper direction="left" delay={0.2}>
              <div className="bg-light p-8 md:p-10 rounded-2xl border border-border">
                <h3 className="text-xl font-bold text-dark mb-6">The Typical Agency Experience</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-muted">Long-term contracts that lock you in regardless of performance.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-muted">Confusing reports filled with vanity metrics that don't mean revenue.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-muted">Poor communication and days waiting for simple replies.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <XCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                    <span className="text-muted">Cookie-cutter strategies applied to every single client.</span>
                  </li>
                </ul>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* SECTION 6 - SERVICES GRID */}
      <section className="py-24 bg-light">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeading 
            title="Full-funnel digital marketing services." 
            subtitle="We provide comprehensive solutions designed to attract, convert, and retain your ideal customers."
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: any, index: number) => {
              const IconComponent = (LucideIcons as any)[service.iconName] || LucideIcons.Star;
              return (
                <ServiceCard 
                  key={service._id}
                  title={service.title}
                  description={service.shortDescription}
                  icon={<IconComponent className="w-7 h-7" />}
                  href={`/services/${service.slug}`}
                  delay={index * 0.1}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7 - PROCESS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeading 
            title="A proven process for predictable growth." 
            centered
          />
          
          <div className="mt-16 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 relative">
              <div className="hidden md:block absolute top-6 left-[12.5%] right-[12.5%] h-0.5 bg-border z-0" />
              
              <AnimationWrapper direction="up" delay={0.1} className="relative z-10 text-center">
                <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-sm">1</div>
                <h3 className="text-xl font-bold text-dark mb-3">Audit</h3>
                <p className="text-muted text-sm">We analyze your current digital presence, identify bottlenecks, and uncover hidden opportunities.</p>
              </AnimationWrapper>
              
              <AnimationWrapper direction="up" delay={0.2} className="relative z-10 text-center">
                <div className="w-12 h-12 bg-white border-2 border-primary text-primary rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">2</div>
                <h3 className="text-xl font-bold text-dark mb-3">Strategy</h3>
                <p className="text-muted text-sm">We develop a custom, multi-channel marketing roadmap tailored specifically to your business goals.</p>
              </AnimationWrapper>
              
              <AnimationWrapper direction="up" delay={0.3} className="relative z-10 text-center">
                <div className="w-12 h-12 bg-white border-2 border-primary text-primary rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">3</div>
                <h3 className="text-xl font-bold text-dark mb-3">Execution</h3>
                <p className="text-muted text-sm">Our team of specialists implement the strategy with precision, launching campaigns and optimizations.</p>
              </AnimationWrapper>
              
              <AnimationWrapper direction="up" delay={0.4} className="relative z-10 text-center">
                <div className="w-12 h-12 bg-white border-2 border-primary text-primary rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6">4</div>
                <h3 className="text-xl font-bold text-dark mb-3">Optimize</h3>
                <p className="text-muted text-sm">We continuously monitor data, A/B test, and refine our approach to scale your results week over week.</p>
              </AnimationWrapper>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 - TESTIMONIALS */}
      <section className="py-24 bg-light">
        <div className="container mx-auto px-6 md:px-12">
          <SectionHeading 
            title="What our clients say." 
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimationWrapper direction="up" delay={0.1}>
              <div className="bg-white p-8 rounded-2xl border border-border h-full flex flex-col">
                <div className="flex items-center gap-1 text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-dark mb-8 flex-grow">"Adburd completely transformed our lead generation. Within 3 months of taking over our SEO and PPC, our booking rate doubled. They are truly partners, not just vendors."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-primary flex items-center justify-center font-bold text-lg">
                    RJ
                  </div>
                  <div>
                    <h4 className="font-bold text-dark">Rahul Joshi</h4>
                    <p className="text-sm text-muted">CEO, Elite Healthcare</p>
                  </div>
                </div>
              </div>
            </AnimationWrapper>

            <AnimationWrapper direction="up" delay={0.2}>
              <div className="bg-white p-8 rounded-2xl border border-border h-full flex flex-col">
                <div className="flex items-center gap-1 text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-dark mb-8 flex-grow">"The new website design is stunning and converts at a much higher rate. The team at Adburd was incredibly professional and delivered exactly what we needed."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold text-lg">
                    AK
                  </div>
                  <div>
                    <h4 className="font-bold text-dark">Amit Kumar</h4>
                    <p className="text-sm text-muted">Founder, TechSpace</p>
                  </div>
                </div>
              </div>
            </AnimationWrapper>

            <AnimationWrapper direction="up" delay={0.3}>
              <div className="bg-white p-8 rounded-2xl border border-border h-full flex flex-col">
                <div className="flex items-center gap-1 text-yellow-400 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-dark mb-8 flex-grow">"We were wasting a lot of money on Google Ads before hiring Adburd. They restructured our account and brought our CPA down by 45% while increasing overall volume."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
                    SM
                  </div>
                  <div>
                    <h4 className="font-bold text-dark">Sneha Menon</h4>
                    <p className="text-sm text-muted">Director, Horizon Real Estate</p>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          </div>
        </div>
      </section>

      {/* SECTION 10 - BLOG PREVIEW */}
      <section className="py-24 bg-white border-b border-border">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <SectionHeading 
              title="Latest from our blog" 
              className="mb-0"
            />
            <Link href="/blog" className="text-primary font-semibold hover:text-primary-hover flex items-center gap-2">
              View All Posts <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "The Ultimate Guide to Local SEO for Clinics in 2024", category: "SEO", delay: 0.1 },
              { title: "How to Decrease Your Google Ads CPA by 30%", category: "PPC", delay: 0.2 },
              { title: "Why Website Speed is Critical for Conversion Rates", category: "Development", delay: 0.3 }
            ].map((post, i) => (
              <AnimationWrapper key={i} direction="up" delay={post.delay}>
                <Link href="/blog" className="group block">
                  <div className="aspect-[16/9] w-full rounded-2xl bg-gradient-to-tr from-primary/10 to-primary/5 mb-6 overflow-hidden relative border border-border">
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300"></div>
                  </div>
                  <div className="text-sm font-semibold text-primary mb-3">{post.category}</div>
                  <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
                  <div className="text-muted text-sm flex items-center gap-2">
                    Read article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </AnimationWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 11 - FINAL CTA */}
      <section className="py-24 bg-light">
        <div className="container mx-auto px-6 md:px-12">
          <AnimationWrapper direction="up">
            <div className="bg-primary rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
              
              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                  Ready to grow your business?
                </h2>
                <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                  Stop leaving money on the table. Let our team of experts build a digital marketing strategy that actually works for you.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/free-marketing-audit"
                    className="w-full sm:w-auto bg-white text-primary hover:bg-light text-lg font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                  >
                    Get Free Audit
                  </Link>
                  <Link
                    href="/contact-us"
                    className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white/10 text-lg font-bold py-4 px-10 rounded-xl transition-all"
                  >
                    Book a Call
                  </Link>
                </div>
              </div>
            </div>
          </AnimationWrapper>
        </div>
      </section>
    </>
  );
}
