import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';

// Import product images
import TV from '../assets/product-images/TV.jpeg';
import WirelessHeadphone from '../assets/product-images/WirelessHeadphone.jpeg';
import DesignerLeatherHandbag from '../assets/product-images/DesignerLeatherHandbag.jpeg';
import DenimJeans from '../assets/product-images/DenimJeans.jpeg';
import ModernCoffeeTable from '../assets/product-images/ModernCoffeeTable.jpeg';
import SmartSpeaker from '../assets/product-images/SmartSpeaker.jpeg';
import Luxarywatch from '../assets/product-images/Luxarywatch.jpeg';
import BeddingSet from '../assets/product-images/BeddingSet.jpeg';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart, updateQuantity, getCartItemsCount } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { showSuccess } = useToast();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const cartItem = cart.find(item => item.id === (product ? product.id : null));
  const [quantity, setQuantity] = useState(cartItem ? cartItem.quantity : 1);
  const isWishlisted = product ? isInWishlist(product.id) : false;

  // Sync quantity with cart when product or cart changes
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItem, product]);

  // Mock products data (same as in Products.js)
  const mockProducts = [
    {
      id: 1,
      name: 'Smart 4K TV',
      price: 699.99,
      category: 'electronics',
      imageUrl: TV,
      description: '55-inch 4K Ultra HD Smart LED TV with HDR. Experience stunning picture quality with 4K resolution and High Dynamic Range (HDR) technology. This smart TV comes with built-in streaming apps, voice control, and a sleek design that fits perfectly in any living room. Features include multiple HDMI ports, USB connectivity, and wireless screen mirroring capabilities.'
    },
    {
      id: 2,
      name: 'Wireless Headphones',
      price: 149.99,
      category: 'electronics',
      imageUrl: WirelessHeadphone,
      description: 'Premium noise-cancelling Bluetooth headphones with 30-hour battery life. These wireless headphones deliver crystal-clear sound with active noise cancellation technology that blocks out ambient noise. Perfect for music lovers, professionals, and travelers. Features include touch controls, quick charging, and a comfortable over-ear design with memory foam ear cushions.'
    },
    {
      id: 3,
      name: 'Designer Leather Handbag',
      price: 299.99,
      category: 'fashion',
      imageUrl: DesignerLeatherHandbag,
      description: 'Genuine leather handbag. This elegant designer handbag is crafted from premium full-grain leather and features sophisticated gold-tone hardware accents. The spacious interior includes multiple compartments for organization, while the adjustable shoulder strap provides comfort and versatility. Perfect for both casual and formal occasions.'
    },
    {
      id: 4,
      name: 'Premium Denim Jeans',
      price: 89.99,
      category: 'fashion',
      imageUrl: DenimJeans,
      description: 'High-waisted slim-fit jeans with stretch comfort. These premium denim jeans feature a flattering high-waisted design with a slim-fit silhouette that hugs your curves perfectly. Made from high-quality stretch denim for maximum comfort and mobility. The classic blue wash and timeless design make these jeans a versatile addition to any wardrobe.'
    },
    {
      id: 5,
      name: 'Modern Coffee Table',
      price: 249.99,
      category: 'home & living',
      imageUrl: ModernCoffeeTable,
      description: 'Mid-century modern coffee table with storage shelf. This stylish coffee table combines contemporary design with practical functionality. The clean lines and natural wood finish create a timeless aesthetic that complements any decor style. The built-in storage shelf provides additional space for books, magazines, or decorative items.'
    },
    {
      id: 6,
      name: 'Smart Speaker',
      price: 79.99,
      category: 'electronics',
      imageUrl: SmartSpeaker,
      description: 'Voice-controlled smart speaker with premium sound. This intelligent smart speaker responds to voice commands and provides high-quality audio output. Compatible with popular voice assistants, it can play music, answer questions, control smart home devices, and more. The compact design fits seamlessly into any room while delivering powerful, room-filling sound.'
    },
    {
      id: 7,
      name: 'Luxury Watch',
      price: 399.99,
      category: 'fashion',
      imageUrl: Luxarywatch,
      description: 'Automatic mechanical watch with metal strap. This luxury timepiece features a sophisticated automatic movement that winds itself as you wear it. The elegant design includes a scratch-resistant sapphire crystal, water resistance, and a genuine metal strap. The classic dial design with luminous hands ensures excellent readability in any lighting condition.'
    },
    {
      id: 8,
      name: 'Bedding Set',
      price: 129.99,
      category: 'home & living',
      imageUrl: BeddingSet,
      description: '100% cotton 400 thread count bedding set with duvet cover. This luxurious bedding set is made from premium 100% cotton with a high 400 thread count for exceptional softness and durability. The set includes a fitted sheet, flat sheet, pillowcases, and a duvet cover. The breathable cotton fabric helps regulate temperature for a comfortable night\'s sleep.'
    }
  ];

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const foundProduct = mockProducts.find(p => p.id === parseInt(id));
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          // Product not found
          navigate('/products');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/products');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      if (cartItem) {
        updateQuantity(product.id, quantity);
        showSuccess(`Quantity updated to ${quantity}`);
      } else {
        for (let i = 0; i < quantity; i++) {
          addToCart(product);
        }
        showSuccess(`${product.name} added to cart!`);
      }
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
      if (isWishlisted) {
        removeFromWishlist(product.id);
        showSuccess(`${product.name} removed from wishlist`);
      } else {
        addToWishlist(product);
        showSuccess(`${product.name} added to wishlist`);
      }
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-200 h-96 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="relative w-full h-[28rem] flex items-center justify-center bg-white rounded-lg shadow-lg group">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = '/placeholder-product.png';
              }}
            />
            <button
              onClick={handleWishlistToggle}
              className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-200 ${
                isWishlisted 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-white text-gray-400 hover:text-red-500 hover:bg-white'
              } shadow-lg`}
              title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <svg className="w-6 h-6" fill={isWishlisted ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-lg text-gray-600 mb-4">Category: {product.category}</p>
            <div className="text-3xl font-bold text-blue-600 mb-6">
              ${product.price.toFixed(2)}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                      if (cartItem) updateQuantity(product.id, quantity - 1);
                    }
                  }}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 text-lg"
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="px-4 text-lg">{quantity}</span>
                <button
                  onClick={() => {
                    setQuantity(quantity + 1);
                    if (cartItem) updateQuantity(product.id, quantity + 1);
                  }}
                  className="bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300 text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium text-base"
              >
                Add to Cart - ${(product.price * quantity).toFixed(2)}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors font-medium text-base"
              >
                Buy Now
              </button>
            </div>

            <button
              onClick={() => navigate('/products')}
              className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-md hover:bg-gray-300 transition-colors font-medium"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
      {/* Floating View Cart Button */}
      {getCartItemsCount() > 0 && (
        <div className="fixed bottom-6 right-6 z-50 pointer-events-none">
          <button
            onClick={() => navigate('/cart')}
            className="pointer-events-auto bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 text-lg font-medium flex items-center gap-2"
          >
            View Cart
            <span className="bg-white text-blue-600 rounded-full px-3 py-1 ml-2 text-base font-bold">{getCartItemsCount()}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductDetail; 