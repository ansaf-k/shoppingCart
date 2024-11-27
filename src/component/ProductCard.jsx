import { useContext, useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { CartContext } from '../services/CartContext';

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const { dispatch } = useContext(CartContext);

  const handleAddCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload:'product' });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-stone-100">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-playfair font-bold text-emerald-800 mb-8 text-center pt-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg flex flex-col overflow-hidden transition-transform duration-300 hover:scale-[1.01]">
              <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-playfair font-semibold text-emerald-800 mb-2">{product.title}</h3>
                <p className="text-sm text-stone-600 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-amber-500 font-bold">${product.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                    <span className="ml-1 text-sm text-stone-600">{product.rating.toFixed(1)}</span>
                  </div>
                </div>
                <button 
                className="mt-auto w-full bg-emerald-800 text-stone-100 py-2 rounded-full hover:bg-emerald-700 transition-colors duration-300"
                onClick={handleAddCart}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;