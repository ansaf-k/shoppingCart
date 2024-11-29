import { useContext, useState } from 'react'
import { Search, ShoppingCart, Menu, X } from 'lucide-react'
import "../Style/navbar.css"
import { Link, useNavigate } from 'react-router'
import { CartContext } from '../services/CartContext'
import PropTypes from 'prop-types';

const Navbar = ({ onSearchChange }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart } = useContext(CartContext);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearchChange(value)
  };

  return (
    <nav className="sticky z-10 top-0 w-full bg-emerald-900 bg-opacity-70 backdrop-blur-md text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20">
          <Link to="/" className="flex-shrink-0">
            <span className="text-4xl font-playfair font-bold text-amber-500">UrbanCart</span>
          </Link>

          <div className="hidden md:flex items-center justify-center flex-1 space-x-4">
            <Link to="/" className="px-3 py-2 uppercase rounded-md text-sm font-medium hover:text-amber-500 transition-colors">Home</Link>
            <Link to="/" className="px-3 py-2 uppercase rounded-md text-sm font-medium hover:text-amber-500 transition-colors">Products</Link>
            <Link to="/about" className="px-3 py-2 uppercase rounded-md text-sm font-medium hover:text-amber-500 transition-colors">About</Link>
            <Link to="/contact" className="px-3 py-2 uppercase rounded-md text-sm font-medium hover:text-amber-500 transition-colors">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="bg-emerald-800 text-stone-100 px-4 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search onClick={() => navigate('/')} className="h-5 w-5 text-amber-500" />
              </button>
            </div>
            <Link to="/cart" className="relative p-2 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors">
              <ShoppingCart className="h-6 w-6 text-emerald-900" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-700 text-stone-100 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cart.length}
                </span>
              )}
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <Link to="/cart" className="relative p-2 rounded-full bg-amber-500 hover:bg-amber-600 transition-colors mr-2">
              <ShoppingCart className="h-6 w-6 text-emerald-900" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-700 text-stone-100 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {cart.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-stone-300 hover:text-white hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-800 hover:text-amber-500 transition-colors">Home</Link>
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-800 hover:text-amber-500 transition-colors">Products</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-800 hover:text-amber-500 transition-colors">About</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-800 hover:text-amber-500 transition-colors">Contact</Link>
          </div>
          <div className="pt-4 pb-3 border-t border-emerald-800">
            <div className="px-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={() => handleSearchChange}
                  className="bg-emerald-800 text-stone-100 px-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-5 w-5 text-amber-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

Navbar.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
}

export default Navbar

