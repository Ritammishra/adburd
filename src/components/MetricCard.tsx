import AnimationWrapper from "./AnimationWrapper";

interface MetricCardProps {
  value: string;
  label: string;
  delay?: number;
}

export default function MetricCard({ value, label, delay = 0 }: MetricCardProps) {
  return (
    <AnimationWrapper direction="up" delay={delay}>
      <div className="bg-white p-8 rounded-2xl border border-border text-center group hover:-translate-y-2 transition-transform duration-300">
        <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
          {value}
        </div>
        <div className="text-lg font-medium text-dark">{label}</div>
      </div>
    </AnimationWrapper>
  );
}
