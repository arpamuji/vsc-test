import { api } from './api';
import type { Employee } from '@/types';

export const employeeService = {
  getAll: (filters?: Record<string, string>) =>
    api.get<Employee[]>(
      '/employees' + (filters ? `?${new URLSearchParams(filters as any).toString()}` : '')
    ),
  getById: (id: string) => api.get<Employee>(`/employees/${id}`),
};
