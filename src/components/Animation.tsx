"use client";

import dynamic from "next/dynamic";

// SSR 비활성화된 Lottie 컴포넌트 로드
const Lottie = dynamic(() => import("react-lottie-player"), { ssr: false });
import lottieJson from "@/../public/Animation.json";

export default function Animation() {
  return (
    <div>
      <Lottie loop animationData={lottieJson} play />
    </div>
  );
}
