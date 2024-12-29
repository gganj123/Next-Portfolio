"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col relative">
          {/* 겹치는 텍스트 레이어 */}
          <div className="text-center lg:w-full w-full relative">
            <h1 className="title-font sm:text-9xl text-3xl mb-4 font-medium text-gray-200 text-focus-in absolute flex items-center justify-center -translate-y-20">
              Front-End
            </h1>
            <h1 className="title-font sm:text-6xl text-3xl mb-4 font-medium text-gray-900 tracking-in-contract-bck relative">
              Front-End 김도현입니다.
            </h1>
            {/* 2초 뒤에 보이는 나머지 콘텐츠 */}

            <>
              <p className="mb-8 text-xl leading-relaxed text-focus-ine">
                사용자의 입장에서 디테일을 고민하고, 팀원들과 협력해 더 나은
                서비스를 만들어가는 개발자입니다. <br />
                사용자와 팀 모두에게 긍정적인 가치를 제공하며, 끊임없이 배우고
                성장하는 개발자가 되겠습니다.
              </p>
              <div className="flex justify-center"></div>
            </>
          </div>
        </div>
      </section>
    </>
  );
}
