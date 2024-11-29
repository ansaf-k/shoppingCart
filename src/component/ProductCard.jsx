import { useContext, useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { CartContext } from '../services/CartContext';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import Loader from './Loader';

const ProductCard = ({ onSearch }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { dispatch } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleAddCart = (product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product });
  };

  const fetchProducts = async (query, category) => {
    let url = 'https://dummyjson.com/products';
    if (query) {
      url += `/search?q=${query}`;
    }
    if (category) {
      url += `/category/${category}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchProducts(onSearch, selectedCategory);
  }, [onSearch, selectedCategory]);

  if (!products.length) {
    return <div className="flex justify-center items-center w-full h-[50vh] bg-stone-200">
      <Loader />
    </div>
  }
  return (
    <div className="bg-stone-100">
      <div className={`max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 ${onSearch ? 'pt-6' : ''}`}>
        <div className='flex flex-col sm:flex-row items-center mb-4'>
          <div className='flex items-center'>

            <form className="max-w-sm mx-auto">
              <label htmlFor="countries" className="block mb-2 text-sm font-medium text-emerald-900 dark:text-white">Select an option</label>
              <select onChange={(e) => setSelectedCategory(e.target.value)} id="countries" className="bg-gray-50  border-gray-300 text-emerald-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option value="">All Categories</option>
                <option value="beauty">Beauty</option>
                <option value="groceries">Groceries</option>
                <option value="skin-care">Skin Care</option>
              </select>
            </form>

          </div>
          <h2 className={`text-3xl flex justify-center content-center font-playfair font-bold text-emerald-800 mb-4 sm:mb-0 sm:ml-4 ${onSearch ? 'hidden' : ''}`}>
            {selectedCategory ? `Category: ${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}` : 'Featured Products'}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} onClick={() => navigate(`product/${product.id}`)} className="bg-white shadow-lg rounded-lg flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105">
              <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-contain" />
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-playfair font-semibold text-emerald-800 mb-2">{product.title}</h3>
                <p className="text-sm text-stone-600 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex flex-grow items-center justify-between mb-2">
                  <span className="text-amber-500 font-bold">${product.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-amber-500 fill-current" />
                    <span className="ml-1 text-sm text-stone-600">{product.rating.toFixed(1)}</span>
                  </div>
                </div>
                <button
                  className="mt-auto w-full bg-emerald-800 text-stone-100 py-2 rounded-full hover:bg-emerald-700 transition-colors duration-300"
                  onClick={() => handleAddCart(product)}
                >
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

ProductCard.propTypes = {
  onSearch: PropTypes.string.isRequired,
};

export default ProductCard;