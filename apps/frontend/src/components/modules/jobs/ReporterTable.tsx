import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Employee } from '@/types';

const ReporterTable = ({
  reporters,
  onSelect,
}: {
  reporters: Employee[];
  onSelect: (reporter: Employee) => void;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Reporter Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {reporters.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-muted-foreground">
              No reporters available.
            </TableCell>
          </TableRow>
        ) : (
          reporters.map((reporter) => (
            <TableRow key={reporter.id}>
              <TableCell>{reporter.name}</TableCell>
              <TableCell>
                {[reporter.city, reporter.country].filter(Boolean).join(', ') || 'N/A'}
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => onSelect(reporter)}>
                  Select
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default ReporterTable;
