import { CircleDollarSign, Package, FileText, Users, Star, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/data";
import { additionalProducts } from "@/lib/data2";
import { posts } from "@/lib/data3";
import { morePosts } from "@/lib/data4";
import { testimonials } from "@/lib/data5";

export default function AdminDashboard() {
  // Combine all products and posts
  const allProducts = [...products, ...additionalProducts];
  const allPosts = [...posts, ...morePosts];
  
  // Get product counts by category
  const productCategories = allProducts.reduce((acc: Record<string, number>, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  // Get recent products and posts
  const recentProducts = allProducts.slice(0, 5);
  const recentPosts = allPosts.slice(0, 5);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-semibold mb-6">Tổng quan hệ thống</h1>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số sản phẩm</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allProducts.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {Object.entries(productCategories).map(([category, count]) => (
                `${category}: ${count}`
              )).join(' | ')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số bài viết</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allPosts.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đánh giá</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{testimonials.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Đánh giá khách hàng
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {/* Recent Products */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Sản phẩm mới nhất</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 overflow-hidden rounded">
                      <img 
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{product.title}</div>
                      <Badge variant="outline">{product.category}</Badge>
                    </div>
                  </div>
                  <div>
                    {product.price && <span>{product.price}</span>}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Posts */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Bài viết mới nhất</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 overflow-hidden rounded">
                      <img 
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="font-medium">{post.title}</div>
                      <div className="text-xs text-muted-foreground">{post.date}</div>
                    </div>
                  </div>
                  <Badge>{post.category}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Customer Reviews */}
      <Card>
        <CardHeader>
          <CardTitle>Đánh giá gần đây</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {testimonials.slice(0, 3).map((testimonial) => (
              <div key={testimonial.id} className="border rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="h-10 w-10 overflow-hidden rounded-full">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium">{testimonial.name}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.eventDate}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}