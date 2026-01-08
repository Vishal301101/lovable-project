import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, AreaChart, Area } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Job } from '@/types';

interface DashboardChartsProps {
  jobs: Job[];
}

export function DashboardCharts({ jobs }: DashboardChartsProps) {
  // Job Status Distribution for Donut Chart
  const statusCounts = {
    pending: jobs.filter(j => j.status === 'pending').length,
    enroute: jobs.filter(j => j.status === 'enroute').length,
    onsite: jobs.filter(j => j.status === 'onsite').length,
    completed: jobs.filter(j => j.status === 'completed').length,
  };

  const donutData = [
    { name: 'Pending', value: statusCounts.pending, color: 'hsl(215, 14%, 55%)' },
    { name: 'En Route', value: statusCounts.enroute, color: 'hsl(217, 91%, 60%)' },
    { name: 'On Site', value: statusCounts.onsite, color: 'hsl(25, 95%, 53%)' },
    { name: 'Completed', value: statusCounts.completed, color: 'hsl(142, 71%, 45%)' },
  ].filter(item => item.value > 0);

  // Hourly job trend data (simulated for today)
  const hourlyData = [
    { hour: '6 AM', jobs: 1, completed: 0 },
    { hour: '7 AM', jobs: 2, completed: 1 },
    { hour: '8 AM', jobs: 4, completed: 2 },
    { hour: '9 AM', jobs: 6, completed: 3 },
    { hour: '10 AM', jobs: 8, completed: 4 },
    { hour: '11 AM', jobs: 10, completed: 5 },
    { hour: '12 PM', jobs: 12, completed: 6 },
    { hour: '1 PM', jobs: 14, completed: 8 },
    { hour: '2 PM', jobs: 15, completed: 10 },
    { hour: '3 PM', jobs: 16, completed: 12 },
  ];

  // Weekly job volume
  const weeklyData = [
    { day: 'Mon', jobs: 18, avgResponse: 38 },
    { day: 'Tue', jobs: 22, avgResponse: 42 },
    { day: 'Wed', jobs: 15, avgResponse: 35 },
    { day: 'Thu', jobs: 25, avgResponse: 48 },
    { day: 'Fri', jobs: 20, avgResponse: 40 },
    { day: 'Sat', jobs: 8, avgResponse: 32 },
    { day: 'Sun', jobs: 4, avgResponse: 28 },
  ];

  const totalJobs = jobs.length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Job Status Donut Chart */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Job Status Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={donutData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {donutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                  formatter={(value: number | undefined) => [`${value || 0} jobs`, '']}
                />
              </PieChart>
            </ResponsiveContainer>
            {/* Center text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-2xl font-bold text-foreground">{totalJobs}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
            </div>
          </div>
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-2">
            {donutData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-sm">
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-muted-foreground truncate">{item.name}</span>
                <span className="font-medium text-foreground ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Job Trend */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Today's Job Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="jobsGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(142, 71%, 45%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="hour"
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="jobs"
                  stroke="hsl(217, 91%, 60%)"
                  strokeWidth={2}
                  fill="url(#jobsGradient)"
                  name="Total Jobs"
                />
                <Area
                  type="monotone"
                  dataKey="completed"
                  stroke="hsl(142, 71%, 45%)"
                  strokeWidth={2}
                  fill="url(#completedGradient)"
                  name="Completed"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-0.5 bg-kpi-blue rounded" />
              <span className="text-muted-foreground">Total Jobs</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-0.5 bg-status-completed rounded" />
              <span className="text-muted-foreground">Completed</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Performance */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-semibold">Weekly Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  yAxisId="left"
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    fontSize: '12px',
                  }}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="jobs"
                  stroke="hsl(25, 95%, 53%)"
                  strokeWidth={2}
                  dot={{ fill: 'hsl(25, 95%, 53%)', strokeWidth: 0, r: 3 }}
                  name="Jobs"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="avgResponse"
                  stroke="hsl(217, 91%, 60%)"
                  strokeWidth={2}
                  strokeDasharray="4 4"
                  dot={{ fill: 'hsl(217, 91%, 60%)', strokeWidth: 0, r: 3 }}
                  name="Avg Response (min)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-2">
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-0.5 bg-accent rounded" />
              <span className="text-muted-foreground">Jobs</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-0.5 bg-kpi-blue rounded border-dashed" style={{ borderTop: '2px dashed hsl(217, 91%, 60%)' }} />
              <span className="text-muted-foreground">Avg Response</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
