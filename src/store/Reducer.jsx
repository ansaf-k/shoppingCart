import 'react-toastify/dist/ReactToastify.css';

export const cartReducer = (state, action) => {
    switch (action.type) {
      case 'add_to_cart': {
        console.log("Previous State:", state);
        console.log("Action Dispatched:", action);
        
        const existingProductIndex = state.findIndex(item => item.id === action.payload.id);
        if (existingProductIndex !== -1) {
          return [...state];
        } else {
          return [...state, { ...action.payload, quantity: 1 }];
        }
      }
      case 'remove_from_cart':
        return state.filter(item => item.id !== action.payload);
  
      case 'increase_quantity':
        return state.map(item =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        );
  
      case 'decrease_quantity':
        return state.map(item =>
          item.id === action.payload && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        ).filter(item => item.quantity > 0);
      default:
        return state;
    }
  }