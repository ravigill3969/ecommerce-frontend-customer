import {
  Heart,
  Star,
  Eye,
  Plus,
  Minus,
  Package,
  Truck,
} from "lucide-react";
import { useAddItemToCartOrCreateCart } from "@/api/cart";
import { useAddProductToWishList } from "@/api/product";
import { useState } from "react";

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

const isLiked = false;

export default function ProductCard({ products }: { products: Product[] }) {
  const { mutate } = useAddItemToCartOrCreateCart();
  const { mutate: addToWLMutate } = useAddProductToWishList();
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);

  const getStockBadge = (quantity: number) => {
    if (quantity === 0)
      return { text: "SOLD OUT", style: "bg-red-500 text-white" };
    if (quantity <= 5)
      return { text: "LIMITED", style: "bg-amber-500 text-white" };
    return { text: "AVAILABLE", style: "bg-emerald-500 text-white" };
  };

  const handleAddToCart = (price: number, productId: string) => {
    mutate({ price, productId });
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Product Catalog</h2>
          <p className="text-slate-600 mt-2">
            {products.length} items available
          </p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
            Filter
          </button>
          <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-600 transition-colors">
            Sort
          </button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8">
        {products.map((product) => {
          const stockBadge = getStockBadge(product.stockQuantity);
          const isHovered = hoveredProduct === product._id;

          return (
            <div
              key={product._id}
              className="group bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
              onMouseEnter={() => setHoveredProduct(product._id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Image Container */}
              <div className="relative bg-slate-50 aspect-square overflow-hidden">
                <img
                  src={product.photoURLs[0] || "/api/placeholder/400/400"}
                  alt={product.productName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Stock Badge */}
                <div
                  className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${stockBadge.style}`}
                >
                  {stockBadge.text}
                </div>

                {/* Quick Actions */}
                <div
                  className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
                    isHovered
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-4"
                  }`}
                >
                  <button
                    onClick={() => addToWLMutate({ productId: product._id })}
                    className="p-2 bg-white rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isLiked ? "fill-red-500 text-red-500" : "text-slate-600"
                      }`}
                    />
                  </button>
                  <button className="p-2 bg-white rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200">
                    <Eye className="w-4 h-4 text-slate-600" />
                  </button>
                </div>

                {/* Category Tag */}
                <div className="absolute bottom-3 left-3">
                  <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-slate-700 border">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Brand & Rating */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    {product.brand}
                  </span>
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < 4
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-slate-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-slate-500 ml-1">(4.2)</span>
                  </div>
                </div>

                {/* Product Name */}
                <h3 className="font-semibold text-lg text-slate-900 mb-2 line-clamp-2 leading-tight">
                  {product.productName}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>

                {/* Stock Info */}
                <div className="flex items-center gap-4 mb-4 text-xs">
                  <div className="flex items-center gap-1 text-slate-500">
                    <Package className="w-3 h-3" />
                    <span>{product.stockQuantity} in stock</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-500">
                    <Truck className="w-3 h-3" />
                    <span>Free shipping</span>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-slate-900">
                      ${product.price}
                    </span>
                    <span className="text-sm text-slate-500 line-through">
                      ${(product.price * 1.15).toFixed(2)}
                    </span>
                  </div>

                  <button
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 ${
                      product.stockQuantity > 0
                        ? "bg-slate-900 hover:bg-slate-800 text-white hover:scale-105 shadow-lg hover:shadow-xl"
                        : "bg-slate-200 text-slate-500 cursor-not-allowed"
                    }`}
                    disabled={product.stockQuantity === 0}
                    onClick={() => handleAddToCart(product.price, product._id)}
                  >
                    {product.stockQuantity > 0 ? (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add</span>
                      </>
                    ) : (
                      <>
                        <Minus className="w-4 h-4" />
                        <span>Unavailable</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Hover Border Effect */}
              <div
                className={`absolute inset-0 rounded-2xl border-2 transition-all duration-300 pointer-events-none ${
                  isHovered ? "border-slate-300" : "border-transparent"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Load More Section */}
      <div className="text-center mt-16 py-8">
        <div className="inline-flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-slate-500">
            <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
            <span className="text-sm">Showing {products.length} products</span>
            <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
          </div>
          <button className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105">
            View More Products
          </button>
        </div>
      </div>
    </div>
  );
}
