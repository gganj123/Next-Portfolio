"use client";

import React, { useLayoutEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import "@/styles/globals.css";
import "./MindBending.css";

gsap.registerPlugin(ScrollTrigger);

interface MindBendingProps {
  start: number; // 시작 위치를 외부에서 전달
}

export const MindBending: React.FC<MindBendingProps> = ({ start }) => {
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const initializeAnimations = () => {
      ScrollTrigger.create({
        trigger: ".pinned",
        start: "top top",
        endTrigger: ".whitespace",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      // ScrollTrigger 고정 효과 추가 (.header-info 섹션)
      ScrollTrigger.create({
        trigger: ".header-info",
        start: "top top",
        endTrigger: ".whitespace",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
      });

      ScrollTrigger.create({
        trigger: ".pinned",
        start: "top top",
        endTrigger: ".header-info",
        end: "bottom bottom",

        onUpdate: (self) => {
          const rotation = self.progress * 360; // 스크롤 진행도에 따라 회전 각도 계산
          gsap.to(".revealer", { rotation }); // .revealer에 회전 애니메이션 적용
        },
      });

      // ScrollTrigger 고정 효과 및 클립 패스 애니메이션 추가
      ScrollTrigger.create({
        trigger: ".pinned",
        start: "top top",
        endTrigger: ".header-info",
        end: "bottom bottom",

        onUpdate: (self) => {
          const progress = self.progress; // 스크롤 진행도 계산
          const clipPath = `polygon(
          ${45 - 45 * progress}% ${0 + 0 * progress}%,
          ${55 + 45 * progress}% ${0 + 0 * progress}%,
          ${55 + 45 * progress}% ${100 - 0 * progress}%,
          ${45 - 45 * progress}% ${100 - 0 * progress}%
        )`;

          gsap.to(".revealer-1, .revealer-2", {
            clipPath: clipPath,
            ease: "none",
            duration: 0, // 즉각적인 반응
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".header-info",
        start: "top top",
        end: "bottom 50%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress; // 스크롤 진행도 (0 ~ 1)
          const left = 35 + 15 * progress; // left 값 계산
          gsap.to(".revealer", {
            left: `${left}%`, // left 값을 동적으로 업데이트
            ease: "none", // 부드러운 효과 제거
            duration: 0, // 즉시 반응
          });
        },
      });

      ScrollTrigger.create({
        trigger: ".whitespace", // 애니메이션 대상 트리거
        start: "top 50%", // 애니메이션 시작 시점
        end: "bottom bottom", // 애니메이션 끝 시점
        scrub: 1, // 스크롤과 동기화

        onUpdate: (self) => {
          const scale = 1 + 12 * self.progress; // 스크롤 진행도에 따라 스케일 계산
          gsap.to(".revealer", {
            scale: scale, // 계산된 스케일 값 적용
            ease: "none", // 부드러운 효과 제거
            duration: 0, // 즉시 반응
          });
        },
      });
      ScrollTrigger.refresh(); // 위치와 크기 다시 계산
    };

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
            <h1>ABOUT ME</h1>
          </div>
          <div className="header-row">
            <h1>Skills</h1>
          </div>
        </div>
      </section>
      <section className="em">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          fuga porro laudantium rerum possimus, eum incidunt, et fugit, totam
          tempora quaerat quidem nulla eos! Voluptatibus, beatae accusamus.
          Repudiandae, quaerat non.
        </p>
      </section>
      <section className="header-info">
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
          fuga porro laudantium rerum possimus, eum incidunt, et fugit, totam
          tempora quaerat quidem nulla eos! Voluptatibus, beatae accusamus.
          Repudiandae, quaerat non.
        </p>

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

      <section className="pinned">
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
