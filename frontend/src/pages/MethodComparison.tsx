import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { compareMethods } from "../services/api";
import type { CompareResponse } from "../types";

export default function MethodComparison() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<CompareResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCompare() {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);

    try {
      setResult(await compareMethods(text));
    } catch (err: any) {
      setError(
        err?.response?.data?.detail ??
          err?.message ??
          "Comparison failed"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleClear() {
    setText("");
    setResult(null);
    setError(null);
  }

  const chartData =
    result?.results.map((r) => ({
      method: r.method,
      skills: r.skills.length,
    })) ?? [];

  const totalMethods = result?.results.length ?? 0;

  const successfulMethods =
    result?.results.filter((r) => !r.error).length ?? 0;

  const totalSkills =
    result?.results.reduce((total, r) => total + r.skills.length, 0) ?? 0;

  const fastestMethod =
    result?.results
      ?.filter((r) => r.processing_time_ms != null && !r.error)
      .sort(
        (a, b) =>
          (a.processing_time_ms ?? Infinity) -
          (b.processing_time_ms ?? Infinity)
      )[0]?.method ?? "—";

  return (
    <div className="min-h-screen w-full bg-slate-50">
      <div className="w-full max-w-none">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 text-white shadow-sm">
              <span className="text-xl">⚖</span>
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Method Comparison
              </h1>

              <p className="text-sm text-slate-500">
                Compare multiple skill extraction techniques on the same job
                description.
              </p>
            </div>
          </div>

          <div className="h-px w-full bg-slate-200" />
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          <div className="px-6 py-5 border-b border-slate-100">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-slate-800">
                  Job Description
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Paste the same text below to evaluate all extraction methods.
                </p>
              </div>

              <div className="hidden sm:block text-xs text-slate-400">
                {text.length} characters
              </div>
            </div>
          </div>

          <div className="p-6">
            <textarea
              className="w-full min-h-[190px] resize-y rounded-xl border border-slate-300 bg-slate-50 p-4 text-sm leading-6 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:bg-white transition"
              placeholder="Example: We are looking for a Python developer with experience in FastAPI, SQL, PostgreSQL, Docker, Git and machine learning..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
              <p className="text-xs text-slate-400">
                Dictionary • Regex • spaCy NER • Transformer
              </p>

              <div className="flex gap-2">
                <button
                  onClick={handleClear}
                  disabled={loading || !text}
                  className="px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-600 text-sm font-medium hover:bg-slate-50 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Clear
                </button>

                <button
                  onClick={handleCompare}
                  disabled={loading || !text.trim()}
                  className="px-5 py-2.5 rounded-lg bg-brand-500 text-white text-sm font-semibold shadow-sm hover:bg-brand-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Comparing...
                    </>
                  ) : (
                    <>
                      <span>Compare Methods</span>
                      <span>→</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4">
            <div className="flex gap-3">
              <span className="text-red-500 text-lg">⚠</span>

              <div>
                <p className="text-sm font-semibold text-red-800">
                  Comparison failed
                </p>

                <p className="text-sm text-red-700 mt-1">
                  {error}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Methods Tested
                    </p>

                    <p className="text-2xl font-bold text-slate-800 mt-2">
                      {totalMethods}
                    </p>
                  </div>

                  <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center">
                    <span>⚙</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Successful
                    </p>

                    <p className="text-2xl font-bold text-green-600 mt-2">
                      {successfulMethods}
                    </p>
                  </div>

                  <div className="h-10 w-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <span className="text-green-600">✓</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Skills Detected
                    </p>

                    <p className="text-2xl font-bold text-brand-600 mt-2">
                      {totalSkills}
                    </p>
                  </div>

                  <div className="h-10 w-10 rounded-lg bg-brand-50 flex items-center justify-center">
                    <span>✦</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                      Fastest Method
                    </p>

                    <p className="text-lg font-bold text-slate-800 mt-2 truncate max-w-[150px]">
                      {fastestMethod}
                    </p>
                  </div>

                  <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <span>⚡</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Comparison Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">

              <div className="px-6 py-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-800">
                  Extraction Results
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Results returned by each skill extraction method.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">

                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Method
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Skills Found
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Processing Time
                      </th>

                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {result.results.map((r, i) => (
                      <tr
                        key={i}
                        className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/70 transition"
                      >
                        {/* Method */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">
                              {i + 1}
                            </div>

                            <span className="font-semibold text-slate-800">
                              {r.method}
                            </span>
                          </div>
                        </td>

                        {/* Skills */}
                        <td className="px-6 py-5">
                          {r.skills.length === 0 ? (
                            <span className="text-slate-400">
                              No skills found
                            </span>
                          ) : (
                            <div className="flex flex-wrap gap-2 max-w-xl">
                              {r.skills.map((skill, skillIndex) => (
                                <span
                                  key={skillIndex}
                                  className="inline-flex items-center rounded-full bg-brand-50 border border-brand-100 px-2.5 py-1 text-xs font-medium text-brand-700"
                                >
                                  {skill.skill}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>

                        {/* Time */}
                        <td className="px-6 py-5">
                          <span className="font-medium text-slate-700">
                            {r.processing_time_ms != null
                              ? `${r.processing_time_ms.toFixed(2)} ms`
                              : "—"}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-5">
                          {r.error ? (
                            <div>
                              <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs font-medium text-amber-700">
                                Warning
                              </span>

                              <p className="text-xs text-amber-600 mt-2 max-w-xs">
                                {r.error}
                              </p>
                            </div>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 border border-green-200 px-2.5 py-1 text-xs font-medium text-green-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                              Successful
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

              <div className="px-6 py-5 border-b border-slate-100">
                <h2 className="text-base font-semibold text-slate-800">
                  Skills Found per Method
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Visual comparison of the number of skills detected.
                </p>
              </div>

              <div className="p-6">
                <ResponsiveContainer width="100%" height={330}>
                  <BarChart
                    data={chartData}
                    margin={{
                      top: 10,
                      right: 20,
                      left: 0,
                      bottom: 10,
                    }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="method"
                      tick={{
                        fontSize: 12,
                      }}
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis
                      allowDecimals={false}
                      tick={{
                        fontSize: 12,
                      }}
                      tickLine={false}
                      axisLine={false}
                    />

                    <Tooltip
                      cursor={{
                        fill: "rgba(148, 163, 184, 0.08)",
                      }}
                      contentStyle={{
                        borderRadius: "10px",
                        border: "1px solid #e2e8f0",
                        boxShadow:
                          "0 4px 12px rgba(15, 23, 42, 0.08)",
                      }}
                    />

                    <Bar
                      dataKey="skills"
                      name="Skills Found"
                      fill="#5a9e6f"
                      radius={[6, 6, 0, 0]}
                      barSize={55}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {/* Empty State */}
        {!result && !error && (
          <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-10 text-center">

            <div className="mx-auto h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center mb-4">
              <span className="text-2xl text-slate-400">⚖</span>
            </div>

            <h3 className="text-base font-semibold text-slate-700">
              Ready to compare extraction methods
            </h3>

            <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto">
              Enter a job description above and click{" "}
              <span className="font-medium text-slate-700">
                Compare Methods
              </span>{" "}
              to see how each technique performs.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}