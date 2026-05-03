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

const EditorTable = ({
  editors,
  onSelect,
}: {
  editors: Employee[];
  onSelect: (editor: Employee) => void;
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Editor Name</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {editors.length === 0 ? (
          <TableRow>
            <TableCell colSpan={3} className="text-center text-muted-foreground">
              No editors available.
            </TableCell>
          </TableRow>
        ) : (
          editors.map((editor) => (
            <TableRow key={editor.id}>
              <TableCell>{editor.name}</TableCell>
              <TableCell>
                {[editor.city, editor.country].filter(Boolean).join(', ') || 'N/A'}
              </TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => onSelect(editor)}>
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

export default EditorTable;
