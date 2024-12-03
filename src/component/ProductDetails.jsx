import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../store/CartContext'
import Loader from './Loader'


export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const { dispatch } = useContext(CartContext)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`)
        const data = await response.json()
        setProduct(data)
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    fetchProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      dispatch({ type: 'add_to_cart', payload: { ...product } })
    }
  }

  if (!product) {
    return <div className="flex justify-center items-center w-full h-screen bg-stone-100">
      <Loader />
    </div>
  }

  return (
    <div className="min-h-[90vh] w-full bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-2 gap-8 items-start">

          <div className="space-y-6">
            <div className="aspect-square relative overflow-hidden rounded-lg border border-gray-200 shadow-sm">
              <img
                className="object-cover w-full h-full"
                src={product.images[activeImage]}
                alt={product.title}
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`aspect-square relative overflow-hidden rounded-lg border border-gray-300 transition-transform transform hover:scale-105 ${activeImage === index ? 'ring-2 ring-emerald-500' : ''
                    }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    className="object-cover w-full h-full"
                    src={image}
                    alt={`${product.title} - Image ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <h1 className="text-4xl font-semibold text-gray-800">{product.title}</h1>
            <p className="text-3xl font-bold text-amber-500">${product.price.toFixed(2)}</p>
            <div className="flex items-center space-x-4">
              <span className="text-lg text-gray-600 font-medium">
                {product.rating.toFixed(1)} Rating
              </span>
              <div className="text-yellow-400 flex">
                {Array.from({ length: Math.round(product.rating) }).map((_, i) => (
                  <svg
                    key={i}
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15.27L16.18 18l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 3.73L3.82 18z" />
                  </svg>
                ))}
              </div>
            </div>
            <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <span className="text-gray-500">Brand:</span>
                <span className="text-gray-800 font-medium">{product.brand}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Category:</span>
                <span className="text-gray-800 font-medium">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">In Stock:</span>
                <span className="text-gray-800 font-medium">{product.stock}</span>
              </div>
            </div>
            <button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg flex items-center justify-center text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              onClick={handleAddToCart}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-3"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

