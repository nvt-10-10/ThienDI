import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  name: string;
  eventDate: string;
  image: string;
  className?: string;
}

export function TestimonialCard({
  quote,
  name,
  eventDate,
  image,
  className,
}: TestimonialCardProps) {
  return (
    <Card className={cn("overflow-hidden h-full transition-all hover:shadow-lg bg-white/80 backdrop-blur-sm", className)}>
      <CardHeader className="pb-2 pt-6">
        <Quote className="h-8 w-8 text-primary/20 mb-2" />
        <p className="text-muted-foreground text-sm italic line-clamp-4">{quote}</p>
      </CardHeader>
      <CardContent className="flex items-center pt-4">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-3">
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-xs text-muted-foreground">{eventDate}</p>
        </div>
      </CardContent>
    </Card>
  );
}