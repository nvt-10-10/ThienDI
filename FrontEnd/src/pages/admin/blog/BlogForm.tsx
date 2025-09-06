import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { posts } from "@/lib/data3";
import { morePosts } from "@/lib/data4";
import { Upload, X, ArrowLeft, Check } from "lucide-react";

// Define form schema
const formSchema = z.object({
  title: z.string().min(1, "Tiêu đề là bắt buộc"),
  category: z.string().min(1, "Danh mục là bắt buộc"),
  excerpt: z.string().min(1, "Mô tả ngắn là bắt buộc"),
  content: z.string().min(1, "Nội dung là bắt buộc"),
  slug: z.string().min(1, "Slug là bắt buộc"),
  date: z.string().min(1, "Ngày đăng là bắt buộc"),
  author: z.string().min(1, "Tác giả là bắt buộc"),
});

type FormValues = z.infer<typeof formSchema>;

export default function BlogForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  
  // Combine all posts
  const allPosts = [...posts, ...morePosts];
  
  // Get post categories
  const categories = [...new Set(allPosts.map(post => post.category))];
  
  // Mock image upload
  const [mainImage, setMainImage] = useState<string | null>(null);
  
  // Set up form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      excerpt: "",
      content: "",
      slug: "",
      date: new Date().toISOString().split('T')[0],
      author: "Admin",
    },
  });

  // Load post data if editing
  useEffect(() => {
    if (isEditing) {
      const post = allPosts.find(p => p.id === id);
      if (post) {
        form.reset({
          title: post.title,
          category: post.category,
          excerpt: post.excerpt || "",
          content: post.content || "",
          slug: post.slug || "",
          date: post.date,
          author: post.author || "Admin",
        });
        
        setMainImage(post.image);
      }
    }
  }, [id, isEditing]);

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    // In a real app, this would save to an API
    console.log({
      ...values,
      image: mainImage,
    });
    
    // Show success message and navigate back
    alert(isEditing ? "Bài viết đã được cập nhật" : "Bài viết đã được tạo thành công");
    navigate("/admin/blog");
  };

  // Handle image upload (mock)
  const handleImageUpload = () => {
    // Mock image URL - in real app, this would be file upload
    const mockImageUrl = `https://source.unsplash.com/random/600x400?wedding&${Math.random()}`;
    setMainImage(mockImageUrl);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/admin/blog')}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-semibold">
            {isEditing ? "Chỉnh sửa bài viết" : "Viết bài mới"}
          </h1>
        </div>
        
        <Button onClick={form.handleSubmit(onSubmit)}>
          <Check className="mr-2 h-4 w-4" />
          {isEditing ? "Cập nhật" : "Xuất bản"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin bài viết</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tiêu đề</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập tiêu đề bài viết" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Danh mục</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Chọn danh mục" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Slug</FormLabel>
                          <FormControl>
                            <Input placeholder="VD: phong-tuc-cuoi-hoi" {...field} />
                          </FormControl>
                          <FormDescription>
                            URL thân thiện cho bài viết
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ngày đăng</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tác giả</FormLabel>
                          <FormControl>
                            <Input placeholder="Tên tác giả" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="excerpt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mô tả ngắn</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Mô tả ngắn gọn về bài viết" 
                            rows={3}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Hiển thị ở trang danh sách bài viết
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nội dung bài viết</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Nội dung chi tiết bài viết" 
                            rows={15}
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hình ảnh đại diện</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mainImage ? (
                  <div className="relative">
                    <img 
                      src={mainImage} 
                      alt="Blog thumbnail" 
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-7 w-7"
                      onClick={() => setMainImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div 
                    className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 h-48"
                    onClick={handleImageUpload}
                  >
                    <Upload className="h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-500">
                      Click để tải lên hình ảnh
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Xuất bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2">
                <Button onClick={form.handleSubmit(onSubmit)}>
                  <Check className="mr-2 h-4 w-4" />
                  {isEditing ? "Cập nhật bài viết" : "Xuất bản bài viết"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}