import { employee_role, job_status, job_type } from '../generated/prisma/enums';

const JOB_TYPES = job_type;
const JOB_STATUS = job_status;
const EMPLOYEE_ROLE = employee_role;
const REPORTER_RATE = 2000;
const EDITOR_RATE = 5000;

export { JOB_TYPES, JOB_STATUS, EMPLOYEE_ROLE, REPORTER_RATE, EDITOR_RATE };
