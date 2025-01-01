'use client';

import React, { useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RevealOnScroll.css';
import { MindBending } from './../MindBending/MindBending';

gsap.registerPlugin(ScrollTrigger);

const RevealOnScroll: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [uniqueKey, setUniqueKey] = useState(0); // 고유한 key 상태

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

        // ScrollTrigger animations
        ScrollTrigger.create({
          trigger: '.reveal-content', // 트리거 대상
          start: 'top top', // 스크롤 시작
          end: `+=${contentHolderHeight + imgHolderHeight}`, // 스크롤 끝: 콘텐츠와 이미지 높이 합산
          scrub: true, // 스크롤과 애니메이션 동기화
          onEnter: () => {
            gsap.set('.reveal-content', { position: 'fixed', top: '0' });
          },
          onLeave: () => {
            const calculatedTop = contentHolderHeight + imgHolderHeight;
            gsap.set('.reveal-content', { position: 'absolute', top: `${calculatedTop}px` });
          },
          onLeaveBack: () => {
            gsap.set('.reveal-content', { position: 'fixed', top: '0' });
          },
          onEnterBack: () => {
            gsap.set('.reveal-content', { position: 'fixed', top: '0' });
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

    requestAnimationFrame(() => {
      setIsReady(true); // 글씨와 그림을 표시
      initializeAnimations(); // 애니메이션 초기화
      ScrollTrigger.refresh();
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // 모든 ScrollTrigger 인스턴스 정리
    };
  }, [uniqueKey]); // key 값이 변경될 때마다 초기화

  return (
    <>
      {/* 로딩 화면 (애니메이션 전 준비 상태) */}
      {!isReady && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <p>Loading...</p>
        </div>
      )}

      {/* 실제 콘텐츠 */}
      <div className="logo text-3xl">Dony's Portfolio</div>
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
      <div className="reveal-content" key={uniqueKey}>
        <div className="img-holder">
          <img src="./space4.webp" alt="space" />
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

          <div className="row">{/* <MindBending /> */}</div>
        </div>
      </div>
    </>
  );
};

export default RevealOnScroll;
