import { useState } from "react";
import { testimonials } from "@/lib/data5";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { 
  Check, 
  X, 
  Eye, 
  Trash2, 
  Edit, 
  Search,
  Star,
  StarHalf
} from "lucide-react";
import { Review, ReviewEditForm } from "@/types/admin";

// Sort options
const SORT_OPTIONS = [
  { value: "newest", label: "Mới nhất" },
  { value: "oldest", label: "Cũ nhất" },
  { value: "highest", label: "Đánh giá cao nhất" },
];

// Status options
const STATUS_OPTIONS = [
  { value: "all", label: "Tất cả" },
  { value: "approved", label: "Đã duyệt" },
  { value: "pending", label: "Chờ duyệt" },
  { value: "rejected", label: "Từ chối" },
];

export default function ReviewsManager() {
  // Add status to testimonials for admin management
  const reviewsWithStatus: Review[] = testimonials.map(review => ({
    ...review,
    status: Math.random() > 0.2 ? "approved" : (Math.random() > 0.5 ? "pending" : "rejected"),
    rating: Math.floor(Math.random() * 2) + 4, // Random rating between 4-5
  }));
  
  // State
  const [reviews, setReviews] = useState<Review[]>(reviewsWithStatus);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  
  // Edit form state
  const [editForm, setEditForm] = useState<ReviewEditForm>({
    name: "",
    eventDate: "",
    rating: 5,
    quote: "",
    status: "approved"
  });
  
  const itemsPerPage = 8;
  
  // Filter and sort reviews
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = search === "" || 
      review.name.toLowerCase().includes(search.toLowerCase()) ||
      review.quote.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || review.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
    } else if (sortBy === "oldest") {
      return new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime();
    } else if (sortBy === "highest") {
      return b.rating - a.rating;
    }
    return 0;
  });
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentReviews = sortedReviews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedReviews.length / itemsPerPage);
  
  // Handle search change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };
  
  // Handle status change for a review
  const handleStatusChange = (id: string, newStatus: "approved" | "pending" | "rejected") => {
    setReviews(reviews.map(review => 
      review.id === id ? { ...review, status: newStatus } : review
    ));
  };
  
  // Delete review
  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
      setReviews(reviews.filter(review => review.id !== id));
    }
  };
  
  // Open edit dialog
  const handleEditClick = (review: Review) => {
    setSelectedReview(review);
    setEditForm({
      name: review.name,
      eventDate: review.eventDate,
      rating: review.rating,
      quote: review.quote,
      status: review.status
    });
    setEditDialogOpen(true);
  };
  
  // Save edited review
  const handleSaveEdit = () => {
    if (selectedReview) {
      setReviews(reviews.map(review => 
        review.id === selectedReview.id ? { 
          ...review, 
          name: editForm.name,
          eventDate: editForm.eventDate,
          rating: editForm.rating,
          quote: editForm.quote,
          status: editForm.status as "approved" | "pending" | "rejected"
        } : review
      ));
      setEditDialogOpen(false);
    }
  };
  
  // View review details
  const handleViewClick = (review: Review) => {
    setSelectedReview(review);
    setViewDialogOpen(true);
  };
  
  // Render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
    }
    
    return stars;
  };
  
  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'approved':
        return <Badge className="bg-green-500">Đã duyệt</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Chờ duyệt</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Từ chối</Badge>;
      default:
        return <Badge variant="outline">Không xác định</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Đánh giá Khách hàng</h1>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm đánh giá..."
            className="pl-8"
            value={search}
            onChange={handleSearch}
          />
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Trạng thái" />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sắp xếp" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Reviews Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Đánh giá</TableHead>
              <TableHead>Ngày sự kiện</TableHead>
              <TableHead>Trạng thái</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentReviews.length > 0 ? (
              currentReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 overflow-hidden rounded-full">
                        <img 
                          src={review.image} 
                          alt={review.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{review.name}</div>
                        <div className="flex">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="line-clamp-2 max-w-[300px] text-sm text-muted-foreground">
                      "{review.quote}"
                    </p>
                  </TableCell>
                  <TableCell>{review.eventDate}</TableCell>
                  <TableCell>{getStatusBadge(review.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewClick(review)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEditClick(review)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      {review.status === "pending" && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-green-500 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleStatusChange(review.id, "approved")}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleStatusChange(review.id, "rejected")}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(review.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6 text-muted-foreground">
                  Không tìm thấy đánh giá nào
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Chi tiết đánh giá</DialogTitle>
          </DialogHeader>
          
          {selectedReview && (
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-16 w-16 overflow-hidden rounded-full">
                  <img 
                    src={selectedReview.image} 
                    alt={selectedReview.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{selectedReview.name}</h3>
                  <div className="flex">
                    {renderStars(selectedReview.rating)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ngày sự kiện: {selectedReview.eventDate}
                  </p>
                </div>
              </div>
              
              <div>
                <p className="italic text-muted-foreground">"{selectedReview.quote}"</p>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  Trạng thái: {getStatusBadge(selectedReview.status)}
                </div>
                
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setViewDialogOpen(false);
                      handleEditClick(selectedReview);
                    }}
                  >
                    <Edit className="h-4 w-4 mr-2" /> Chỉnh sửa
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => {
                      setViewDialogOpen(false);
                      handleDelete(selectedReview.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 mr-2" /> Xóa
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa đánh giá</DialogTitle>
          </DialogHeader>
          
          {selectedReview && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Tên khách hàng</Label>
                  <Input 
                    id="name"
                    value={editForm.name} 
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="eventDate">Ngày sự kiện</Label>
                  <Input 
                    id="eventDate"
                    value={editForm.eventDate} 
                    onChange={(e) => setEditForm({...editForm, eventDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="rating">Đánh giá</Label>
                <Select 
                  value={editForm.rating.toString()} 
                  onValueChange={(value) => setEditForm({...editForm, rating: parseInt(value)})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn đánh giá" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 sao</SelectItem>
                    <SelectItem value="4">4 sao</SelectItem>
                    <SelectItem value="3">3 sao</SelectItem>
                    <SelectItem value="2">2 sao</SelectItem>
                    <SelectItem value="1">1 sao</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Trạng thái</Label>
                <Select 
                  value={editForm.status} 
                  onValueChange={(value) => setEditForm({...editForm, status: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn trạng thái" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">Đã duyệt</SelectItem>
                    <SelectItem value="pending">Chờ duyệt</SelectItem>
                    <SelectItem value="rejected">Từ chối</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quote">Nội dung đánh giá</Label>
                <Textarea 
                  id="quote"
                  value={editForm.quote} 
                  onChange={(e) => setEditForm({...editForm, quote: e.target.value})}
                  rows={4}
                />
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Hủy</Button>
                <Button onClick={handleSaveEdit}>Lưu thay đổi</Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}