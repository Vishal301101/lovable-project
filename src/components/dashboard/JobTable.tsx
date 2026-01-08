import { Eye, UserPlus, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatusBadge } from './StatusBadge';
import type { Job } from '@/types';
import { Badge } from '@/components/ui/badge';

interface JobTableProps {
  jobs: Job[];
  onViewJob: (job: Job) => void;
  onAssignJob: (job: Job) => void;
}

export function JobTable({ jobs, onViewJob, onAssignJob }: JobTableProps) {
  const priorityColors = {
    low: 'bg-secondary text-secondary-foreground',
    medium: 'bg-kpi-orange/15 text-kpi-orange',
    high: 'bg-destructive/15 text-destructive',
  };

  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Live Jobs</CardTitle>
          <Badge variant="outline" className="text-xs">
            {jobs.length} jobs
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="font-semibold text-foreground">Job ID</TableHead>
                <TableHead className="font-semibold text-foreground">Customer</TableHead>
                <TableHead className="font-semibold text-foreground">Location</TableHead>
                <TableHead className="font-semibold text-foreground">Status</TableHead>
                <TableHead className="font-semibold text-foreground">Technician</TableHead>
                <TableHead className="font-semibold text-foreground">ETA</TableHead>
                <TableHead className="font-semibold text-foreground">Priority</TableHead>
                <TableHead className="font-semibold text-foreground text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job) => (
                <TableRow
                  key={job.id}
                  className="cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => onViewJob(job)}
                >
                  <TableCell className="font-mono text-sm font-medium text-foreground">
                    {job.id}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-foreground">{job.customerName}</p>
                      <p className="text-xs text-muted-foreground">{job.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
                      <span className="truncate max-w-[200px]">{job.siteLocation}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={job.status} />
                  </TableCell>
                  <TableCell>
                    {job.assignedTechnician ? (
                      <span className="text-sm text-foreground">{job.assignedTechnician}</span>
                    ) : (
                      <span className="text-sm text-muted-foreground italic">Unassigned</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {job.eta}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={priorityColors[job.priority]} variant="secondary">
                      {job.priority.charAt(0).toUpperCase() + job.priority.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewJob(job)}
                        className="h-8 px-2"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onAssignJob(job)}
                        className="h-8 px-2"
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
