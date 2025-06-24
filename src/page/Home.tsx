import { useGetAllProducts } from "@/api/product";
import { useSessionIdAfterSuccessPayment } from "@/api/stripe";
import EcommerceNavbar from "@/components/Nav2";
import ProductCard from "@/components/ProductCard";
import { useEffect } from "react";

// Enhanced Home Component
function Home() {
  const { data } = useGetAllProducts();
  const { mutate } = useSessionIdAfterSuccessPayment();



  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sessionId = params.get("session_id");

    if (sessionId) {
      mutate(sessionId);
    } else {
      return;
    }
  }, [mutate]);

  if (!data) {
    return <div>Something wrnt wrong</div>;
  }

  return (
    <>
      <EcommerceNavbar />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
        <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative container mx-auto px-8 py-16">
            <div className="text-center space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                Discover Amazing
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Products
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-indigo-100 max-w-2xl mx-auto">
                Find the perfect items for your lifestyle with our curated
                collection of premium products
              </p>
              {/* <div className="flex items-center justify-center gap-4 pt-8">
              <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-indigo-50 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Shop Now
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-300 transform hover:scale-105">
              Learn More
              </button>
              </div> */}
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse" />
          <div className="absolute top-40 right-20 w-32 h-32 bg-yellow-300/20 rounded-full animate-bounce" />
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-pink-300/20 rounded-full animate-pulse" />
        </div>

        {/* Products Section */}
        <div className="container mx-auto">
          <div className="text-center py-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked items that combine quality, style, and innovation
            </p>
          </div>

          <ProductCard products={data.products} />

          {/* Load More Section */}
          <div className="text-center py-16">
            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-4 rounded-full font-semibold text-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Load More Products
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
