import type { SkillItem } from "../types";

const CATEGORY_COLORS: Record<string, string> = {
  "Programming Language": "bg-blue-100 text-blue-800",
  Database: "bg-green-100 text-green-800",
  Cloud: "bg-purple-100 text-purple-800",
  "Machine Learning": "bg-pink-100 text-pink-800",
  "Data Analytics": "bg-yellow-100 text-yellow-800",
  DevOps: "bg-orange-100 text-orange-800",
  "Web Development": "bg-teal-100 text-teal-800",
  "Soft Skills": "bg-gray-100 text-gray-800",
};

export default function SkillBadge({ skill, category }: SkillItem) {
  const color = CATEGORY_COLORS[category] ?? "bg-slate-100 text-slate-800";
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${color}`}>
      {skill}
      <span className="opacity-60">· {category}</span>
    </span>
  );
}
