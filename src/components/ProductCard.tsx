import { Heart, ShoppingCart, Star, Eye, ArrowRight } from "lucide-react";
import { useAddItemToCartOrCreateCart } from "@/api/cart";
import { useAddProductToWishList } from "@/api/product";

interface Product {
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
}

const isLiked = false

// Enhanced ProductCard Component
export default function ProductCard({ products }: { products: Product[] }) {
  const { mutate } = useAddItemToCartOrCreateCart();

  const { mutate: addToWLMutate } = useAddProductToWishList();

  const getStockStatus = (quantity: number) => {
    if (quantity === 0)
      return { text: "Out of Stock", color: "text-red-500", bg: "bg-red-50" };
    if (quantity <= 5)
      return {
        text: `Only ${quantity} left`,
        color: "text-orange-500",
        bg: "bg-orange-50",
      };
    return { text: "In Stock", color: "text-green-500", bg: "bg-green-50" };
  };

  const handleAddToCart = (price: number, productId: string) => {
    mutate({ price, productId });
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8">
      {products.map((product) => {
        // const isLiked = likedProducts.has(product._id);
        const stockStatus = getStockStatus(product.stockQuantity);

        return (
          <div
            key={product._id}
            className="group relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
          >
            <div className="relative overflow-hidden rounded-t-3xl">
              <div className="aspect-square relative">
                <img
                  src={product.photoURLs[0] || "/api/placeholder/400/400"}
                  alt={product.productName}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Floating Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <button
                    onClick={() => addToWLMutate({ productId: product._id })}
                    className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 ${
                      isLiked
                        ? "bg-red-500 text-white scale-110"
                        : "bg-white/90 text-gray-600 hover:bg-white hover:scale-110"
                    } shadow-lg`}
                  >
                    <Heart
                      className={`w-5 h-5 transition-all duration-300 ${
                        isLiked ? "fill-current scale-110" : ""
                      }`}
                    />
                  </button>

                  <button className="p-3 rounded-full bg-white/90 text-gray-600 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
                    <Eye className="w-5 h-5" />
                  </button>
                </div>

                {/* Stock Status Badge */}
                <div
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${stockStatus.bg} ${stockStatus.color} backdrop-blur-sm`}
                >
                  {stockStatus.text}
                </div>

                {/* Category Tag */}
                <div className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-black/70 text-white text-xs font-medium backdrop-blur-sm">
                  {product.category}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 space-y-4">
              {/* Brand and Rating */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-indigo-600 uppercase tracking-wide">
                  {product.brand}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">4.2</span>
                </div>
              </div>

              {/* Product Name */}
              <h3 className="font-bold text-xl text-gray-900 leading-tight line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
                {product.productName}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                {product.description}
              </p>

              {/* Price and Action */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-500 line-through ml-2">
                    ${(product.price * 1.2).toFixed(2)}
                  </span>
                </div>

                <button
                  className={`group/btn flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                    product.stockQuantity > 0
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                  disabled={product.stockQuantity === 0}
                  onClick={() => handleAddToCart(product.price, product._id)}
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>
                    {product.stockQuantity > 0 ? "Add to Cart" : "Sold Out"}
                  </span>
                  {product.stockQuantity > 0 && (
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  )}
                </button>
              </div>
            </div>

            {/* Hover Effect Border */}
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-indigo-200 transition-all duration-300 pointer-events-none" />
          </div>
        );
      })}
    </div>
  );
}
