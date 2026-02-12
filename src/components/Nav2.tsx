import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  Heart,
  LogOut,
  Package,
  Store,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useUser } from "@/context/UserContext";
import { useLogout } from "@/api/user";
import { useSocketForCart } from "@/context/SocketContext";

export default function EcommerceNavbar() {
  const { isAuthenticated } = useUser();
  const [scrolled, setScrolled] = useState(false);

  const { mutate, isPending } = useLogout();
  const navigate = useNavigate();

  const logout = () => {
    mutate();
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    navigate("/search");
  };

  const { totalItemsInCart } = useSocketForCart();

  return (
    <nav
      className={`sticky top-0 z-50 w-full border-b bg-white transition-shadow ${
        scrolled ? "shadow-md" : "shadow-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="flex flex-col gap-6 py-6">
                <Link to="/" className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700">
                    <Store className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    Verdant
                  </span>
                </Link>

                <div className="flex flex-col gap-1">
                  <Link
                    to="/"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-indigo-600"
                  >
                    Home
                  </Link>
                  <Link
                    to="/shop"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-indigo-600"
                  >
                    Shop
                  </Link>
                  <Link
                    to="/new-arrivals"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-indigo-600"
                  >
                    New Arrivals
                  </Link>
                  <Link
                    to="/about"
                    className="rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-indigo-600"
                  >
                    About
                  </Link>
                </div>

                {isAuthenticated && (
                  <div className="mt-auto border-t pt-4">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                    >
                      <Package className="h-4 w-4" />
                      Orders
                    </Link>
                    <button
                      onClick={logout}
                      disabled={isPending}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-indigo-700 shadow-sm">
              <Store className="h-5 w-5 text-white" />
            </div>
            <span className="hidden text-xl font-bold text-gray-900 sm:inline-block">
              Verdant
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-6 md:flex">
            <Link
              to="/"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-indigo-600"
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-indigo-600"
            >
              Shop
            </Link>
            <Link
              to="/new-arrivals"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-indigo-600"
            >
              New Arrivals
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium text-gray-700 transition-colors hover:text-indigo-600"
            >
              About
            </Link>
          </div>

          {/* Search & Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden md:block">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="h-9 w-64 pl-9 pr-4"
                  onClick={handleSearch}
                />
              </div>
            </div>

            {/* Wishlist */}
            <Link to="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItemsInCart && totalItemsInCart > 0 && (
                  <Badge className="absolute -right-1 -top-1 h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-xs">
                    {totalItemsInCart}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage alt="User" />
                      <AvatarFallback className="bg-indigo-600 text-white text-sm">
                        U
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/orders" className="flex items-center">
                      <Package className="mr-2 h-4 w-4" />
                      Orders
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wishlist" className="flex items-center">
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    disabled={isPending}
                    className="text-red-600 focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden items-center gap-2 sm:flex">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
