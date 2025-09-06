import { SectionTitle } from '@/components/ui/section-title';
import { products } from '@/lib/data';
import { additionalProducts } from '@/lib/data2';

export default function GalleryPage() {
  // Combine all products
  const allProducts = [...products, ...additionalProducts];
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-burgundy-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-cormorant text-4xl md:text-5xl font-semibold mb-4">Bộ sưu tập</h1>
            <p className="text-ivory-100 text-lg">Hình ảnh các sản phẩm đặc sắc của Thiên Di</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Bộ sưu tập sản phẩm"
            subtitle="Một số hình ảnh từ những sản phẩm tiêu biểu của chúng tôi"
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {allProducts.map((product) => (
              <div key={product.id} className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover object-center"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-cormorant text-lg font-medium text-gray-900 mb-1">{product.title}</h3>
                  <p className="text-sm text-primary">{product.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}