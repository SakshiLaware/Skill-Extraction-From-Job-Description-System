import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard" },
  { to: "/analyzer", label: "Analyzer" },
  { to: "/compare", label: "Method Comparison" },
  { to: "/analytics", label: "Analytics" },
  { to: "/jobs", label: "Job Explorer" },
];

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 bg-brand-900 text-white min-h-screen p-4">
      <h1 className="text-lg font-semibold mb-6">Skill Extraction</h1>
      <nav className="flex flex-col gap-1">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/"}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm transition-colors ${
                isActive ? "bg-brand-500 text-white" : "text-brand-100 hover:bg-brand-600"
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
