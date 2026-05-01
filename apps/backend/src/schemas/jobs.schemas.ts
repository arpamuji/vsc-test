import z from 'zod';
import { JOB_STATUS, JOB_TYPES } from '../config/constants';

const jobIdSchema = z
  .object({
    id: z.uuid(),
  })
  .strict();
const getJobByIdSchema = {
  params: jobIdSchema,
};
const createJobSchema = {
  body: z
    .object({
      caseName: z.string().min(1).max(500),
      type: z.enum(JOB_TYPES),
      duration: z.number().int().positive(),
      city: z.string().min(1).max(100),
      country: z.string().min(1).max(100),
    })
    .strict(),
};
const updateJobSchema = {
  params: jobIdSchema,
  body: z
    .object({
      caseName: z.string().min(1).max(500),
      type: z.enum(JOB_TYPES),
      duration: z.number().int().positive(),
      city: z.string().min(1).max(100),
      country: z.string().min(1).max(100),
    })
    .strict(),
};
const updateJobStatusSchema = {
  params: jobIdSchema,
  body: z
    .object({
      status: z.enum([JOB_STATUS.TRANSCRIBED, JOB_STATUS.REVIEWED]),
    })
    .strict(),
};
const assignReporterSchema = {
  params: jobIdSchema,
  body: z
    .object({
      reporterId: z.uuid(),
    })
    .strict(),
};
const assignEditorSchema = {
  params: jobIdSchema,
  body: z
    .object({
      editorId: z.uuid(),
    })
    .strict(),
};
const completeJobSchema = {
  params: jobIdSchema,
};

type GetJobByIdSchema = z.infer<typeof getJobByIdSchema.params>;
type CreateJobSchema = z.infer<typeof createJobSchema.body>;
type UpdateJobSchema = z.infer<typeof updateJobSchema.body>;
type UpdateJobStatusSchema = z.infer<typeof updateJobStatusSchema.body>;
type AssignReporterSchema = z.infer<typeof assignReporterSchema.body>;
type AssignEditorSchema = z.infer<typeof assignEditorSchema.body>;
type CompleteJobSchema = z.infer<typeof completeJobSchema.params>;

export {
  getJobByIdSchema,
  createJobSchema,
  updateJobSchema,
  updateJobStatusSchema,
  assignReporterSchema,
  assignEditorSchema,
  completeJobSchema,
};

export type {
  GetJobByIdSchema,
  CreateJobSchema,
  UpdateJobSchema,
  UpdateJobStatusSchema,
  AssignReporterSchema,
  AssignEditorSchema,
  CompleteJobSchema,
};
