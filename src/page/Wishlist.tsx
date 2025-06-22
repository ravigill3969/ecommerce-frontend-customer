import { useAddItemToCartOrCreateCart } from "@/api/cart";
import {
  useGetUserWishlistProducts,
  useRemoveProductFromoWishList,
} from "@/api/product";
import EcommerceNavbar from "@/components/Nav2";
import { Heart, Trash2, ShoppingCart, Package } from "lucide-react";

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

  const handleRemoveFromWishlist = async (productId: string) => {
    mutate({ productId });
  };

  const { mutate: addToCartMutate } = useAddItemToCartOrCreateCart();

  const handleAddToCart = (productId: string, price: number) => {
    // Implement add to cart functionality
    addToCartMutate({ productId, price });
  };

  if (!data?.products) {
    return (
      <>
        <EcommerceNavbar />

        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">Loading your wishlist...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (data.products.length === 0) {
    return (
      <>
        <EcommerceNavbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
              <Heart className="h-8 w-8 text-red-500" />
              My Wishlist
            </h1>
          </div>
          <div className="flex items-center justify-center min-h-64">
            <div className="text-center">
              <Heart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-gray-500 mb-4">
                Start adding items you love to see them here
              </p>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <EcommerceNavbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <Heart className="h-8 w-8 text-red-500" />
            My Wishlist
          </h1>
          <span className="text-gray-500">
            {data.products.length}{" "}
            {data.products.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gray-200">
                {product.photoURLs && product.photoURLs.length > 0 ? (
                  <img
                    src={product.photoURLs[0]}
                    alt={product.productName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package className="h-16 w-16 text-gray-400" />
                  </div>
                )}

                <button
                  onClick={() => handleRemoveFromWishlist(product._id)}
                  disabled={isPending}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors disabled:opacity-50"
                  title="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </button>

                {/* Stock status */}
                {product.stockQuantity === 0 && (
                  <div className="absolute bottom-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs">
                    Out of Stock
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <div className="mb-2">
                  <span className="text-xs text-gray-500 uppercase tracking-wide">
                    {product.category}
                  </span>
                  {product.brand && (
                    <span className="text-xs text-gray-500 ml-2">
                      • {product.brand}
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                  {product.productName}
                </h3>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-gray-500">
                    Stock: {product.stockQuantity}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleAddToCart(product._id, product.price)}
                    disabled={product.stockQuantity === 0}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {product.stockQuantity === 0
                      ? "Out of Stock"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Wishlist;
