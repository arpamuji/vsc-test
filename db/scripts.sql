CREATE TYPE "job_type" AS ENUM ('PHYSICAL', 'REMOTE');

CREATE TYPE "job_status" AS ENUM (
	'NEW',
	'ASSIGNED',
	'TRANSCRIBED',
	'REVIEWED',
	'COMPLETED'
);

CREATE TYPE "employee_role" AS ENUM ('REPORTER', 'EDITOR');

CREATE TABLE
	IF NOT EXISTS "jobs" (
		"id" UUID NOT NULL,
		"case_name" VARCHAR(500) NOT NULL,
		"type" JOB_TYPE NOT NULL,
		"duration" INTEGER NOT NULL,
		"status" JOB_STATUS NOT NULL,
		"city" VARCHAR(100),
		"country" VARCHAR(100),
		"reporter_id" UUID,
		"reporter_fee" INTEGER,
		"editor_id" UUID,
		"editor_fee" INTEGER,
		"created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
		"updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY ("id")
	);

CREATE INDEX "idx_jobs_editor_id" ON "jobs" ("editor_id");

CREATE INDEX "idx_jobs_reporter_id" ON "jobs" ("reporter_id");

CREATE INDEX "idx_jobs_status" ON "jobs" ("status");

CREATE TABLE
	IF NOT EXISTS "employees" (
		"id" UUID NOT NULL,
		"name" VARCHAR(100) NOT NULL,
		"role" EMPLOYEE_ROLE NOT NULL,
		"city" VARCHAR(100) NOT NULL,
		"country" VARCHAR(100) NOT NULL,
		"availability" BOOLEAN NOT NULL,
		"created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
		"updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
		PRIMARY KEY ("id")
	);

CREATE INDEX "idx_employee_assignment" ON "employees" ("role", "availability", "city");

ALTER TABLE "jobs" ADD FOREIGN KEY ("reporter_id") REFERENCES "employees" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "jobs" ADD FOREIGN KEY ("editor_id") REFERENCES "employees" ("id") ON UPDATE NO ACTION ON DELETE NO ACTION;