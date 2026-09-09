export interface SkillItem {
  skill: string;
  category: string;
}

export interface ExtractResponse {
  skills: SkillItem[];
  method: string;
  processing_time_ms?: number;
}

export interface MethodResult {
  method: string;
  skills: SkillItem[];
  processing_time_ms?: number;
  available?: boolean;
  error?: string | null;
}

export interface CompareResponse {
  results: MethodResult[];
}

export interface AnalyticsResponse {
  total_jobs: number;
  unique_skills: number;
  top_skill: string | null;
  top_job_role: string | null;
  top_skills: { skill: string; count: number }[];
  jobs_by_role: { role: string; count: number }[];
  note?: string;
}

export interface Job {
  job_id: string;
  title: string;
  company_name: string;
  location: string;
  formatted_work_type: string;
  formatted_experience_level: string;
  extracted_skills: string[];
  skill_count: number;
}

export interface JobsResponse {
  total: number;
  limit: number;
  offset: number;
  jobs: Job[];
}
