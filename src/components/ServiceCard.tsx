import { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimationWrapper from "./AnimationWrapper";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  href: string;
  delay?: number;
}

export default function ServiceCard({
  title,
  description,
  icon,
  href,
  delay = 0,
}: ServiceCardProps) {
  return (
    <AnimationWrapper direction="up" delay={delay}>
      <Link
        href={href}
        className="group block bg-white p-8 rounded-2xl border border-border shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-300 h-full"
      >
        <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-dark mb-3">{title}</h3>
        <p className="text-muted mb-6 line-clamp-3">{description}</p>
        
        <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
          Learn more <ArrowRight className="w-4 h-4 ml-2" />
        </div>
      </Link>
    </AnimationWrapper>
  );
}
