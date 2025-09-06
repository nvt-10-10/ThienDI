import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar } from "lucide-react";

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  slug: string;
  className?: string;
}

export function BlogCard({
  id,
  title,
  excerpt,
  image,
  category,
  date,
  slug,
  className,
}: BlogCardProps) {
  return (
    <Card className={cn("overflow-hidden h-full transition-all hover:shadow-lg", className)}>
      <div className="aspect-video w-full relative overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-primary/80 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            {category}
          </span>
        </div>
      </div>
      <CardHeader className="pb-2">
        <h3 className="font-cormorant text-xl font-medium line-clamp-2">{title}</h3>
        <div className="flex items-center text-muted-foreground text-xs mt-1">
          <Calendar className="h-3 w-3 mr-1" />
          {date}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-muted-foreground text-sm line-clamp-3">{excerpt}</p>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="p-0 hover:bg-transparent text-primary">
          <Link to={`/blog/${slug}`} className="flex items-center">
            Đọc tiếp <ChevronRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}