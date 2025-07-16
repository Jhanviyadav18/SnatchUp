import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";

// Import images
import WirelessHeadphone from '../assets/product-images/WirelessHeadphone.jpeg';
import DenimJeans from '../assets/product-images/DenimJeans.jpeg';
import BeddingSet from '../assets/product-images/BeddingSet.jpeg';
import SmartSpeaker from '../assets/product-images/SmartSpeaker.jpeg';
import a from '../assets/product-images/a.jpeg';
import backg2 from '../assets/product-images/backg2.jpeg';


const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const mockFeaturedProducts = [
        {
          id: 2,
          name: 'Wireless Headphones',
          price: 149.99,
          category: 'electronics',
          imageUrl: WirelessHeadphone,
          description: 'Noise-cancelling Bluetooth headphones with 30-hour battery life',
        },
        {
          id: 4,
          name: 'Premium Denim Jeans',
          price: 89.99,
          category: 'fashion',
          imageUrl: DenimJeans,
          description: 'High-waisted slim-fit jeans with stretch comfort',
        },
        {
          id: 8,
          name: 'Bedding Set',
          price: 129.99,
          category: 'home & living',
          imageUrl: BeddingSet,
          description: '100% cotton 400 thread count bedding set with duvet cover',
        },
        {
          id: 6,
          name: 'Smart Speaker',
          price: 79.99,
          category: 'electronics',
          imageUrl: SmartSpeaker,
          description: 'Voice-controlled smart speaker with premium sound',
        },
      ];

      await new Promise((resolve) => setTimeout(resolve, 500));
      setFeaturedProducts(mockFeaturedProducts);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 p-4">Error: {error}</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <>
      {/* Hero Section with Background */}
      <div className="relative h-[300px] sm:h-[400px] max-w-[1280px] mx-auto overflow-hidden rounded-lg mx-4 sm:mx-auto">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${a})` }}
        ></div>

        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-60"></div> 

        <div className="relative z-10 text-white h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">Welcome to SnatchUp</h1>
          <p className="text-base sm:text-lg md:text-xl mb-4 sm:mb-6 px-2">Discover amazing products at great prices</p>
          <Link
            to="/products"
            className="bg-white text-blue-600 px-4 sm:px-6 py-2 rounded-md text-sm sm:text-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Featured Products Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Products</h2>
          <Link
            to="/products"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium text-sm sm:text-base"
          >
            View All Products
          </Link>
        </div>
        <Slider {...settings}>
          {featuredProducts.map((product) => (
            <div key={product.id} className="px-2 sm:px-3">
              <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 text-center h-full transition-transform duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="mx-auto h-32 sm:h-48 object-contain mb-3 sm:mb-4"
                />
                <h3 className="text-base sm:text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm sm:text-base mb-2">{product.description}</p>
                <p className="text-blue-600 font-bold text-sm sm:text-base">${product.price}</p>
                <Link
                  to={`/products/${product.id}`}
                  className="inline-block mt-3 sm:mt-4 bg-blue-600 text-white px-3 sm:px-4 py-2 rounded hover:bg-blue-700 text-sm sm:text-base transition-colors"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-100 py-8 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {['Electronics', 'Fashion', 'Home & Living'].map((category) => (
              <Link
                key={category}
                to={`/products?category=${encodeURIComponent(category.toLowerCase())}`}
                className="group relative rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200"></div>
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category}
                  </h3>
                  <p className="mt-2 text-gray-600 text-sm sm:text-base">Explore {category.toLowerCase()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div
        className="relative bg-blue-600 text-white py-8 sm:py-16 bg-cover bg-center"
        style={{ backgroundImage: `url(${backg2})` }}
      >
        <div className="absolute inset-0 bg-blue-800 bg-opacity-70"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Stay Updated</h2>
          <p className="mb-6 sm:mb-8 text-sm sm:text-base">Subscribe to our newsletter for the latest products and deals</p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3 sm:gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-gray-900 text-sm sm:text-base"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-4 sm:px-6 py-2 rounded-md hover:bg-gray-100 transition-colors text-sm sm:text-base font-medium"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
