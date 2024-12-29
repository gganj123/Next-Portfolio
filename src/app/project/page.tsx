import React from "react";
import "@/styles/globals.css";
import { TOKEN, DATEBASE_ID } from "@/../config/index";
import ProjectItem from "@/components/project-item";

// 데이터 타입 정의
interface Project {
  id: string;
  url: string | null;
  properties: {
    이름: {
      title: { plain_text: string }[];
    };
    설명: {
      rich_text: { plain_text: string }[];
    };
    Tag: {
      multi_select: { name: string; color: string }[];
    };
    Github: {
      url: string | null;
    };
    유투브: {
      url: string | null;
    };
    날짜: {
      date: {
        start: string | null;
        end: string | null;
      };
    };
  };
}

async function fetchProjects(): Promise<any> {
  const endpoint = `https://api.notion.com/v1/databases/${DATEBASE_ID}/query`;

  const options: RequestInit = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Notion-Version": "2022-02-22",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      page_size: 100,
      sorts: [
        {
          property: "날짜",
          direction: "descending",
        },
      ],
    }),
  };
  try {
    const response = await fetch(endpoint, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      throw new Error(`Unexpected content-type: ${contentType}`);
    }

    return await response.json();
  } catch (err) {
    console.error("Failed to fetch projects:", err);
    throw err;
  }
}

export default async function ProjectsPage() {
  const projects = await fetchProjects();

  return (
    <>
      <ProjectItem data={projects} />
    </>
  );
}
