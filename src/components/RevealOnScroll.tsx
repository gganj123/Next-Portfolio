'use client';

import React, { useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '@/styles/globals.css';

gsap.registerPlugin(ScrollTrigger);

const RevealOnScroll: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    // 애니메이션 초기화 함수
    const initializeAnimations = () => {
      const contentHolder = document.querySelector<HTMLElement>('.content-holder');
      const imgHolder = document.querySelector<HTMLElement>('.img-holder');

      if (contentHolder && imgHolder) {
        const contentHolderHeight = contentHolder.offsetHeight || 0;
        const imgHolderHeight = window.innerHeight;
        const additionalScrollHeight = window.innerHeight;

        // Total body height calculation
        const totalBodyHeight = contentHolderHeight + imgHolderHeight + additionalScrollHeight;

        // Conditionally update the body height
        if (document.body.style.height !== `${totalBodyHeight}px`) {
          document.body.style.height = `${totalBodyHeight}px`;
        }

        // Refresh ScrollTrigger after height adjustment
        ScrollTrigger.refresh();

        // ScrollTrigger animations
        ScrollTrigger.create({
          trigger: '.website-content',
          start: '-0.1% top',
          end: 'bottom bottom',
          onEnter: () => {
            gsap.set('.website-content', { position: 'absolute', top: '195%' });
          },
          onLeaveBack: () => {
            gsap.set('.website-content', { position: 'fixed', top: '0' });
          },
        });

        gsap.to('.header .letters:first-child', {
          x: () => -window.innerWidth * 3,
          scale: 10,
          ease: 'power2.inOut',
          scrollTrigger: {
            start: 'top top',
            end: '+=200%',
            scrub: 1,
          },
        });

        gsap.to('.header .letters:last-child', {
          x: () => window.innerWidth * 3,
          scale: 10,
          ease: 'power2.inOut',
          scrollTrigger: {
            start: 'top top',
            end: '+=200%',
            scrub: 1,
          },
        });

        gsap.to('.img-holder', {
          rotation: 0,
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          ease: 'power2.inOut',
          scrollTrigger: {
            start: 'top top',
            end: '+=200%',
            scrub: 1,
          },
        });

        gsap.to('.img-holder img', {
          scale: 1,
          ease: 'power2.inOut',
          scrollTrigger: {
            start: 'top top',
            end: '+=200%',
            scrub: 1,
          },
        });
      } else {
        console.error('Required elements .content-holder or .img-holder not found.');
      }
    };

    // requestAnimationFrame을 통해 DOM 렌더링 후 애니메이션 설정
    requestAnimationFrame(() => {
      setIsReady(true); // 글씨와 그림을 표시
      setTimeout(() => {
        initializeAnimations(); // 애니메이션 초기화
      }, 1000); // DOM 안정화를 위해 약간의 지연 추가
    });
  }, []);

  return (
    <>
      {/* 로딩 화면 (애니메이션 전 준비 상태) */}
      {!isReady && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <p>Loading...</p>
        </div>
      )}

      {/* 실제 콘텐츠 */}
      <div className="logo"></div>
      <div className="header">
        <div className="letters">
          <div>f</div>
          <div>r</div>
          <div>o</div>
          <div>n</div>
        </div>
        <div className="letters">
          <div>t</div>
          <div>e</div>
          <div>n</div>
          <div>d</div>
        </div>
      </div>
      <div className="website-content">
        <div className="img-holder">
          <img src="./basecamp.jpg" alt="Basecamp" />
        </div>

        <div className="content-holder">
          <div className="row">
            <h1>About Me</h1>
          </div>

          <div className="row">
            <div className="img">
              <img src="/japan.jpg" alt="Japan" className="" />
            </div>
          </div>

          <div className="row">
            <p>프론트엔드 개발자 김도현입니다.</p>
          </div>

          <div className="row">
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore sint eum fugit, nostrum necessitatibus
              beatae deleniti tempore velit recusandae quasi aliquam unde voluptates vero, quos, molestiae nobis quae?
              Dolorum, molestiae.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RevealOnScroll;
