import React, { useEffect, useState } from "react";
import { Search, Grid, List, ShoppingCart, Star } from "lucide-react";
import { useSearchProducts, type Product } from "@/api/product";
import EcommerceNavbar from "@/components/Nav2";
import { useAddItemToCartOrCreateCart } from "@/api/cart";

const ProductSearchUI = () => {
  const [products, setProducts] = useState<Product[] | []>([]);

  const { mutate } = useAddItemToCartOrCreateCart();

  const addToCart = (productID: string, productPrice: number) => {
    mutate({ price: productPrice, productId: productID });
  };

  const [searchParams, setSearchParams] = useState({
    q: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "createdAt",
    order: "desc" as "asc" | "desc" | "undefined",
    page: 1,
    limit: 12,
  });

  const { data, isPending, error } = useSearchProducts({
    category: searchParams.category,
    limit: searchParams.limit,
    maxPrice: searchParams.maxPrice,
    minPrice: searchParams.minPrice,
    order: searchParams.order,
    page: searchParams.category,
    search: searchParams.q,
    sortBy: searchParams.sortBy,
  });

  const [pagination, setPagination] = useState({
    totalPages: 0,
    totalItems: 0,
    currentPage: 1,
  });

  const [viewMode, setViewMode] = useState("grid");

  const categories = [
    "Electronics",
    "Clothing",
    "Books",
    "Home & Garden",
    "Sports",
    "Beauty",
    "Automotive",
  ];

  const sortOptions = [
    { value: "createdAt", label: "Newest First" },
    { value: "name", label: "Name A-Z" },
    { value: "price", label: "Price" },
    { value: "rating", label: "Rating" },
  ];

  useEffect(() => {
    if (data) {
      setProducts(data.data.products);
      setPagination({
        currentPage: data.page,
        totalItems: data.totalItems,
        totalPages: data.totalPages,
      });
    }
  }, [data]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams((prev) => ({
      ...prev,
      q: e.target.value,
      page: 1,
    }));
  };

  const handleFilterChange = (key: string, value: string) => {
    setSearchParams((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const handleSortChange = (
    sortBy: string,
    order: "asc" | "desc" | "undefined"
  ) => {
    setSearchParams((prev) => ({
      ...prev,
      sortBy,
      order,
      page: 1,
    }));
  };

  const handlePageChange = (page: number) => {
    setSearchParams((prev) => ({
      ...prev,
      page,
    }));
  };

  const clearFilters = () => {
    setSearchParams({
      q: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "createdAt",
      order: "desc",
      page: 1,
      limit: 12,
    });
  };

  return (
    <>
      <EcommerceNavbar />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Product Search
              </h1>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchParams.q}
                  onChange={handleSearchChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar Filters */}
            <div className="lg:w-64">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Filters</h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear All
                  </button>
                </div>

                {/* Category Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={searchParams.category}
                    onChange={(e) =>
                      handleFilterChange("category", e.target.value)
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">All Categories</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={searchParams.minPrice}
                      onChange={(e) =>
                        handleFilterChange("minPrice", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={searchParams.maxPrice}
                      onChange={(e) =>
                        handleFilterChange("maxPrice", e.target.value)
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">
                      {pagination.totalItems} products found
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Sort Dropdown */}
                    <div className="relative">
                      <select
                        value={`${searchParams.sortBy}-${searchParams.order}`}
                        onChange={(e) => {
                          const [sortBy, order] = e.target.value.split("-");
                          handleSortChange(
                            sortBy,
                            order as "undefined" | "desc" | "asc"
                          );
                        }}
                        className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {sortOptions.map((option) => (
                          <React.Fragment key={option.value}>
                            <option value={`${option.value}-desc`}>
                              {option.label} (High to Low)
                            </option>
                            <option value={`${option.value}-asc`}>
                              {option.label} (Low to High)
                            </option>
                          </React.Fragment>
                        ))}
                      </select>
                    </div>

                    {/* View Toggle */}
                    <div className="flex border border-gray-300 rounded-md">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 ${
                          viewMode === "grid"
                            ? "bg-blue-100 text-blue-600"
                            : "text-gray-600"
                        }`}
                      >
                        <Grid className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 ${
                          viewMode === "list"
                            ? "bg-blue-100 text-blue-600"
                            : "text-gray-600"
                        }`}
                      >
                        <List className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <div className="text-red-800">
                      <h3 className="font-medium">Error loading products</h3>
                      <p className="text-sm mt-1">{error.message}</p>
                      <button
                        // onClick={searchProducts}
                        className="mt-2 text-sm bg-red-100 hover:bg-red-200 px-3 py-1 rounded"
                      >
                        Try Again
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Products Grid/List */}
              {isPending ? (
                <div className="flex justify-center items-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      : "space-y-4"
                  }
                >
                  {products.map((product: Product) => (
                    <div
                      key={product._id}
                      className={`bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow ${
                        viewMode === "list"
                          ? "flex gap-4 p-4"
                          : "overflow-hidden"
                      }`}
                    >
                      <img
                        src={product.photoURLs[0]}
                        alt={product.productName}
                        className={
                          viewMode === "list"
                            ? "w-32 h-32 object-cover rounded-lg flex-shrink-0"
                            : "w-full h-48 object-cover"
                        }
                      />
                      <div className={viewMode === "list" ? "flex-1" : "p-4"}>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {product.productName}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                          {product.description}
                        </p>
                        <div className="flex items-center gap-1 mb-2">
                          <Star className="h-4 w-4 fill-current text-yellow-400" />
                          <span className="text-sm text-gray-600">
                            {/* {product.rating} ({product.reviews}) */}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-gray-900">
                            ${product.price}
                          </span>
                          <button
                            onClick={() =>
                              addToCart(product._id, product.price)
                            }
                            className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!isPending && products.length > 0 && (
                <div className="mt-8 flex justify-center">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handlePageChange(pagination.currentPage - 1)
                      }
                      disabled={pagination.currentPage === 1}
                      className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Previous
                    </button>

                    {Array.from(
                      { length: Math.min(5, pagination.totalPages) },
                      (_, i) => {
                        const page = i + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 border rounded-md ${
                              page === pagination.currentPage
                                ? "bg-blue-600 text-white border-blue-600"
                                : "border-gray-300 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      }
                    )}

                    <button
                      onClick={() =>
                        handlePageChange(pagination.currentPage + 1)
                      }
                      disabled={
                        pagination.currentPage === pagination.totalPages
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {/* No Results */}
              {!isPending && products.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductSearchUI;
