import { useGetAllProducts } from "@/api/product";
import { useSessionIdAfterSuccessPayment } from "@/api/stripe";
import EcommerceNavbar from "@/components/Nav2";
import ProductCard from "@/components/ProductCard";
import { useEffect } from "react";

function Home() {
  const { data } = useGetAllProducts();
  const { mutate } = useSessionIdAfterSuccessPayment();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      mutate(sessionId);
    }
  }, [mutate]);

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-400 text-lg">Loading amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <EcommerceNavbar />

      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.3)_0%,rgba(5,150,105,0.1)_50%,transparent_100%)]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-emerald-300 text-sm font-medium">
                New Collection Available
              </span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-black mb-6 leading-tight">
              Shop The
              <span className="block text-transparent bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text">
                Future
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-slate-300 mb-10 leading-relaxed">
              Experience next-generation shopping with our cutting-edge product
              catalog
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25">
                Explore Products
              </button>
              <button className="border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-3xl rotate-45 animate-float"></div>
          <div className="absolute top-1/2 right-10 w-16 h-16 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full animate-bounce-slow"></div>
          <div className="absolute bottom-20 left-1/3 w-20 h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-2xl rotate-12 animate-pulse"></div>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-slate-800 text-white rounded-full px-6 py-2 mb-6">
              <span className="text-emerald-400 mr-2">✦</span>
              <span className="font-medium">Premium Collection</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">
              Handpicked
              <span className="text-emerald-600"> Excellence</span>
            </h2>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Every product in our collection is carefully selected for quality,
              innovation, and style. Discover items that elevate your everyday
              experience.
            </p>
          </div>

          {/* Products Grid */}
          <div className="mb-16">
            <ProductCard products={data.products} />
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-12 text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Ready for More?</h3>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who've discovered their
              perfect products with us
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/25">
                Load More Products
              </button>
              <button className="border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-emerald-400 px-10 py-4 rounded-2xl font-semibold text-lg transition-all duration-300">
                View Categories
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Stay In The Loop
          </h3>
          <p className="text-xl text-slate-600 mb-8">
            Get notified about new products, exclusive deals, and insider
            updates
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:outline-none text-lg"
            />
            <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(45deg);
          }
          50% {
            transform: translateY(-20px) rotate(45deg);
          }
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}

export default Home;
