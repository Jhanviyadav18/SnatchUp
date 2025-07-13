import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

const ProductCard = ({ product }) => {
  const { addToCart, cart, updateQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showSuccess } = useToast();
  const navigate = useNavigate();
  const { id, name, description, price, imageUrl } = product;
  const cartItem = cart.find(item => item.id === id);
  const quantity = cartItem ? cartItem.quantity : 0;
  const isWishlisted = isInWishlist(id);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(id);
      showSuccess(`${name} removed from wishlist`);
    } else {
      addToWishlist(product);
      showSuccess(`${name} added to wishlist`);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    showSuccess(`${name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full min-h-[320px] sm:min-h-[370px] hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative group">
        <Link to={`/products/${id}`}> 
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = '/placeholder-product.png';
            }}
          />
        </Link>
        <button
          onClick={handleWishlistToggle}
          className={`absolute top-2 right-2 p-1.5 sm:p-2 rounded-full transition-all duration-200 ${
            isWishlisted 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-white text-gray-400 hover:text-red-500 hover:bg-white'
          } shadow-md`}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col flex-1 p-3 sm:p-4">
        <Link to={`/products/${id}`}>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{name}</h3>
        </Link>
        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2 flex-1">{description}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-lg sm:text-xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          {quantity > 0 ? (
            <div className="flex flex-col items-center">
              <button
                onClick={() => navigate('/cart')}
                className="bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 text-xs sm:text-sm mb-1 sm:mb-2 transition-colors"
              >
                View
              </button>
              <div className="flex items-center gap-1 sm:gap-2">
                <button
                  onClick={() => updateQuantity(id, quantity - 1)}
                  className="bg-gray-200 text-gray-800 px-1.5 sm:px-2 py-1 rounded hover:bg-gray-300 text-xs sm:text-sm transition-colors"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="text-xs sm:text-sm font-medium">{quantity}</span>
                <button
                  onClick={() => updateQuantity(id, quantity + 1)}
                  className="bg-gray-200 text-gray-800 px-1.5 sm:px-2 py-1 rounded hover:bg-gray-300 text-xs sm:text-sm transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 text-white rounded hover:bg-blue-700 text-xs sm:text-sm flex flex-col items-center justify-center transition-colors duration-200 px-2 py-2 sm:px-3 sm:py-2 min-w-[5rem] sm:min-w-[6rem]"
            >
              <span>Add to</span>
              <span>Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;