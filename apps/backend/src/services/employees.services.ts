import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/AppError';
import { Prisma } from '../generated/prisma/client';
import { prisma } from '../lib/prisma';

type GetEmployeesQueries = {
  role?: 'REPORTER' | 'EDITOR';
  city?: string;
  country?: string;
  availability?: boolean;
};

const getEmployees = async (queries?: GetEmployeesQueries) => {
  const where: Prisma.employeesWhereInput = {};

  if (queries?.role) where.role = queries.role;
  if (queries?.city) where.city = { equals: queries.city, mode: 'insensitive' };
  if (queries?.country) where.country = { equals: queries.country, mode: 'insensitive' };
  if (queries?.availability !== undefined) where.availability = queries.availability;

  const employees = await prisma.employees.findMany({
    where,
    orderBy: { name: 'asc' },
  });

  return employees;
};

const getEmployeeById = async (id: string) => {
  const employee = await prisma.employees.findUnique({
    where: { id },
  });

  if (!employee) {
    throw new AppError({
      statusCode: StatusCodes.NOT_FOUND,
      code: 'EMPLOYEE_NOT_FOUND',
      message: `Employee with ID ${id} not found`,
    });
  }

  return employee;
};

export default { getEmployees, getEmployeeById };
