import { useState } from 'react'
import { Search, ShoppingCart, Menu, X } from 'lucide-react'
import "../Style/navbar.css"


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="main-container bg-emerald-800 text-stone-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex-shrink-0">
            <span className="text-3xl font-playfair font-extrabold text-amber-700">UrbanCart</span>
          </a>

          <div className="hidden md:flex items-center justify-center flex-1">
            <a href="/" className="px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700 hover:text-amber-700 transition-colors">Home</a>
            <a href="/products" className="px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700 hover:text-amber-700 transition-colors">Products</a>
          </div>

          <div className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-emerald-700 text-stone-100 px-4 py-2 rounded-full w-64 focus:outline-none"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="h-5 w-5 text-amber-700" />
              </button>
            </div>
            <a href="/cart" className="ml-4 p-2 rounded-full bg-amber-700 hover:bg-amber-600 transition-colors">
              <ShoppingCart className="h-6 w-6 text-stone-100" />
            </a>
          </div>

          <div className="md:hidden flex items-center">
            <a href="/cart" className="p-2 rounded-full bg-amber-700 hover:bg-amber-600 transition-colors mr-2">
              <ShoppingCart className="h-6 w-6 text-stone-100" />
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-stone-300 hover:text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
            <a href="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700 hover:text-amber-700 transition-colors">Home</a>
            <a href="/products" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-700 hover:text-amber-700 transition-colors">Products</a>
          </div>
          <div className="pt-4 pb-3 border-t border-emerald-700">
            <div className="px-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="bg-emerald-700 text-stone-100 px-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-amber-700"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="h-5 w-5 text-amber-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

