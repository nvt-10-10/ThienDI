import { cn } from "@/lib/utils";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
}

export const SectionTitle = ({ 
  title, 
  subtitle, 
  center = false,
  className
}: SectionTitleProps) => {
  return (
    <div className={cn(
      "mb-10",
      center ? "text-center" : "",
      className
    )}>
      <h2 className="font-cormorant text-3xl md:text-4xl font-medium text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
};