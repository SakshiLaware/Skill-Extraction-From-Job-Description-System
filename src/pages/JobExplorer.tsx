import { useState } from "react";
import { useAsync } from "../hooks/useAsync";
import { getJobs } from "../services/api";
import StateWrapper from "../components/StateWrapper";

export default function JobExplorer() {
  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [skill, setSkill] = useState("");
  const [appliedFilters, setAppliedFilters] = useState({ q: "", location: "", skill: "" });

  const { data, loading, error } = useAsync(
    () => getJobs({ ...appliedFilters, limit: 30 }),
    [appliedFilters]
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Job Explorer</h2>

      <div className="flex flex-wrap gap-3 mb-6">
        <input
          className="border border-slate-300 rounded-md px-3 py-2 text-sm flex-1 min-w-[160px]"
          placeholder="Search job title..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <input
          className="border border-slate-300 rounded-md px-3 py-2 text-sm flex-1 min-w-[160px]"
          placeholder="Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          className="border border-slate-300 rounded-md px-3 py-2 text-sm flex-1 min-w-[160px]"
          placeholder="Skill (e.g. Python)..."
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
        <button
          onClick={() => setAppliedFilters({ q, location, skill })}
          className="px-4 py-2 bg-brand-500 text-white rounded-md text-sm font-medium hover:bg-brand-600"
        >
          Search
        </button>
      </div>

      <StateWrapper loading={loading} error={error} isEmpty={!data || data.jobs.length === 0}
        emptyMessage="No jobs match those filters.">
        {data && (
          <div className="space-y-3">
            <div className="text-xs text-slate-500">{data.total} jobs found</div>
            {data.jobs.map((job) => (
              <div key={job.job_id} className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-medium">{job.title}</div>
                    <div className="text-xs text-slate-500">
                      {job.company_name} · {job.location}
                    </div>
                  </div>
                  <span className="text-xs bg-slate-100 rounded-full px-2 py-1">
                    {job.skill_count} skills
                  </span>
                </div>
                {job.extracted_skills?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {job.extracted_skills.map((s, i) => (
                      <span key={i} className="text-xs bg-brand-50 text-brand-900 px-2 py-0.5 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </StateWrapper>
    </div>
  );
}
