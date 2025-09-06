import { Link } from 'react-router-dom';
import { SectionTitle } from '@/components/ui/section-title';
import { BlogCard } from '@/components/ui/blog-card';
import { posts } from '@/lib/data3';
import { morePosts } from '@/lib/data4';

export default function BlogPage() {
  // Combine all blog posts
  const allPosts = [...posts, ...morePosts];
  
  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-burgundy-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-cormorant text-4xl md:text-5xl font-semibold mb-4">Blog</h1>
            <p className="text-ivory-100 text-lg">Tìm hiểu thêm về văn hóa cưới hỏi truyền thống Việt Nam</p>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="Bài viết mới nhất"
            subtitle="Khám phá kiến thức và xu hướng về nghi lễ cưới hỏi"
            center
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {allPosts.map((post) => (
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
        </div>
      </section>
    </div>
  );
}