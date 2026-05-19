import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import connectDB from "@/lib/db";
import Service from "@/models/Service";
import * as LucideIcons from "lucide-react";

export const metadata = {
  title: "Our Services | Digital Marketing Agency | Adburd",
  description: "Explore our comprehensive suite of dynamic digital marketing services designed to grow your business.",
};

async function getPublishedServices() {
  await connectDB();
  const services = await Service.find({ status: "published" }).sort({ createdAt: -1 }).lean();
  return services.map(service => ({
    _id: service._id.toString(),
    title: service.title,
    slug: service.slug,
    shortDescription: service.shortDescription,
    iconName: service.iconName || "Star",
  }));
}

export const revalidate = 60;

export default async function ServicesPage() {
  const services = await getPublishedServices();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <SectionHeading 
          title="Digital Marketing Services" 
          subtitle="Comprehensive solutions to attract, convert, and retain your ideal customers." 
          centered 
        />
        
        {services.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {services.map((service: any, index: number) => {
              // Dynamically resolve the Lucide Icon
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
        ) : (
          <div className="text-center py-24 text-muted">
             <p className="text-lg">No services currently published. Please check back soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
