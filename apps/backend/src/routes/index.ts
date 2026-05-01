import { Router } from 'express';
import employeeRoutes from './employees.routes';
import healthRoutes from './health.routes';
import jobsRoutes from './jobs.routes';

const router = Router();

router.use('/health', healthRoutes);
router.use('/jobs', jobsRoutes);
router.use('/employees', employeeRoutes);

export { router };
