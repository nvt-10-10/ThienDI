import { SectionTitle } from '@/components/ui/section-title';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-burgundy-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-cormorant text-4xl md:text-5xl font-semibold mb-4">Giới thiệu</h1>
            <p className="text-ivory-100 text-lg">Câu chuyện của Thiên Di - dịch vụ tráp cưới và hoa cưới truyền thống Việt Nam</p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1544634042-d094f90a1616?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Thiên Di - Câu chuyện thương hiệu"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <SectionTitle
                title="Câu chuyện của chúng tôi"
                subtitle="Khởi nguồn từ niềm đam mê với văn hóa truyền thống"
              />
              <p className="text-muted-foreground mb-6">
                Thiên Di được thành lập vào năm 2018 bởi chị Lan Anh - người đã có hơn 10 năm kinh nghiệm trong ngành hoa cưới và trang trí lễ hội. 
                Với mong muốn gìn giữ và phát huy nét đẹp văn hóa truyền thống trong nghi lễ cưới hỏi Việt Nam, 
                chị đã quyết định thành lập Thiên Di để mang đến những sản phẩm tráp cưới và hoa cưới vừa giữ được nét truyền thống vừa phù hợp với xu hướng hiện đại.
              </p>
              <p className="text-muted-foreground mb-6">
                Tên "Thiên Di" được lấy từ ý nghĩa về sự di chuyển, thay đổi từ cuộc sống độc thân sang cuộc sống hôn nhân - một hành trình mới của mỗi người. 
                Chúng tôi tin rằng, mỗi nghi lễ cưới hỏi đều là một dấu mốc quan trọng trong cuộc đời mỗi người, và chúng tôi vinh dự được đồng hành cùng bạn 
                trong hành trình trọng đại này.
              </p>
              <Button asChild className="rounded-full">
                <Link to="/san-pham">
                  Xem sản phẩm của chúng tôi <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-ivory-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Giá trị cốt lõi"
            subtitle="Những giá trị làm nên thương hiệu Thiên Di"
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-burgundy-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>
              </div>
              <h3 className="text-xl font-cormorant font-semibold mb-3">Tôn trọng truyền thống</h3>
              <p className="text-muted-foreground">
                Chúng tôi đề cao và tôn trọng những giá trị văn hóa truyền thống trong nghi lễ cưới hỏi Việt Nam, đồng thời khéo léo kết hợp với xu hướng hiện đại.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-burgundy-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"></path><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z"></path></svg>
              </div>
              <h3 className="text-xl font-cormorant font-semibold mb-3">Tỉ mỉ trong từng chi tiết</h3>
              <p className="text-muted-foreground">
                Từng sản phẩm của chúng tôi đều được chăm chút cẩn thận, đảm bảo sự hoàn hảo trong từng chi tiết nhỏ nhất.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-burgundy-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M7 10v12"></path><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z"></path></svg>
              </div>
              <h3 className="text-xl font-cormorant font-semibold mb-3">Chất lượng hàng đầu</h3>
              <p className="text-muted-foreground">
                Chúng tôi chỉ sử dụng những nguyên liệu và hoa tươi chất lượng cao nhất để tạo ra những sản phẩm bền đẹp trong ngày trọng đại của bạn.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-burgundy-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><circle cx="12" cy="12" r="10"></circle><path d="m4.93 4.93 4.24 4.24"></path><path d="m14.83 9.17 4.24-4.24"></path><path d="m14.83 14.83 4.24 4.24"></path><path d="m9.17 14.83-4.24 4.24"></path><circle cx="12" cy="12" r="4"></circle></svg>
              </div>
              <h3 className="text-xl font-cormorant font-semibold mb-3">Sáng tạo không ngừng</h3>
              <p className="text-muted-foreground">
                Chúng tôi luôn tìm kiếm những ý tưởng mới, kết hợp giữa truyền thống và hiện đại để mang đến những sản phẩm độc đáo và ấn tượng.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-burgundy-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
              </div>
              <h3 className="text-xl font-cormorant font-semibold mb-3">Dịch vụ tận tâm</h3>
              <p className="text-muted-foreground">
                Chúng tôi lắng nghe và thấu hiểu nhu cầu của khách hàng, luôn nỗ lực mang đến trải nghiệm dịch vụ tốt nhất.
              </p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <div className="w-16 h-16 bg-burgundy-50 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path><circle cx="16.5" cy="7.5" r=".5"></circle></svg>
              </div>
              <h3 className="text-xl font-cormorant font-semibold mb-3">Trách nhiệm cộng đồng</h3>
              <p className="text-muted-foreground">
                Chúng tôi cam kết sử dụng các nguyên liệu thân thiện với môi trường và tham gia vào các hoạt động bảo tồn văn hóa truyền thống.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Đội ngũ của chúng tôi"
            subtitle="Những con người tài năng và tận tâm làm nên Thiên Di"
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            <div className="text-center">
              <div className="relative mb-6 mx-auto w-40 h-40 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&q=80"
                  alt="Lan Anh - Founder"
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-cormorant text-xl font-semibold">Lan Anh</h3>
              <p className="text-primary text-sm mb-2">Người sáng lập</p>
              <p className="text-muted-foreground text-sm">
                Hơn 10 năm kinh nghiệm trong lĩnh vực hoa cưới và trang trí lễ hội.
              </p>
            </div>
            <div className="text-center">
              <div className="relative mb-6 mx-auto w-40 h-40 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&q=80"
                  alt="Minh Tâm - Thiết kế hoa"
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-cormorant text-xl font-semibold">Minh Tâm</h3>
              <p className="text-primary text-sm mb-2">Thiết kế hoa cưới</p>
              <p className="text-muted-foreground text-sm">
                Chuyên gia thiết kế hoa với những bó hoa cưới độc đáo và tinh tế.
              </p>
            </div>
            <div className="text-center">
              <div className="relative mb-6 mx-auto w-40 h-40 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&q=80"
                  alt="Quang Minh - Trưởng nhóm tráp cưới"
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-cormorant text-xl font-semibold">Quang Minh</h3>
              <p className="text-primary text-sm mb-2">Trưởng nhóm tráp cưới</p>
              <p className="text-muted-foreground text-sm">
                Chuyên gia về phong tục cưới hỏi truyền thống và thiết kế tráp cưới.
              </p>
            </div>
            <div className="text-center">
              <div className="relative mb-6 mx-auto w-40 h-40 rounded-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=160&q=80"
                  alt="Thanh Tùng - Chuyên gia trang trí xe cưới"
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-cormorant text-xl font-semibold">Thanh Tùng</h3>
              <p className="text-primary text-sm mb-2">Chuyên gia trang trí xe cưới</p>
              <p className="text-muted-foreground text-sm">
                Hơn 5 năm kinh nghiệm trong lĩnh vực trang trí xe hoa cưới đẹp và độc đáo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-burgundy-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-cormorant font-medium mb-4">
              Sẵn sàng cho ngày trọng đại của bạn?
            </h2>
            <p className="mb-8 text-ivory-100">
              Hãy để chúng tôi giúp bạn chuẩn bị những chi tiết hoàn hảo cho lễ cưới hỏi truyền thống của bạn.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild className="bg-white text-primary hover:bg-ivory-100 rounded-full">
                <Link to="/lien-he">Liên hệ tư vấn</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/20 rounded-full">
                <Link to="/san-pham">Xem sản phẩm</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}