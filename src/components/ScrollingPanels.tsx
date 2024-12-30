'use client';

import { useEffect, useState } from 'react';

const colors = ['bg-white', 'bg-gray-200', 'bg-gray-400', 'bg-gray-600', 'bg-[rgb(35,35,35)]']; // 사용할 배경색 배열

export default function BackgroundChanger({ children }: { children: React.ReactNode }) {
  const [backgroundColor, setBackgroundColor] = useState(colors[0]); // 초기 배경색 설정

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY; // 현재 스크롤 위치
      const index = Math.min(Math.floor(scrollPosition / 200), colors.length - 1); // 800px 단위로 색상 변경
      setBackgroundColor(colors[index]); // 색상 업데이트
    };

    window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 등록
    return () => window.removeEventListener('scroll', handleScroll); // 컴포넌트 언마운트 시 이벤트 해제
  }, []);

  return <div className={`${backgroundColor} transition-colors duration-500 min-h-screen`}>{children}</div>;
}
