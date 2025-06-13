import { useEffect } from "react";
import { CheckCircle, Download, Mail, ArrowRight, Home } from "lucide-react";
import { useNavigate } from "react-router";

function Success() {
  // In a real app, you'd get these from URL params or API
  const orderDetails = {
    orderNumber:
      "#ORD-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    amount: "$49.99",
    customerEmail: "customer@example.com",
    purchaseDate: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => navigate("/"), 5000);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Success Icon Animation */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4 animate-pulse">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Payment Successful!
          </h1>
          <p className="text-gray-600">Thank you for your purchase</p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-gray-100">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <span className="text-gray-600">Order Number</span>
              <span className="font-semibold text-gray-900">
                {orderDetails.orderNumber}
              </span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <span className="text-gray-600">Amount Paid</span>
              <span className="font-bold text-green-600 text-lg">
                {orderDetails.amount}
              </span>
            </div>

            <div className="flex justify-between items-center pb-4 border-b border-gray-100">
              <span className="text-gray-600">Email</span>
              <span className="font-medium text-gray-900 text-sm">
                {orderDetails.customerEmail}
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Date</span>
              <span className="font-medium text-gray-900">
                {orderDetails.purchaseDate}
              </span>
            </div>
          </div>
        </div>

        {/* Confirmation Message */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">
                Confirmation Email Sent
              </h3>
              <p className="text-blue-700 text-sm">
                We've sent a receipt and order details to your email address.
                Please check your inbox (and spam folder).
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
            onClick={() => window.print()}
          >
            <Download className="w-5 h-5" />
            <span>Download Receipt</span>
          </button>

          <button
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center space-x-2"
            onClick={() => (window.location.href = "/")}
          >
            <Home className="w-5 h-5" />
            <span>Return to Home</span>
          </button>
        </div>

        {/* Next Steps */}
        <div className="mt-8 text-center">
          <h3 className="font-semibold text-gray-900 mb-3">What's Next?</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center justify-center space-x-2">
              <ArrowRight className="w-4 h-4 text-green-500" />
              <span>Access will be granted within 5 minutes</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <ArrowRight className="w-4 h-4 text-green-500" />
              <span>Check your email for login instructions</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <ArrowRight className="w-4 h-4 text-green-500" />
              <span>Need help? Contact our support team</span>
            </div>
          </div>
        </div>

        {/* Support Link */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Questions about your order?{" "}
            <a
              href="/support"
              className="text-blue-600 hover:text-blue-700 underline"
            >
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Success;
