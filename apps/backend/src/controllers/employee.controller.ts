import { Request, Response } from 'express';
import { GetEmployeesQuerySchema } from '../schemas/employees.schemas';
import employeesServices from '../services/employees.services';

const getEmployees = async (req: Request, res: Response) => {
  const { role, city, country, availability } = req.query as GetEmployeesQuerySchema;
  const employees = await employeesServices.getEmployees({ role, city, country, availability });

  return res.success({
    message: 'Employees retrieved successfully',
    data: employees,
  });
};

const getEmployeeById = async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const employee = await employeesServices.getEmployeeById(id);

  return res.success({
    message: 'Employee retrieved successfully',
    data: employee,
  });
};

export default { getEmployees, getEmployeeById };
