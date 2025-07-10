import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemsCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <h1 className="text-xl font-bold">SnatchUp</h1>
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/products"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Products
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              to="/cart"
              className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium relative"
            >
              <span className="sr-only">Cart</span>
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {getCartItemsCount() > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <button
                onClick={() => logout()}
                className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 ml-4"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium ml-4"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart {getCartItemsCount() > 0 && `(${getCartItemsCount()})`}
            </Link>
            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;