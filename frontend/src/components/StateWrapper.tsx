import type { ReactNode } from "react";

export default function StateWrapper({
  loading,
  error,
  isEmpty,
  emptyMessage = "No data yet.",
  children,
}: {
  loading: boolean;
  error: string | null;
  isEmpty?: boolean;
  emptyMessage?: string;
  children: ReactNode;
}) {
  if (loading) {
    return <div className="text-sm text-slate-500 py-8 text-center">Loading…</div>;
  }
  if (error) {
    return (
      <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-md p-4">
        Couldn't load this data: {error}
      </div>
    );
  }
  if (isEmpty) {
    return <div className="text-sm text-slate-500 py-8 text-center">{emptyMessage}</div>;
  }
  return <>{children}</>;
}
