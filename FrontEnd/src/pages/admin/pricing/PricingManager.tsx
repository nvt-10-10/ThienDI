import { useState } from "react";
import { pricingData } from "@/lib/data5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { PricingPackage } from "@/types/admin";

// Convert pricing data to a more manageable format for admin
const initialPackages: PricingPackage[] = pricingData.hoaCuoi.map(
  (pkg, index) => ({
    id: `pkg-${index + 1}`,
    name: pkg.name,
    description: pkg.description,
    price: pkg.price,
    features: pkg.features,
    // originalPrice: pkg?.originalPrice || "",
    // recommended: pkg?.recommended || false,
    // type: pkg?.type || "standard",

    originalPrice: "",
    recommended: false,
    type: "standard",
  })
);

export default function PricingManager() {
  // State
  const [packages, setPackages] = useState<PricingPackage[]>(initialPackages);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<PricingPackage | null>(
    null
  );
  const [editForm, setEditForm] = useState<PricingPackage>({
    id: "",
    name: "",
    description: "",
    price: "",
    originalPrice: "",
    features: [],
    recommended: false,
    type: "standard",
  });
  const [newFeature, setNewFeature] = useState("");

  // Open edit dialog
  const handleEditClick = (pkg: PricingPackage) => {
    setSelectedPackage(pkg);
    setEditForm({
      ...pkg,
      features: [...pkg.features],
    });
    setEditDialogOpen(true);
  };

  // Handle add new package
  const handleAddNew = () => {
    setSelectedPackage(null);
    setEditForm({
      id: "",
      name: "",
      description: "",
      price: "",
      originalPrice: "",
      features: [],
      recommended: false,
      type: "standard",
    });
    setEditDialogOpen(true);
  };

  // Save package
  const handleSave = () => {
    if (editForm.name.trim() === "" || editForm.price.trim() === "") {
      alert("Vui lòng điền tên gói và giá");
      return;
    }

    if (selectedPackage) {
      // Update existing package
      setPackages(
        packages.map((pkg) =>
          pkg.id === selectedPackage.id ? { ...pkg, ...editForm } : pkg
        )
      );
    } else {
      // Add new package
      setPackages([
        ...packages,
        {
          ...editForm,
          id: `pkg-${Date.now()}`,
        },
      ]);
    }

    setEditDialogOpen(false);
  };

  // Delete package
  const handleDelete = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa gói dịch vụ này?")) {
      setPackages(packages.filter((pkg) => pkg.id !== id));
    }
  };

  // Add feature
  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setEditForm({
        ...editForm,
        features: [...editForm.features, newFeature],
      });
      setNewFeature("");
    }
  };

  // Remove feature
  const handleRemoveFeature = (index: number) => {
    setEditForm({
      ...editForm,
      features: editForm.features.filter((_, i) => i !== index),
    });
  };

  // Move package up
  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newPackages = [...packages];
      [newPackages[index], newPackages[index - 1]] = [
        newPackages[index - 1],
        newPackages[index],
      ];
      setPackages(newPackages);
    }
  };

  // Move package down
  const handleMoveDown = (index: number) => {
    if (index < packages.length - 1) {
      const newPackages = [...packages];
      [newPackages[index], newPackages[index + 1]] = [
        newPackages[index + 1],
        newPackages[index],
      ];
      setPackages(newPackages);
    }
  };

  // Package type options
  const packageTypes = [
    { value: "standard", label: "Tiêu chuẩn" },
    { value: "premium", label: "Cao cấp" },
    { value: "basic", label: "Cơ bản" },
    { value: "custom", label: "Tùy chỉnh" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Quản lý Bảng giá</h1>

        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" /> Thêm gói dịch vụ
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <Card
            key={pkg.id}
            className={`relative ${pkg.recommended ? "border-primary" : ""}`}
          >
            {pkg.recommended && (
              <Badge className="absolute -top-2 right-4 bg-primary">
                Đề xuất
              </Badge>
            )}

            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{pkg.name}</CardTitle>
                  <CardDescription className="mt-1">
                    {pkg.description}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === packages.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-4">
                <span className="text-3xl font-bold">{pkg.price}</span>
                {pkg.originalPrice && (
                  <span className="ml-2 text-muted-foreground line-through">
                    {pkg.originalPrice}
                  </span>
                )}
              </div>
            </CardHeader>

            <CardContent>
              <ul className="space-y-2 text-sm">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-primary shrink-0 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <div className="flex justify-between w-full">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditClick(pkg)}
                >
                  <Edit className="h-4 w-4 mr-2" /> Chỉnh sửa
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-500 border-red-500 hover:bg-red-50 hover:text-red-600"
                  onClick={() => handleDelete(pkg.id)}
                >
                  <Trash2 className="h-4 w-4 mr-2" /> Xóa
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}

        {packages.length === 0 && (
          <div className="col-span-full text-center py-12 border rounded-md">
            <p className="text-muted-foreground">Chưa có gói dịch vụ nào</p>
            <Button variant="outline" className="mt-4" onClick={handleAddNew}>
              <Plus className="h-4 w-4 mr-2" /> Thêm gói dịch vụ đầu tiên
            </Button>
          </div>
        )}
      </div>

      {/* Edit/Add Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedPackage
                ? "Chỉnh sửa gói dịch vụ"
                : "Thêm gói dịch vụ mới"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên gói</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  placeholder="VD: Gói Cơ bản"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Loại gói</Label>
                <Select
                  value={editForm.type}
                  onValueChange={(
                    value: "standard" | "premium" | "basic" | "custom"
                  ) => setEditForm({ ...editForm, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại" />
                  </SelectTrigger>
                  <SelectContent>
                    {packageTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Mô tả ngắn</Label>
              <Input
                id="description"
                value={editForm.description}
                onChange={(e) =>
                  setEditForm({ ...editForm, description: e.target.value })
                }
                placeholder="Mô tả ngắn gọn về gói dịch vụ"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Giá hiển thị</Label>
                <Input
                  id="price"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                  placeholder="VD: 5,000,000₫ hoặc Liên hệ"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="originalPrice">Giá gốc (tùy chọn)</Label>
                <Input
                  id="originalPrice"
                  value={editForm.originalPrice}
                  onChange={(e) =>
                    setEditForm({ ...editForm, originalPrice: e.target.value })
                  }
                  placeholder="VD: 6,500,000₫"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="recommended"
                checked={editForm.recommended}
                onCheckedChange={(checked) =>
                  setEditForm({ ...editForm, recommended: checked })
                }
              />
              <Label htmlFor="recommended">Đánh dấu là gói được đề xuất</Label>
            </div>

            <Separator />

            <div className="space-y-4">
              <Label>Danh sách tính năng</Label>

              <div className="flex space-x-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Thêm tính năng mới"
                  onKeyDown={(e) => e.key === "Enter" && handleAddFeature()}
                />
                <Button type="button" onClick={handleAddFeature}>
                  Thêm
                </Button>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto">
                {editForm.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted rounded-md"
                  >
                    <span>{feature}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveFeature(index)}
                      className="h-8 w-8 text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                {editForm.features.length === 0 && (
                  <p className="text-sm text-muted-foreground italic">
                    Chưa có tính năng nào. Thêm tính năng để hiển thị trong gói
                    dịch vụ.
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleSave}>Lưu</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
