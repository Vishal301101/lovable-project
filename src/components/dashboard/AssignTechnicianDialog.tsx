import { useState } from 'react';
import { Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadge';
import type { Job, Technician } from '@/types';
import { cn } from '@/lib/utils';

interface AssignTechnicianDialogProps {
  job: Job | null;
  technicians: Technician[];
  open: boolean;
  onClose: () => void;
  onAssign: (jobId: string, technicianId: string) => void;
}

export function AssignTechnicianDialog({
  job,
  technicians,
  open,
  onClose,
  onAssign,
}: AssignTechnicianDialogProps) {
  const [selectedTechnicianId, setSelectedTechnicianId] = useState<string | null>(null);

  const availableTechnicians = technicians.filter(
    (tech) => tech.status === 'available' || tech.id === job?.technicianId
  );

  const handleAssign = () => {
    if (job && selectedTechnicianId) {
      onAssign(job.id, selectedTechnicianId);
      setSelectedTechnicianId(null);
      onClose();
    }
  };

  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Technician</DialogTitle>
          <DialogDescription>
            Select a technician for {job.id} - {job.customerName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 my-4 max-h-64 overflow-y-auto">
          {availableTechnicians.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              No technicians available at this time.
            </p>
          ) : (
            availableTechnicians.map((tech) => (
              <button
                key={tech.id}
                onClick={() => setSelectedTechnicianId(tech.id)}
                className={cn(
                  'w-full p-3 rounded-lg border text-left transition-all',
                  selectedTechnicianId === tech.id
                    ? 'border-accent bg-accent/10'
                    : 'border-border hover:border-muted-foreground/50 hover:bg-muted/50'
                )}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-foreground">
                        {tech.avatar}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{tech.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <StatusBadge status={tech.status} />
                        <span className="text-xs text-muted-foreground">
                          Last sync: {tech.lastSync}
                        </span>
                      </div>
                    </div>
                  </div>
                  {selectedTechnicianId === tech.id && (
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                      <Check className="h-4 w-4 text-accent-foreground" />
                    </div>
                  )}
                </div>
              </button>
            ))
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAssign}
            disabled={!selectedTechnicianId}
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            Assign Technician
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
