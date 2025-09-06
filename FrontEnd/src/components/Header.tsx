import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const isActiveParentLink = (basePath: string) => {
    return location.pathname.startsWith(basePath);
  };

  return (
    <header className="bg-white border-b border-border sticky top-0 z-40">
      {/* Top bar */}
      <div className="bg-primary text-white py-2">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <p className="text-xs md:text-sm">Dịch vụ tráp cưới và hoa cưới truyền thống Việt Nam</p>
          <a href="tel:+84123456789" className="flex items-center text-xs md:text-sm hover:text-ivory-100">
            <Phone className="h-3 w-3 md:h-4 md:w-4 mr-1" /> 0123 456 789
          </a>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-cormorant text-2xl md:text-3xl font-bold text-primary">Thiên Di</span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActiveLink('/') && "bg-muted text-primary"
                  )}
                >
                  <Link to="/">Trang chủ</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActiveLink('/gioi-thieu') && "bg-muted text-primary"
                  )}
                >
                  <Link to="/gioi-thieu">Giới thiệu</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuTrigger 
                  className={cn(
                    isActiveParentLink('/san-pham') && "bg-muted text-primary"
                  )}
                >
                  Sản phẩm
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          to="/san-pham"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-burgundy-50 to-burgundy-100 p-6 no-underline outline-none focus:shadow-md"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-primary">
                            Tất cả sản phẩm
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Khám phá tất cả sản phẩm và dịch vụ của Thiên Di
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/san-pham/trap-cuoi"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Tráp cưới</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Tráp cưới truyền thống và hiện đại
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/san-pham/hoa-cuoi"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Hoa cưới</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Bó hoa cưới đẹp và ý nghĩa
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          to="/san-pham/trang-tri-xe-cuoi"
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        >
                          <div className="text-sm font-medium leading-none">Trang trí xe cưới</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Dịch vụ trang trí xe cưới độc đáo
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActiveLink('/bo-suu-tap') && "bg-muted text-primary"
                  )}
                >
                  <Link to="/bo-suu-tap">Bộ sưu tập</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    (isActiveLink('/blog') || isActiveParentLink('/blog/')) && "bg-muted text-primary"
                  )}
                >
                  <Link to="/blog">Blog</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActiveLink('/lien-he') && "bg-muted text-primary"
                  )}
                >
                  <Link to="/lien-he">Liên hệ</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Contact button - desktop */}
          <div className="hidden lg:block">
            <Button asChild className="rounded-full">
              <Link to="/lien-he">
                Liên hệ ngay
              </Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-border">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-2">
              <Link
                to="/"
                className={`px-4 py-2 rounded-md ${isActiveLink('/') ? 'bg-muted text-primary' : 'hover:bg-muted'}`}
                onClick={toggleMenu}
              >
                Trang chủ
              </Link>
              <Link
                to="/gioi-thieu"
                className={`px-4 py-2 rounded-md ${isActiveLink('/gioi-thieu') ? 'bg-muted text-primary' : 'hover:bg-muted'}`}
                onClick={toggleMenu}
              >
                Giới thiệu
              </Link>
              <div className="relative">
                <div className={`px-4 py-2 rounded-md flex justify-between items-center ${isActiveParentLink('/san-pham') ? 'bg-muted text-primary' : 'hover:bg-muted'}`}>
                  <span>Sản phẩm</span>
                  <ChevronDown className="h-4 w-4" />
                </div>
                <div className="pl-6 mt-1 flex flex-col space-y-1">
                  <Link
                    to="/san-pham"
                    className="px-4 py-1 rounded-md hover:bg-muted"
                    onClick={toggleMenu}
                  >
                    Tất cả sản phẩm
                  </Link>
                  <Link
                    to="/san-pham/trap-cuoi"
                    className="px-4 py-1 rounded-md hover:bg-muted"
                    onClick={toggleMenu}
                  >
                    Tráp cưới
                  </Link>
                  <Link
                    to="/san-pham/hoa-cuoi"
                    className="px-4 py-1 rounded-md hover:bg-muted"
                    onClick={toggleMenu}
                  >
                    Hoa cưới
                  </Link>
                  <Link
                    to="/san-pham/trang-tri-xe-cuoi"
                    className="px-4 py-1 rounded-md hover:bg-muted"
                    onClick={toggleMenu}
                  >
                    Trang trí xe cưới
                  </Link>
                </div>
              </div>
              <Link
                to="/bo-suu-tap"
                className={`px-4 py-2 rounded-md ${isActiveLink('/bo-suu-tap') ? 'bg-muted text-primary' : 'hover:bg-muted'}`}
                onClick={toggleMenu}
              >
                Bộ sưu tập
              </Link>
              <Link
                to="/blog"
                className={`px-4 py-2 rounded-md ${isActiveLink('/blog') ? 'bg-muted text-primary' : 'hover:bg-muted'}`}
                onClick={toggleMenu}
              >
                Blog
              </Link>
              <Link
                to="/lien-he"
                className={`px-4 py-2 rounded-md ${isActiveLink('/lien-he') ? 'bg-muted text-primary' : 'hover:bg-muted'}`}
                onClick={toggleMenu}
              >
                Liên hệ
              </Link>
              <div className="pt-2">
                <Button asChild className="w-full rounded-full">
                  <Link to="/lien-he" onClick={toggleMenu}>
                    Liên hệ ngay
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}