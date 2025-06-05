import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  Star,
  Shield,
  Truck,
} from "lucide-react";
import EcommerceNavbar from "@/components/Nav2";
import { useSocketForCart } from "@/context/SocketContext";

function Cart() {
  const { res } = useSocketForCart();

  const { decrementInCart, incrementInCart } = useSocketForCart();

  const removeItem = (productId: string) => {
    console.log(`Remove item ${productId}`);
  };

  const addToWishlist = (productId: string) => {
    console.log(`Add ${productId} to wishlist`);
  };

  const incrementProduct = (productId: string) => {
    console.log(productId);
    incrementInCart(productId);
  };

  const decrementProduct = (productId: string) => {
    console.log(productId);
    decrementInCart(productId);
  };

  if (!res || !res.success) {
    return (
      <>
        <EcommerceNavbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
          <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-md">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Unable to load cart
            </h2>
            <p className="text-gray-600 mb-6">
              We're having trouble loading your cart. Please try again.
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg">
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  const { cart, products } = res;

  if (!cart.items || cart.items.length === 0) {
    return (
      <>
        <EcommerceNavbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
          <div className="text-center bg-white rounded-2xl shadow-xl p-12 max-w-md">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              Your cart awaits
            </h2>
            <p className="text-gray-600 mb-8">
              Discover amazing products and start your shopping journey
            </p>
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-medium shadow-lg">
              Start Shopping
            </button>
          </div>
        </div>
      </>
    );
  }

  // Calculate totals
  const subtotal = cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const shipping = subtotal > 50 ? 0 : 9.99;
  const total = subtotal + tax + shipping;

  return (
    <>
      <EcommerceNavbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Shopping Cart
                  </h1>
                  <p className="text-sm text-gray-600">
                    {cart.items.length} items in your cart
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-8 space-y-4">
              {cart.items.map((item) => {
                const product = products.find((p) => p._id === item.productId);
                if (!product) return null;

                return (
                  <div
                    key={item.productId}
                    className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="p-6 sm:p-8">
                      <div className="flex gap-6">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-sm">
                            <img
                              src={
                                product.photoURLs[0] ||
                                "/api/placeholder/128/128"
                              }
                              alt={product.productName}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {product.brand}
                                </span>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  <span className="text-xs text-gray-600">
                                    4.8
                                  </span>
                                </div>
                              </div>
                              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 leading-tight">
                                {product.productName}
                              </h3>
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                {product.description}
                              </p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                  In Stock
                                </span>
                                <span>
                                  SKU: {product._id.slice(-6).toUpperCase()}
                                </span>
                              </div>
                            </div>

                            <button
                              onClick={() => addToWishlist(item.productId)}
                              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                              title="Add to wishlist"
                            >
                              <Heart className="h-5 w-5" />
                            </button>
                          </div>

                          {/* Price and Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                                ${item.price.toFixed(2)}
                              </div>
                              {product.stockQuantity < 10 && (
                                <div className="flex items-center gap-1 text-sm text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                                  <div className="w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
                                  Only {product.stockQuantity} left
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-3">
                              {/* Quantity Controls */}
                              <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200">
                                <button
                                  onClick={() =>
                                    decrementProduct(item.productId)
                                  }
                                  className="p-2 hover:bg-gray-100 rounded-l-xl transition-colors"
                                >
                                  <Minus className="h-4 w-4 text-gray-600" />
                                </button>
                                <div className="px-4 py-2 text-center min-w-[50px] font-medium">
                                  {item.quantity}
                                </div>
                                <button
                                  onClick={() =>
                                    incrementProduct(item.productId)
                                  }
                                  className="p-2 hover:bg-gray-100 rounded-r-xl transition-colors"
                                >
                                  <Plus className="h-4 w-4 text-gray-600" />
                                </button>
                              </div>

                              {/* Item Total */}
                              <div className="text-right">
                                <div className="text-lg font-bold text-gray-900">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                                {item.quantity > 1 && (
                                  <div className="text-xs text-gray-500">
                                    ${item.price.toFixed(2)} each
                                  </div>
                                )}
                              </div>

                              {/* Remove Button */}
                              <button
                                onClick={() => removeItem(item.productId)}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                title="Remove item"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                    <h2 className="text-xl font-bold">Order Summary</h2>
                    <p className="text-blue-100 text-sm mt-1">
                      Review your order details
                    </p>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Price Breakdown */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="font-semibold text-gray-900">
                          ${subtotal.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Truck className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">Shipping</span>
                        </div>
                        <span className="font-semibold text-gray-900">
                          {shipping === 0 ? (
                            <span className="text-green-600">Free</span>
                          ) : (
                            `$${shipping.toFixed(2)}`
                          )}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Tax</span>
                        <span className="font-semibold text-gray-900">
                          ${tax.toFixed(2)}
                        </span>
                      </div>

                      {shipping > 0 && (
                        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                          <div className="flex items-center gap-2 text-blue-700 mb-2">
                            <Truck className="h-4 w-4" />
                            <span className="font-medium text-sm">
                              Free Shipping Available
                            </span>
                          </div>
                          <p className="text-xs text-blue-600">
                            Add ${(50 - subtotal).toFixed(2)} more to qualify
                            for free shipping
                          </p>
                          <div className="mt-2 bg-blue-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${Math.min(
                                  (subtotal / 50) * 100,
                                  100
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Total */}
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">
                          Total
                        </span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Proceed to Checkout
                      </button>

                      <button className="w-full border-2 border-gray-200 text-gray-700 py-3 px-6 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 font-medium">
                        Continue Shopping
                      </button>
                    </div>

                    {/* Security Badge */}
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-xl p-3">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span>Secure 256-bit SSL encryption</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
