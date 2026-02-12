import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Shield,
  Truck,
  ArrowRight,
} from "lucide-react";
import EcommerceNavbar from "@/components/Nav2";
import { useSocketForCart } from "@/context/SocketContext";
import Stripe from "./Stripe";
import { useRemoveItemFromCart } from "@/api/cart";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";

function Cart() {
  const { res } = useSocketForCart();
  const { decrementInCart, incrementInCart } = useSocketForCart();
  const { mutate } = useRemoveItemFromCart();

  const removeItem = (productId: string, cartID: string) => {
    mutate({ cartID: cartID, productID: productId });
  };

  const incrementProduct = (productId: string) => {
    incrementInCart(productId);
  };

  const decrementProduct = (productId: string) => {
    decrementInCart(productId);
  };

  if (!res || !res.success) {
    return (
      <>
        <EcommerceNavbar />
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <ShoppingBag className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              Unable to load cart
            </h2>
            <p className="mb-6 text-gray-600">
              We're having trouble loading your cart. Please try refreshing the page.
            </p>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              Retry
            </Button>
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
        <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
          <div className="w-full max-w-md rounded-xl bg-white p-12 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
              <ShoppingBag className="h-8 w-8 text-gray-400" />
            </div>
            <h2 className="mb-2 text-xl font-bold text-gray-900">
              Your cart is empty
            </h2>
            <p className="mb-6 text-gray-600">
              Start adding products to your cart
            </p>
            <Link to="/">
              <Button className="bg-indigo-600 hover:bg-indigo-700">
                <ArrowRight className="mr-2 h-4 w-4" />
                Start Shopping
              </Button>
            </Link>
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
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600">{cart.items.length} items</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="space-y-4 lg:col-span-2">
              {cart.items.map((item) => {
                const product = products.find((p) => p._id === item.productId);
                if (!product) return null;

                return (
                  <div
                    key={item.productId}
                    className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={product.photoURLs[0] || "/api/placeholder/96/96"}
                          alt={product.productName}
                          className="h-full w-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {product.productName}
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.brand}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.productId, res.cart._id)}
                            className="text-gray-400 transition-colors hover:text-red-600"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>

                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-lg font-bold text-indigo-600">
                            ${item.price.toFixed(2)}
                          </div>

                          <div className="flex items-center gap-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center rounded-lg border border-gray-300">
                              <button
                                onClick={() => decrementProduct(item.productId)}
                                className="p-2 transition-colors hover:bg-gray-100"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <div className="min-w-[40px] px-3 text-center font-medium">
                                {item.quantity}
                              </div>
                              <button
                                onClick={() => incrementProduct(item.productId)}
                                className="p-2 transition-colors hover:bg-gray-100"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            {/* Item Total */}
                            <div className="min-w-[80px] text-right font-semibold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
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
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-xl bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-lg font-bold text-gray-900">
                  Order Summary
                </h2>

                <div className="space-y-3 border-b border-gray-200 pb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Truck className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Shipping</span>
                    </div>
                    <span className="font-medium text-gray-900">
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium text-gray-900">
                      ${tax.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="my-4 flex justify-between">
                  <span className="font-semibold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-indigo-600">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-3">
                  <Stripe data={cart.items} cartId={res.cart._id} />

                  <Link to="/">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>

                {/* Security Badge */}
                <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Shield className="h-4 w-4 text-green-600" />
                  <span>Secure checkout</span>
                </div>

                {shipping > 0 && (
                  <div className="mt-4 rounded-lg bg-indigo-50 p-3 text-center text-sm text-indigo-700">
                    Add ${(50 - subtotal).toFixed(2)} more for free shipping!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
