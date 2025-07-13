import React from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products, loading, error }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-3 sm:p-4 animate-pulse">
            <div className="w-full h-40 sm:h-48 bg-gray-200 rounded mb-3 sm:mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3 sm:mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3 sm:mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p className="text-base sm:text-lg">Error: {error}</p>
      </div>
    );
  }

  if (!products?.length) {
    return (
      <div className="text-center text-gray-600 p-6 sm:p-8">
        <p className="text-lg sm:text-xl">No products found</p>
        <p className="mt-2 text-sm sm:text-base">Try adjusting your filters or search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;