import { SectionTitle } from '@/components/ui/section-title';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from '@/lib/data5';

export default function FaqPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-burgundy-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-cormorant text-4xl md:text-5xl font-semibold mb-4">Hỏi & Đáp</h1>
            <p className="text-ivory-100 text-lg">Giải đáp những câu hỏi thường gặp về dịch vụ của Thiên Di</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Câu hỏi thường gặp"
            subtitle="Những thắc mắc phổ biến về dịch vụ của chúng tôi"
            center
          />
          
          <div className="max-w-3xl mx-auto mt-12">
            <Accordion type="single" collapsible className="w-full">
              {faqData.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-ivory-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-cormorant font-medium text-primary mb-4">
              Vẫn còn thắc mắc?
            </h2>
            <p className="text-muted-foreground mb-8">
              Nếu bạn không tìm thấy câu trả lời cho thắc mắc của mình, 
              hãy liên hệ với chúng tôi trực tiếp. Đội ngũ tư vấn của Thiên Di 
              luôn sẵn sàng hỗ trợ bạn.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="rounded-full">
                <Link to="/lien-he">Liên hệ ngay</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full">
                <a href="tel:+84123456789">Gọi: 0123 456 789</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}