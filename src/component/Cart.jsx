import { Minus, Plus, X } from "lucide-react"
import { useContext } from "react"
import { CartContext } from "../store/CartContext"

const Cart = () => {
  const { cart, dispatch } = useContext(CartContext);

  const handleRemoveFromCart = (id) => {
    dispatch({ type: "remove_from_cart", payload: id  });
  };

  const handleIncreaseQuantity = (id) => {
    dispatch({ type: "increase_quantity", payload: id });
  };

  const handleDecreaseQuantity = (id) => {
    dispatch({ type: "decrease_quantity", payload: id });
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="bg-stone-100 min-h-screen py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-playfair font-bold text-emerald-800 mb-8 text-center">Your Shopping Cart</h1>
          <p className="text-center flex justify-center content-center text-stone-600">Your cart is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-stone-100 min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-playfair font-bold text-emerald-800 mb-8 text-center">Your Shopping Cart</h1>
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            {cart.map(item => (
              <div key={item.id} className="flex items-center py-6 border-b border-stone-200 last:border-b-0">
                <img src={item.thumbnail} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-grow ml-4">
                  <h3 className="font-playfair font-semibold text-emerald-800">{item.name}</h3>
                  <p className="text-amber-500 font-bold mt-1">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center">
                  <button
                    className="text-stone-600 hover:text-emerald-800 transition-colors duration-300"
                    onClick={() => handleDecreaseQuantity(item.id)}
                  >
                    <Minus className="h-5 w-5" />
                  </button>
                  <span className="mx-2 w-8 text-center">{item.quantity}</span>
                  <button
                    className="text-stone-600 hover:text-emerald-800 transition-colors duration-300"
                    onClick={() => handleIncreaseQuantity(item.id)}
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <button
                  className="ml-4 text-stone-600 hover:text-emerald-800 transition-colors duration-300"
                  onClick={() => handleRemoveFromCart(item.id)}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
          <div className="bg-stone-50 p-6">
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-stone-600">Subtotal:</span>
              <span className="font-bold text-emerald-800">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-semibold text-stone-600">Tax (10%):</span>
              <span className="font-bold text-emerald-800">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-6">
              <span className="font-semibold text-stone-600">Total:</span>
              <span className="font-bold text-emerald-800">${total.toFixed(2)}</span>
            </div>
            <button className="w-full bg-emerald-800 text-stone-100 py-3 rounded-full hover:bg-emerald-700 transition-colors duration-300 font-semibold">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart