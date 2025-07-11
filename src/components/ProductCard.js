import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, cart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const { id, name, description, price, imageUrl } = product;
  const cartItem = cart.find(item => item.id === id);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full min-h-[370px]">
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
      <div className="flex flex-col flex-1 p-4">
        <Link to={`/products/${id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          {quantity > 0 ? (
            <div className="flex flex-col items-center">
              <button
                onClick={() => navigate('/cart')}
                className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-sm mb-2"
              >
                View
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(id, quantity - 1)}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300 text-sm"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => updateQuantity(id, quantity + 1)}
                  className="bg-gray-200 text-gray-800 px-2 py-1 rounded hover:bg-gray-300 text-sm"
                >
                  +
                </button>
              </div>
            </div>
          ) : (
            (name === 'Smart Speaker' || name === 'Premium Denim Jeans') ? (
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm w-28 flex flex-col items-center justify-center"
              >
                <span>Add to</span>
                <span>Cart</span>
              </button>
            ) : (
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 text-sm"
              >
                Add to Cart
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;