'use client';

import React, { useLayoutEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import '@/styles/globals.css';
import './MindBending.css';

gsap.registerPlugin(ScrollTrigger);

interface MindBendingProps {
  start: number; // 시작 위치를 외부에서 전달
}

export const MindBending: React.FC<MindBendingProps> = ({ start }) => {
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
    const vhToPx = (vh) => (vh * window.innerHeight) / 100;

    const initializeAnimations = () => {
      ScrollTrigger.create({
        trigger: '.pinned',
        start: `top top`,
        endTrigger: '.whitespace',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        onUpdate: (self) => {
          // self는 ScrollTrigger 인스턴스
          console.log('Start:', self.start); // 시작 위치 (픽셀)
          console.log('End:', self.end); // 종료 위치 (픽셀)
          console.log('Progress:', self.progress); // 진행도 (0 ~ 1)
        },
      });

      // ScrollTrigger 고정 효과 추가 (.header-info 섹션)
      ScrollTrigger.create({
        trigger: '.header-info',
        start: 'top top',
        endTrigger: '.whitebpace',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
      });

      ScrollTrigger.create({
        trigger: '.pinned',
        start: `top top`, // 140vh를 픽셀로 변환
        endTrigger: '.header-info',
        end: 'bottom bottom',

        onUpdate: (self) => {
          const rotation = self.progress * 360; // 스크롤 진행도에 따라 회전 각도 계산
          gsap.to('.revealer', { rotation }); // .revealer에 회전 애니메이션 적용
        },
        onEnter: () => {
          // .pinned2를 사라지게 만듦
          gsap.to('.pinrr', { opacity: 0, duration: 0 });
        },
        onLeaveBack: () => {
          // 스크롤이 뒤로 돌아갔을 때 다시 보이게 만듦
          gsap.to('.pinrr', { opacity: 1, duration: 0 });
        },
      });

      // ScrollTrigger 고정 효과 및 클립 패스 애니메이션 추가
      ScrollTrigger.create({
        trigger: '.pinned',
        start: `top top`, // 140vh를 픽셀로 변환
        endTrigger: '.header-info',
        end: 'bottom bottom',

        onUpdate: (self) => {
          const progress = self.progress; // 스크롤 진행도 계산
          const clipPath = `polygon(
          ${45 - 45 * progress}% ${0 + 0 * progress}%,
          ${55 + 45 * progress}% ${0 + 0 * progress}%,
          ${55 + 45 * progress}% ${100 - 0 * progress}%,
          ${45 - 45 * progress}% ${100 - 0 * progress}%
        )`;

          gsap.to('.revealer-1, .revealer-2', {
            clipPath: clipPath,
            ease: 'none',
            duration: 0, // 즉각적인 반응
          });
        },
      });

      ScrollTrigger.create({
        trigger: '.header-info',
        start: 'top top',
        end: 'bottom 50%',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress; // 스크롤 진행도 (0 ~ 1)
          const left = 35 + 15 * progress; // left 값 계산
          gsap.to('.revealer', {
            left: `${left}%`, // left 값을 동적으로 업데이트
            ease: 'none', // 부드러운 효과 제거
            duration: 0, // 즉시 반응
          });
        },
      });

      ScrollTrigger.create({
        trigger: '.whitespace', // 애니메이션 대상 트리거
        start: 'top 50%', // 애니메이션 시작 시점
        end: 'bottom bottom', // 애니메이션 끝 시점
        scrub: 1, // 스크롤과 동기화

        onUpdate: (self) => {
          const scale = 1 + 16 * self.progress; // 스크롤 진행도에 따라 스케일 계산
          gsap.to('.revealer', {
            scale: scale, // 계산된 스케일 값 적용
            ease: 'none', // 부드러운 효과 제거
            duration: 0, // 즉시 반응
          });
        },
      });
    };

    ScrollTrigger.create({
      trigger: '.header-rows',
      start: `${vhToPx(95)}px top center`, // 트리거 시작 지점
      end: 'bottom center',
      onEnter: () => {
        document.querySelectorAll('.header-row h1').forEach((el) => {
          el.classList.remove('tracking-out-expand'); // 이전 클래스 제거
          el.classList.add('tracking-in-contract'); // 새로운 클래스 추가
        });
      },
      onLeaveBack: () => {
        document.querySelectorAll('.header-row h1').forEach((el) => {
          el.classList.remove('tracking-in-contract'); // 이전 클래스 제거
          el.classList.add('tracking-out-expand'); // 새로운 클래스 추가
        });
      },
    });

    initializeAnimations();

    // Clean-up function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="container">
      {/* <section className="hero">
        <h1>Symphonia</h1>
      </section> */}

      <section className="info">
        <div className="header-rows">
          <div className="header-row">
            <h1 className="tracking-placeholder">Dony's</h1>
          </div>
          <div className="header-row">
            <h1 className="tracking-placeholder">Portfolio</h1>
          </div>
        </div>
        <div className="left">
          <p>안녕하세요 프론트엔드 개발자 김도현입니다.</p>
        </div>

        <div className="right">
          <p>사용자가 몰입하고 즐길 수 있는 경험을 만드는 것이 제 목표입니다.</p>
        </div>
      </section>
      <section className="em">
        <p> 여기에서 그 노력의 결과를 확인해 주세요.</p>
      </section>
      <section className="header-info">
        <p> 여기에서 그 노력의 결과를 확인해 주세요.</p>

        {/* <div className="header-images">
          <div className="img">
            <img src="space.png" alt="Space 1" />
          </div>
          <div className="img">
            <img src="space2.png" alt="Space 2" />
          </div>
          <div className="img">
            <img src="space3.webp" alt="Space 3" />
          </div>
          <div className="img">
            <img src="space4.webp" alt="Space 4" />
          </div>
        </div> */}
      </section>

      <section className="whitespace"></section>
      <section className="whitebpace"></section>

      <section className="pinned">
        <div className="revealer">
          <div className="revealer-1"></div>
          <div className="revealer-2"></div>
        </div>
      </section>

      <section className="pinrr">
        <div className="revealer">
          <div className="revealer-1"></div>
          <div className="revealer-2"></div>
        </div>
      </section>

      <section className="website-content">
        <h1>Project</h1>
      </section>
    </div>
  );
};
