import React, { createContext, useContext, useState } from 'react';

const CouponContext = createContext();

// Mock coupon data
const availableCoupons = [
  {
    code: 'WELCOME10',
    discount: 10,
    type: 'percentage',
    minAmount: 50,
    maxDiscount: 25,
    description: '10% off on orders over $50',
    valid: true
  },
  {
    code: 'SAVE20',
    discount: 20,
    type: 'percentage',
    minAmount: 100,
    maxDiscount: 50,
    description: '20% off on orders over $100',
    valid: true
  },
  {
    code: 'FREESHIP',
    discount: 10,
    type: 'fixed',
    minAmount: 75,
    maxDiscount: 10,
    description: '$10 off on orders over $75',
    valid: true
  },
  {
    code: 'FLASH25',
    discount: 25,
    type: 'percentage',
    minAmount: 150,
    maxDiscount: 75,
    description: '25% off on orders over $150',
    valid: true
  }
];

export const CouponProvider = ({ children }) => {
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  const validateCoupon = (code, subtotal) => {
    const coupon = availableCoupons.find(c => c.code.toUpperCase() === code.toUpperCase());
    
    if (!coupon) {
      return { valid: false, error: 'Invalid coupon code' };
    }

    if (!coupon.valid) {
      return { valid: false, error: 'Coupon is no longer valid' };
    }

    if (subtotal < coupon.minAmount) {
      return { 
        valid: false, 
        error: `Minimum order amount of $${coupon.minAmount} required` 
      };
    }

    return { valid: true, coupon };
  };

  const applyCoupon = (code, subtotal) => {
    setCouponError('');
    const validation = validateCoupon(code, subtotal);
    
    if (!validation.valid) {
      setCouponError(validation.error);
      return false;
    }

    setAppliedCoupon(validation.coupon);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
  };

  const calculateDiscount = (subtotal) => {
    if (!appliedCoupon) return 0;

    let discount = 0;
    if (appliedCoupon.type === 'percentage') {
      discount = (subtotal * appliedCoupon.discount) / 100;
      if (discount > appliedCoupon.maxDiscount) {
        discount = appliedCoupon.maxDiscount;
      }
    } else {
      discount = appliedCoupon.discount;
    }

    return Math.min(discount, subtotal); // Don't discount more than subtotal
  };

  const getFinalTotal = (subtotal) => {
    const discount = calculateDiscount(subtotal);
    return Math.max(0, subtotal - discount);
  };

  return (
    <CouponContext.Provider
      value={{
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        calculateDiscount,
        getFinalTotal,
        availableCoupons
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupon = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error('useCoupon must be used within a CouponProvider');
  }
  return context;
}; 