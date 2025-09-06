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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { products } from "@/lib/data";
import { additionalProducts } from "@/lib/data2";
import { Upload, X, Plus, ArrowLeft, Check } from "lucide-react";
import ReactQuill from "react-quill";
// Define form schema
const formSchema = z.object({
  title: z.string().min(1, "Tên sản phẩm là bắt buộc"),
  category: z.string().min(1, "Danh mục là bắt buộc"),
  description: z.string().min(1, "Mô tả là bắt buộc"),
  price: z.number().min(0, "Vui lòng nhập số lớn hơn 0").optional(),
  price_min: z.number().min(0, "Vui lòng nhập số lớn hơn 0").optional(),
  price_max: z.number().min(0, "Vui lòng nhập số lớn hơn 0").optional(),
  slug: z.string().min(1, "Slug là bắt buộc"),
  features: z.array(z.string()).optional(),
  longDescription: z.string().optional(),
  customization: z.array(z.string()).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProductForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  // Combine all products
  const allProducts = [...products, ...additionalProducts];

  // Get product categories
  const categories = [
    ...new Set(allProducts.map((product) => product.category)),
  ];

  // Mock image upload
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");
  const [newCustomization, setNewCustomization] = useState("");

  // Set up form with default values
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: "",
      description: "",
      price: 0,
      price_min: 0,
      price_max: 0,
      slug: "",
      features: [],
      longDescription: "",
      customization: [],
    },
  });

  // Load product data if editing
  useEffect(() => {
    if (isEditing) {
      const product = allProducts.find((p) => p.id === id);
      if (product) {
        form.reset({
          title: product.title,
          category: product.category,
          description: product.description,
          price: product?.price || null,
          price_min: product?.price_min || null,
          price_max: product?.price_max || null,
          slug: product.slug,
          features: product.features || [],
          longDescription: product.longDescription || "",
          customization: product.customization || [],
        });

        setMainImage(product.image);
        setGalleryImages(product.gallery || []);
      }
    }
  }, [id, isEditing]);

  // Handle form submission
  const onSubmit = (values: FormValues) => {
    // In a real app, this would save to an API
    console.log({
      ...values,
      image: mainImage,
      gallery: galleryImages,
    });

    // Show success message and navigate back
    alert(
      isEditing
        ? "Sản phẩm đã được cập nhật"
        : "Sản phẩm đã được tạo thành công"
    );
    navigate("/admin/products");
  };

  // Handle image upload (mock)
  const handleImageUpload = (type: "main" | "gallery") => {
    // Mock image URL - in real app, this would be file upload
    const mockImageUrl = `https://source.unsplash.com/random/300x300?wedding&${Math.random()}`;

    if (type === "main") {
      setMainImage(mockImageUrl);
    } else {
      setGalleryImages([...galleryImages, mockImageUrl]);
    }
  };

  // Remove gallery image
  const removeGalleryImage = (index: number) => {
    setGalleryImages(galleryImages.filter((_, i) => i !== index));
  };

  // Add feature
  const addFeature = () => {
    if (newFeature.trim()) {
      const currentFeatures = form.getValues("features") || [];
      form.setValue("features", [...currentFeatures, newFeature]);
      setNewFeature("");
    }
  };

  // Remove feature
  const removeFeature = (index: number) => {
    const currentFeatures = form.getValues("features") || [];
    form.setValue(
      "features",
      currentFeatures.filter((_, i) => i !== index)
    );
  };

  // Add customization option
  const addCustomization = () => {
    if (newCustomization.trim()) {
      const currentOptions = form.getValues("customization") || [];
      form.setValue("customization", [...currentOptions, newCustomization]);
      setNewCustomization("");
    }
  };

  // Remove customization option
  const removeCustomization = (index: number) => {
    const currentOptions = form.getValues("customization") || [];
    form.setValue(
      "customization",
      currentOptions.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/products")}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-semibold">
            {isEditing ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
          </h1>
        </div>

        <Button onClick={form.handleSubmit(onSubmit)}>
          <Check className="mr-2 h-4 w-4" />
          {isEditing ? "Cập nhật" : "Lưu sản phẩm"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tên sản phẩm</FormLabel>
                        <FormControl>
                          <Input placeholder="Nhập tên sản phẩm" {...field} />
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
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giá (tùy chọn)</FormLabel>
                          <FormControl>
                            <Input placeholder="VD: 1,500,000₫" {...field} />
                          </FormControl>
                          <FormDescription>
                            Để trống nếu giá "Liên hệ"
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="price_min"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giá thấp nhất (tùy chọn)</FormLabel>
                          <FormControl>
                            <Input placeholder="VD: 1,500,000₫" {...field} />
                          </FormControl>
                          <FormDescription>
                            Để trống nếu giá "Liên hệ"
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Giá (tùy chọn)</FormLabel>
                          <FormControl>
                            <Input placeholder="VD: 1,500,000₫" {...field} />
                          </FormControl>
                          <FormDescription>
                            Để trống nếu giá "Liên hệ"
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Slug</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="VD: trap-cuoi-sen-do"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          URL thân thiện cho sản phẩm (không dấu, không khoảng
                          trắng)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mô tả ngắn</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Mô tả ngắn gọn về sản phẩm"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="longDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mô tả chi tiết</FormLabel>
                        <FormControl>
                          <ReactQuill
                            theme="snow"
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Nhập mô tả chi tiết phong phú..."
                            style={{ minHeight: "150px" }}
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

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Tính năng nổi bật</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Thêm tính năng mới"
                    onKeyDown={(e) => e.key === "Enter" && addFeature()}
                  />
                  <Button type="button" onClick={addFeature}>
                    <Plus className="h-4 w-4 mr-2" /> Thêm
                  </Button>
                </div>

                <div className="space-y-2">
                  {form.watch("features")?.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted rounded-md"
                    >
                      <span>{feature}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFeature(index)}
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Tùy chỉnh sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    value={newCustomization}
                    onChange={(e) => setNewCustomization(e.target.value)}
                    placeholder="Thêm tùy chọn"
                    onKeyDown={(e) => e.key === "Enter" && addCustomization()}
                  />
                  <Button type="button" onClick={addCustomization}>
                    <Plus className="h-4 w-4 mr-2" /> Thêm
                  </Button>
                </div>

                <div className="space-y-2">
                  {form.watch("customization")?.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted rounded-md"
                    >
                      <span>{option}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCustomization(index)}
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Hình ảnh chính</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mainImage ? (
                  <div className="relative">
                    <img
                      src={mainImage}
                      alt="Main product"
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
                    className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
                    onClick={() => handleImageUpload("main")}
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
              <CardTitle>Bộ sưu tập hình ảnh</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  {galleryImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6"
                        onClick={() => removeGalleryImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}

                  {galleryImages.length < 6 && (
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-md p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 h-24"
                      onClick={() => handleImageUpload("gallery")}
                    >
                      <Plus className="h-6 w-6 text-gray-400" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  Tối đa 6 hình ảnh
                </p>
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
                  {isEditing ? "Cập nhật sản phẩm" : "Lưu & Xuất bản"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
