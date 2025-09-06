import { useState } from "react";
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
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { 
  Trash2, 
  Search,
  Eye,
  Mail,
  Phone,
  Calendar,
  Check
} from "lucide-react";
import { Contact } from "@/types/admin";

// Mock data for contact form submissions
const mockContacts: Contact[] = Array.from({ length: 20 }, (_, i) => ({
  id: `contact-${i + 1}`,
  name: `Khách hàng ${i + 1}`,
  email: `khach${i + 1}@example.com`,
  phone: `09${Math.floor(10000000 + Math.random() * 90000000)}`,
  message: `Tôi muốn đặt dịch vụ cho đám cưới vào tháng ${Math.floor(1 + Math.random() * 12)}. ${
    Math.random() > 0.5 ? 'Vui lòng liên hệ với tôi qua số điện thoại.' : 'Mong được phản hồi sớm qua email.'
  }`,
  eventDate: `202${Math.floor(3 + Math.random() * 2)}-${String(Math.floor(1 + Math.random() * 12)).padStart(2, '0')}-${String(Math.floor(1 + Math.random() * 28)).padStart(2, '0')}`,
  service: ['Mâm quả', 'Hoa cưới', 'Trang trí tiệc', 'Xe hoa'][Math.floor(Math.random() * 4)],
  status: Math.random() > 0.3 ? 'read' : 'unread',
  createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString(),
}));

// Status options
const STATUS_OPTIONS = [
  { value: "all", label: "Tất cả" },
  { value: "unread", label: "Chưa đọc" },
  { value: "read", label: "Đã đọc" },
];

// Service options
const SERVICE_OPTIONS = [
  { value: "all", label: "Tất cả dịch vụ" },
  { value: "Mâm quả", label: "Mâm quả" },
  { value: "Hoa cưới", label: "Hoa cưới" },
  { value: "Trang trí tiệc", label: "Trang trí tiệc" },
  { value: "Xe hoa", label: "Xe hoa" },
];

export default function ContactsManager() {
  // State
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  
  const itemsPerPage = 10;
  
  // Filter contacts
  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = search === "" || 
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.email.toLowerCase().includes(search.toLowerCase()) ||
      contact.phone.includes(search) ||
      contact.message.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || contact.status === statusFilter;
    const matchesService = serviceFilter === "all" || contact.service === serviceFilter;
    
    return matchesSearch && matchesStatus && matchesService;
  });
  
  // Sort contacts - newest first
  const sortedContacts = [...filteredContacts].sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  
  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = sortedContacts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedContacts.length / itemsPerPage);
  
  // Handle search change
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };
  
  // Mark as read
  const handleMarkAsRead = (id: string) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, status: "read" } : contact
    ));
  };
  
  // Delete contact
  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa liên hệ này?')) {
      setContacts(contacts.filter(contact => contact.id !== id));
    }
  };
  
  // View contact details
  const handleViewClick = (contact: Contact) => {
    setSelectedContact(contact);
    setViewDialogOpen(true);
    
    // Mark as read when viewed
    if (contact.status === "unread") {
      handleMarkAsRead(contact.id);
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Quản lý Liên hệ</h1>
        
        <div>
          <Badge variant="outline" className="font-normal">
            {contacts.filter(c => c.status === "unread").length} chưa đọc
          </Badge>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Tìm kiếm liên hệ..."
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

        <Select value={serviceFilter} onValueChange={setServiceFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Dịch vụ" />
          </SelectTrigger>
          <SelectContent>
            {SERVICE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Contacts Table */}
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Trạng thái</TableHead>
              <TableHead>Khách hàng</TableHead>
              <TableHead>Dịch vụ</TableHead>
              <TableHead>Ngày sự kiện</TableHead>
              <TableHead>Ngày nhận</TableHead>
              <TableHead className="text-right">Thao tác</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentContacts.length > 0 ? (
              currentContacts.map((contact) => (
                <TableRow key={contact.id} className={contact.status === "unread" ? "bg-blue-50" : ""}>
                  <TableCell>
                    <Badge variant={contact.status === "unread" ? "secondary" : "outline"}>
                      {contact.status === "unread" ? "Chưa đọc" : "Đã đọc"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{contact.name}</div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Mail className="h-3 w-3 mr-1" />
                        {contact.email}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Phone className="h-3 w-3 mr-1" />
                        {contact.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{contact.service}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                      {contact.eventDate}
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(contact.createdAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleViewClick(contact)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      {contact.status === "unread" && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-green-500 hover:text-green-700 hover:bg-green-50"
                          onClick={() => handleMarkAsRead(contact.id)}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        onClick={() => handleDelete(contact.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                  Không tìm thấy liên hệ nào
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
            <DialogTitle>Chi tiết liên hệ</DialogTitle>
          </DialogHeader>
          
          {selectedContact && (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg">{selectedContact.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 mr-1" />
                  {selectedContact.email}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 mr-1" />
                  {selectedContact.phone}
                </div>
              </div>
              
              <div className="flex justify-between">
                <div className="text-sm">
                  <span className="font-medium">Dịch vụ:</span> {selectedContact.service}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Ngày sự kiện:</span> {selectedContact.eventDate}
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium text-sm mb-2">Nội dung tin nhắn:</h4>
                <p className="text-muted-foreground">{selectedContact.message}</p>
              </div>
              
              <div className="text-xs text-muted-foreground border-t pt-2">
                Ngày nhận: {formatDate(selectedContact.createdAt)}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}