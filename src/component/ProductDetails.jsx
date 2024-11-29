import { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../services/CartContext'
import Loader from './Loader'


export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [activeImage, setActiveImage] = useState(0)
  const { dispatch } = useContext(CartContext)

  useEffect(() => {
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
      dispatch({ type: 'ADD_TO_CART', payload: { ...product } })
    }
  }

  if (!product) {
    return <div className="flex justify-center items-center w-full h-screen bg-stone-200">
      <Loader />
    </div>
  }

  return (
    <div className="min-h-[90vh] w-full bg-stone-200">
      <div className="max-w-4xl mx-auto bg-stone-200 rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image gallery */}
            <div className="space-y-4">
              <div className="aspect-square relative overflow-hidden rounded-lg">
                <img
                  className='object-cover'
                  src={product.images[activeImage]}
                  alt={product.title}
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-square relative overflow-hidden rounded-md ${activeImage === index ? 'ring-2 ring-emerald-500' : ''
                      }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                    className='object-cover'
                      src={image}
                      alt={`${product.title} - Image ${index + 1}`}
                    />
                  </button>
                ))}
              </div>
            </div>
  
            {/* Product info */}
            <div className="space-y-4 flex-row justify-center content-center">
              <h1 className="text-3xl font-bold text-emerald-800">{product.title}</h1>
              <p className="text-2xl font-bold text-amber-500">${product.price.toFixed(2)}</p>
              <div className="flex items-center">
                <span className="text-sm text-emerald-800">
                  {product.rating.toFixed(1)} rating
                </span>
              </div>
              <p className="text-sm text-stone-600">{product.description}</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-600">Brand:</span>
                  <span className="text-emerald-800">{product.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">Category:</span>
                  <span className="text-emerald-800">{product.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600">In Stock:</span>
                  <span className="text-emerald-800">{product.stock}</span>
                </div>
              </div>
              <button
                className="w-full bg-emerald-800 hover:bg-emerald-700 text-white py-2 px-4 rounded-full flex items-center justify-center"
                onClick={handleAddToCart}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

