import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components/ui/section-title';
import { ProductCard } from '@/components/ui/product-card';
import { BlogCard } from '@/components/ui/blog-card';
import { TestimonialCard } from '@/components/ui/testimonial-card';
import { products } from '@/lib/data';
import { additionalProducts } from '@/lib/data2';
import { posts } from '@/lib/data3';
import { testimonials } from '@/lib/data5';

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Combine all products
  const allProducts = [...products, ...additionalProducts];

  // Filter products by category
  const trapCuoi = allProducts.filter(product => product.category === 'Tráp cưới').slice(0, 3);
  const hoaCuoi = allProducts.filter(product => product.category === 'Hoa cưới').slice(0, 3);
  const xeCuoi = allProducts.filter(product => product.category === 'Trang trí xe cưới').slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 banner-gradient"></div>
          <img 
            src="https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" 
            alt="Thiên Di Wedding Services" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        <div className={`container relative z-10 text-center px-4 sm:px-6 lg:px-8 space-y-6 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-cormorant font-semibold text-white elegant-shadow">Thiên Di</h1>
          <p className="text-lg md:text-xl lg:text-2xl font-cormorant text-white elegant-shadow italic">Trao lễ trọn vẹn – Gửi gắm yêu thương</p>
          <p className="text-sm md:text-base text-white max-w-2xl mx-auto elegant-shadow">
            Dịch vụ tráp cưới và hoa cưới truyền thống Việt Nam tinh tế, tỉ mỉ và tận tâm
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
            <Button asChild className="bg-primary hover:bg-burgundy-800 text-white rounded-full text-sm md:text-base px-6 py-5">
              <Link to="/san-pham">Xem sản phẩm</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/20 rounded-full text-sm md:text-base px-6 py-5">
              <Link to="/lien-he">Liên hệ ngay</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-ivory-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1">
              <SectionTitle 
                title="Về Thiên Di" 
                subtitle="Dịch vụ tráp cưới và hoa cưới truyền thống"
              />
              <p className="text-muted-foreground mb-6">
                Thiên Di tự hào mang đến dịch vụ tráp cưới và hoa cưới truyền thống Việt Nam với sự tỉ mỉ và tận tâm. 
                Chúng tôi hiểu rằng nghi lễ cưới hỏi là một trong những sự kiện quan trọng nhất của cuộc đời mỗi người, 
                và chúng tôi cam kết mang đến những sản phẩm hoàn hảo nhất, góp phần làm nên một ngày trọn vẹn và ý nghĩa.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-center">
                  <Heart className="text-primary mr-2 h-5 w-5" />
                  <span className="text-sm">Tỉ mỉ từng chi tiết</span>
                </div>
                <div className="flex items-center">
                  <Star className="text-secondary mr-2 h-5 w-5" />
                  <span className="text-sm">Thiết kế độc đáo</span>
                </div>
                <div className="flex items-center">
                  <Heart className="text-primary mr-2 h-5 w-5" />
                  <span className="text-sm">Tôn trọng truyền thống</span>
                </div>
                <div className="flex items-center">
                  <Star className="text-secondary mr-2 h-5 w-5" />
                  <span className="text-sm">Dịch vụ chuyên nghiệp</span>
                </div>
              </div>
              <Button asChild className="rounded-full">
                <Link to="/gioi-thieu">
                  Tìm hiểu thêm <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="order-1 md:order-2 grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1544634042-d094f90a1616?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80"
                alt="Tráp cưới Thiên Di"
                className="rounded-lg object-cover h-48 w-full md:h-64"
              />
              <img
                src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80"
                alt="Hoa cưới Thiên Di"
                className="rounded-lg object-cover h-48 w-full md:h-64 mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Tráp cưới */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Tráp cưới" 
            subtitle="Sản phẩm tráp cưới truyền thống và hiện đại" 
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {trapCuoi.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.image}
                category={product.category}
                description={product.description}
                slug={product.slug}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/san-pham/trap-cuoi">
                Xem tất cả tráp cưới <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section - Hoa cưới */}
      <section className="py-16 bg-ivory-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Hoa cưới" 
            subtitle="Bó hoa cưới đẹp và ý nghĩa cho ngày trọng đại" 
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {hoaCuoi.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.image}
                category={product.category}
                description={product.description}
                slug={product.slug}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/san-pham/hoa-cuoi">
                Xem tất cả hoa cưới <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section - Trang trí xe cưới */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Trang trí xe cưới" 
            subtitle="Dịch vụ trang trí xe cưới độc đáo và ấn tượng" 
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {xeCuoi.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.image}
                category={product.category}
                description={product.description}
                slug={product.slug}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/san-pham/trang-tri-xe-cuoi">
                Xem tất cả dịch vụ trang trí xe cưới <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-burgundy-700 text-white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Khách hàng nói gì về chúng tôi" 
            center
            className="text-white"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {testimonials.slice(0, 3).map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                quote={testimonial.quote}
                name={testimonial.name}
                eventDate={testimonial.eventDate}
                image={testimonial.image}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="border-white text-white hover:bg-white/20 rounded-full">
              <Link to="/danh-gia">
                Xem thêm đánh giá <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8">
          <SectionTitle 
            title="Bài viết mới nhất" 
            subtitle="Tìm hiểu thêm về văn hóa cưới hỏi truyền thống Việt Nam" 
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {posts.slice(0, 3).map((post) => (
              <BlogCard
                key={post.id}
                id={post.id}
                title={post.title}
                image={post.image}
                excerpt={post.excerpt}
                date={post.date}
                slug={post.slug}
                category={post.category}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/blog">
                Xem tất cả bài viết <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-ivory-50">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-cormorant font-medium text-primary mb-4">
              Sẵn sàng cho ngày trọng đại của bạn?
            </h2>
            <p className="text-muted-foreground mb-8">
              Liên hệ với chúng tôi ngay hôm nay để được tư vấn miễn phí và nhận báo giá chi tiết.
              Thiên Di cam kết mang đến dịch vụ tốt nhất cho ngày cưới của bạn.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="rounded-full">
                <Link to="/lien-he">Liên hệ tư vấn</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/bang-gia">Xem bảng giá</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}