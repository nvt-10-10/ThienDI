import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SectionTitle } from '@/components/ui/section-title';
import { BlogCard } from '@/components/ui/blog-card';
import { posts } from '@/lib/data3';
import { morePosts } from '@/lib/data4';

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  
  // Combine all blog posts
  const allPosts = [...posts, ...morePosts];
  
  // Find current post
  const post = allPosts.find(p => p.slug === slug);
  
  // Get related posts
  const relatedPosts = post?.relatedPosts 
    ? allPosts.filter(p => post.relatedPosts!.includes(p.id))
    : allPosts.filter(p => p.category === post?.category).slice(0, 3);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Không tìm thấy bài viết</h1>
        <Button asChild>
          <Link to="/blog">Quay lại trang blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-12 bg-burgundy-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block bg-primary/20 text-white rounded-full px-3 py-1 text-sm font-semibold mb-4">
              {post.category}
            </span>
            <h1 className="font-cormorant text-3xl md:text-4xl font-semibold mb-4">{post.title}</h1>
            <p className="text-ivory-100 text-sm">{post.date}</p>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-auto rounded-lg mb-8 object-cover"
            />
            
            <div className="prose prose-lg max-w-none prose-headings:font-cormorant prose-headings:font-semibold prose-p:text-muted-foreground">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            <div className="mt-12 pt-6 border-t border-border">
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/blog">
                  <ChevronLeft className="mr-2 h-4 w-4" /> Quay lại trang blog
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-ivory-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <SectionTitle
              title="Bài viết liên quan"
              subtitle="Khám phá thêm những bài viết tương tự"
              center
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {relatedPosts.map((post) => (
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
      )}
    </div>
  );
}