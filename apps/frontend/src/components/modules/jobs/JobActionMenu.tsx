import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  IconChecks,
  IconClipboardCheck,
  IconDots,
  IconEye,
  IconMicrophone2,
  IconUserSearch,
} from '@tabler/icons-react';
import type { Job } from '@/types';

type JobActionMenuProps = {
  job: Job;
  onAssignReporter: () => void;
  onAssignEditor: () => void;
  onMarkAsTranscribed: () => void;
  onMarkAsReviewed: () => void;
  onMarkAsCompleted: () => void;
};

const JobActionMenu = ({
  job,
  onAssignReporter,
  onAssignEditor,
  onMarkAsTranscribed,
  onMarkAsReviewed,
  onMarkAsCompleted,
}: JobActionMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <IconDots size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        <DropdownMenuItem className="cursor-pointer">
          <IconEye size={16} />
          View Details
        </DropdownMenuItem>
        {job.status === 'NEW' && (
          <DropdownMenuItem className="cursor-pointer" onClick={onAssignReporter}>
            <IconMicrophone2 size={16} />
            Assign Reporter
          </DropdownMenuItem>
        )}
        {job.status === 'TRANSCRIBED' && (
          <>
            <DropdownMenuItem className="cursor-pointer" onClick={onAssignEditor}>
              <IconUserSearch size={16} />
              Assign Editor
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer"
              disabled={!job.editor}
              onClick={onMarkAsReviewed}
            >
              <IconClipboardCheck size={16} />
              Mark as Reviewed
            </DropdownMenuItem>
          </>
        )}
        {job.status === 'ASSIGNED' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={onMarkAsTranscribed}>
              <IconClipboardCheck size={16} />
              Mark as Transcribed
            </DropdownMenuItem>
          </>
        )}
        {job.status === 'REVIEWED' && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer" onClick={onMarkAsCompleted}>
              <IconChecks size={16} />
              Mark as Completed
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default JobActionMenu;
