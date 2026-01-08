import { cn } from '@/lib/utils';
import type { JobStatus, TechnicianStatus } from '@/types';

interface StatusBadgeProps {
  status: JobStatus | TechnicianStatus;
  className?: string;
}

const statusConfig: Record<JobStatus | TechnicianStatus, { label: string; className: string }> = {
  pending: {
    label: 'Pending',
    className: 'bg-status-pending/15 text-status-pending border-status-pending/30',
  },
  enroute: {
    label: 'En Route',
    className: 'bg-status-enroute/15 text-status-enroute border-status-enroute/30',
  },
  onsite: {
    label: 'On Site',
    className: 'bg-status-onsite/15 text-status-onsite border-status-onsite/30',
  },
  completed: {
    label: 'Completed',
    className: 'bg-status-completed/15 text-status-completed border-status-completed/30',
  },
  available: {
    label: 'Available',
    className: 'bg-status-available/15 text-status-available border-status-available/30',
  },
  offline: {
    label: 'Offline',
    className: 'bg-status-offline/15 text-status-offline border-status-offline/30',
  },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border',
        config.className,
        className
      )}
    >
      <span
        className={cn('w-1.5 h-1.5 rounded-full mr-1.5', {
          'bg-status-pending': status === 'pending',
          'bg-status-enroute': status === 'enroute',
          'bg-status-onsite animate-pulse-soft': status === 'onsite',
          'bg-status-completed': status === 'completed',
          'bg-status-available': status === 'available',
          'bg-status-offline': status === 'offline',
        })}
      />
      {config.label}
    </span>
  );
}
