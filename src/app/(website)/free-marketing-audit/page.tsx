import SectionHeading from "@/components/SectionHeading";
import AnimationWrapper from "@/components/AnimationWrapper";
import AuditForm from "@/components/forms/AuditForm";

export const metadata = {
  title: "Get a Free Marketing Audit",
  description: "Discover what's holding your business back online with a free, comprehensive digital marketing audit from Adburd.",
};

export default function FreeMarketingAudit() {
  return (
    <div className="pt-32 pb-24 bg-subtle-glow min-h-screen">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeading 
              title="Stop guessing. Start growing." 
              subtitle="Get a comprehensive, data-driven analysis of your current digital marketing efforts and a custom roadmap to scale your revenue."
              className="mb-8"
            />
            
            <AnimationWrapper direction="up" delay={0.1}>
              <div className="space-y-6 mt-10">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">1</div>
                  <div>
                    <h3 className="font-bold text-dark text-lg mb-1">SEO & Technical Analysis</h3>
                    <p className="text-muted text-sm">We'll uncover hidden technical issues and keyword opportunities your competitors are missing.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">2</div>
                  <div>
                    <h3 className="font-bold text-dark text-lg mb-1">Ad Account Audit</h3>
                    <p className="text-muted text-sm">We'll review your Google Ads and Meta Ads to identify wasted spend and optimization areas.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold shrink-0">3</div>
                  <div>
                    <h3 className="font-bold text-dark text-lg mb-1">Conversion Rate Review</h3>
                    <p className="text-muted text-sm">We'll analyze your website's UX to find exactly where visitors are dropping off.</p>
                  </div>
                </div>
              </div>
            </AnimationWrapper>
          </div>

          <AnimationWrapper direction="left" delay={0.2}>
            <AuditForm />
          </AnimationWrapper>
        </div>
      </div>
    </div>
  );
}
