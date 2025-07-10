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
          id: 11,
          name: 'Wireless Headphones',
          price: 149.99,
          category: 'electronics',
          imageUrl: WirelessHeadphone,
          description: 'Noise-cancelling Bluetooth headphones with 30-hour battery life',
        },
        {
          id: 22,
          name: 'Premium Denim Jeans',
          price: 89.99,
          category: 'fashion',
          imageUrl: DenimJeans,
          description: 'High-waisted slim-fit jeans with stretch comfort',
        },
        {
          id: 33,
          name: 'Bedding Set',
          price: 129.99,
          category: 'home & living',
          imageUrl: BeddingSet,
          description: '100% cotton 400 thread count bedding set with duvet cover',
        },
        {
          id: 44,
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
      <div className="relative h-[400px] max-w-[1280px] mx-auto overflow-hidden rounded-lg">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${a})` }}
        ></div>

      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-60"></div> 

        <div className="relative z-10 text-white h-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Welcome to SnatchUp</h1>
          <p className="text-lg md:text-xl mb-6">Discover amazing products at great prices</p>
          <Link
            to="/products"
            className="bg-white text-blue-600 px-6 py-2 rounded-md text-lg font-medium hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>

      {/* Featured Products Carousel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
        <Slider {...settings}>
          {featuredProducts.map((product) => (
            <div key={product.id} className="px-3">
              <div className="bg-white rounded-lg shadow-md p-6 text-center h-full">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="mx-auto h-48 object-contain mb-4"
                />
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-blue-600 font-bold mt-2">${product.price}</p>
                <Link
                  to="/products"
                  className="inline-block mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['Electronics', 'Fashion', 'Home & Living'].map((category) => (
              <Link
                key={category}
                to={`/products?category=${category.toLowerCase()}`}
                className="group relative rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200"></div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category}
                  </h3>
                  <p className="mt-2 text-gray-600">Explore {category.toLowerCase()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div
        className="relative bg-blue-600 text-white py-16 bg-cover bg-center"
        style={{ backgroundImage: `url(${backg2})` }}
      >
        <div className="absolute inset-0 bg-blue-800 bg-opacity-70"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-8">Subscribe to our newsletter for the latest products and deals</p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-gray-900"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-2 rounded-md hover:bg-gray-100 transition-colors"
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
