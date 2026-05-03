-- CreateEnum
CREATE TYPE "employee_role" AS ENUM ('REPORTER', 'EDITOR');

-- CreateEnum
CREATE TYPE "job_status" AS ENUM ('NEW', 'ASSIGNED', 'TRANSCRIBED', 'REVIEWED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "job_type" AS ENUM ('PHYSICAL', 'REMOTE');

-- CreateTable
CREATE TABLE "employees" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "role" "employee_role" NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "availability" BOOLEAN NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jobs" (
    "id" UUID NOT NULL,
    "case_name" VARCHAR(500) NOT NULL,
    "type" "job_type" NOT NULL,
    "duration" INTEGER NOT NULL,
    "status" "job_status" NOT NULL,
    "city" VARCHAR(100),
    "country" VARCHAR(100),
    "reporter_id" UUID,
    "reporter_fee" INTEGER,
    "editor_id" UUID,
    "editor_fee" INTEGER,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "idx_employee_assignment" ON "employees"("role", "availability", "city");

-- CreateIndex
CREATE INDEX "idx_jobs_editor_id" ON "jobs"("editor_id");

-- CreateIndex
CREATE INDEX "idx_jobs_reporter_id" ON "jobs"("reporter_id");

-- CreateIndex
CREATE INDEX "idx_jobs_status" ON "jobs"("status");

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_editor_id_fkey" FOREIGN KEY ("editor_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_reporter_id_fkey" FOREIGN KEY ("reporter_id") REFERENCES "employees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
