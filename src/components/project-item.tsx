"use client";

import { useEffect, useRef, useState } from "react";

export default function ProjectItem({ data }) {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set()); // 화면에 보이는 프로젝트 ID를 관리
  const observerRefs = useRef<(IntersectionObserver | null)[]>([]); // Observer 레퍼런스 배열
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]); // 각 프로젝트의 DOM 요소를 참조하는 배열

  useEffect(() => {
    observerRefs.current = data.results.map(() => null); // 각 프로젝트를 위한 Observer 초기화

    // Observer 생성
    data.results.forEach((project: any, index: number) => {
      if (containerRefs.current[index]) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set(prev).add(project.id)); // 화면에 보이는 프로젝트 추가
              observer.unobserve(entry.target); // 한 번 트리거된 이후 Observer 해제
            }
          },
          { threshold: 0.5 } // 50% 보이면 트리거
        );
        observer.observe(containerRefs.current[index]!);
        observerRefs.current[index] = observer; // Observer 저장
      }
    });

    return () => {
      // 컴포넌트 언마운트 시 모든 Observer 해제
      observerRefs.current.forEach((observer) => observer?.disconnect());
    };
  }, [data.results]);

  return (
    <div>
      <h1 className="text-6xl mb-4 font-medium justify-center text-center">
        PROJECT
      </h1>
      <span
        className="absolute left-0 bottom-[-4px] w-full h-[2px] bg-gray-900"
        aria-hidden="true"
      ></span>
      {data.results.map((project: any, index: number) => {
        const id = project.id;
        const isVisible = visibleItems.has(id);

        // 홀수와 짝수를 구분하여 정렬 적용
        const alignmentClass =
          index % 2 === 0 ? "flex-row" : "flex-row-reverse";

        return (
          <div
            key={id}
            ref={(el) => (containerRefs.current[index] = el)} // 각 프로젝트의 DOM 요소 저장
            className={`flex ${alignmentClass} p-6 m-3 bg-slate-200 rounded-md ${
              isVisible ? "slide-in-bottom" : "opacity-0"
            }`}
          >
            {/* 커버 이미지 */}
            {project.cover && project.cover.file && (
              <div className="flex-shrink-0 mb-4 w-1/2 items-center justify-center">
                <img
                  src={project.cover.file.url}
                  alt={`${
                    project.properties.이름.title[0]?.plain_text || "Untitled"
                  } 커버 이미지`}
                  className="rounded-md"
                  style={{
                    width: "50%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            {/* 텍스트 및 기타 콘텐츠 */}
            <div className="flex flex-col justify-center w-1/2 px-4">
              {/* 이름 */}
              <h2 className="text-3xl ">
                {project.properties.이름.title[0]?.plain_text || "Untitled"}
              </h2>

              {/* 기간 */}
              {project.properties.날짜.date && (
                <p className="mb-3">
                  {project.properties.날짜.date.start} ~{" "}
                  {project.properties.날짜.date.end}
                </p>
              )}

              {/* 설명 */}
              <p className="mb-3">
                {project.properties.설명.rich_text
                  .map((text: any) => text.plain_text)
                  .join("")}
              </p>

              {/* 태그 */}
              <div>
                <strong>Tags:</strong>
                {project.properties.Tag.multi_select.map((tag: any) => (
                  <span
                    key={tag.name}
                    style={{
                      marginLeft: "0.5rem",
                      padding: "0.2rem 0.5rem",
                      backgroundColor: convertColorToLight(tag.color),
                      borderRadius: "5px",
                      color: "#fff",
                    }}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              {/* GitHub 링크 */}
              {project.properties.Github.url && (
                <p>
                  <strong>GitHub:</strong>{" "}
                  <a
                    href={project.properties.Github.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.properties.Github.url}
                  </a>
                </p>
              )}

              {/* 유튜브 링크 */}
              {project.properties.유투브.url && (
                <p>
                  <strong>YouTube:</strong>{" "}
                  <a
                    href={project.properties.유투브.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {project.properties.유투브.url}
                  </a>
                </p>
              )}

              {/* 상세보기 URL */}
              {project.url && (
                <p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    프로젝트 상세보기
                  </a>
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function convertColorToLight(color: string): string {
  const colors: Record<string, string> = {
    gray: "rgba(211, 211, 211, 0.5)",
    yellow: "rgba(255, 255, 153, 0.5)",
    pink: "rgba(255, 182, 193, 0.5)",
    brown: "rgba(165, 42, 42, 0.3)",
    green: "rgba(144, 238, 144, 0.5)",
    purple: "rgba(216, 191, 216, 0.5)",
    blue: "rgba(173, 216, 230, 0.5)",
    red: "rgba(255, 99, 71, 0.5)",
    orange: "rgba(255, 165, 0, 0.3)",
    default: "rgba(200, 200, 200, 0.5)",
  };

  return colors[color] || colors.default;
}
