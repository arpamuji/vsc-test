import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createJobFormSchema } from '@/schemas/job.schema';
import { jobService } from '@/services/jobService';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconLoader2 } from '@tabler/icons-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { CreateJobFormValues } from '@/schemas/job.schema';

interface CreateJobDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated: () => void;
}

const CreateJobDialog = ({ open, onOpenChange, onCreated }: CreateJobDialogProps) => {
  const [submitting, setSubmitting] = useState(false);
  const [typeValue, setTypeValue] = useState('');

  const form = useForm<CreateJobFormValues>({
    resolver: zodResolver(createJobFormSchema),
    defaultValues: {
      caseName: '',
      type: '',
      duration: '',
      city: '',
      country: '',
    },
  });

  const handleTypeChange = (val: string) => {
    setTypeValue(val);
    form.setValue('type', val, { shouldValidate: true });
  };

  const handleSubmit = async (data: CreateJobFormValues) => {
    const result = createJobFormSchema.safeParse(data);
    if (!result.success) return;

    setSubmitting(true);
    try {
      await jobService.create({
        caseName: result.data.caseName.trim(),
        type: result.data.type,
        duration: parseInt(result.data.duration, 10),
        city: result.data.city.trim(),
        country: result.data.country.trim(),
      });
      form.reset();
      setTypeValue('');
      onOpenChange(false);
      onCreated();
    } catch (error) {
      console.error('Failed to create job:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-fit">
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <DialogHeader>
            <DialogTitle>Create Job</DialogTitle>
            <DialogDescription>Fill in the details to create a new job.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="caseName">Case Name</Label>
              <Input
                id="caseName"
                {...form.register('caseName')}
                placeholder="e.g. Downtown Surveillance"
                aria-invalid={!!form.formState.errors.caseName}
              />
              {form.formState.errors.caseName && (
                <p className="text-sm text-destructive">{form.formState.errors.caseName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select value={typeValue} onValueChange={handleTypeChange}>
                <SelectTrigger id="type" aria-invalid={!!form.formState.errors.type}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PHYSICAL">Physical</SelectItem>
                  <SelectItem value="REMOTE">Remote</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.type && (
                <p className="text-sm text-destructive">{form.formState.errors.type.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                min="1"
                step="1"
                {...form.register('duration')}
                placeholder="e.g. 8"
                aria-invalid={!!form.formState.errors.duration}
              />
              {form.formState.errors.duration && (
                <p className="text-sm text-destructive">{form.formState.errors.duration.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                {...form.register('city')}
                placeholder="e.g. Jakarta"
                aria-invalid={!!form.formState.errors.city}
              />
              {form.formState.errors.city && (
                <p className="text-sm text-destructive">{form.formState.errors.city.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                {...form.register('country')}
                placeholder="e.g. Indonesia"
                aria-invalid={!!form.formState.errors.country}
              />
              {form.formState.errors.country && (
                <p className="text-sm text-destructive">{form.formState.errors.country.message}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting && <IconLoader2 className="animate-spin" />}
              {submitting ? 'Creating...' : 'Create Job'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJobDialog;
