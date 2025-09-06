import { useState } from "react";
import { products } from "@/lib/data";
import { additionalProducts } from "@/lib/data2";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X, Plus, Search } from "lucide-react";
import { GalleryImage } from "@/types/admin";

// Gallery categories - could be dynamic in a real app
const GALLERY_CATEGORIES = [
  "Mâm quả cưới hỏi",
  "Hoa cưới",
  "Trang trí tiệc cưới",
  "Xe hoa cưới",
  "Tất cả"
];

export default function GalleryManager() {
  // Combine all products to get images
  const allProducts = [...products, ...additionalProducts];
  
  // Extract all images from products for the gallery
  const allGalleryImages: GalleryImage[] = allProducts.reduce((acc: GalleryImage[], product) => {
    const mainImage: GalleryImage = {
      id: `${product.id}-main`,
      src: product.image,
      category: product.category,
      title: product.title
    };
    
    const galleryImages: GalleryImage[] = product.gallery ? product.gallery.map((src, idx) => ({
      id: `${product.id}-gallery-${idx}`,
      src,
      category: product.category,
      title: `${product.title} - Ảnh ${idx + 1}`
    })) : [];
    
    return [...acc, mainImage, ...galleryImages];
  }, []);
  
  // State
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(allGalleryImages);
  const [filterCategory, setFilterCategory] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const [uploadingImages, setUploadingImages] = useState<string[]>([]);
  
  // Filter images based on category and search
  const filteredImages = galleryImages.filter(image => {
    const matchesCategory = filterCategory === "Tất cả" || image.category === filterCategory;
    const matchesSearch = search === "" || 
      image.title.toLowerCase().includes(search.toLowerCase()) ||
      image.category.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  
  // Handle category filter
  const handleCategoryChange = (value: string) => {
    setFilterCategory(value);
  };
  
  // Mock image upload
  const handleImageUpload = () => {
    const mockImage: GalleryImage = {
      id: `new-image-${Date.now()}`,
      src: `https://source.unsplash.com/random/300x300?wedding&${Math.random()}`,
      category: filterCategory !== "Tất cả" ? filterCategory : "Mâm quả cưới hỏi",
      title: `Hình ảnh mới ${new Date().toLocaleDateString()}`
    };
    
    // Add to uploading images first to show progress
    setUploadingImages([...uploadingImages, mockImage.src]);
    
    // Simulate upload delay
    setTimeout(() => {
      setGalleryImages([mockImage, ...galleryImages]);
      setUploadingImages(uploadingImages.filter(img => img !== mockImage.src));
    }, 1500);
  };
  
  // Delete image
  const handleDeleteImage = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa hình ảnh này?')) {
      setGalleryImages(galleryImages.filter(img => img.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Quản lý Thư viện</h1>
        <Button onClick={handleImageUpload}>
          <Plus className="h-4 w-4 mr-2" /> Thêm hình ảnh
        </Button>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm..."
            className="pl-8"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <Select value={filterCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Danh mục" />
          </SelectTrigger>
          <SelectContent>
            {GALLERY_CATEGORIES.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* Upload Box */}
        <div 
          className="border-2 border-dashed border-gray-300 rounded-md aspect-square flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50"
          onClick={handleImageUpload}
        >
          <Upload className="h-8 w-8 text-gray-400" />
          <p className="mt-2 text-sm text-center text-gray-500">
            Thêm hình ảnh mới
          </p>
        </div>
        
        {/* Uploading Images */}
        {uploadingImages.map((src, index) => (
          <div key={`uploading-${index}`} className="relative border rounded-md overflow-hidden aspect-square bg-gray-50">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-t-primary rounded-full animate-spin"></div>
            </div>
            <img 
              src={src} 
              alt="Uploading" 
              className="w-full h-full object-cover opacity-40"
            />
          </div>
        ))}
        
        {/* Gallery Images */}
        {filteredImages.map((image) => (
          <Card key={image.id} className="relative group overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
              <Button
                variant="destructive"
                size="icon"
                className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                onClick={() => handleDeleteImage(image.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <CardContent className="p-0">
              <img 
                src={image.src} 
                alt={image.title}
                className="w-full aspect-square object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="text-xs text-white truncate">{image.title}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredImages.length === 0 && (
        <div className="text-center py-10 text-muted-foreground">
          Không tìm thấy hình ảnh nào phù hợp với bộ lọc
        </div>
      )}
    </div>
  );
}