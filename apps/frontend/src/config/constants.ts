import type { Job } from '@/types';

const jobStatusColors: Record<Job['status'], string> = {
  NEW: 'bg-blue-100 text-blue-700',
  ASSIGNED: 'bg-yellow-100 text-yellow-700',
  TRANSCRIBED: 'bg-purple-100 text-purple-700',
  REVIEWED: 'bg-indigo-100 text-indigo-700',
  COMPLETED: 'bg-green-100 text-green-700',
};

export { jobStatusColors };
