'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import '@/styles/globals.css';

const BannerSlider = ({ projects }) => {
  const [centerIndex, setCenterIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // projects가 undefined 또는 빈 배열인 경우 초기 상태 처리
  if (!projects || projects.length === 0) {
    return <div className="w-full text-center mt-10 text-gray-500">No projects available.</div>;
  }

  const getVisibleSlides = () => {
    const slidesCount = projects.length;
    return [
      (centerIndex - 1 + slidesCount) % slidesCount, // 왼쪽 슬라이드
      centerIndex, // 중심 슬라이드
      (centerIndex + 1) % slidesCount, // 오른쪽 슬라이드
    ];
  };

  const getSlideStyle = (slideIndex, position) => {
    const isCenter = position === 1;

    const style = {
      backgroundImage: `url(${projects[slideIndex]?.cover?.file?.url || ''})`,
      transition: isTransitioning ? 'all 0.5s ease-in-out' : 'none',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    };

    if (window.innerWidth > 768) {
      style.opacity = isCenter ? 1 : 0.5;
    }

    if (window.innerWidth <= 768) {
      style.left = `${position * 100}%`;
      style.transform = 'none';
    } else if (window.innerWidth <= 1024) {
      style.left = `${position * 50}%`;
      style.transform = `scale(${isCenter ? 1.05 : 0.9})`;
    } else {
      style.left = `${position * 33.333}%`;
      style.transform = `scale(${isCenter ? 1.1 : 0.8})`;
    }

    return style;
  };

  const nextSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCenterIndex((prev) => (prev + 1) % projects.length);
    }
  }, [isTransitioning, projects.length]);

  const prevSlide = useCallback(() => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCenterIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }
  }, [isTransitioning, projects.length]);

  useEffect(() => {
    const autoSlide = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(autoSlide);
  }, [nextSlide]);

  const handleTransitionEnd = () => {
    setIsTransitioning(false);
  };

  const visibleSlides = getVisibleSlides();

  return (
    <section className="banner-section">
      <div className="banner-slider-wrapper">
        <div className="banner-slider-container">
          {visibleSlides.map((slideIndex, position) => (
            <div
              key={slideIndex}
              className={`banner-slide ${position === 1 ? 'banner-slide-active banner-slide-center' : ''}`}
              style={getSlideStyle(slideIndex, position)}
              onTransitionEnd={position === 1 ? handleTransitionEnd : undefined}
            >
              <div className="banner-slide-content">
                <h2 className="banner-slide-title">
                  {projects[slideIndex]?.properties?.이름?.title[0]?.plain_text || 'Untitled'}
                </h2>
                <p className="banner-slide-subtitle">
                  {projects[slideIndex]?.properties?.설명?.rich_text[0]?.plain_text || ''}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button className="banner-navigation-button banner-button-left" onClick={prevSlide}>
          <FiChevronLeft size={30} />
        </button>
        <button className="banner-navigation-button banner-button-right" onClick={nextSlide}>
          <FiChevronRight size={30} />
        </button>
      </div>
    </section>
  );
};

export default BannerSlider;
