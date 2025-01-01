'use client';

import React, { useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './RevealOnScroll.css';
import { MindBending } from './../MindBending/MindBending';

gsap.registerPlugin(ScrollTrigger);

const RevealOnScroll: React.FC = () => {
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    const initializeAnimations = () => {
      const contentHolder = document.querySelector<HTMLElement>('.content-holder');
      const imgHolder = document.querySelector<HTMLElement>('.img-holder');

      if (contentHolder && imgHolder) {
        const contentHolderHeight = contentHolder.offsetHeight || 0;
        const imgHolderHeight = window.innerHeight;
        const additionalScrollHeight = window.innerHeight;

        // Total body height calculation
        const totalBodyHeight = contentHolderHeight + imgHolderHeight + additionalScrollHeight;

        if (document.body.style.height !== `${totalBodyHeight}px`) {
          document.body.style.height = `${totalBodyHeight}px`;
        }

        // ScrollTrigger for reveal-content
        ScrollTrigger.create({
          trigger: '.reveal-content',
          start: 'top top',
          end: `+=${contentHolderHeight + imgHolderHeight}`,
          scrub: true,
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

        // GSAP animations for MindBending container
        gsap.to('.mindbending-container', {
          opacity: 1,
          scrollTrigger: {
            trigger: '.mindbending-container',
            start: 'top 200px',
            end: 'bottom center',
            scrub: true,
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
        ScrollTrigger.create({
          trigger: '.reveal-content',
          start: 'top top',

          end: '+=1500', // 원하는 스크롤 길이 지정
          scrub: true,
          onEnter: () => {
            gsap.set('.reveal-content', { position: 'fixed', top: '0' });
          },
          onLeave: () => {
            gsap.set('.reveal-content', { position: 'absolute', top: '150vh' }); // 화면 아래로 스크롤
          },
        });

        // MindBending의 시작 지점을 RevealOnScroll의 끝나는 지점으로 설정
        ScrollTrigger.create({
          trigger: '.mindbending-container',
          start: 3000, // RevealOnScroll이 끝난 뒤 MindBending 시작
          end: '+=3000', // MindBending 애니메이션 길이
          scrub: true,
          onEnter: () => {
            gsap.set('.mindbending-container', { opacity: 1 });
          },
        });
      } else {
        console.error('Required elements .content-holder or .img-holder not found.');
      }
    };

    requestAnimationFrame(() => {
      setIsReady(true);
      initializeAnimations();
      ScrollTrigger.refresh();
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {!isReady && (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <p>Loading...</p>
        </div>
      )}

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
      <div className="reveal-content">
        <div className="img-holder">
          <img src="./space4.webp" alt="space" />
        </div>

        <div className="content-holder">
          <div className="row">
            <div className="mindbending-container">
              <MindBending />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RevealOnScroll;
