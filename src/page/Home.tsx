import { useGetAllProducts } from "@/api/product";
import { useSessionIdAfterSuccessPayment } from "@/api/stripe";
import EcommerceNavbar from "@/components/Nav2";
import ProductCard from "@/components/ProductCard";
import { useEffect } from "react";
import { ArrowRight, Shield, Truck, Star } from "lucide-react";

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
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <>
      <EcommerceNavbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
              <Star className="h-4 w-4" />
              <span>Premium Quality Products</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 md:text-6xl">
              Discover Products You'll
              <span className="block text-indigo-600">Love to Own</span>
            </h1>

            <p className="mb-8 text-lg text-gray-600 md:text-xl">
              Curated collection of high-quality products for your everyday needs.
              Shop with confidence and enjoy fast, free shipping.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700">
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50">
                Learn More
              </button>
            </div>

            {/* Features */}
            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-full bg-indigo-100 p-3">
                  <Truck className="h-5 w-5 text-indigo-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">Free Shipping</p>
                <p className="text-xs text-gray-500">On orders over $50</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-full bg-indigo-100 p-3">
                  <Shield className="h-5 w-5 text-indigo-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">Secure Payment</p>
                <p className="text-xs text-gray-500">100% protected</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-full bg-indigo-100 p-3">
                  <Star className="h-5 w-5 text-indigo-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">Top Quality</p>
                <p className="text-xs text-gray-500">Premium selection</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-3 text-3xl font-bold text-gray-900 md:text-4xl">
              Featured Products
            </h2>
            <p className="text-lg text-gray-600">
              Explore our handpicked collection
            </p>
          </div>

          <ProductCard products={data.products} />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl rounded-2xl bg-white p-8 shadow-sm md:p-12">
            <div className="text-center">
              <h2 className="mb-3 text-2xl font-bold text-gray-900 md:text-3xl">
                Join Our Newsletter
              </h2>
              <p className="mb-6 text-gray-600">
                Get updates on new products and exclusive offers
              </p>

              <form className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-3 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition-colors hover:bg-indigo-700"
                >
                  Subscribe
                </button>
              </form>

              <p className="mt-4 text-xs text-gray-500">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
