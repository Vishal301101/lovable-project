import { X, MapPin, Phone, Clock, User, Wrench, FileText, CheckCircle, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { StatusBadge } from './StatusBadge';
import type { Job } from '@/types';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface JobDetailDrawerProps {
  job: Job | null;
  open: boolean;
  onClose: () => void;
}

export function JobDetailDrawer({ job, open, onClose }: JobDetailDrawerProps) {
  if (!job) return null;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getElapsedTime = (startTime: string | null) => {
    if (!startTime) return null;
    const start = new Date(startTime);
    const now = new Date();
    const diff = Math.floor((now.getTime() - start.getTime()) / 60000);
    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;
    return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
  };

  const priorityColors = {
    low: 'bg-secondary text-secondary-foreground',
    medium: 'bg-kpi-orange/15 text-kpi-orange',
    high: 'bg-destructive/15 text-destructive',
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div>
              <SheetTitle className="text-xl font-bold text-foreground">{job.id}</SheetTitle>
              <p className="text-sm text-muted-foreground mt-1">{job.customerName}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="-mr-2">
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-3">
            <StatusBadge status={job.status} />
            <Badge className={priorityColors[job.priority]} variant="secondary">
              {job.priority.charAt(0).toUpperCase() + job.priority.slice(1)} Priority
            </Badge>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Customer & Site Details */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Customer Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span className="text-foreground">{job.siteLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${job.phone}`} className="text-accent hover:underline">
                  {job.phone}
                </a>
              </div>
            </div>
          </section>

          <Separator />

          {/* Job Description */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              Failure Description
            </h3>
            <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
              {job.description}
            </p>
            {job.notes && (
              <p className="text-sm text-muted-foreground mt-2 italic">
                Note: {job.notes}
              </p>
            )}
          </section>

          <Separator />

          {/* Assigned Technician */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              Assigned Technician
            </h3>
            {job.assignedTechnician ? (
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">
                    {job.assignedTechnician.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-foreground">{job.assignedTechnician}</p>
                  <p className="text-xs text-muted-foreground">ETA: {job.eta}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">No technician assigned</p>
            )}
          </section>

          <Separator />

          {/* Time Tracking */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              Time Tracking
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Started</p>
                <p className="font-medium text-foreground">{formatDate(job.timeStarted)}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Elapsed</p>
                <p className="font-medium text-foreground">
                  {getElapsedTime(job.timeStarted) || 'N/A'}
                </p>
              </div>
              {job.timeCompleted && (
                <div className="p-3 bg-status-completed/10 rounded-lg col-span-2">
                  <p className="text-xs text-muted-foreground mb-1">Completed</p>
                  <p className="font-medium text-status-completed">{formatDate(job.timeCompleted)}</p>
                </div>
              )}
            </div>
          </section>

          <Separator />

          {/* Hose Specs & Parts */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Wrench className="h-4 w-4 text-muted-foreground" />
              Hose Specs & Parts
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted/50 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Hose Specifications</p>
                <p className="font-mono text-sm text-foreground">{job.hoseSpecs}</p>
              </div>
              {job.partsUsed.length > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Parts Used</p>
                  <div className="flex flex-wrap gap-2">
                    {job.partsUsed.map((part, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {part}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          <Separator />

          {/* Photos */}
          <section>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Camera className="h-4 w-4 text-muted-foreground" />
              Photos
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                <div className="text-center">
                  <Camera className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Before</p>
                </div>
              </div>
              <div className="aspect-square bg-muted/50 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
                <div className="text-center">
                  <Camera className="h-6 w-6 text-muted-foreground mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">After</p>
                </div>
              </div>
            </div>
          </section>

          {/* Signature */}
          {job.status === 'completed' && (
            <>
              <Separator />
              <section>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-status-completed" />
                  Customer Signature
                </h3>
                <div className="h-24 bg-muted/50 rounded-lg flex items-center justify-center border border-border">
                  <p className="text-sm text-muted-foreground italic">Signature captured</p>
                </div>
              </section>
            </>
          )}
        </div>

        <div className="mt-8 flex gap-3">
          <Button variant="outline" className="flex-1" onClick={onClose}>
            Close
          </Button>
          <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90">
            {job.status === 'pending' ? 'Assign Technician' : 'Update Job'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
