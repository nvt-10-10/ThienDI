import { ReactNode, useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Image as ImageIcon,
  FileText,
  Star,
  MessageSquare,
  BadgeDollarSign,
  HelpCircle,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface AdminLayoutProps {
  children: ReactNode;
}

interface MenuItem {
  title: string;
  icon: ReactNode;
  href: string;
  items?: { title: string; href: string }[];
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if admin is authenticated
    const isAuthenticated =
      localStorage.getItem("adminAuthenticated") === "true";
    if (!isAuthenticated && location.pathname !== "/admin/login") {
      navigate("/admin/login");
    }
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated");
    navigate("/admin/login");
  };

  const menuItems: MenuItem[] = [
    {
      title: "Tổng quan",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/admin/dashboard",
    },
    {
      title: "Sản phẩm",
      icon: <Package className="h-5 w-5" />,
      href: "/admin/products",
      items: [
        { title: "Tất cả sản phẩm", href: "/admin/products" },
        { title: "Thêm sản phẩm", href: "/admin/products/create" },
        { title: "Danh mục", href: "/admin/products/categories" },
      ],
    },
    {
      title: "Thư viện",
      icon: <ImageIcon className="h-5 w-5" />,
      href: "/admin/gallery",
    },
    {
      title: "Bài viết",
      icon: <FileText className="h-5 w-5" />,
      href: "/admin/blog",
      items: [
        { title: "Tất cả bài viết", href: "/admin/blog" },
        { title: "Thêm bài viết", href: "/admin/blog/create" },
        { title: "Danh mục", href: "/admin/blog/categories" },
      ],
    },
    {
      title: "Đánh giá",
      icon: <Star className="h-5 w-5" />,
      href: "/admin/reviews",
    },
    {
      title: "Liên hệ",
      icon: <MessageSquare className="h-5 w-5" />,
      href: "/admin/contacts",
    },
    {
      title: "Bảng giá",
      icon: <BadgeDollarSign className="h-5 w-5" />,
      href: "/admin/pricing",
    },
    {
      title: "Hỏi & Đáp",
      icon: <HelpCircle className="h-5 w-5" />,
      href: "/admin/faq",
    },
  ];

  const isActiveLink = (href: string) => {
    return location.pathname === href;
  };

  const isActiveParentLink = (href: string) => {
    return location.pathname.startsWith(href);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <Sheet>
        <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <Link to="/admin/dashboard" className="flex items-center">
            <span className="font-cormorant text-xl font-bold text-primary">
              Thiên Di - Admin
            </span>
          </Link>

          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="h-9 w-9 p-0">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
        </div>

        <SheetContent side="left" className="p-0">
          <div className="p-4 border-b">
            <Link to="/admin/dashboard" className="flex items-center">
              <span className="font-cormorant text-xl font-bold text-primary">
                Thiên Di - Admin
              </span>
            </Link>
          </div>

          <nav className="p-2">
            {menuItems.map((item, i) =>
              item.items ? (
                <Collapsible key={i} className="w-full">
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded-md">
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {item.items.map((subItem, j) => (
                      <Link
                        key={j}
                        to={subItem.href}
                        className={cn(
                          "flex items-center p-2 pl-10 hover:bg-gray-100 rounded-md",
                          isActiveLink(subItem.href)
                            ? "bg-gray-100 text-primary font-medium"
                            : ""
                        )}
                      >
                        <span>{subItem.title}</span>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  key={i}
                  to={item.href}
                  className={cn(
                    "flex items-center p-2 hover:bg-gray-100 rounded-md",
                    isActiveLink(item.href)
                      ? "bg-gray-100 text-primary font-medium"
                      : ""
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              )
            )}

            <button
              onClick={handleLogout}
              className="flex items-center w-full p-2 mt-2 text-red-600 hover:bg-gray-100 rounded-md"
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-3">Đăng xuất</span>
            </button>
          </nav>
        </SheetContent>
      </Sheet>

      {/* Desktop layout */}
      <div className="flex h-screen lg:overflow-hidden">
        {/* Sidebar */}
        <aside className="hidden lg:flex lg:w-64 flex-col fixed inset-y-0 border-r border-gray-200 bg-white">
          {/* Logo */}
          <div className="p-4 border-b">
            <Link to="/admin/dashboard" className="flex items-center">
              <span className="font-cormorant text-xl font-bold text-primary">
                Thiên Di - Admin
              </span>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-4 overflow-y-auto">
            {menuItems.map((item, i) =>
              item.items ? (
                <Collapsible key={i} className="w-full mb-1">
                  <CollapsibleTrigger
                    className={cn(
                      "flex items-center justify-between w-full p-2 hover:bg-gray-100 rounded-md",
                      isActiveParentLink(item.href)
                        ? "bg-gray-100 text-primary font-medium"
                        : ""
                    )}
                  >
                    <div className="flex items-center">
                      {item.icon}
                      <span className="ml-3">{item.title}</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    {item.items.map((subItem, j) => (
                      <Link
                        key={j}
                        to={subItem.href}
                        className={cn(
                          "flex items-center p-2 pl-10 hover:bg-gray-100 rounded-md",
                          isActiveLink(subItem.href)
                            ? "bg-gray-100 text-primary font-medium"
                            : ""
                        )}
                      >
                        <span>{subItem.title}</span>
                      </Link>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              ) : (
                <Link
                  key={i}
                  to={item.href}
                  className={cn(
                    "flex items-center p-2 mb-1 hover:bg-gray-100 rounded-md",
                    isActiveLink(item.href)
                      ? "bg-gray-100 text-primary font-medium"
                      : ""
                  )}
                >
                  {item.icon}
                  <span className="ml-3">{item.title}</span>
                </Link>
              )
            )}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t">
            <button
              onClick={handleLogout}
              className="flex items-center w-full p-2 text-red-600 hover:bg-gray-100 rounded-md"
            >
              <LogOut className="h-5 w-5" />
              <span className="ml-3">Đăng xuất</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="lg:pl-64 pt-16 lg:pt-0 flex-1 min-w-0 overflow-auto">
          <div className="container py-8 px-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
