import z from 'zod';
import { EMPLOYEE_ROLE } from '../config/constants';

const employeeIdSchema = z
  .object({
    id: z.uuid(),
  })
  .strict();

const getEmployeesSchema = {
  query: z
    .object({
      availability: z
        .string()
        .transform((value) => value === 'true')
        .optional(),
      city: z.string().optional(),
      country: z.string().optional(),
      role: z
        .string()
        .transform((value) => value.toUpperCase())
        .pipe(z.enum(EMPLOYEE_ROLE))
        .optional(),
    })
    .strict(),
};

const getEmployeeByIdSchema = {
  params: employeeIdSchema,
};

type GetEmployeesQuerySchema = z.infer<typeof getEmployeesSchema.query>;
type GetEmployeeByIdParamsSchema = z.infer<typeof getEmployeeByIdSchema.params>;

export { getEmployeesSchema, getEmployeeByIdSchema };
export type { GetEmployeesQuerySchema, GetEmployeeByIdParamsSchema };
