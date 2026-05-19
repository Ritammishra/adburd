import { ReactNode } from "react";
import AnimationWrapper from "./AnimationWrapper";
import clsx from "clsx";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  centered = false,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={clsx("mb-16", centered && "text-center", className)}>
      <AnimationWrapper direction="up">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-dark mb-4">
          {title}
        </h2>
      </AnimationWrapper>
      
      {subtitle && (
        <AnimationWrapper direction="up" delay={0.1}>
          <p className={clsx("text-lg text-muted max-w-2xl", centered && "mx-auto")}>
            {subtitle}
          </p>
        </AnimationWrapper>
      )}
    </div>
  );
}
