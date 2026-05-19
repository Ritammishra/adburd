import SectionHeading from "@/components/SectionHeading";
import AnimationWrapper from "@/components/AnimationWrapper";
import ContactForm from "@/components/forms/ContactForm";

export const metadata = {
  title: "Contact Us",
  description: "Get in touch with Adburd, a premium digital marketing agency.",
};

export default function ContactUs() {
  return (
    <div className="pt-32 pb-24 bg-light min-h-screen">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <SectionHeading title="Contact Us" subtitle="Have a question or ready to scale? We'd love to hear from you." centered />
        
        <AnimationWrapper direction="up">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-border mt-10">
            <ContactForm />
          </div>
        </AnimationWrapper>
      </div>
    </div>
  );
}
