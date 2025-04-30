import React, { createContext, useContext, useReducer, ReactNode, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string; size: string; color: string } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number; size: string; color: string } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  total: 0,
};

// Load cart from localStorage if available
const loadCartFromStorage = (): CartState => {
  try {
    const savedCart = localStorage.getItem('flexova-cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return initialState;
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let newState: CartState;
  
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );

      if (existingItem) {
        newState = {
          ...state,
          items: state.items.map((item) =>
            item.id === existingItem.id &&
            item.size === existingItem.size &&
            item.color === existingItem.color
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
          total: state.total + action.payload.price * action.payload.quantity,
        };
      } else {
        newState = {
          ...state,
          items: [...state.items, action.payload],
          total: state.total + action.payload.price * action.payload.quantity,
        };
      }
      break;
    }

    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (!itemToRemove) {
        newState = state;
      } else {
        newState = {
          ...state,
          items: state.items.filter(
            (item) =>
              !(item.id === action.payload.id &&
                item.size === action.payload.size &&
                item.color === action.payload.color)
          ),
          total: state.total - itemToRemove.price * itemToRemove.quantity,
        };
      }
      break;
    }

    case 'UPDATE_QUANTITY': {
      const itemToUpdate = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.size === action.payload.size &&
          item.color === action.payload.color
      );
      if (!itemToUpdate) {
        newState = state;
      } else {
        const quantityDiff = action.payload.quantity - itemToUpdate.quantity;
        newState = {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id &&
            item.size === action.payload.size &&
            item.color === action.payload.color
              ? { ...item, quantity: action.payload.quantity }
              : item
          ),
          total: state.total + itemToUpdate.price * quantityDiff,
        };
      }
      break;
    }

    case 'CLEAR_CART':
      newState = initialState;
      break;

    default:
      newState = state;
  }
  
  // Save updated state to localStorage
  try {
    localStorage.setItem('flexova-cart', JSON.stringify(newState));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
  
  return newState;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, loadCartFromStorage());

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('flexova-cart', JSON.stringify(state));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 