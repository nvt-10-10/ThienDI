import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, Star, Heart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/ui/section-title";
import { ProductCard } from "@/components/ui/product-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { products } from "@/lib/data";
import { additionalProducts } from "@/lib/data2";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [selectedImage, setSelectedImage] = useState(0);

  // Combine all products
  const allProducts = [...products, ...additionalProducts];

  // Find current product
  const product = allProducts.find((p) => p.slug === slug);

  // Find related products
  const relatedProducts = product?.relatedProducts
    ? allProducts.filter((p) => product.relatedProducts!.includes(p.id))
    : allProducts.filter((p) => p.category === product?.category).slice(0, 3);

  // If product not found
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
        <Button asChild>
          <Link to="/san-pham">Quay lại danh sách sản phẩm</Link>
        </Button>
      </div>
    );
  }

  // Handle image selection
  const productImages = [product.image, ...(product.gallery || [])];

  return (
    <div>
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/">
                Trang chủ
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/san-pham">
                Sản phẩm
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                as={Link}
                to={`/san-pham/${
                  product.category === "Tráp cưới"
                    ? "trap-cuoi"
                    : product.category === "Hoa cưới"
                    ? "hoa-cuoi"
                    : "trang-tri-xe-cuoi"
                }`}
              >
                {product.category}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {/* Product Details */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="rounded-lg overflow-hidden mb-4">
                <img
                  src={productImages[selectedImage]}
                  alt={product.title}
                  className="w-full h-auto object-cover"
                />
              </div>
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {productImages.map((img, index) => (
                    <div
                      key={index}
                      className={`cursor-pointer rounded-md overflow-hidden border-2 ${
                        selectedImage === index
                          ? "border-primary"
                          : "border-transparent"
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={img}
                        alt={`${product.title} - Hình ${index + 1}`}
                        className="w-full h-24 object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <span className="inline-block bg-ivory-100 text-primary rounded-full px-3 py-1 text-sm font-semibold mb-4">
                {product.category}
              </span>
              <h1 className="font-cormorant text-3xl md:text-4xl font-semibold mb-4">
                {product.title}
              </h1>

              {product.price && (
                <p className="text-2xl font-cormorant font-semibold text-primary mb-6">
                  {product.price}
                </p>
              )}

              <div className="mb-6">
                <h2 className="font-medium mb-2">Mô tả</h2>
                <p className="text-muted-foreground">{product.description}</p>
              </div>

              {product.features && (
                <div className="mb-6">
                  <h2 className="font-medium mb-2">Đặc điểm nổi bật</h2>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button asChild size="lg" className="rounded-full">
                  <Link to="/lien-he">Liên hệ đặt hàng</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full"
                >
                  <Link to="/bang-gia">Xem bảng giá</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      <section className="py-12 bg-ivory-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="mo-ta" className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList className="bg-background p-1">
                <TabsTrigger value="mo-ta" className="px-4 py-2">
                  Mô tả chi tiết
                </TabsTrigger>
                <TabsTrigger value="huong-dan" className="px-4 py-2">
                  Hướng dẫn đặt hàng
                </TabsTrigger>
                {product.customization && (
                  <TabsTrigger value="tuy-chinh" className="px-4 py-2">
                    Tùy chỉnh
                  </TabsTrigger>
                )}
              </TabsList>
            </div>

            <TabsContent value="mo-ta" className="max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="prose prose-lg max-w-none">
                  {product.longDescription ? (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: product.longDescription,
                      }}
                    />
                  ) : (
                    <>
                      <h3>Thông tin chi tiết về {product.title}</h3>
                      <p>{product.description}</p>
                      <p>
                        Thiên Di tự hào mang đến cho khách hàng những sản phẩm
                        chất lượng cao, được thiết kế tinh tế và ý nghĩa cho
                        ngày trọng đại. Sản phẩm này được làm thủ công bởi các
                        nghệ nhân có kinh nghiệm, đảm bảo sự hoàn hảo trong từng
                        chi tiết.
                      </p>
                      {product.category === "Tráp cưới" && (
                        <>
                          <h4>Ý nghĩa của tráp cưới trong nghi lễ cưới hỏi</h4>
                          <p>
                            Tráp cưới không chỉ là vật dụng đựng lễ vật mà còn
                            là biểu tượng cho sự trang trọng, chu đáo của nhà
                            trai đối với nhà gái. Mỗi chi tiết trên tráp cưới
                            đều mang ý nghĩa riêng, thể hiện lòng thành và sự
                            tôn trọng.
                          </p>
                        </>
                      )}
                      {product.category === "Hoa cưới" && (
                        <>
                          <h4>Ý nghĩa của hoa cưới</h4>
                          <p>
                            Hoa cưới không chỉ là vật trang trí mà còn là biểu
                            tượng cho tình yêu, hạnh phúc và sự may mắn. Mỗi
                            loài hoa trong bó hoa cưới đều mang ý nghĩa đặc
                            biệt, gửi gắm những lời chúc tốt đẹp cho đôi vợ
                            chồng trẻ.
                          </p>
                        </>
                      )}
                      {product.category === "Trang trí xe cưới" && (
                        <>
                          <h4>Ý nghĩa của việc trang trí xe cưới</h4>
                          <p>
                            Xe cưới được trang trí lộng lẫy không chỉ để tạo
                            điểm nhấn cho đám cưới mà còn mang ý nghĩa đưa cô
                            dâu đến nhà chồng một cách trọn vẹn, may mắn. Mỗi
                            chi tiết trang trí đều được chọn lọc kỹ càng, thể
                            hiện phong cách và cá tính của đôi vợ chồng trẻ.
                          </p>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="huong-dan" className="max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="prose prose-lg max-w-none">
                  <h3>Hướng dẫn đặt hàng</h3>
                  <ol>
                    <li>
                      <strong>Liên hệ tư vấn:</strong> Bạn có thể gọi điện theo
                      số 0123 456 789 hoặc gửi email đến info@thiendi.vn để được
                      tư vấn chi tiết về sản phẩm.
                    </li>
                    <li>
                      <strong>Xác nhận yêu cầu:</strong> Sau khi trao đổi, chúng
                      tôi sẽ ghi nhận yêu cầu và gửi báo giá chi tiết cho bạn.
                    </li>
                    <li>
                      <strong>Đặt cọc:</strong> Để xác nhận đơn hàng, bạn cần
                      đặt cọc 50% giá trị đơn hàng.
                    </li>
                    <li>
                      <strong>Xác nhận mẫu:</strong> Đối với các sản phẩm cần
                      thiết kế riêng, chúng tôi sẽ gửi bản phác thảo để bạn xác
                      nhận trước khi tiến hành sản xuất.
                    </li>
                    <li>
                      <strong>Sản xuất và giao hàng:</strong> Sau khi hoàn tất
                      các bước trên, chúng tôi sẽ tiến hành sản xuất và giao
                      hàng đúng thời hạn đã cam kết.
                    </li>
                  </ol>

                  <h4>Thời gian chuẩn bị</h4>
                  <ul>
                    <li>Tráp cưới: 7-15 ngày (tùy độ phức tạp)</li>
                    <li>Hoa cưới: 3-7 ngày</li>
                    <li>Trang trí xe cưới: 2-5 ngày</li>
                  </ul>

                  <h4>Phương thức thanh toán</h4>
                  <ul>
                    <li>Chuyển khoản ngân hàng</li>
                    <li>Thanh toán trực tiếp tại cửa hàng</li>
                  </ul>
                </div>
              </div>
            </TabsContent>

            {product.customization && (
              <TabsContent value="tuy-chinh" className="max-w-4xl mx-auto">
                <div className="bg-white p-8 rounded-lg shadow-sm">
                  <div className="prose prose-lg max-w-none">
                    <h3>Tùy chỉnh sản phẩm</h3>
                    <p>
                      Thiên Di cung cấp dịch vụ tùy chỉnh sản phẩm theo yêu cầu
                      riêng của khách hàng. Bạn có thể lựa chọn:
                    </p>
                    <ul>
                      {product.customization.map((option, index) => (
                        <li key={index}>{option}</li>
                      ))}
                    </ul>
                    <p>
                      Để được tư vấn chi tiết về việc tùy chỉnh sản phẩm, vui
                      lòng liên hệ với chúng tôi qua số điện thoại 0123 456 789
                      hoặc email info@thiendi.vn.
                    </p>
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Sản phẩm liên quan"
            subtitle="Khám phá thêm những sản phẩm tương tự"
            center
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {relatedProducts.slice(0, 3).map((relProduct) => (
              <ProductCard
                key={relProduct.id}
                id={relProduct.id}
                title={relProduct.title}
                image={relProduct.image}
                category={relProduct.category}
                description={relProduct.description}
                slug={relProduct.slug}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/san-pham">
                Xem tất cả sản phẩm <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
