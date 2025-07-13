import React, { createContext, useContext, useReducer, useEffect } from 'react';

const OrderContext = createContext();

const orderReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [action.payload, ...state.orders],
      };

    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? { ...order, status: action.payload.status }
            : order
        ),
      };

    case 'LOAD_ORDERS':
      return {
        ...state,
        orders: action.payload,
      };

    case 'CLEAR_ORDERS':
      return {
        ...state,
        orders: [],
      };

    default:
      return state;
  }
};

export const OrderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, { orders: [] });

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders);
        dispatch({ type: 'LOAD_ORDERS', payload: parsedOrders });
      } catch (error) {
        console.error('Error loading orders from localStorage:', error);
      }
    }
  }, []);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(state.orders));
  }, [state.orders]);

  const createOrder = (orderData) => {
    const newOrder = {
      id: Date.now(),
      ...orderData,
      createdAt: new Date().toISOString(),
      status: 'Processing', // Processing, Shipped, Delivered, Cancelled
      trackingNumber: `TRK${Date.now()}`,
    };
    
    dispatch({ type: 'ADD_ORDER', payload: newOrder });
    return newOrder;
  };

  const updateOrderStatus = (orderId, status) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { orderId, status } });
  };

  const getOrders = () => {
    return state.orders;
  };

  const getOrderById = (orderId) => {
    return state.orders.find(order => order.id === orderId);
  };

  const getOrdersByStatus = (status) => {
    return state.orders.filter(order => order.status === status);
  };

  const clearOrders = () => {
    dispatch({ type: 'CLEAR_ORDERS' });
  };

  return (
    <OrderContext.Provider
      value={{
        orders: state.orders,
        createOrder,
        updateOrderStatus,
        getOrders,
        getOrderById,
        getOrdersByStatus,
        clearOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
}; 