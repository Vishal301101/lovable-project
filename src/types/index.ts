export type JobStatus = 'pending' | 'enroute' | 'onsite' | 'completed';

export type TechnicianStatus = 'available' | 'enroute' | 'onsite' | 'offline';

export interface Job {
  id: string;
  customerName: string;
  siteLocation: string;
  status: JobStatus;
  assignedTechnician: string | null;
  technicianId: string | null;
  eta: string;
  createdAt: string;
  description: string;
  phone: string;
  priority: 'low' | 'medium' | 'high';
  images: string[];
  hoseSpecs: string;
  partsUsed: string[];
  timeStarted: string | null;
  timeCompleted: string | null;
  customerSignature: string | null;
  notes: string;
}

export interface Technician {
  id: string;
  name: string;
  status: TechnicianStatus;
  lastSync: string;
  currentJobId: string | null;
  phone: string;
  avatar: string;
}

export interface KPIData {
  totalJobsToday: number;
  activeJobs: number;
  avgResponseTime: string;
  techniciansAvailable: number;
}
