import { createContext, useReducer } from "react";
import PropTypes from "prop-types";
import { cartReducer } from "./Reducer";

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