import { useAddItemToCartOrCreateCart } from "@/api/cart";
import {
  useGetUserWishlistProducts,
  useRemoveProductFromoWishList,
} from "@/api/product";
import EcommerceNavbar from "@/components/Nav2";
import {
  Heart,
  X,
  Plus,
  Bookmark,
  Star,
  Grid,
  List,
  Search,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export interface Product {
  _id: string;
  productName: string;
  sellerID: string;
  price: number;
  stockQuantity: number;
  brand: string;
  category: string;
  description: string;
  isActive: boolean;
  photoURLs: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  stripeProductId?: string;
}

function Wishlist() {
  const { data } = useGetUserWishlistProducts();
  const { mutate, isPending } = useRemoveProductFromoWishList();
  const { mutate: addToCartMutate } = useAddItemToCartOrCreateCart();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");

  const handleRemoveFromWishlist = async (productId: string) => {
    mutate({ productId });
  };

  const handleAddToCart = (productId: string, price: number) => {
    addToCartMutate({ productId, price });
  };

  const filteredProducts =
    data?.products?.filter(
      (product) =>
        product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  // Loading State
  if (!data?.products) {
    return (
      <>
        <EcommerceNavbar />
        <div className="min-h-screen bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex items-center justify-center min-h-96">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-rose-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <h3 className="text-xl font-semibold text-slate-700">
                  Loading Your Collection
                </h3>
                <p className="text-slate-500">
                  Gathering your favorite items...
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Empty State
  if (data.products.length === 0) {
    return (
      <>
        <EcommerceNavbar />
        <div className="min-h-screen bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 py-12">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-100 rounded-full mb-6">
                <Heart className="w-10 h-10 text-rose-500" />
              </div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                Your Wishlist
              </h1>
              <p className="text-xl text-slate-600">
                Keep track of items you love
              </p>
            </div>

            {/* Empty State */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-16 text-center">
              <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bookmark className="w-12 h-12 text-slate-400" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Start Building Your Collection
              </h2>
              <p className="text-slate-600 mb-8 max-w-md mx-auto">
                Discover amazing products and save them here for later. Your
                perfect finds are just a click away.
              </p>
              <Link to={"/"}>
                <button className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105">
                  Explore Products
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <EcommerceNavbar />
      <div className="min-h-screen bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Header Section */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-4xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                  <div className="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-rose-500 fill-current" />
                  </div>
                  My Collection
                </h1>
                <p className="text-slate-600">
                  {data.products.length} carefully curated{" "}
                  {data.products.length === 1 ? "item" : "items"}
                </p>
              </div>

              {/* Search and Controls */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search your collection..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all w-80"
                  />
                </div>

                <div className="flex items-center bg-white border border-slate-200 rounded-2xl p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-xl transition-all ${
                      viewMode === "grid"
                        ? "bg-rose-500 text-white"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-xl transition-all ${
                      viewMode === "list"
                        ? "bg-rose-500 text-white"
                        : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="group bg-white rounded-3xl overflow-hidden border border-slate-200 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square bg-slate-100 overflow-hidden">
                    {product.photoURLs && product.photoURLs.length > 0 ? (
                      <img
                        src={product.photoURLs[0]}
                        alt={product.productName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <Bookmark className="w-16 h-16 text-slate-300" />
                      </div>
                    )}

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveFromWishlist(product._id)}
                      disabled={isPending}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-200 disabled:opacity-50"
                    >
                      <X className="w-5 h-5 text-slate-600" />
                    </button>

                    {/* Stock Badge */}
                    {product.stockQuantity === 0 && (
                      <div className="absolute bottom-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Out of Stock
                      </div>
                    )}
                    {product.stockQuantity > 0 &&
                      product.stockQuantity <= 5 && (
                        <div className="absolute bottom-4 left-4 bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Only {product.stockQuantity} left
                        </div>
                      )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">
                        {product.brand}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-slate-500">4.5</span>
                      </div>
                    </div>

                    <h3 className="font-semibold text-lg text-slate-900 mb-2 line-clamp-2">
                      {product.productName}
                    </h3>

                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-slate-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded-lg">
                        {product.category}
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        handleAddToCart(product._id, product.price)
                      }
                      disabled={product.stockQuantity === 0}
                      className={`w-full py-3 px-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                        product.stockQuantity === 0
                          ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                          : "bg-slate-900 hover:bg-slate-800 text-white hover:scale-105 shadow-lg hover:shadow-xl"
                      }`}
                    >
                      <Plus className="w-5 h-5" />
                      {product.stockQuantity === 0
                        ? "Out of Stock"
                        : "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center gap-6">
                    <div className="relative w-24 h-24 bg-slate-100 rounded-2xl overflow-hidden flex-shrink-0">
                      {product.photoURLs && product.photoURLs.length > 0 ? (
                        <img
                          src={product.photoURLs[0]}
                          alt={product.productName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Bookmark className="w-8 h-8 text-slate-300" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">
                              {product.brand}
                            </span>
                            <span className="text-slate-300">•</span>
                            <span className="text-xs text-slate-500">
                              {product.category}
                            </span>
                          </div>
                          <h3 className="font-semibold text-lg text-slate-900 mb-1">
                            {product.productName}
                          </h3>
                          <p className="text-slate-600 text-sm line-clamp-2">
                            {product.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 ml-6">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-slate-900">
                              ${product.price.toFixed(2)}
                            </div>
                            <div className="text-sm text-slate-500">
                              Stock: {product.stockQuantity}
                            </div>
                          </div>

                          <button
                            onClick={() =>
                              handleAddToCart(product._id, product.price)
                            }
                            disabled={product.stockQuantity === 0}
                            className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                              product.stockQuantity === 0
                                ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                                : "bg-slate-900 hover:bg-slate-800 text-white hover:scale-105"
                            }`}
                          >
                            {product.stockQuantity === 0
                              ? "Out of Stock"
                              : "Add to Cart"}
                          </button>

                          <button
                            onClick={() =>
                              handleRemoveFromWishlist(product._id)
                            }
                            disabled={isPending}
                            className="w-12 h-12 bg-slate-100 hover:bg-red-100 rounded-2xl flex items-center justify-center transition-all duration-200 disabled:opacity-50"
                          >
                            <X className="w-5 h-5 text-slate-600 hover:text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* No Results */}
          {filteredProducts.length === 0 && searchTerm && (
            <div className="text-center py-16">
              <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-700 mb-2">
                No items found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search term or browse all items
              </p>
              <button
                onClick={() => setSearchTerm("")}
                className="mt-4 bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-2xl font-medium transition-all"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Wishlist;
