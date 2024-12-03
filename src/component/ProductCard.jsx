import { useContext, useEffect, useState } from 'react';
import { Star } from 'lucide-react';
import { CartContext } from '../store/CartContext';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import Loader from './Loader';
import { Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProductCard = ({ onSearch }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const { cart,dispatch } = useContext(CartContext);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleAddCart = (product) => {
    const existingProductIndex = cart.findIndex(item => item.id === product.id);
    if (existingProductIndex !== -1) {
      toast.error('Item already in the cart', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide
        });
    } else {
      dispatch({ type: 'add_to_cart', payload: product });
      toast.success('Added to the cart', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Slide
        });
    }
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
        <div className='flex flex-col sm:flex-row items-center pt-7 pb-4 mb-4'>
          <div className='flexitems-center'>

            <form className="max-w-sm mx-auto">
              <select onChange={(e) => setSelectedCategory(e.target.value)} id="countries" className="bg-gray-200 hover:bg-gray-50 border-gray-300 text-emerald-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                <option value="">All Categories</option>
                <option value="beauty">Beauty</option>
                <option value="groceries">Groceries</option>
                <option value="skin-care">Skin Care</option>
              </select>
            </form>

          </div>
          <h2 className={`text-3xl flex justify-center content-center font-playfair font-bold text-emerald-800 mb-4 sm:mb-0 sm:ml-4 ${onSearch ? 'hidden' : ''} ${selectedCategory ? 'capitalize' : ''}`}>
            {selectedCategory ? `Category: ${selectedCategory}` : 'Featured Products'}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-lg rounded-lg flex flex-col overflow-hidden transition-transform duration-300 hover:scale-105">
              <img src={product.thumbnail} onClick={() => navigate(`product/${product.id}`)} alt={product.title} className="w-full h-48 object-contain" />
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
                  onClick={() => {
                    handleAddCart(product)
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </div>
  );
};

ProductCard.propTypes = {
  onSearch: PropTypes.string.isRequired,
};

export default ProductCard;