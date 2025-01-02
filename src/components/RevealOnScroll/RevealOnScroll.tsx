"use client";

import React, { useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./RevealOnScroll.css";
import { MindBending } from "./../MindBending/MindBending";

gsap.registerPlugin(ScrollTrigger);

const RevealOnScroll: React.FC = () => {
  const [isReady, setIsReady] = useState(false);
  const [mindBendingStart, setMindBendingStart] = useState<number>(0); // 초기 상태를 null로 설정

  useLayoutEffect(() => {
    const initializeAnimations = () => {
      const contentHolder =
        document.querySelector<HTMLElement>(".content-holder");
      const imgHolder = document.querySelector<HTMLElement>(".img-holder");

      if (contentHolder && imgHolder) {
        const contentHolderHeight = contentHolder.offsetHeight || 0;
        const imgHolderHeight = window.innerHeight;
        const additionalScrollHeight = window.innerHeight;
        const revealEnd = contentHolderHeight + imgHolderHeight;
        const calculatedMindBendingStart = revealEnd + window.innerHeight; // 100vh 추가

        setMindBendingStart(calculatedMindBendingStart); // mindBendingStart 값을 설정

        // Total body height calculation
        const totalBodyHeight =
          contentHolderHeight + imgHolderHeight + additionalScrollHeight;

        if (document.body.style.height !== `${totalBodyHeight}px`) {
          document.body.style.height = `${totalBodyHeight}px`;
        }
        console.log("Content Holder Height:", contentHolderHeight);
        console.log("Image Holder Height:", imgHolderHeight);
        console.log("Total Height:", contentHolderHeight + imgHolderHeight);
        // ScrollTrigger for reveal-content
        ScrollTrigger.create({
          trigger: ".reveal-content",
          start: "top top",
          end: `+=${contentHolderHeight + imgHolderHeight}`,
          scrub: true,
          onEnter: () => {
            gsap.set(".reveal-content", { position: "fixed", top: "0" });
          },
          onLeave: () => {
            const calculatedTop = contentHolderHeight + imgHolderHeight;
            gsap.set(".reveal-content", {
              position: "absolute",
              top: `${calculatedTop}px`,
            });

            gsap.set(".mindbending-container", { opacity: 0 }); // MindBending 대기
            ScrollTrigger.refresh();
          },
          onLeaveBack: () => {
            gsap.set(".reveal-content", { position: "fixed", top: "0" });
          },
          onEnterBack: () => {
            gsap.set(".reveal-content", { position: "fixed", top: "0" });
          },
        });
        gsap.to(".mindbending-container", {
          opacity: 1,
          scrollTrigger: {
            trigger: ".mindbending-container",
            start: "top 200px",
            end: "bottom center",
            scrub: true,
          },
        });

        gsap.to(".header .letters:first-child", {
          x: () => -window.innerWidth * 3,
          scale: 10,
          ease: "power2.inOut",
          scrollTrigger: {
            start: "top top",
            end: "+=200%",
            scrub: 1,
          },
        });

        gsap.to(".header .letters:last-child", {
          x: () => window.innerWidth * 3,
          scale: 10,
          ease: "power2.inOut",
          scrollTrigger: {
            start: "top top",
            end: "+=200%",
            scrub: 1,
          },
        });

        gsap.to(".img-holder", {
          rotation: 0,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "power2.inOut",
          scrollTrigger: {
            start: "top top",
            end: "+=200%",
            scrub: 1,
          },
        });

        gsap.to(".img-holder img", {
          scale: 1,
          ease: "power2.inOut",
          scrollTrigger: {
            start: "top top",
            end: "+=200%",
            scrub: 1,
          },
        });
        ScrollTrigger.create({
          trigger: ".reveal-content",
          start: "top top",

          end: `+=${window.innerHeight * 1.65}`, // 원하는 스크롤 길이 지정
          scrub: true,
          onEnter: () => {
            gsap.set(".reveal-content", { position: "fixed", top: "0" });
          },
          onLeave: () => {
            gsap.set(".reveal-content", { position: "absolute", top: "165vh" }); // 화면 아래로 스크롤
          },
          onLeaveBack: () => {
            gsap.set(".reveal-content", { position: "fixed", top: "0" });
          },
          onEnterBack: () => {
            gsap.set(".reveal-content", { position: "fixed", top: "0" });
          },
        });

        console.log("Reveal End:", revealEnd); // RevealOnScroll 끝나는 지점 확인
        console.log("MindBending Start:", mindBendingStart); // MindBending 시작 지점 확인

        ScrollTrigger.create({
          trigger: ".mindbending-container",
          start: `${mindBendingStart}px top`, // RevealOnScroll 끝나고 100vh 후 시작
          end: "+=5000", // MindBending 애니메이션 길이
          scrub: true,
          onEnter: () => {
            gsap.set(".mindbending-container", { opacity: 1 }); // MindBending 시작
          },
        });
      } else {
        console.error(
          "Required elements .content-holder or .img-holder not found."
        );
      }
    };

    const handleResize = () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill()); // 기존 트리거 제거
      initializeAnimations(); // 새로 계산 및 설정
    };

    requestAnimationFrame(() => {
      setIsReady(true);
      initializeAnimations();
    });

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

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
              <MindBending start={mindBendingStart} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RevealOnScroll;
