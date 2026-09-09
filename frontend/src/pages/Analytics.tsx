import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useAsync } from "../hooks/useAsync";
import { getAnalytics } from "../services/api";
import StateWrapper from "../components/StateWrapper";

const COLORS = [
  "#3b6ea5",
  "#5a9e6f",
  "#c17f3e",
  "#a5433b",
  "#7a5ea8",
  "#4a90a4",
  "#8a8a3a",
];

export default function Analytics() {
  const { data, loading, error } = useAsync(getAnalytics, []);

  const topSkills = data?.top_skills?.slice(0, 10) ?? [];
  const topRoles = data?.jobs_by_role?.slice(0, 7) ?? [];

  const uniqueRoles = data?.jobs_by_role?.length ?? 0;

  const totalSkills = data?.top_skills?.reduce(
    (sum, item) => sum + item.count,
    0
  ) ?? 0;

  const topSkill = topSkills.length > 0 ? topSkills[0].skill : "—";

  return (
    <div className="min-h-screen w-full bg-slate-50">

      {/* Page Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-12 w-12 rounded-xl bg-brand-500 text-white flex items-center justify-center shadow-sm">
            <span className="text-xl">▥</span>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Analytics
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              Explore job roles, skill frequency, and dataset insights.
            </p>
          </div>
        </div>

        <div className="h-px bg-slate-200 w-full" />
      </div>

      <StateWrapper
        loading={loading}
        error={error}
        isEmpty={!data || data.total_jobs === 0}
      >
        {data && (
          <div className="space-y-8">

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

              {/* Total Jobs */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Total Jobs
                    </p>

                    <p className="text-3xl font-bold text-slate-800 mt-2">
                      {data.total_jobs.toLocaleString()}
                    </p>

                    <p className="text-xs text-slate-500 mt-2">
                      Job postings in dataset
                    </p>
                  </div>

                  <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <span className="text-blue-600 text-lg">▣</span>
                  </div>
                </div>
              </div>

              {/* Unique Roles */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Job Roles
                    </p>

                    <p className="text-3xl font-bold text-slate-800 mt-2">
                      {uniqueRoles}
                    </p>

                    <p className="text-xs text-slate-500 mt-2">
                      Different job categories
                    </p>
                  </div>

                  <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <span className="text-green-600 text-lg">◆</span>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Skill Mentions
                    </p>

                    <p className="text-3xl font-bold text-slate-800 mt-2">
                      {totalSkills.toLocaleString()}
                    </p>

                    <p className="text-xs text-slate-500 mt-2">
                      Extracted skill occurrences
                    </p>
                  </div>

                  <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
                    <span className="text-purple-600 text-lg">✦</span>
                  </div>
                </div>
              </div>

              {/* Top Skill */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-start justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Most Common Skill
                    </p>

                    <p className="text-xl font-bold text-slate-800 mt-3 truncate">
                      {topSkill}
                    </p>

                    <p className="text-xs text-slate-500 mt-2">
                      Highest frequency skill
                    </p>
                  </div>

                  <div className="h-10 w-10 rounded-lg bg-orange-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-orange-600 text-lg">★</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

              {/* Job Roles Donut */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                <div className="px-6 py-5 border-b border-slate-100">
                  <h2 className="text-base font-semibold text-slate-800">
                    Top Job Roles
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Distribution of the most common job roles.
                  </p>
                </div>

                <div className="p-6">
                  <ResponsiveContainer width="100%" height={330}>
                    <PieChart>
                      <Pie
                        data={topRoles}
                        dataKey="count"
                        nameKey="role"
                        cx="50%"
                        cy="50%"
                        innerRadius={75}
                        outerRadius={120}
                        paddingAngle={2}
                        label={({ role }) => role}
                        labelLine={false}
                      >
                        {topRoles.map((_, i) => (
                          <Cell
                            key={i}
                            fill={COLORS[i % COLORS.length]}
                          />
                        ))}
                      </Pie>

                      <Tooltip
                        formatter={(value: number) => [
                          value.toLocaleString(),
                          "Jobs",
                        ]}
                        contentStyle={{
                          borderRadius: "10px",
                          border: "1px solid #e2e8f0",
                          boxShadow:
                            "0 4px 12px rgba(15, 23, 42, 0.08)",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Skill Frequency */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                <div className="px-6 py-5 border-b border-slate-100">
                  <h2 className="text-base font-semibold text-slate-800">
                    Top Skills
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Most frequently mentioned skills in job descriptions.
                  </p>
                </div>

                <div className="p-6">
                  <ResponsiveContainer width="100%" height={330}>
                    <BarChart
                      data={topSkills}
                      margin={{
                        top: 10,
                        right: 15,
                        left: 0,
                        bottom: 45,
                      }}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                      />

                      <XAxis
                        dataKey="skill"
                        tick={{
                          fontSize: 10,
                        }}
                        angle={-30}
                        textAnchor="end"
                        height={70}
                        tickLine={false}
                        axisLine={false}
                      />

                      <YAxis
                        allowDecimals={false}
                        tick={{
                          fontSize: 11,
                        }}
                        tickLine={false}
                        axisLine={false}
                      />

                      <Tooltip
                        formatter={(value: number) => [
                          value.toLocaleString(),
                          "Occurrences",
                        ]}
                        contentStyle={{
                          borderRadius: "10px",
                          border: "1px solid #e2e8f0",
                          boxShadow:
                            "0 4px 12px rgba(15, 23, 42, 0.08)",
                        }}
                      />

                      <Bar
                        dataKey="count"
                        name="Skill Frequency"
                        fill="#3b6ea5"
                        radius={[5, 5, 0, 0]}
                        barSize={35}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>

            {/* Role Distribution */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

              <div className="px-6 py-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-800">
                  Job Role Distribution
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Number of job postings across the leading roles.
                </p>
              </div>

              <div className="p-6">

                <ResponsiveContainer width="100%" height={330}>
                  <BarChart
                    data={topRoles}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 30,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      horizontal={false}
                    />

                    <XAxis
                      type="number"
                      allowDecimals={false}
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis
                      type="category"
                      dataKey="role"
                      width={130}
                      tick={{
                        fontSize: 11,
                      }}
                      tickLine={false}
                      axisLine={false}
                    />

                    <Tooltip
                      formatter={(value: number) => [
                        value.toLocaleString(),
                        "Jobs",
                      ]}
                      contentStyle={{
                        borderRadius: "10px",
                        border: "1px solid #e2e8f0",
                        boxShadow:
                          "0 4px 12px rgba(15, 23, 42, 0.08)",
                      }}
                    />

                    <Bar
                      dataKey="count"
                      name="Jobs"
                      fill="#5a9e6f"
                      radius={[0, 5, 5, 0]}
                      barSize={24}
                    />
                  </BarChart>
                </ResponsiveContainer>

              </div>
            </div>

            {/* Bottom Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

              {/* Skill Ranking */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                <div className="px-6 py-5 border-b border-slate-100">
                  <h2 className="text-base font-semibold text-slate-800">
                    Skill Ranking
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Top skills based on frequency.
                  </p>
                </div>

                <div className="p-6">
                  <div className="space-y-4">

                    {topSkills.map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-4"
                      >
                        <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                          {index + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-slate-700 truncate">
                              {skill.skill}
                            </span>

                            <span className="text-xs font-semibold text-slate-500 ml-3">
                              {skill.count.toLocaleString()}
                            </span>
                          </div>

                          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-brand-500"
                              style={{
                                width: `${
                                  topSkills[0]?.count
                                    ? (skill.count /
                                        topSkills[0].count) *
                                      100
                                    : 0
                                }%`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                  </div>
                </div>
              </div>

              {/* Dataset Summary */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                <div className="px-6 py-5 border-b border-slate-100">
                  <h2 className="text-base font-semibold text-slate-800">
                    Dataset Overview
                  </h2>

                  <p className="text-sm text-slate-500 mt-1">
                    Quick summary of the available analytics.
                  </p>
                </div>

                <div className="p-6">

                  <div className="space-y-5">

                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <span className="text-sm text-slate-500">
                        Total job postings
                      </span>

                      <span className="text-sm font-semibold text-slate-800">
                        {data.total_jobs.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <span className="text-sm text-slate-500">
                        Job role categories
                      </span>

                      <span className="text-sm font-semibold text-slate-800">
                        {uniqueRoles}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <span className="text-sm text-slate-500">
                        Skills analyzed
                      </span>

                      <span className="text-sm font-semibold text-slate-800">
                        {data.top_skills.length}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                      <span className="text-sm text-slate-500">
                        Most frequent skill
                      </span>

                      <span className="text-sm font-semibold text-brand-600">
                        {topSkill}
                      </span>
                    </div>

                    <div className="rounded-xl bg-slate-50 p-4">
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Insight
                      </p>

                      <p className="text-sm text-slate-600 mt-2 leading-6">
                        The analytics dashboard summarizes the job dataset
                        and highlights the most frequently requested skills
                        and job roles.
                      </p>
                    </div>

                  </div>

                </div>
              </div>

            </div>

          </div>
        )}
      </StateWrapper>
    </div>
  );
}