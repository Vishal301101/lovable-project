import { Phone, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { StatusBadge } from './StatusBadge';
import type { Technician } from '@/types';

interface TechnicianPanelProps {
  technicians: Technician[];
}

export function TechnicianPanel({ technicians }: TechnicianPanelProps) {
  return (
    <Card className="border-border shadow-sm h-fit">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Technicians</CardTitle>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {technicians.map((tech) => (
          <div
            key={tech.id}
            className="p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-medium text-primary-foreground">{tech.avatar}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium text-foreground truncate">{tech.name}</p>
                  <StatusBadge status={tech.status} />
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Phone className="h-3 w-3" />
                    {tech.phone}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last sync: {tech.lastSync}
                  </p>
                  {tech.currentJobId && (
                    <p className="text-xs font-medium text-accent">
                      Current: {tech.currentJobId}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
