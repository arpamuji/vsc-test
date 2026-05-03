import PageHeader from '@/components/layout/PageHeader';
import AssignEditorDialog from '@/components/modules/jobs/AssignEditorDialog';
import AssignReporterDialog from '@/components/modules/jobs/AssignReporterDialog';
import CreateJobDialog from '@/components/modules/jobs/CreateJobDialog';
import JobTable from '@/components/modules/jobs/JobTable';
import { Button } from '@/components/ui/button';
import { jobService } from '@/services/jobService';
import { IconLoader2, IconPlusFilled } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import type { Employee, Job } from '@/types';

const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [reporterJob, setReporterJob] = useState<Job | null>(null);
  const [editorJob, setEditorJob] = useState<Job | null>(null);
  const [createJobOpen, setCreateJobOpen] = useState(false);

  const handleAssignReporter = (job: Job) => setReporterJob(job);
  const handleAssignEditor = (job: Job) => setEditorJob(job);

  const handleMarkAsTranscribed = (job: Job) => {
    jobService
      .updateStatus(job.id, 'TRANSCRIBED')
      .then(() => jobService.getAll().then((data) => setJobs(data)));
  };

  const handleMarkAsReviewed = (job: Job) => {
    jobService
      .updateStatus(job.id, 'REVIEWED')
      .then(() => jobService.getAll().then((data) => setJobs(data)));
  };

  const handleMarkAsCompleted = (job: Job) => {
    jobService
      .complete(job.id, {
        reporterId: job.reporterId ?? undefined,
        editorId: job.editorId ?? undefined,
        reporterFee: job.reporterFee ?? undefined,
        editorFee: job.editorFee ?? undefined,
      })
      .then(() => jobService.getAll().then((data) => setJobs(data)));
  };

  const handleRefreshJobs = () => {
    jobService.getAll().then((data) => setJobs(data));
  };

  const handleSelectEditor = (editor: Employee) => {
    if (!editorJob) return;
    jobService
      .assignEditor(editorJob.id, editor.id)
      .then(() => jobService.getAll().then((data) => setJobs(data)))
      .finally(() => setEditorJob(null));
  };

  const handleSelectReporter = (reporter: Employee) => {
    if (!reporterJob) return;
    jobService
      .assignReporter(reporterJob.id, reporter.id)
      .then(() => jobService.getAll().then((data) => setJobs(data)))
      .finally(() => setReporterJob(null));
  };

  useEffect(() => {
    jobService
      .getAll()
      .then((data) => setJobs(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <PageHeader title="Jobs" description="Manage your background jobs and scheduled tasks">
        <Button
          variant="default"
          size="lg"
          prefixIcon={<IconPlusFilled />}
          onClick={() => setCreateJobOpen(true)}
        >
          Create Job
        </Button>
      </PageHeader>
      {loading ? (
        <div className="flex items-center justify-center h-64 gap-x-2">
          <IconLoader2 size={32} className="animate-spin text-muted-foreground" />
          <span className="text-muted-foreground">Loading jobs...</span>
        </div>
      ) : (
        <JobTable
          jobs={jobs}
          onAssignReporter={handleAssignReporter}
          onAssignEditor={handleAssignEditor}
          onMarkAsTranscribed={handleMarkAsTranscribed}
          onMarkAsReviewed={handleMarkAsReviewed}
          onMarkAsCompleted={handleMarkAsCompleted}
        />
      )}

      {reporterJob && (
        <AssignReporterDialog
          open={true}
          onOpenChange={(open) => !open && setReporterJob(null)}
          job={reporterJob}
          onSelectReporter={handleSelectReporter}
        />
      )}

      {editorJob && (
        <AssignEditorDialog
          open={true}
          onOpenChange={(open) => !open && setEditorJob(null)}
          job={editorJob}
          onSelectEditor={handleSelectEditor}
        />
      )}

      <CreateJobDialog
        open={createJobOpen}
        onOpenChange={setCreateJobOpen}
        onCreated={handleRefreshJobs}
      />
    </>
  );
};

export default JobsPage;
