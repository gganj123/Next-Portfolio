'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import '@/styles/globals.css';

interface Banner {
  cover: {
    file: {
      url: string;
    };
  };
  properties: {
    이름: {
      title: { plain_text: string }[];
    };
    설명: {
      rich_text: { plain_text: string }[];
    };
  };
}

interface BannerSliderProps {
  banners: Banner[];
}

const BannerSlider: React.FC<BannerSliderProps> = ({ banners }) => {
  const [centerIndex, setCenterIndex] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  const nextSlide = useCallback(() => {
    if (!isTransitioning && banners?.length) {
      setIsTransitioning(true);
      setCenterIndex((prev) => (prev + 1) % banners.length);
    }
  }, [isTransitioning, banners?.length]);

  const prevSlide = useCallback(() => {
    if (!isTransitioning && banners?.length) {
      setIsTransitioning(true);
      setCenterIndex((prev) => (prev - 1 + banners.length) % banners.length);
    }
  }, [isTransitioning, banners?.length]);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(autoSlide);
  }, [nextSlide]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  const getSlideStyle = (slideIndex: number, position: number): React.CSSProperties => {
    const isCenter = position === 1;
    const imageUrl = banners[slideIndex]?.cover?.file?.url || '/placeholder-image.jpg';

    return {
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      width: '33.333%',
      height: '100%',
      opacity: isCenter ? 1 : 0.5,
      transform: `scale(${isCenter ? 1.1 : 0.9})`,
      transition: 'all 0.5s ease-in-out',
    };
  };

  const getVisibleSlides = (): number[] => {
    if (!banners?.length) return [];
    const slidesCount = banners.length;
    return [(centerIndex - 1 + slidesCount) % slidesCount, centerIndex, (centerIndex + 1) % slidesCount];
  };

  const visibleSlides = getVisibleSlides();

  return (
    <section className="w-full pt-[230px]">
      <div className="relative w-full overflow-hidden h-[calc(100vh-240px)]">
        <div
          className="relative flex w-full h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${centerIndex * 33.333}%)` }}
          onTransitionEnd={handleTransitionEnd}
        >
          {visibleSlides.map((slideIndex, position) => (
            <div
              key={slideIndex}
              className={`absolute flex items-end pb-10 ${position === 1 ? 'scale-110' : ''}`}
              style={getSlideStyle(slideIndex, position)}
            >
              <div className="w-full bg-black bg-opacity-50 p-4 text-white text-center">
                <h2 className="text-2xl font-bold">
                  {banners[slideIndex]?.properties?.이름?.title[0]?.plain_text || 'Untitled'}
                </h2>
                <p className="text-lg">{banners[slideIndex]?.properties?.설명?.rich_text[0]?.plain_text || ''}</p>
              </div>
            </div>
          ))}
        </div>
        <button
          className="absolute top-1/2 left-5 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70"
          onClick={prevSlide}
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          className="absolute top-1/2 right-5 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-70"
          onClick={nextSlide}
        >
          <FiChevronRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default BannerSlider;
