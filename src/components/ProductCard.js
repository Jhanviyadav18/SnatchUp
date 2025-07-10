import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { id, name, description, price, imageUrl } = product;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/products/${id}`}>
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = '/placeholder-product.png';
          }}
        />
      </Link>
      <div className="p-4">
        <Link to={`/products/${id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;