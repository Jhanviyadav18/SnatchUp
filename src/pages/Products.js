import React, { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductList from '../components/ProductList';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

// Please add your product images to 'src/assets/product-images/' and update the filenames below as needed
import TV from '../assets/product-images/TV.jpeg';
import WirelessHeadphone from '../assets/product-images/WirelessHeadphone.jpeg';
import DesignerLeatherHandbag from '../assets/product-images/DesignerLeatherHandbag.jpeg';
import DenimJeans from '../assets/product-images/DenimJeans.jpeg';
import ModernCoffeeTable from '../assets/product-images/ModernCoffeeTable.jpeg';
import SmartSpeaker from '../assets/product-images/SmartSpeaker.jpeg';
import Luxarywatch from '../assets/product-images/Luxarywatch.jpeg';
import BeddingSet from '../assets/product-images/BeddingSet.jpeg';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter and sort states
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);

  const { getCartItemsCount } = useCart();
  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      // Mock data for development

      const mockProducts = [
        {
          id: 1,
          name: 'Smart 4K TV',
          price: 699.99,
          category: 'electronics',
          imageUrl: TV,
          description: '55-inch 4K Ultra HD Smart LED TV with HDR'
        },
        {
          id: 2,
          name: 'Wireless Headphones',
          price: 149.99,
          category: 'electronics',
          imageUrl: WirelessHeadphone,
          description: 'Noise-cancelling Bluetooth headphones with 30-hour battery life'
        },
        {
          
          id: 3,
          name: 'Designer Leather Handbag',
          price: 299.99,
          category: 'fashion',
          imageUrl: DesignerLeatherHandbag,
          description: 'Genuine leather handbag with gold-tone hardware'
        },
        {
          id: 4,
          name: 'Premium Denim Jeans',
          price: 89.99,
          category: 'fashion',
          imageUrl: DenimJeans,
          description: 'High-waisted slim-fit jeans with stretch comfort'
        },
        {
          id: 5,
          name: 'Modern Coffee Table',
          price: 249.99,
          category: 'home & living',
          imageUrl: ModernCoffeeTable,
          description: 'Mid-century modern coffee table with storage shelf'
        },
        {
          id: 6,
          name: 'Smart Speaker',
          price: 79.99,
          category: 'electronics',
          imageUrl: SmartSpeaker,
          description: 'Voice-controlled smart speaker with premium sound'
        },
        {
          id: 7,
          name: 'Luxury Watch',
          price: 399.99,
          category: 'fashion',
          imageUrl: Luxarywatch,
          description: 'Automatic mechanical watch with leather strap'
        },
        {
          id: 8,
          name: 'Bedding Set',
          price: 129.99,
          category: 'home & living',
          imageUrl: BeddingSet,
          description: '100% cotton 400 thread count bedding set with duvet cover'
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      let filteredProducts = mockProducts.filter(product => {
        if (selectedCategory && product.category !== selectedCategory) return false;
        if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (priceRange.min && product.price < parseFloat(priceRange.min)) return false;
        if (priceRange.max && product.price > parseFloat(priceRange.max)) return false;
        return true;
      });

      // Apply sorting
      const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sortBy) {
          case 'price_asc':
            return a.price - b.price;
          case 'price_desc':
            return b.price - a.price;
          case 'name_asc':
            return a.name.localeCompare(b.name);
          default: // 'newest'
            return b.id - a.id;
        }
      });

      const data = sortedProducts;
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, priceRange, sortBy, searchQuery]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchParams({ category });
    setShowFilters(false);
  };

  const handlePriceRangeChange = (e, bound) => {
    setPriceRange(prev => ({
      ...prev,
      [bound]: e.target.value
    }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setSearchQuery('');
    setPriceRange({ min: '', max: '' });
    setSortBy('newest');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
      {/* Search and Filter Toggle */}
      <div className="mb-6 sm:mb-8">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-3 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
            />
          </div>
          <div className="flex gap-2 sm:gap-4">
            <button
              type="submit"
              className="flex-1 sm:flex-none px-6 py-3 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-base font-medium"
            >
              Search
            </button>
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 sm:py-2 border border-gray-300 rounded-lg hover:bg-gray-50 md:hidden text-base font-medium"
            >
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
          </div>
        </form>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Filters Sidebar */}
        <div className={`w-full lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-lg shadow p-4 sm:p-6 space-y-6">
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear all
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-3">Categories</h4>
                  <div className="space-y-2">
                    {['All', 'Electronics', 'Fashion', 'Home & Living'].map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category === 'All' ? '' : category.toLowerCase())}
                        className={`block w-full text-left px-4 py-3 rounded-lg transition-colors ${
                          selectedCategory === (category === 'All' ? '' : category.toLowerCase()) 
                            ? 'bg-blue-600 text-white' 
                            : 'hover:bg-gray-100'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="space-y-3">
                    <input
                      type="number"
                      placeholder="Min Price"
                      value={priceRange.min}
                      onChange={(e) => handlePriceRangeChange(e, 'min')}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    />
                    <input
                      type="number"
                      placeholder="Max Price"
                      value={priceRange.max}
                      onChange={(e) => handlePriceRangeChange(e, 'max')}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 sm:p-6 border-b">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-xl sm:text-2xl font-bold">
                  {selectedCategory 
                    ? selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1) 
                    : 'All Products'}
                </h2>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full sm:w-auto px-4 py-3 sm:py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                >
                  <option value="newest">Newest</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="name_asc">Name: A to Z</option>
                </select>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <ProductList
                products={products}
                loading={loading}
                error={error}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Cart Button - Mobile Optimized */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 pointer-events-none">
        <button
          onClick={() => navigate('/cart')}
          className="pointer-events-auto bg-blue-600 text-white px-4 py-3 sm:px-6 sm:py-3 rounded-full shadow-lg hover:bg-blue-700 text-base sm:text-lg font-medium flex items-center gap-2"
        >
          <span className="hidden sm:inline">View Cart</span>
          <span className="sm:hidden">Cart</span>
          <span className="bg-white text-blue-600 rounded-full px-2 py-1 sm:px-3 sm:py-1 text-sm sm:text-base font-bold">
            {getCartItemsCount()}
          </span>
        </button>
      </div>
    </div>
  );
};

export default Products;