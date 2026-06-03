import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, CartState } from '@/types/cart';
import { Product } from '@/types/product';

type CartAction =
  | { type: 'ADD_ITEM'; payload: { product: Product; shopId: number } }
  | { type: 'REMOVE_ITEM'; payload: { productId: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  totalPrice: 0
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { product, shopId } = action.payload;
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { product, quantity: 1, shopId }];
      }
      
      const totalPrice = newItems.reduce((sum, item) => 
        sum + item.product.price * item.quantity, 0);
      
      return {
        ...state,
        items: newItems,
        shopId,
        totalPrice
      };
    }
    
    case 'REMOVE_ITEM': {
      const { productId } = action.payload;
      const newItems = state.items.filter(item => item.product.id !== productId);
      const totalPrice = newItems.reduce((sum, item) => 
        sum + item.product.price * item.quantity, 0);
      
      return {
        ...state,
        items: newItems,
        totalPrice,
        shopId: newItems.length === 0 ? undefined : state.shopId
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload;
      let newItems: CartItem[];
      
      if (quantity <= 0) {
        newItems = state.items.filter(item => item.product.id !== productId);
      } else {
        newItems = state.items.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        );
      }
      
      const totalPrice = newItems.reduce((sum, item) => 
        sum + item.product.price * item.quantity, 0);
      
      return {
        ...state,
        items: newItems,
        totalPrice,
        shopId: newItems.length === 0 ? undefined : state.shopId
      };
    }
    
    case 'CLEAR_CART':
      return initialState;
      
    default:
      return state;
  }
};

interface CartContextType extends CartState {
  addItem: (product: Product, shopId: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: number) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  
  const addItem = (product: Product, shopId: number) => {
    dispatch({ type: 'ADD_ITEM', payload: { product, shopId } });
  };
  
  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
  };
  
  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };
  
  const getItemQuantity = (productId: number): number => {
    const item = state.items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };
  
  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
