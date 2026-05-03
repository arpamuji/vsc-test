import { api } from './api';
import type { Job, JobStatus } from '@/types';

export const jobService = {
  getAll: () => api.get<Job[]>('/jobs'),

  getById: (id: string) => api.get<Job>(`/jobs/${id}`),

  create: (data: {
    caseName: string;
    type: 'PHYSICAL' | 'REMOTE';
    duration: number;
    city?: string;
    country?: string;
  }) => api.post<Job>('/jobs', data),

  update: (id: string, data: Partial<Job>) => api.put<Job>(`/jobs/${id}`, data),

  assignReporter: (id: string, reporterId: string) =>
    api.patch<Job>(`/jobs/${id}/reporter`, { reporterId }),

  assignEditor: (id: string, editorId: string) =>
    api.patch<Job>(`/jobs/${id}/editor`, { editorId }),

  updateStatus: (id: string, status: JobStatus) => api.patch<Job>(`/jobs/${id}/status`, { status }),

  complete: (
    id: string,
    data: { reporterId?: string; editorId?: string; reporterFee?: number; editorFee?: number }
  ) => api.patch<Job>(`/jobs/${id}/complete`, data),
};
