import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Plus, Edit, Trash2, GripVertical, ChevronDown, ChevronUp } from "lucide-react";
import { FAQ, FAQForm } from "@/types/admin";

// Mock FAQ data
const initialFaqs: FAQ[] = [
  {
    id: "faq-1",
    question: "Mâm quả cưới hỏi gồm những gì?",
    answer: "Mâm quả cưới hỏi truyền thống thường gồm trầu cau, rượu, trà, thuốc lá, bánh, hoa quả, và các lễ vật khác tùy theo phong tục địa phương. Thiên Di cung cấp các dịch vụ mâm quả đầy đủ theo yêu cầu của khách hàng."
  },
  {
    id: "faq-2",
    question: "Hoa cưới có những loại hoa nào?",
    answer: "Hoa cưới tại Thiên Di có đa dạng các loại hoa như hoa hồng, cẩm tú cầu, lily, cát tường, baby, lan hồ điệp... Khách hàng có thể lựa chọn theo sở thích và phong cách cưới."
  },
  {
    id: "faq-3",
    question: "Thiên Di có dịch vụ trang trí tiệc cưới không?",
    answer: "Có, Thiên Di cung cấp dịch vụ trang trí tiệc cưới trọn gói từ backdrop, cổng hoa, bàn tiệc, lối đi, đến các chi tiết trang trí khác theo chủ đề hoặc màu sắc yêu cầu."
  },
  {
    id: "faq-4",
    question: "Thời gian đặt dịch vụ trước bao lâu là hợp lý?",
    answer: "Để đảm bảo dịch vụ tốt nhất, khách hàng nên đặt trước ít nhất 1-3 tháng tùy theo quy mô và mùa cưới. Mùa cưới cao điểm (tháng 9-12) nên đặt trước 3-6 tháng."
  },
  {
    id: "faq-5",
    question: "Thiên Di có hỗ trợ thiết kế theo yêu cầu không?",
    answer: "Có, Thiên Di luôn sẵn sàng lắng nghe và thiết kế theo yêu cầu riêng của từng cặp đôi, từ phong cách, màu sắc đến chi tiết trang trí để tạo nên đám cưới độc đáo và ấn tượng."
  },
  {
    id: "faq-6",
    question: "Làm thế nào để đặt lịch tư vấn?",
    answer: "Khách hàng có thể đặt lịch tư vấn qua số điện thoại, form liên hệ trên website hoặc fanpage của Thiên Di. Chúng tôi sẽ liên hệ lại trong vòng 24 giờ để xác nhận lịch hẹn."
  },
];

export default function FaqManager() {
  // State
  const [faqs, setFaqs] = useState<FAQ[]>(initialFaqs);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedFaq, setSelectedFaq] = useState<FAQ | null>(null);
  const [newFaq, setNewFaq] = useState<FAQForm>({ question: "", answer: "" });
  
  // Open edit dialog
  const handleEditClick = (faq: FAQ) => {
    setSelectedFaq(faq);
    setNewFaq({ question: faq.question, answer: faq.answer });
    setEditDialogOpen(true);
  };
  
  // Handle add new FAQ
  const handleAddNew = () => {
    setSelectedFaq(null);
    setNewFaq({ question: "", answer: "" });
    setEditDialogOpen(true);
  };
  
  // Save FAQ
  const handleSave = () => {
    if (newFaq.question.trim() === "" || newFaq.answer.trim() === "") {
      alert("Vui lòng điền đầy đủ câu hỏi và câu trả lời");
      return;
    }
    
    if (selectedFaq) {
      // Update existing FAQ
      setFaqs(faqs.map(faq => 
        faq.id === selectedFaq.id ? { ...faq, ...newFaq } : faq
      ));
    } else {
      // Add new FAQ
      setFaqs([...faqs, {
        id: `faq-${Date.now()}`,
        ...newFaq
      }]);
    }
    
    setEditDialogOpen(false);
  };
  
  // Delete FAQ
  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa câu hỏi này?')) {
      setFaqs(faqs.filter(faq => faq.id !== id));
    }
  };
  
  // Move FAQ up
  const handleMoveUp = (index: number) => {
    if (index > 0) {
      const newFaqs = [...faqs];
      [newFaqs[index], newFaqs[index - 1]] = [newFaqs[index - 1], newFaqs[index]];
      setFaqs(newFaqs);
    }
  };
  
  // Move FAQ down
  const handleMoveDown = (index: number) => {
    if (index < faqs.length - 1) {
      const newFaqs = [...faqs];
      [newFaqs[index], newFaqs[index + 1]] = [newFaqs[index + 1], newFaqs[index]];
      setFaqs(newFaqs);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-semibold">Quản lý Câu hỏi thường gặp</h1>
        
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" /> Thêm câu hỏi
        </Button>
      </div>
      
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={faq.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <CardTitle className="text-lg">{faq.question}</CardTitle>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleMoveUp(index)}
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleMoveDown(index)}
                    disabled={index === faqs.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => handleEditClick(faq)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(faq.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
        
        {faqs.length === 0 && (
          <div className="text-center py-12 border rounded-md">
            <p className="text-muted-foreground">Chưa có câu hỏi nào</p>
            <Button variant="outline" className="mt-4" onClick={handleAddNew}>
              <Plus className="h-4 w-4 mr-2" /> Thêm câu hỏi đầu tiên
            </Button>
          </div>
        )}
      </div>
      
      {/* Edit/Add Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {selectedFaq ? "Chỉnh sửa câu hỏi" : "Thêm câu hỏi mới"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="question" className="text-sm font-medium">
                Câu hỏi
              </label>
              <Input
                id="question"
                value={newFaq.question}
                onChange={(e) => setNewFaq({...newFaq, question: e.target.value})}
                placeholder="Nhập câu hỏi"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="answer" className="text-sm font-medium">
                Câu trả lời
              </label>
              <Textarea
                id="answer"
                value={newFaq.answer}
                onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})}
                placeholder="Nhập câu trả lời"
                rows={6}
              />
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