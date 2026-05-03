import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import jobServices from '../services/jobs.services';

const getJobs = async (req: Request, res: Response) => {
  const jobs = await jobServices.getJobs();

  res.success({
    message: 'Jobs retrieved successfully',
    data: jobs,
  });
};
const getJobById = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const job = await jobServices.getJobById(id);

  res.success({
    message: 'Job retrieved successfully',
    data: job,
  });
};
const createJob = async (req: Request, res: Response) => {
  const data = req.body;
  const job = await jobServices.createJob(data);

  res.success({
    statusCode: StatusCodes.CREATED,
    message: 'Job created successfully',
    data: job,
  });
};
const updateJob = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const data = req.body;
  const job = await jobServices.updateJob(id, data);

  res.success({
    message: 'Job updated successfully',
    data: job,
  });
};
const assignReporterToJob = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const reporterId = req.body.reporterId as string;

  const job = await jobServices.assignReporter(id, reporterId);

  res.success({
    message: 'Reporter assigned to job successfully',
    data: job,
  });
};
const assignEditorToJob = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const editorId = req.body.editorId as string;

  const job = await jobServices.assignEditor(id, editorId);

  res.success({
    message: 'Editor assigned to job successfully',
    data: job,
  });
};
const updateJobStatus = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const status = req.body.status as string;

  const job = await jobServices.updateStatus(id, status);

  res.success({
    message: 'Job status updated successfully',
    data: job,
  });
};
const completeJob = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const job = await jobServices.completeJob(id);

  res.success({
    message: 'Job completed successfully',
    data: job,
  });
};

export default {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  updateJobStatus,
  assignReporterToJob,
  assignEditorToJob,
  completeJob,
};
