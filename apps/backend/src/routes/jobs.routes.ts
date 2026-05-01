import { Router } from 'express';
import jobControllers from '../controllers/jobs.controller';
import validateRequest from '../middlewares/validateRequest';
import {
  assignEditorSchema,
  assignReporterSchema,
  completeJobSchema,
  createJobSchema,
  getJobByIdSchema,
  updateJobSchema,
  updateJobStatusSchema,
} from '../schemas/jobs.schemas';

const jobsRoutes: Router = Router();

// Jobs routes will be defined here
jobsRoutes.get('/', jobControllers.getJobs);
jobsRoutes.get('/:id', validateRequest(getJobByIdSchema), jobControllers.getJobById);

jobsRoutes.post('/', validateRequest(createJobSchema), jobControllers.createJob);
jobsRoutes.put('/:id', validateRequest(updateJobSchema), jobControllers.updateJob);

jobsRoutes.patch(
  '/:id/reporter',
  validateRequest(assignReporterSchema),
  jobControllers.assignReporterToJob
);
jobsRoutes.patch(
  '/:id/editor',
  validateRequest(assignEditorSchema),
  jobControllers.assignEditorToJob
);

jobsRoutes.patch(
  '/:id/status',
  validateRequest(updateJobStatusSchema),
  jobControllers.updateJobStatus
);

jobsRoutes.patch('/:id/complete', validateRequest(completeJobSchema), jobControllers.completeJob);

export default jobsRoutes;
