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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  Heart,
  LogOut,
  Package,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useUser } from "@/context/UserContext";
import { useLogout } from "@/api/user";
import { useSocketForCart } from "@/context/SocketContext";

export default function EcommerceNavbar() {
  const { isAuthenticated } = useUser();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { mutate, isPending } = useLogout();

  const navigate = useNavigate();

  const logout = () => {
    mutate();
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    navigate("/search");
  };

  const { totalItemsInCart } = useSocketForCart();

  return (
    <header
      className={`border-b border-slate-100 bg-white sticky top-0 z-40 transition-all duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      {/* Announcement bar */}

      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-72 border-r border-slate-100"
            >
              <div className="flex flex-col gap-6 py-6">
                <Link to="/" className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                    <svg
                      className="h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                      <line x1="7" y1="7" x2="7.01" y2="7"></line>
                    </svg>
                  </div>
                  <span className="text-xl font-bold text-slate-900">
                    Verdant
                  </span>
                </Link>
                <nav className="flex flex-col gap-1">
                  <Link
                    to="/"
                    className="text-slate-700 hover:text-emerald-600 font-medium px-3 py-2 rounded-md hover:bg-slate-50 transition-all"
                  >
                    Home
                  </Link>
                  <Link
                    to="/shop"
                    className="text-slate-700 hover:text-emerald-600 font-medium px-3 py-2 rounded-md hover:bg-slate-50 transition-all"
                  >
                    Shop
                  </Link>
                  <Link
                    to="/categories"
                    className="text-slate-700 hover:text-emerald-600 font-medium px-3 py-2 rounded-md hover:bg-slate-50 transition-all"
                  >
                    Categories
                  </Link>
                  <Link
                    to="/new-arrivals"
                    className="text-slate-700 hover:text-emerald-600 font-medium px-3 py-2 rounded-md hover:bg-slate-50 transition-all"
                  >
                    New Arrivals
                  </Link>
                  {/* <Link
                    to="/sale"
                    className="text-slate-700 hover:text-emerald-600 font-medium px-3 py-2 rounded-md hover:bg-slate-50 transition-all"
                  >
                    Sale
                  </Link> */}
                  <Link
                    to="/about"
                    className="text-slate-700 hover:text-emerald-600 font-medium px-3 py-2 rounded-md hover:bg-slate-50 transition-all"
                  >
                    About Us
                  </Link>
                </nav>
                <div className="flex flex-col gap-2 mt-auto">
                  {isAuthenticated ? (
                    <>
                      <Link
                        to="/profile"
                        className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 font-medium px-3 py-2 rounded-md hover:bg-slate-50 transition-all"
                      >
                        <User className="h-4 w-4" />
                        My Profile
                      </Link>
                      <Link
                        to="/orders"
                        className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 font-medium px-3 py-2 rounded-md hover:bg-slate-50 transition-all"
                      >
                        <Package className="h-4 w-4" />
                        My Orders
                      </Link>
                      <Link
                        to="/wishlist"
                        className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 font-medium px-3 py-2 rounded-md hover:bg-slate-50 transition-all"
                      >
                        <Heart className="h-4 w-4" />
                        Wishlist
                      </Link>
                      <button
                        // onClick={toggleLoginStatus}
                        className="flex items-center gap-2 text-slate-700 hover:text-emerald-600 font-medium px-3 py-2 rounded-md hover:bg-slate-50 transition-all mt-2"
                      >
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Button
                        // onClick={toggleLoginStatus}
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-0"
                      >
                        Login
                      </Button>
                      <Link to="/register" className="w-full">
                        <Button
                          variant="outline"
                          className="border-slate-200 w-full"
                        >
                          Register
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <div className="flex">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center group-hover:shadow-md transition-all group-hover:scale-105">
                <svg
                  className="h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                  <line x1="7" y1="7" x2="7.01" y2="7"></line>
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-900 hidden sm:inline-block group-hover:text-emerald-600 transition-colors">
                Verdant
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link
                  to="/"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors"
                >
                  Home
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-slate-700 hover:text-emerald-600 h-10">
                  Shop
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <Link
                        className="flex h-full w-full select-none flex-col justify-end rounded-xl bg-gradient-to-b from-emerald-500 to-teal-600 p-6 no-underline outline-none focus:shadow-md overflow-hidden relative group"
                        to="/collections/summer"
                      >
                        <div className="absolute inset-0 bg-[url('/api/placeholder/400/320')] bg-cover bg-center opacity-20 group-hover:opacity-10 transition-opacity"></div>
                        <div className="relative z-10">
                          <Badge className="bg-white text-emerald-600 mb-2">
                            30% OFF
                          </Badge>
                          <div className="mt-4 mb-2 text-lg font-medium text-white">
                            Summer Collection
                          </div>
                          <p className="text-sm leading-tight text-white/90">
                            Explore our latest summer styles with up to 30% off
                          </p>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                        to="/shop/women"
                      >
                        <div className="text-sm font-medium leading-none">
                          Women
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                          Dresses, tops, accessories and more
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                        to="/shop/men"
                      >
                        <div className="text-sm font-medium leading-none">
                          Men
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                          Shirts, pants, shoes and accessories
                        </p>
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-100 focus:bg-slate-100"
                        to="/shop/kids"
                      >
                        <div className="text-sm font-medium leading-none">
                          Kids
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-slate-500">
                          Clothing and accessories for children
                        </p>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/new-arrivals"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors"
                >
                  New Arrivals
                </Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                {/* <Link
                  to="/sale"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors"
                >
                  Sale
                </Link> */}
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/about"
                  className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-slate-700 hover:text-emerald-600 transition-colors"
                >
                  About Us
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search, Cart, Account */}
          <div className="flex items-center gap-2">
            {/* Always visible search bar on desktop, toggle on mobile */}
            <div
              className={`flex items-center relative ml-auto mr-4 ${
                isSearchOpen ? "block" : "hidden md:flex"
              }`}
            >
              <form
                className="relative group"
                onSubmit={(e) => e.preventDefault()}
              >
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full sm:w-64 md:w-56 lg:w-72 pl-10 pr-4 h-10 bg-slate-50 border-slate-200 rounded-full focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  autoFocus={isSearchOpen}
                />
                <div className="absolute left-3 top-0 h-10 flex items-center justify-center text-slate-400">
                  <Search className="h-4 w-4" onClick={handleSearch} />
                </div>
                {isSearchOpen && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-0 h-10 w-8 rounded-full md:hidden"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </form>
            </div>
            {/* Mobile search button */}
            {!isSearchOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="ml-auto rounded-full hover:bg-slate-100 md:hidden"
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            )}

            <Link
              to="/wishlist"
              className="relative inline-flex items-center justify-center rounded-full w-10 h-10 hover:bg-slate-100 transition-colors"
            >
              <Heart className="h-5 w-5 text-slate-700" />
              {/* <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-rose-500">
                
              </Badge> */}
            </Link>

            <Link
              to="/cart"
              className="relative inline-flex items-center justify-center rounded-full w-10 h-10 hover:bg-slate-100 transition-colors"
            >
              <ShoppingCart className="h-5 w-5 text-slate-700" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-gradient-to-r from-emerald-500 to-teal-600">
                {totalItemsInCart}
              </Badge>
            </Link>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10 ml-1 p-0 overflow-hidden hover:bg-slate-100"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage alt="User" />
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                        JD
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 p-1 bg-white">
                  <div className="flex items-center gap-3 p-3 ">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/api/placeholder/40/40" alt="User" />
                      <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-slate-500">
                        john.doe@example.com
                      </p>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      to="/profile"
                      className="flex items-center cursor-pointer"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/orders"
                      className="flex items-center cursor-pointer"
                    >
                      <Package className="mr-2 h-4 w-4" />
                      <span>Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      to="/wishlist"
                      className="flex items-center cursor-pointer"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      <span>Wishlist</span>
                    </Link>
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem asChild>
                    <Link
                      to="/settings"
                      className="flex items-center cursor-pointer"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem> */}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    disabled={isPending}
                    className="flex items-center cursor-pointer text-rose-500 focus:text-rose-500"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2 ml-1">
                <Button
                  className="h-10 font-medium px-4 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 border-0"
                  // onClick={toggleLoginStatus}
                >
                  Login
                </Button>
                <Link to="/register">
                  <Button
                    variant="outline"
                    className="h-10 font-medium px-4 border-slate-200"
                  >
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
