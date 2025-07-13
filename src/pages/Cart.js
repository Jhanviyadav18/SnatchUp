import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useCoupon } from '../context/CouponContext';
import { Link } from 'react-router-dom';


const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const { isAuthenticated } = useAuth();
  const { showSuccess, showWarning } = useToast();
  const { 
    appliedCoupon, 
    couponError, 
    applyCoupon, 
    removeCoupon, 
    calculateDiscount, 
    getFinalTotal 
  } = useCoupon();
  const [couponCode, setCouponCode] = useState('');

  const subtotal = getCartTotal();
  const discount = calculateDiscount(subtotal);
  const finalTotal = getFinalTotal(subtotal);

  const handleApplyCoupon = () => {
    if (applyCoupon(couponCode, subtotal)) {
      showSuccess(`Coupon ${couponCode.toUpperCase()} applied successfully!`);
      setCouponCode('');
    } else {
      showWarning(couponError);
    }
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    showSuccess('Coupon removed successfully');
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      showWarning('Please login to proceed to checkout');
      navigate('/login', { state: { from: '/cart' } });
      return;
    }
    navigate('/checkout');
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id);
    showSuccess(`${item.name} removed from cart`);
  };

  const handleClearCart = () => {
    clearCart();
    showSuccess('Cart cleared successfully');
  };

  const handleQuantityUpdate = (item, newQuantity) => {
    if (newQuantity < 1) {
      showWarning('Quantity cannot be less than 1');
      return;
    }
    updateQuantity(item.id, newQuantity);
    showSuccess(`Quantity updated to ${newQuantity}`);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
          <button
            onClick={() => navigate('/products')}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <button
          onClick={handleClearCart}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 font-medium transition-colors"
        >
          Remove All
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <ul className="divide-y divide-gray-200">
              {cart.map((item) => (
                <li key={item.id} className="p-6">
                  <div className="flex items-center">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="ml-6 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">
                          {item.name}
                        </h3>
                        <p className="text-lg font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        ${item.price.toFixed(2)} each
                      </p>
                      <div className="mt-4 flex items-center">
                        <button
                          onClick={() => handleQuantityUpdate(item, item.quantity - 1)}
                          className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityUpdate(item, parseInt(e.target.value) || 1)}
                          className="mx-2 w-16 text-center border rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <button
                          onClick={() => handleQuantityUpdate(item, item.quantity + 1)}
                          className="text-gray-500 hover:text-gray-700 transition-colors"
                        >
                          +
                        </button>
                        <button
                          onClick={() => handleRemoveItem(item)}
                          className="ml-4 text-red-600 hover:text-red-800 transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>
            
            {/* Coupon Section */}
            <div className="mb-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                  className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleApplyCoupon}
                  disabled={!couponCode.trim()}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Apply
                </button>
              </div>
              {appliedCoupon && (
                <div className="mt-2 flex items-center justify-between bg-green-50 p-2 rounded">
                  <span className="text-sm text-green-800">
                    {appliedCoupon.code} - {appliedCoupon.description}
                  </span>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              )}
              {couponError && (
                <p className="mt-1 text-sm text-red-600">{couponError}</p>
              )}
            </div>

            <div className="flow-root">
              <dl className="-my-4 text-sm">
                <div className="py-4 flex items-center justify-between">
                  <dt className="text-gray-600">Subtotal</dt>
                  <dd className="font-medium text-gray-900">
                    ${subtotal.toFixed(2)}
                  </dd>
                </div>
                {discount > 0 && (
                  <div className="py-2 flex items-center justify-between">
                    <dt className="text-green-600">Discount</dt>
                    <dd className="font-medium text-green-600">
                      -${discount.toFixed(2)}
                    </dd>
                  </div>
                )}
                <div className="py-4 flex items-center justify-between border-t border-gray-200">
                  <dt className="text-base font-medium text-gray-900">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${finalTotal.toFixed(2)}
                  </dd>
                </div>
              </dl>
            </div>
            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Proceed to Checkout
            </button>
            <Link
              to="/products"
              className="mt-4 block text-center text-sm text-blue-600 hover:text-blue-800"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;