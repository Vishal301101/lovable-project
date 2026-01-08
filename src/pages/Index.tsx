import { useState } from 'react';
import { Header } from '@/components/dashboard/Header';
import { KPICards } from '@/components/dashboard/KPICards';
import { DashboardCharts } from '@/components/dashboard/DashboardCharts';
import { JobTable } from '@/components/dashboard/JobTable';
import { TechnicianPanel } from '@/components/dashboard/TechnicianPanel';
import { JobDetailDrawer } from '@/components/dashboard/JobDetailDrawer';
import { AssignTechnicianDialog } from '@/components/dashboard/AssignTechnicianDialog';
import { ReportsTab } from '@/components/dashboard/ReportsTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockJobs, mockTechnicians, mockKPIData } from '@/data/mockData';
import type { Job } from '@/types';
import { LayoutDashboard, FileBarChart } from 'lucide-react';

const Index = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [jobToAssign, setJobToAssign] = useState<Job | null>(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  const handleViewJob = (job: Job) => {
    setSelectedJob(job);
    setIsDetailOpen(true);
  };

  const handleAssignClick = (job: Job) => {
    setJobToAssign(job);
    setIsAssignDialogOpen(true);
  };

  const handleAssignTechnician = (jobId: string, technicianId: string) => {
    const technician = mockTechnicians.find((t) => t.id === technicianId);
    if (technician) {
      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.id === jobId
            ? {
                ...job,
                assignedTechnician: technician.name,
                technicianId: technician.id,
                status: 'enroute' as const,
                eta: '45 min',
              }
            : job
        )
      );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="p-6">
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="bg-muted/50 p-1">
            <TabsTrigger value="dashboard" className="gap-2 data-[state=active]:bg-card">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="reports" className="gap-2 data-[state=active]:bg-card">
              <FileBarChart className="h-4 w-4" />
              Reports
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6 mt-0">
            {/* KPI Cards */}
            <KPICards data={mockKPIData} />

            {/* Charts Section */}
            <DashboardCharts jobs={jobs} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
              {/* Job Table - Takes up 3 columns */}
              <div className="xl:col-span-3">
                <JobTable
                  jobs={jobs}
                  onViewJob={handleViewJob}
                  onAssignJob={handleAssignClick}
                />
              </div>

              {/* Technician Panel - Takes up 1 column */}
              <div className="xl:col-span-1">
                <TechnicianPanel technicians={mockTechnicians} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="mt-0">
            <ReportsTab jobs={jobs} technicians={mockTechnicians} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Job Detail Drawer */}
      <JobDetailDrawer
        job={selectedJob}
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />

      {/* Assign Technician Dialog */}
      <AssignTechnicianDialog
        job={jobToAssign}
        technicians={mockTechnicians}
        open={isAssignDialogOpen}
        onClose={() => setIsAssignDialogOpen(false)}
        onAssign={handleAssignTechnician}
      />
    </div>
  );
};

export default Index;
