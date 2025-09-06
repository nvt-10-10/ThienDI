import { SectionTitle } from '@/components/ui/section-title';
import { TestimonialCard } from '@/components/ui/testimonial-card';
import { testimonials } from '@/lib/data5';

export default function ReviewsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-burgundy-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-cormorant text-4xl md:text-5xl font-semibold mb-4">Đánh giá</h1>
            <p className="text-ivory-100 text-lg">Khách hàng nói gì về dịch vụ của Thiên Di</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Đánh giá từ khách hàng"
            subtitle="Những chia sẻ từ khách hàng đã sử dụng dịch vụ của chúng tôi"
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                quote={testimonial.quote}
                name={testimonial.name}
                eventDate={testimonial.eventDate}
                image={testimonial.image}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}