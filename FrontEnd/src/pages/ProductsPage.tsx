import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SectionTitle } from '@/components/ui/section-title';
import { ProductCard } from '@/components/ui/product-card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { products } from '@/lib/data';
import { additionalProducts } from '@/lib/data2';

export default function ProductsPage() {
  const { category } = useParams();
  const [activeCategory, setActiveCategory] = useState(category || 'all');
  
  // Combine all products
  const allProducts = [...products, ...additionalProducts];

  // Filter products by category if needed
  const filteredProducts = activeCategory === 'all' 
    ? allProducts 
    : allProducts.filter(product => {
        if (activeCategory === 'trap-cuoi') return product.category === 'Tráp cưới';
        if (activeCategory === 'hoa-cuoi') return product.category === 'Hoa cưới';
        if (activeCategory === 'trang-tri-xe-cuoi') return product.category === 'Trang trí xe cưới';
        return true;
      });

  // Get categories for filter
  const categories = [
    { id: 'all', name: 'Tất cả sản phẩm' },
    { id: 'trap-cuoi', name: 'Tráp cưới' },
    { id: 'hoa-cuoi', name: 'Hoa cưới' },
    { id: 'trang-tri-xe-cuoi', name: 'Trang trí xe cưới' },
  ];

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
  };

  // Page title based on category
  const getPageTitle = () => {
    if (activeCategory === 'trap-cuoi') return 'Tráp cưới';
    if (activeCategory === 'hoa-cuoi') return 'Hoa cưới';
    if (activeCategory === 'trang-tri-xe-cuoi') return 'Trang trí xe cưới';
    return 'Sản phẩm';
  };

  // Page description based on category
  const getPageDescription = () => {
    if (activeCategory === 'trap-cuoi') 
      return 'Tráp cưới truyền thống và hiện đại cho lễ ăn hỏi';
    if (activeCategory === 'hoa-cuoi') 
      return 'Bó hoa cưới đẹp và ý nghĩa cho ngày trọng đại';
    if (activeCategory === 'trang-tri-xe-cuoi') 
      return 'Dịch vụ trang trí xe cưới ấn tượng và độc đáo';
    return 'Tất cả sản phẩm và dịch vụ cho ngày cưới của bạn';
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 bg-burgundy-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-cormorant text-4xl md:text-5xl font-semibold mb-4">
              {getPageTitle()}
            </h1>
            <p className="text-ivory-100">{getPageDescription()}</p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter */}
          <div className="mb-12">
            <Tabs 
              defaultValue={activeCategory} 
              value={activeCategory}
              onValueChange={handleCategoryChange} 
              className="w-full"
            >
              <div className="flex justify-center mb-8">
                <TabsList className="bg-ivory-100 p-1">
                  {categories.map((cat) => (
                    <TabsTrigger 
                      key={cat.id} 
                      value={cat.id}
                      className="px-4 py-2 data-[state=active]:bg-white data-[state=active]:text-primary"
                    >
                      {cat.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              {categories.map((cat) => (
                <TabsContent key={cat.id} value={cat.id} className="mt-0">
                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
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

                  {/* Empty State */}
                  {filteredProducts.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground mb-4">Không tìm thấy sản phẩm phù hợp.</p>
                      <Button 
                        variant="outline" 
                        onClick={() => setActiveCategory('all')}
                      >
                        Xem tất cả sản phẩm
                      </Button>
                    </div>
                  )}
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-ivory-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <SectionTitle 
                title="Bạn cần tư vấn thêm?" 
                subtitle="Chúng tôi luôn sẵn sàng hỗ trợ bạn"
              />
              <p className="text-muted-foreground mb-8">
                Nếu bạn còn thắc mắc về sản phẩm hoặc dịch vụ của chúng tôi, 
                đừng ngần ngại liên hệ với Thiên Di. Đội ngũ tư vấn của chúng tôi 
                sẽ giúp bạn lựa chọn những sản phẩm phù hợp nhất với nhu cầu và ngân sách của bạn.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="rounded-full">
                  <Link to="/lien-he">Liên hệ ngay</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link to="/bang-gia">Xem bảng giá</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1591604466107-ec97de577aff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=640&q=80" 
                alt="Hỗ trợ từ Thiên Di" 
                className="rounded-lg shadow-lg w-full max-w-md mx-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}