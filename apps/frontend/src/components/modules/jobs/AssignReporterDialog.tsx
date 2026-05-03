import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { employeeService } from '@/services/employeeService';
import { IconLoader2 } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import ReporterTable from './ReporterTable';
import type { Employee, Job } from '@/types';

interface AssignReporterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job;
  onSelectReporter: (reporter: Employee) => void;
}

const AssignReporterDialog = ({
  open,
  onOpenChange,
  job,
  onSelectReporter,
}: AssignReporterDialogProps) => {
  const [reporters, setReporters] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    const fetchReporters = async () => {
      setLoading(true);
      try {
        const params: Record<string, string> = { role: 'reporter', availability: 'true' };
        if (job.type === 'PHYSICAL' && job.city && job.country) {
          params.city = job.city;
          params.country = job.country;
        }
        const data = await employeeService.getAll(params);
        if (!cancelled) setReporters(data);
      } catch (error) {
        console.error('Failed to fetch reporters:', error);
        if (!cancelled) setReporters([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchReporters();

    return () => {
      cancelled = true;
    };
  }, [open, job]);

  if (!['NEW', 'ASSIGNED'].includes(job.status)) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-fit">
        <DialogHeader>
          <DialogTitle>Assign Reporter</DialogTitle>
          <DialogDescription>Select a reporter to assign to this job.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center">
          {loading ? (
            <div className="flex items-center justify-center h-64 gap-x-2">
              <IconLoader2 size={32} className="animate-spin text-muted-foreground" />
              <span className="text-muted-foreground">Loading reporters...</span>
            </div>
          ) : (
            <ReporterTable reporters={reporters} onSelect={onSelectReporter} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignReporterDialog;
