import { StatusCodes } from 'http-status-codes';
import { EDITOR_RATE, JOB_STATUS, REPORTER_RATE } from '../config/constants';
import AppError from '../errors/AppError';
import { prisma } from '../lib/prisma';
import { CreateJobSchema, UpdateJobSchema } from '../schemas/jobs.schemas';

const getJobs = async () => {
  const jobs = await prisma.jobs.findMany({
    include: {
      reporter: {
        select: { id: true, name: true, city: true, country: true },
      },
      editor: {
        select: { id: true, name: true, city: true, country: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return jobs.map((job) => {
    return {
      ...job,
      reporterFee: job.reporterFee ?? 0,
      editorFee: job.editorFee ?? 0,
      totalPayout: (job.reporterFee ?? 0) + (job.editorFee ?? 0),
    };
  });
};
const getJobById = async (id: string) => {
  const job = await prisma.jobs.findUnique({
    include: {
      reporter: {
        select: { id: true, name: true, city: true, country: true },
      },
      editor: {
        select: { id: true, name: true, city: true, country: true },
      },
    },
    where: { id },
  });

  if (!job) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      code: 'JOB_NOT_FOUND',
      message: `Job with ID ${id} not found`,
    });
  }

  return {
    ...job,
    reporterFee: job.reporterFee ?? 0,
    editorFee: job.editorFee ?? 0,
    totalPayout: (job.reporterFee ?? 0) + (job.editorFee ?? 0),
  };
};
const createJob = async (data: CreateJobSchema) => {
  const job = await prisma.jobs.create({
    data: {
      ...data,
      status: 'NEW',
    },
  });

  return job;
};
const updateJob = async (id: string, data: UpdateJobSchema) => {
  const existingJob = await prisma.jobs.findUnique({ where: { id } });

  if (!existingJob) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      code: 'JOB_NOT_FOUND',
      message: `Job with ID ${id} not found`,
    });
  }

  const updatedJob = await prisma.jobs.update({
    where: { id },
    data,
  });

  return updatedJob;
};
const assignReporter = async (id: string, reporterId: string) => {
  const existingJob = await prisma.jobs.findUnique({ where: { id } });

  if (!existingJob) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      code: 'JOB_NOT_FOUND',
      message: `Job with ID ${id} not found`,
    });
  }

  if (existingJob.status !== 'NEW') {
    throw new AppError({
      statusCode: StatusCodes.BAD_REQUEST,
      code: 'INVALID_JOB_STATUS',
      message: `Job with ID ${id} must be in NEW status to assign a reporter`,
    });
  }

  const reporter = await prisma.employees.findUnique({ where: { id: reporterId } });

  if (!reporter) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      code: 'REPORTER_NOT_FOUND',
      message: `Reporter with ID ${reporterId} not found`,
    });
  }

  if (reporter.role !== 'REPORTER') {
    throw new AppError({
      statusCode: StatusCodes.BAD_REQUEST,
      code: 'INVALID_REPORTER_ROLE',
      message: `Employee with ID ${reporterId} does not have REPORTER role`,
    });
  }

  if (
    existingJob.type === 'PHYSICAL' &&
    existingJob.city?.toLowerCase() !== reporter.city.toLowerCase()
  ) {
    throw new AppError({
      statusCode: StatusCodes.BAD_REQUEST,
      code: 'CITY_MISMATCH',
      message: `Reporter with ID ${reporterId} must be in the same city as the job for PHYSICAL type`,
    });
  }

  if (!reporter.availability) {
    throw new AppError({
      statusCode: StatusCodes.BAD_REQUEST,
      code: 'REPORTER_UNAVAILABLE',
      message: `Reporter with ID ${reporterId} is currently unavailable`,
    });
  }

  const updatedJob = await prisma.jobs.update({
    where: { id },
    data: { reporterId: reporterId, status: 'ASSIGNED' },
  });

  return updatedJob;
};
const assignEditor = async (id: string, editorId: string) => {
  const existingJob = await prisma.jobs.findUnique({ where: { id } });

  if (!existingJob) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      code: 'JOB_NOT_FOUND',
      message: `Job with ID ${id} not found`,
    });
  }

  if (!existingJob.reporterId) {
    throw new AppError({
      statusCode: StatusCodes.BAD_REQUEST,
      code: 'REPORTER_NOT_ASSIGNED',
      message: `Reporter must be assigned to job with ID ${id} before assigning an editor`,
    });
  }

  if (existingJob.status !== 'TRANSCRIBED') {
    throw new AppError({
      statusCode: StatusCodes.BAD_REQUEST,
      code: 'INVALID_JOB_STATUS',
      message: `Job with ID ${id} must be in TRANSCRIBED status to assign an editor`,
    });
  }

  const editor = await prisma.employees.findUnique({ where: { id: editorId } });

  if (!editor) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      code: 'EDITOR_NOT_FOUND',
      message: `Editor with ID ${editorId} not found`,
    });
  }

  if (editor.role !== 'EDITOR') {
    throw new AppError({
      statusCode: StatusCodes.BAD_REQUEST,
      code: 'INVALID_EDITOR_ROLE',
      message: `Employee with ID ${editorId} does not have EDITOR role`,
    });
  }

  if (!editor.availability) {
    throw new AppError({
      statusCode: StatusCodes.BAD_REQUEST,
      code: 'EDITOR_UNAVAILABLE',
      message: `Editor with ID ${editorId} is currently unavailable`,
    });
  }

  const updatedJob = await prisma.jobs.update({
    where: { id },
    data: { editorId },
  });

  return updatedJob;
};
const updateStatus = async (id: string, status: string) => {
  const existingJob = await prisma.jobs.findUnique({ where: { id } });

  if (!existingJob) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      code: 'JOB_NOT_FOUND',
      message: `Job with ID ${id} not found`,
    });
  }

  if (!(status in JOB_STATUS)) {
    throw new AppError({
      statusCode: StatusCodes.BAD_REQUEST,
      code: 'INVALID_JOB_STATUS',
      message: `Status ${status} is not a valid job status`,
    });
  }

  const updatedJob = await prisma.jobs.update({
    where: { id },
    data: { status: status as keyof typeof JOB_STATUS },
  });

  return updatedJob;
};
const completeJob = async (id: string) => {
  const existingJob = await prisma.jobs.findUnique({ where: { id } });

  if (!existingJob) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      code: 'JOB_NOT_FOUND',
      message: `Job with ID ${id} not found`,
    });
  }

  if (existingJob.status !== 'REVIEWED') {
    throw new AppError({
      statusCode: StatusCodes.BAD_REQUEST,
      code: 'INVALID_JOB_STATUS',
      message: `Job with ID ${id} must be in REVIEWED status to be completed`,
    });
  }

  // Calculate payment based on duration and predefined rates
  const reporterPayment = existingJob.duration * REPORTER_RATE;
  const editorPayment = EDITOR_RATE;

  const updatedJob = await prisma.jobs.update({
    where: { id },
    data: {
      status: 'COMPLETED',
      reporterFee: reporterPayment,
      editorFee: editorPayment,
    },
  });

  return {
    ...updatedJob,
    totalPayout: reporterPayment + editorPayment,
  };
};

export default {
  getJobs,
  getJobById,
  createJob,
  updateJob,
  updateStatus,
  assignReporter,
  assignEditor,
  completeJob,
};
