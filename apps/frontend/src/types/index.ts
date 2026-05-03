export type JobStatus = 'NEW' | 'ASSIGNED' | 'TRANSCRIBED' | 'REVIEWED' | 'COMPLETED';
export type JobType = 'PHYSICAL' | 'REMOTE';
export type EmployeeRole = 'REPORTER' | 'EDITOR';

export interface Employee {
  id: string;
  name: string;
  role: EmployeeRole;
  city: string;
  country: string;
  availability: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  caseName: string;
  type: JobType;
  duration: number;
  status: JobStatus;
  city: string | null;
  country: string | null;
  reporterId: string | null;
  reporterFee: number | null;
  reporter?: Employee;
  editorId: string | null;
  editorFee: number | null;
  editor?: Employee;
  totalPayout: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeFilters {
  role?: EmployeeRole;
  city?: string;
  country?: string;
  availability?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ErrorResponse {
  success: boolean;
  error: string;
  message?: string;
}
