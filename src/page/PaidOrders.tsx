import { useGetAlreadyPaidOrderOrCart } from "@/api/cart";
import React from "react";
import {
  Package,
  Calendar,
  ShoppingBag,
  CreditCard,
  CheckCircle,
} from "lucide-react";
import EcommerceNavbar from "@/components/Nav2";

interface Item {
  _id: string;
  productId: string;
  quantity: number;
  price: number;
}

function PaidOrders() {
  const { data } = useGetAlreadyPaidOrderOrCart();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const calculateTotal = (items: Item[]) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = (items: Item[]) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  if (!data) {
    return (
      <>
        <EcommerceNavbar />

        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded-lg w-64 mb-8"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (!data.carts || data.carts.length === 0) {
    return (
      <>
        <EcommerceNavbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-10 h-10 text-blue-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-3">
              No Orders Yet
            </h2>
            <p className="text-gray-600 text-lg">
              You haven't made any purchases yet. Start shopping to see your
              orders here!
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <EcommerceNavbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Order History
              </h1>
            </div>
            <p className="text-gray-600 ml-13">
              Review your completed purchases and order details
            </p>
          </div>

          {/* Orders List */}
          <div className="space-y-6">
            {data.carts.map((cart) => (
              <div
                key={cart._id}
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 overflow-hidden"
              >
                {/* Order Header */}
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-6 h-6" />
                      <div>
                        <h3 className="font-semibold text-lg">
                          Order Completed
                        </h3>
                        <p className="text-green-100 text-sm">
                          Order ID: {cart._id.slice(-8).toUpperCase()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2 text-green-100 mb-1">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          {formatDate(cart.createdAt)}
                        </span>
                      </div>
                      <div className="bg-green-400/20 px-3 py-1 rounded-full">
                        <span className="text-sm font-medium">Paid</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div className="p-6">
                  <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <ShoppingBag className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total Items</p>
                          <p className="text-xl font-bold text-blue-600">
                            {getTotalItems(cart.items)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Products</p>
                          <p className="text-xl font-bold text-purple-600">
                            {cart.items.length}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Total Paid</p>
                          <p className="text-xl font-bold text-green-600">
                            ${calculateTotal(cart.items).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Items List */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800 mb-3">
                      Order Items
                    </h4>
                    {cart.items.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-800">
                            Product ID: {item.productId}
                          </p>
                          <p className="text-sm text-gray-600">
                            Item ID: {item._id}
                          </p>
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                          <div className="text-center">
                            <p className="text-gray-600">Quantity</p>
                            <p className="font-semibold text-gray-800">
                              {item.quantity}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-600">Unit Price</p>
                            <p className="font-semibold text-gray-800">
                              ${item.price.toFixed(2)}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-gray-600">Subtotal</p>
                            <p className="font-bold text-green-600">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-white/20">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Order Summary
              </h3>
              <div className="flex justify-center gap-8 text-sm text-gray-600">
                <span>
                  Total Orders:{" "}
                  <strong className="text-gray-800">{data.carts.length}</strong>
                </span>
                <span>
                  Total Items:{" "}
                  <strong className="text-gray-800">
                    {data.carts.reduce(
                      (total, cart) => total + getTotalItems(cart.items),
                      0
                    )}
                  </strong>
                </span>
                <span>
                  Total Spent:{" "}
                  <strong className="text-green-600">
                    $
                    {data.carts
                      .reduce(
                        (total, cart) => total + calculateTotal(cart.items),
                        0
                      )
                      .toFixed(2)}
                  </strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaidOrders;
