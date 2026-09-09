import axios from "axios";
import type {
  ExtractResponse,
  CompareResponse,
  AnalyticsResponse,
  JobsResponse,
} from "../types";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  timeout: 30000,
});

export async function extractSkills(jobDescription: string): Promise<ExtractResponse> {
  const { data } = await api.post<ExtractResponse>("/extract", {
    job_description: jobDescription,
  });
  return data;
}

export async function compareMethods(jobDescription: string): Promise<CompareResponse> {
  const { data } = await api.post<CompareResponse>("/compare", {
    job_description: jobDescription,
  });
  return data;
}

export async function getAnalytics(): Promise<AnalyticsResponse> {
  const { data } = await api.get<AnalyticsResponse>("/analytics");
  return data;
}

export async function getJobs(params: {
  q?: string;
  location?: string;
  skill?: string;
  limit?: number;
  offset?: number;
}): Promise<JobsResponse> {
  const { data } = await api.get<JobsResponse>("/jobs", { params });
  return data;
}

export default api;
export async function getRoleSkills(role: string) {
  const { data } = await api.get(`/role-skills`, { params: { role } });
  return data as { role: string; matched_postings: number; skills: { skill: string; count: number; category: string }[] };
}