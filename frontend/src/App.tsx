import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Analyzer from "./pages/Analyzer";
import MethodComparison from "./pages/MethodComparison";
import Analytics from "./pages/Analytics";
import JobExplorer from "./pages/JobExplorer";

export default function App() {
  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* Existing Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 min-w-0 w-full p-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/analyzer" element={<Analyzer />} />
          <Route path="/compare" element={<MethodComparison />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/jobs" element={<JobExplorer />} />
        </Routes>
      </main>
    </div>
  );
}