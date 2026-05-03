import { Router } from 'express';
import employeeController from '../controllers/employee.controller';
import validateRequest from '../middlewares/validateRequest';
import { getEmployeeByIdSchema, getEmployeesSchema } from '../schemas/employees.schemas';

const employeeRoutes = Router();

employeeRoutes.get('/', validateRequest(getEmployeesSchema), employeeController.getEmployees);
employeeRoutes.get(
  '/:id',
  validateRequest(getEmployeeByIdSchema),
  employeeController.getEmployeeById
);

export default employeeRoutes;
