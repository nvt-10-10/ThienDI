import { SectionTitle } from '@/components/ui/section-title';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';
import { pricingData } from '@/lib/data5';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function PricingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-burgundy-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-cormorant text-4xl md:text-5xl font-semibold mb-4">Bảng giá</h1>
            <p className="text-ivory-100 text-lg">Thông tin chi tiết về giá dịch vụ của Thiên Di</p>
          </div>
        </div>
      </section>

      {/* Pricing Tables Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Bảng giá dịch vụ"
            subtitle="Lựa chọn phù hợp với nhu cầu và ngân sách của bạn"
            center
          />

          <Tabs defaultValue="trap-cuoi" className="mt-12">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-ivory-100 p-1">
                <TabsTrigger value="trap-cuoi" className="px-4 py-2">Tráp cưới</TabsTrigger>
                <TabsTrigger value="hoa-cuoi" className="px-4 py-2">Hoa cưới</TabsTrigger>
                <TabsTrigger value="trang-tri-xe" className="px-4 py-2">Trang trí xe cưới</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="trap-cuoi" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingData.trapCuoi.map((plan, index) => (
                  <div 
                    key={index}
                    className={`border rounded-lg overflow-hidden ${
                      index === 1 ? 'border-primary ring-2 ring-primary ring-opacity-20' : 'border-border'
                    }`}
                  >
                    {index === 1 && (
                      <div className="bg-primary text-white text-center py-2 text-sm font-medium">
                        Phổ biến nhất
                      </div>
                    )}
                    <div className="p-8">
                      <h3 className="text-xl font-cormorant font-semibold mb-2">{plan.name}</h3>
                      <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                      <div className="mb-6">
                        <span className="text-3xl font-cormorant font-bold">{plan.price}</span>
                      </div>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                            <span className="text-muted-foreground text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="w-full rounded-full">
                        <Link to="/lien-he">Liên hệ ngay</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="hoa-cuoi" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingData.hoaCuoi.map((plan, index) => (
                  <div 
                    key={index}
                    className={`border rounded-lg overflow-hidden ${
                      index === 1 ? 'border-primary ring-2 ring-primary ring-opacity-20' : 'border-border'
                    }`}
                  >
                    {index === 1 && (
                      <div className="bg-primary text-white text-center py-2 text-sm font-medium">
                        Phổ biến nhất
                      </div>
                    )}
                    <div className="p-8">
                      <h3 className="text-xl font-cormorant font-semibold mb-2">{plan.name}</h3>
                      <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                      <div className="mb-6">
                        <span className="text-3xl font-cormorant font-bold">{plan.price}</span>
                      </div>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                            <span className="text-muted-foreground text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="w-full rounded-full">
                        <Link to="/lien-he">Liên hệ ngay</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="trang-tri-xe" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingData.trangTriXe.map((plan, index) => (
                  <div 
                    key={index}
                    className={`border rounded-lg overflow-hidden ${
                      index === 1 ? 'border-primary ring-2 ring-primary ring-opacity-20' : 'border-border'
                    }`}
                  >
                    {index === 1 && (
                      <div className="bg-primary text-white text-center py-2 text-sm font-medium">
                        Phổ biến nhất
                      </div>
                    )}
                    <div className="p-8">
                      <h3 className="text-xl font-cormorant font-semibold mb-2">{plan.name}</h3>
                      <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                      <div className="mb-6">
                        <span className="text-3xl font-cormorant font-bold">{plan.price}</span>
                      </div>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                            <span className="text-muted-foreground text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button asChild className="w-full rounded-full">
                        <Link to="/lien-he">Liên hệ ngay</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Custom Quote */}
      <section className="py-16 bg-ivory-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-cormorant font-medium text-primary mb-4">
              Cần báo giá tùy chỉnh?
            </h2>
            <p className="text-muted-foreground mb-8">
              Nếu bạn cần một giải pháp tùy chỉnh hoặc có yêu cầu đặc biệt, 
              đừng ngần ngại liên hệ với chúng tôi để được tư vấn và báo giá chi tiết.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link to="/lien-he">Liên hệ tư vấn</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}