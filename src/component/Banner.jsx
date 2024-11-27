import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import './Banner.css';

const Banner = () => {
  const [data, setData] = useState([]);

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

  return (
    <div className="w-full h-[500px] overflow-hidden bg-stone-100">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-amber-500',
          bulletActiveClass: '!bg-amber-700'
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        loop={true}
        className="h-full"
      >
        {data.map((product, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full hover:bg-slate-100 bg-emerald-950 duration-300 transition-all">
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-full object-contain"
              />
              <div className="absolute main-banner inset-0 hover:bg-emerald-800 hover:bg-opacity-70 duration-300 transition-all flex items-center justify-center">
                <div className="text-center text-stone-100 max-w-3xl px-4">
                  <h2 className="text-4xl duration-300 transition-all opacity-0 hover:opacity-100 font-playfair font-bold mb-4 leading-tight">{product.title}</h2>
                  <p className="mb-6 text-lg opacity-0 duration-300 transition-all font-serif">{product.description}</p>
                  <button className="px-6 py-3 opacity-0 bg-amber-500 text-stone-100 font-bold rounded-full hover:bg-amber-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:ring-opacity-50">
                    Discover More
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-button-prev !text-stone-100 !opacity-70 hover:!opacity-100 transition-opacity duration-300"></div>
      <div className="swiper-button-next !text-stone-100 !opacity-70 hover:!opacity-100 transition-opacity duration-300"></div>
    </div>
  );
};

export default Banner;