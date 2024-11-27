import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingProduct = state.find(item => item.id === action.payload.id);
      if (existingProduct) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }
    case 'REMOVE_FROM_CART':
      return { ...state, items: state.items.filter(item => item.id !== action.itemId) };

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
}

export const CartContext = createContext();

const CartProvider = ({ children }) => {

  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.object.isRequired,
}

export default CartProvider;