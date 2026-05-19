import SectionHeading from "@/components/SectionHeading";
import AnimationWrapper from "@/components/AnimationWrapper";

export const metadata = {
  title: "Why Adburd",
  description: "Learn why Adburd is the premium choice for businesses looking to scale their revenue through digital marketing.",
};

export default function WhyAdburd() {
  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <SectionHeading title="Why Adburd?" subtitle="We prioritize revenue over vanity metrics." centered />
        
        <div className="space-y-12 mt-16">
           <AnimationWrapper direction="up">
              <div className="bg-light p-8 rounded-2xl border border-border">
                 <h3 className="text-2xl font-bold text-dark mb-4">1. We don't do long-term contracts.</h3>
                 <p className="text-muted text-lg">We believe that an agency should earn your business every single month. If we aren't performing, you shouldn't be locked into a 12-month agreement. Our month-to-month model keeps us accountable and focused on delivering continuous ROI.</p>
              </div>
           </AnimationWrapper>
           
           <AnimationWrapper direction="up" delay={0.1}>
              <div className="bg-light p-8 rounded-2xl border border-border">
                 <h3 className="text-2xl font-bold text-dark mb-4">2. We focus strictly on revenue.</h3>
                 <p className="text-muted text-lg">Impressions, clicks, and likes are great, but they don't pay the bills. Our entire strategy is built around your Customer Acquisition Cost (CAC) and Customer Lifetime Value (LTV). We optimize campaigns to bring you qualified leads that actually close.</p>
              </div>
           </AnimationWrapper>
           
           <AnimationWrapper direction="up" delay={0.2}>
              <div className="bg-light p-8 rounded-2xl border border-border">
                 <h3 className="text-2xl font-bold text-dark mb-4">3. We act as an extension of your team.</h3>
                 <p className="text-muted text-lg">When you hire Adburd, you aren't just a number on a spreadsheet. We take the time to deeply understand your product, your market, and your sales process. We communicate transparently, clearly, and frequently.</p>
              </div>
           </AnimationWrapper>
        </div>
      </div>
    </div>
  );
}
