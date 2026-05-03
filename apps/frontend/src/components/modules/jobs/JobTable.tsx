import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { jobStatusColors } from '@/config/constants';
import { formatDuration, formatRupiah, titleCase } from '@/lib/utils';
import { IconClock, IconMapPin } from '@tabler/icons-react';
import JobActionMenu from './JobActionMenu';
import type { Job } from '@/types';

type JobTableProps = {
  jobs: Job[];
  onAssignReporter: (job: Job) => void;
  onAssignEditor: (job: Job) => void;
  onMarkAsTranscribed: (job: Job) => void;
  onMarkAsReviewed: (job: Job) => void;
  onMarkAsCompleted: (job: Job) => void;
};

const JobTable = ({
  jobs,
  onAssignReporter,
  onAssignEditor,
  onMarkAsTranscribed,
  onMarkAsReviewed,
  onMarkAsCompleted,
}: JobTableProps) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-muted-foreground">Case Name</TableHead>
            <TableHead className="text-muted-foreground">
              <span className="inline-flex items-center gap-x-1">
                <IconClock size={16} />
                <span>Duration</span>
              </span>
            </TableHead>
            <TableHead className="text-muted-foreground">
              <span className="inline-flex items-center gap-x-1">
                <IconMapPin size={16} />
                <span>Location</span>
              </span>
            </TableHead>
            <TableHead className="text-muted-foreground">Status</TableHead>
            <TableHead className="text-muted-foreground">Reporter</TableHead>
            <TableHead className="text-muted-foreground">Editor</TableHead>
            <TableHead className="text-muted-foreground">Total Payout</TableHead>
            <TableHead className="text-muted-foreground text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="cursor-pointer">
          {jobs.map((job) => (
            <TableRow key={job.id}>
              <TableCell>
                <span>{job.caseName}</span>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center gap-x-1">
                  <IconClock size={16} />
                  <span>{formatDuration(job.duration)}</span>
                </span>
              </TableCell>
              <TableCell>
                <div className="inline-flex items-center gap-x-1">
                  <IconMapPin size={16} />
                  <div className="inline-flex flex-col">
                    <span>{`${job.city}, ${job.country}`}</span>
                    <span className="text-xs text-muted-foreground">{titleCase(job.type)}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={`inline-flex items-center gap-1 ${jobStatusColors[job.status]}`}>
                  <span>●</span>
                  <span>{job.status}</span>
                </Badge>
              </TableCell>
              <TableCell>{job.reporter?.name ?? '-'}</TableCell>
              <TableCell>{job.editor?.name ?? '-'}</TableCell>
              <TableCell>
                {job.totalPayout && job.reporterFee && job.editorFee ? (
                  <div className="inline-flex flex-col">
                    <span>{formatRupiah(job.totalPayout)}</span>
                    <span className="text-xs text-muted-foreground">{`${formatRupiah(job.reporterFee)} + ${formatRupiah(job.editorFee)}`}</span>
                  </div>
                ) : (
                  <span>-</span>
                )}
              </TableCell>
              <TableCell className="text-center">
                <JobActionMenu
                  job={job}
                  onAssignReporter={() => onAssignReporter(job)}
                  onAssignEditor={() => onAssignEditor(job)}
                  onMarkAsTranscribed={() => onMarkAsTranscribed(job)}
                  onMarkAsReviewed={() => onMarkAsReviewed(job)}
                  onMarkAsCompleted={() => onMarkAsCompleted(job)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default JobTable;
