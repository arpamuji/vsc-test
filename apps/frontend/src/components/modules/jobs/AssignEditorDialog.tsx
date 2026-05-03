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
import EditorTable from './EditorTable';
import type { Employee, Job } from '@/types';

interface AssignEditorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: Job;
  onSelectEditor: (editor: Employee) => void;
}

const AssignEditorDialog = ({
  open,
  onOpenChange,
  job,
  onSelectEditor,
}: AssignEditorDialogProps) => {
  const [editors, setEditors] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    const fetchEditors = async () => {
      setLoading(true);
      try {
        const data = await employeeService.getAll({ role: 'editor', availability: 'true' });
        if (!cancelled) setEditors(data);
      } catch (error) {
        console.error('Failed to fetch editors:', error);
        if (!cancelled) setEditors([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchEditors();

    return () => {
      cancelled = true;
    };
  }, [open]);

  if (job.status !== 'TRANSCRIBED') return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full sm:max-w-fit">
        <DialogHeader>
          <DialogTitle>Assign Editor</DialogTitle>
          <DialogDescription>Select an editor to assign to this job.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center">
          {loading ? (
            <div className="flex items-center justify-center h-64 gap-x-2">
              <IconLoader2 size={32} className="animate-spin text-muted-foreground" />
              <span className="text-muted-foreground">Loading editors...</span>
            </div>
          ) : (
            <EditorTable editors={editors} onSelect={onSelectEditor} />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssignEditorDialog;
