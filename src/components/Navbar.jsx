import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartItemsCount } = useCart();
  const { isAuthenticated, logout } = useAuth();
  const { getWishlistCount } = useWishlist();

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <img src={process.env.PUBLIC_URL + '/favicon.ico'} alt="Logo" className="h-8 w-8 rounded-full object-cover" />
              <h1 className="text-xl font-bold">SnatchUp</h1>
            </Link>
            {/* Desktop Navigation - Hidden on mobile */}
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <a
                  href="/"
                  onClick={e => { e.preventDefault(); window.location.href = '/'; window.location.reload(); }}
                  className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Home
                </a>
                <Link
                  to="/products"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Products
                </Link>
              </div>
            </div>
          </div>

          {/* Right side - Icons and Auth */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              className="hover:bg-gray-700 p-2 rounded-md text-sm font-medium relative transition-colors"
            >
              <span className="sr-only">Wishlist</span>
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {getWishlistCount() > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-red-600 rounded-full">
                  {getWishlistCount()}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="hover:bg-gray-700 p-2 rounded-md text-sm font-medium relative transition-colors"
            >
              <span className="sr-only">Cart</span>
              <svg
                className="h-5 w-5 sm:h-6 sm:w-6"
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
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white bg-blue-600 rounded-full">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>

            {/* Desktop Auth - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-2">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="hover:bg-gray-700 p-2 rounded-md text-sm font-medium transition-colors"
                    title="Profile"
                  >
                    <span className="sr-only">Profile</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </Link>
                  <Link
                    to="/orders"
                    className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Orders
                  </Link>
                  <button
                    onClick={() => logout()}
                    className="bg-blue-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="hover:bg-gray-700 p-2 rounded-md text-sm font-medium transition-colors"
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="/"
              onClick={e => { e.preventDefault(); window.location.href = '/'; window.location.reload(); setIsMenuOpen(false); }}
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors"
            >
              Home
            </a>
            <Link
              to="/products"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/wishlist"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Wishlist {getWishlistCount() > 0 && `(${getWishlistCount()})`}
            </Link>
            <Link
              to="/cart"
              className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Cart {getCartItemsCount() > 0 && `(${getCartItemsCount()})`}
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Orders
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700 transition-colors"
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