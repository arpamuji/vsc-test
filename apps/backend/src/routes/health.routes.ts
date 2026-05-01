import { Router } from 'express';
import healthController from '../controllers/health.controller';

const healthRoutes: Router = Router();

// Health routes will be defined here
healthRoutes.get('/', healthController.check);

export default healthRoutes;
