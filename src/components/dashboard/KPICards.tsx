import { Briefcase, Clock, Truck, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import type { KPIData } from '@/types';

interface KPICardsProps {
  data: KPIData;
}

export function KPICards({ data }: KPICardsProps) {
  const kpis = [
    {
      label: 'Total Jobs Today',
      value: data.totalJobsToday,
      icon: Briefcase,
      color: 'text-kpi-blue',
      bgColor: 'bg-kpi-blue/10',
    },
    {
      label: 'Active Jobs',
      value: data.activeJobs,
      icon: Truck,
      color: 'text-kpi-orange',
      bgColor: 'bg-kpi-orange/10',
    },
    {
      label: 'Avg Response Time',
      value: data.avgResponseTime,
      icon: Clock,
      color: 'text-kpi-green',
      bgColor: 'bg-kpi-green/10',
    },
    {
      label: 'Technicians Available',
      value: data.techniciansAvailable,
      icon: Users,
      color: 'text-kpi-slate',
      bgColor: 'bg-kpi-slate/10',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <Card key={kpi.label} className="border-border shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{kpi.label}</p>
                <p className="text-3xl font-bold text-foreground">{kpi.value}</p>
              </div>
              <div className={`p-3 rounded-xl ${kpi.bgColor}`}>
                <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
