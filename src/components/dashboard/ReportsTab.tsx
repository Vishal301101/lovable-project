import { useState } from 'react';
import { Calendar, Download, Filter, FileSpreadsheet, FileText, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { StatusBadge } from './StatusBadge';
import type { Job, Technician } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ReportsTabProps {
  jobs: Job[];
  technicians: Technician[];
}

export function ReportsTab({ jobs, technicians }: ReportsTabProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [technicianFilter, setTechnicianFilter] = useState<string>('all');

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    const matchesTechnician =
      technicianFilter === 'all' || job.technicianId === technicianFilter;
    return matchesSearch && matchesStatus && matchesTechnician;
  });

  // Calculate technician productivity
  const technicianStats = technicians.map((tech) => {
    const techJobs = jobs.filter((job) => job.technicianId === tech.id);
    const completedJobs = techJobs.filter((job) => job.status === 'completed');
    return {
      ...tech,
      totalJobs: techJobs.length,
      completedJobs: completedJobs.length,
    };
  });

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Filter className="h-5 w-5 text-muted-foreground" />
              Job History Filters
            </CardTitle>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="gap-2">
                  <FileSpreadsheet className="h-4 w-4" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2">
                  <FileText className="h-4 w-4" />
                  Export as PDF
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="enroute">En Route</SelectItem>
                <SelectItem value="onsite">On Site</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={technicianFilter} onValueChange={setTechnicianFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by technician" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Technicians</SelectItem>
                {technicians.map((tech) => (
                  <SelectItem key={tech.id} value={tech.id}>
                    {tech.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Date Range
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Job History Table */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">
            Job History ({filteredJobs.length} jobs)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  <TableHead className="font-semibold text-foreground">Job ID</TableHead>
                  <TableHead className="font-semibold text-foreground">Customer</TableHead>
                  <TableHead className="font-semibold text-foreground">Location</TableHead>
                  <TableHead className="font-semibold text-foreground">Technician</TableHead>
                  <TableHead className="font-semibold text-foreground">Status</TableHead>
                  <TableHead className="font-semibold text-foreground">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id} className="hover:bg-muted/30 transition-colors">
                    <TableCell className="font-mono text-sm font-medium">{job.id}</TableCell>
                    <TableCell className="font-medium">{job.customerName}</TableCell>
                    <TableCell className="text-sm text-muted-foreground truncate max-w-[200px]">
                      {job.siteLocation}
                    </TableCell>
                    <TableCell>
                      {job.assignedTechnician || (
                        <span className="text-muted-foreground italic">Unassigned</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={job.status} />
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Technician Productivity */}
      <Card className="border-border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold">Technician Productivity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {technicianStats.map((tech) => (
              <div
                key={tech.id}
                className="p-4 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-sm font-medium text-primary-foreground">
                      {tech.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{tech.name}</p>
                    <StatusBadge status={tech.status} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                  <div className="p-2 bg-background rounded-lg">
                    <p className="text-2xl font-bold text-foreground">{tech.totalJobs}</p>
                    <p className="text-xs text-muted-foreground">Total Jobs</p>
                  </div>
                  <div className="p-2 bg-background rounded-lg">
                    <p className="text-2xl font-bold text-status-completed">{tech.completedJobs}</p>
                    <p className="text-xs text-muted-foreground">Completed</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
