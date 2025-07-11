import React from 'react';
import Slider from 'react-slick';
import WirelessHeadphone from '../assets/product-images/WirelessHeadphone.jpeg';
import DenimJeans from '../assets/product-images/DenimJeans.jpeg';
import BeddingSet from '../assets/product-images/BeddingSet.jpeg';
import SmartSpeaker from '../assets/product-images/SmartSpeaker.jpeg';
import { Link } from 'react-router-dom';

const FeaturedCarousel = () => {
  const featuredProducts = [
    {
      id: 11,
      name: 'Wireless Headphones',
      price: 149.99,
      category: 'electronics',
      imageUrl: WirelessHeadphone,
      description: 'Noise-cancelling Bluetooth headphones with 30-hour battery life'
    },
    {
      id: 22,
      name: 'Premium Denim Jeans',
      price: 89.99,
      category: 'fashion',
      imageUrl: DenimJeans,
      description: 'High-waisted slim-fit jeans with stretch comfort'
    },
    {
      id: 33,
      name: 'Bedding Set',
      price: 129.99,
      category: 'home & living',
      imageUrl: BeddingSet,
      description: '100% cotton 400 thread count bedding set with duvet cover'
    },
    {
      id: 44,
      name: 'Smart Speaker',
      price: 79.99,
      category: 'electronics',
      imageUrl: SmartSpeaker,
      description: 'Voice-controlled smart speaker with premium sound'
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex items-center mb-4">
        <Link to="/products" className="mr-4 bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 font-medium">View All</Link>
        <h2 className="text-2xl font-bold flex-1 text-center">Featured Products</h2>
      </div>
      <Slider {...settings}>
        {featuredProducts.map(product => (
          <div key={product.id} className="p-4">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <img src={product.imageUrl} alt={product.name} className="mx-auto h-48 object-contain mb-4" />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-blue-600 font-bold mt-2">${product.price}</p>
              <Link to={`/product/${product.id}`} className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium">View Product</Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedCarousel;
