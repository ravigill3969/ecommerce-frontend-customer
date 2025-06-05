import React, { useState } from 'react';
import { Search as SearchIcon, SlidersHorizontal, X, ChevronDown } from 'lucide-react';

// Type definitions
type PriceRange = {
  id: number;
  label: string;
  value: string;
};

type Rating = {
  id: number;
  label: string;
  value: number;
};

type FilterSectionProps = {
  title: string;
  children: React.ReactNode;
};

function Search() {
  // Mock data for filters
  const categories: string[] = [
    'Electronics',
    'Clothing',
    'Home & Kitchen',
    'Beauty & Personal Care',
    'Books',
    'Sports & Outdoors',
  ];

  const brands: string[] = ['Apple', 'Samsung', 'Nike', 'Adidas', 'Sony', 'Amazon Basics', 'Logitech'];

  const priceRanges: PriceRange[] = [
    { id: 1, label: 'Under $25', value: '0-25' },
    { id: 2, label: '$25 to $50', value: '25-50' },
    { id: 3, label: '$50 to $100', value: '50-100' },
    { id: 4, label: '$100 to $200', value: '100-200' },
    { id: 5, label: '$200 & Above', value: '200-99999' },
  ];

  const ratings: Rating[] = [
    { id: 1, label: '4★ & Up', value: 4 },
    { id: 2, label: '3★ & Up', value: 3 },
    { id: 3, label: '2★ & Up', value: 2 },
    { id: 4, label: '1★ & Up', value: 1 },
  ];

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<number | ''>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    );
  };

  // Toggle brand selection
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPriceRange('');
    setSelectedRating('');
  };

  // Filter sections for desktop
  const FilterSection: React.FC<FilterSectionProps> = ({ title, children }) => (
    <div className='mb-6'>
      <h3 className='text-lg font-semibold mb-3 text-gray-800'>{title}</h3>
      {children}
    </div>
  );

  return (
    <div className='bg-gray-50 min-h-screen'>
      {/* Header with search bar */}
      <div className='bg-white shadow-md py-4'>
        <div className='container mx-auto px-4'>
          <div className='flex items-center'>
            <div className='relative flex-1 max-w-3xl'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <SearchIcon className='h-5 w-5 text-gray-400' />
              </div>
              <input
                type='text'
                className='block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                placeholder='Search products...'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {/* Mobile filter button */}
            <button
              className='ml-4 inline-flex items-center px-4 py-2.5 border border-gray-300 md:hidden rounded-lg bg-white hover:bg-gray-50'
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}>
              <SlidersHorizontal className='h-5 w-5 mr-1' />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className='container mx-auto px-4 py-6'>
        <div className='flex flex-col md:flex-row gap-6'>
          {/* Filters - Desktop */}
          <div className='hidden md:block w-64 flex-shrink-0'>
            <div className='bg-white rounded-lg shadow-md p-6'>
              <div className='flex items-center justify-between mb-6'>
                <h2 className='text-xl font-bold text-gray-900'>Filters</h2>
                <button className='text-sm text-blue-600 hover:text-blue-800' onClick={clearFilters}>
                  Clear all
                </button>
              </div>

              <FilterSection title='Categories'>
                <div className='space-y-2'>
                  {categories.map((category) => (
                    <div key={category} className='flex items-center'>
                      <input
                        id={`category-${category}`}
                        type='checkbox'
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                      />
                      <label htmlFor={`category-${category}`} className='ml-2 text-gray-700'>
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title='Brands'>
                <div className='space-y-2'>
                  {brands.map((brand) => (
                    <div key={brand} className='flex items-center'>
                      <input
                        id={`brand-${brand}`}
                        type='checkbox'
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                      />
                      <label htmlFor={`brand-${brand}`} className='ml-2 text-gray-700'>
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title='Price Range'>
                <div className='space-y-2'>
                  {priceRanges.map((range) => (
                    <div key={range.id} className='flex items-center'>
                      <input
                        id={`price-${range.id}`}
                        type='radio'
                        name='price-range'
                        value={range.value}
                        checked={selectedPriceRange === range.value}
                        onChange={() => setSelectedPriceRange(range.value)}
                        className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
                      />
                      <label htmlFor={`price-${range.id}`} className='ml-2 text-gray-700'>
                        {range.label}
                      </label>
                    </div>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title='Customer Rating'>
                <div className='space-y-2'>
                  {ratings.map((rating) => (
                    <div key={rating.id} className='flex items-center'>
                      <input
                        id={`rating-${rating.id}`}
                        type='radio'
                        name='rating'
                        value={rating.value}
                        checked={selectedRating === rating.value}
                        onChange={() => setSelectedRating(rating.value)}
                        className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
                      />
                      <label htmlFor={`rating-${rating.id}`} className='ml-2 text-gray-700'>
                        {rating.label}
                      </label>
                    </div>
                  ))}
                </div>
              </FilterSection>
            </div>
          </div>

          {/* Main content area */}
          <div className='flex-1'>
            {/* Active filters */}
            {(selectedCategories.length > 0 || selectedBrands.length > 0 || selectedPriceRange || selectedRating) && (
              <div className='bg-white rounded-lg shadow-md p-4 mb-6'>
                <div className='flex items-center justify-between mb-2'>
                  <h3 className='font-medium text-gray-700'>Active Filters:</h3>
                  <button className='text-sm text-blue-600 hover:text-blue-800' onClick={clearFilters}>
                    Clear all
                  </button>
                </div>
                <div className='flex flex-wrap gap-2'>
                  {selectedCategories.map((category) => (
                    <div
                      key={`filter-${category}`}
                      className='flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm'>
                      {category}
                      <button className='ml-1.5 focus:outline-none' onClick={() => toggleCategory(category)}>
                        <X className='h-3.5 w-3.5' />
                      </button>
                    </div>
                  ))}
                  {selectedBrands.map((brand) => (
                    <div
                      key={`filter-${brand}`}
                      className='flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm'>
                      {brand}
                      <button className='ml-1.5 focus:outline-none' onClick={() => toggleBrand(brand)}>
                        <X className='h-3.5 w-3.5' />
                      </button>
                    </div>
                  ))}
                  {selectedPriceRange && (
                    <div className='flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm'>
                      {priceRanges.find((r) => r.value === selectedPriceRange)?.label}
                      <button className='ml-1.5 focus:outline-none' onClick={() => setSelectedPriceRange('')}>
                        <X className='h-3.5 w-3.5' />
                      </button>
                    </div>
                  )}
                  {selectedRating && (
                    <div className='flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm'>
                      {ratings.find((r) => r.value === selectedRating)?.label}
                      <button className='ml-1.5 focus:outline-none' onClick={() => setSelectedRating('')}>
                        <X className='h-3.5 w-3.5' />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Search results placeholder */}
            <div className='bg-white rounded-lg shadow-md p-6'>
              <h2 className='text-xl font-bold text-gray-900 mb-4'>Search Results</h2>
              <p className='text-gray-500'>Your search results will appear here.</p>

              {/* This is just a placeholder for the search results */}
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'>
                    <div className='w-full h-40 bg-gray-200 rounded-md mb-3'></div>
                    <div className='h-4 bg-gray-200 rounded w-3/4 mb-2'></div>
                    <div className='h-4 bg-gray-200 rounded w-1/2 mb-2'></div>
                    <div className='h-4 bg-gray-200 rounded w-1/4'></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile filters slide-in panel */}
      {isMobileFilterOpen && (
        <div className='md:hidden fixed inset-0 z-50 overflow-hidden'>
          <div
            className='absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
            onClick={() => setIsMobileFilterOpen(false)}></div>

          <div className='absolute inset-y-0 right-0 max-w-full flex'>
            <div className='relative w-screen max-w-md'>
              <div className='h-full flex flex-col bg-white shadow-xl overflow-y-scroll'>
                <div className='flex items-center justify-between px-4 py-6 border-b border-gray-200'>
                  <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
                  <button
                    type='button'
                    className='text-gray-400 hover:text-gray-500'
                    onClick={() => setIsMobileFilterOpen(false)}>
                    <span className='sr-only'>Close panel</span>
                    <X className='h-6 w-6' />
                  </button>
                </div>

                <div className='flex-1 px-4 py-6 space-y-6 overflow-y-auto'>
                  {/* Categories */}
                  <div className='border-b border-gray-200 pb-6'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-lg font-medium text-gray-900'>Categories</h3>
                      <button className='text-blue-600 text-sm'>
                        <ChevronDown className='h-5 w-5' />
                      </button>
                    </div>
                    <div className='mt-4'>
                      <div className='space-y-4'>
                        {categories.map((category) => (
                          <div key={category} className='flex items-center'>
                            <input
                              id={`mobile-category-${category}`}
                              type='checkbox'
                              checked={selectedCategories.includes(category)}
                              onChange={() => toggleCategory(category)}
                              className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                            />
                            <label htmlFor={`mobile-category-${category}`} className='ml-3 text-gray-700'>
                              {category}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Brands */}
                  <div className='border-b border-gray-200 pb-6'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-lg font-medium text-gray-900'>Brands</h3>
                      <button className='text-blue-600 text-sm'>
                        <ChevronDown className='h-5 w-5' />
                      </button>
                    </div>
                    <div className='mt-4'>
                      <div className='space-y-4'>
                        {brands.map((brand) => (
                          <div key={brand} className='flex items-center'>
                            <input
                              id={`mobile-brand-${brand}`}
                              type='checkbox'
                              checked={selectedBrands.includes(brand)}
                              onChange={() => toggleBrand(brand)}
                              className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
                            />
                            <label htmlFor={`mobile-brand-${brand}`} className='ml-3 text-gray-700'>
                              {brand}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className='border-b border-gray-200 pb-6'>
                    <h3 className='text-lg font-medium text-gray-900'>Price Range</h3>
                    <div className='mt-4'>
                      <div className='space-y-4'>
                        {priceRanges.map((range) => (
                          <div key={range.id} className='flex items-center'>
                            <input
                              id={`mobile-price-${range.id}`}
                              type='radio'
                              name='mobile-price-range'
                              value={range.value}
                              checked={selectedPriceRange === range.value}
                              onChange={() => setSelectedPriceRange(range.value)}
                              className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
                            />
                            <label htmlFor={`mobile-price-${range.id}`} className='ml-3 text-gray-700'>
                              {range.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div>
                    <h3 className='text-lg font-medium text-gray-900'>Customer Rating</h3>
                    <div className='mt-4'>
                      <div className='space-y-4'>
                        {ratings.map((rating) => (
                          <div key={rating.id} className='flex items-center'>
                            <input
                              id={`mobile-rating-${rating.id}`}
                              type='radio'
                              name='mobile-rating'
                              value={rating.value}
                              checked={selectedRating === rating.value}
                              onChange={() => setSelectedRating(rating.value)}
                              className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300'
                            />
                            <label htmlFor={`mobile-rating-${rating.id}`} className='ml-3 text-gray-700'>
                              {rating.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className='border-t border-gray-200 p-4'>
                  <div className='flex space-x-3'>
                    <button
                      type='button'
                      className='flex-1 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                      onClick={clearFilters}>
                      Clear all
                    </button>
                    <button
                      type='button'
                      className='flex-1 bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                      onClick={() => setIsMobileFilterOpen(false)}>
                      Apply filters
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Search;
