import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      console.log("Previous State:", state);
      console.log("Action Dispatched:", action);
      
      const existingProductIndex = state.findIndex(item => item.id === action.payload.id);
      if (existingProductIndex !== -1) {
        return [...state];
      } else {
        return [...state, { ...action.payload, quantity: 1 }];
      }
    }
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload);

    case 'INCREASE_QUANTITY':
      return state.map(item =>
        item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
      );

    case 'DECREASE_QUANTITY':
      return state.map(item =>
        item.id === action.payload && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter(item => item.quantity > 0);
    default:
      return state;
  }
}


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