import { useEffect, useState } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import Loader from './Loader';

const Banner = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const jsonData = await response.json()
      setData(jsonData.products.slice(0, 5));
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  const CustomLeftArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-2 top-1/2 -translate-y-1/2 text-stone-100 opacity-70 hover:opacity-100 transition-opacity duration-300 focus:outline-none"
      aria-label="Previous slide"
    >
      <ChevronLeft className="w-8 h-8" />
    </button>
  );

  CustomLeftArrow.propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  const CustomRightArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-100 opacity-70 hover:opacity-100 transition-opacity duration-300 focus:outline-none"
      aria-label="Next slide"
    >
      <ChevronRight className="w-8 h-8" />
    </button>
  );

  CustomRightArrow.propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  }

  if(!data.length) return <div  className="flex justify-center items-center w-full h-[400px] bg-emerald-950">
    <Loader />
  </div>

  return (
    <div className="w-full h-[400px] overflow-hidden bg-stone-100">
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        showDots={true}
        dotListClass="!bottom-4"
        itemClass="h-[400px]"
      >
        {data.map((product, index) => (
          <div key={index} className="relative w-full h-full bg-emerald-950 group">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-emerald-950 bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
              <div className="text-center text-stone-100 max-w-3xl px-4">
                <h2 className="text-4xl font-bold mb-4 leading-tight font-playfair opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {product.title}
                </h2>
                <p className="mb-6 text-lg font-serif opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {product.description}
                </p>
                <button onClick={() => navigate(`product/${product.id}`)} className="px-6 py-3 bg-amber-500 text-stone-100 font-bold rounded-full hover:bg-amber-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-opacity-50 opacity-0 group-hover:opacity-100">
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};


export default Banner;
