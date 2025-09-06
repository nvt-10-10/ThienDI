import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="font-cormorant text-2xl font-medium text-white mb-4">Thiên Di</h3>
            <p className="text-gray-300 mb-6">
              Dịch vụ tráp cưới và hoa cưới truyền thống Việt Nam, mang đến những sản phẩm tinh tế, tỉ mỉ và ý nghĩa cho ngày trọng đại của bạn.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-white mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/gioi-thieu" className="text-gray-300 hover:text-primary transition-colors">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link to="/san-pham" className="text-gray-300 hover:text-primary transition-colors">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link to="/bo-suu-tap" className="text-gray-300 hover:text-primary transition-colors">
                  Bộ sưu tập
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/bang-gia" className="text-gray-300 hover:text-primary transition-colors">
                  Bảng giá
                </Link>
              </li>
              <li>
                <Link to="/hoi-dap" className="text-gray-300 hover:text-primary transition-colors">
                  Hỏi & Đáp
                </Link>
              </li>
              <li>
                <Link to="/lien-he" className="text-gray-300 hover:text-primary transition-colors">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-medium text-white mb-4">Thông tin liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex">
                <MapPin className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <span className="text-gray-300">123 Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex">
                <Phone className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <a href="tel:+84123456789" className="text-gray-300 hover:text-primary transition-colors">
                  0123 456 789
                </a>
              </li>
              <li className="flex">
                <Mail className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <a href="mailto:info@thiendi.vn" className="text-gray-300 hover:text-primary transition-colors">
                  info@thiendi.vn
                </a>
              </li>
              <li className="flex">
                <Clock className="h-5 w-5 text-primary mr-2 flex-shrink-0" />
                <div className="text-gray-300">
                  <div>Thứ Hai - Thứ Bảy: 8:00 - 18:00</div>
                  <div>Chủ Nhật: 8:00 - 12:00</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-medium text-white mb-4">Đăng ký nhận tin</h3>
            <p className="text-gray-300 mb-4">
              Đăng ký nhận thông tin mới nhất về sản phẩm và khuyến mãi từ Thiên Di.
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Email của bạn"
                className="bg-gray-800 border-gray-700 text-white"
              />
              <Button type="submit">
                Đăng ký
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-gray-950 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Thiên Di. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <Link to="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Điều khoản sử dụng
              </Link>
              <Link to="#" className="text-gray-400 hover:text-primary transition-colors text-sm">
                Chính sách bảo mật
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}