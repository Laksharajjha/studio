export interface User {
  email: string;
  avatar: string;
}

export interface ApiKey {
  id: string;
  name: string;
  email: string;
  sends: number;
  validations: number;
  limit: number;
  active: boolean;
  created: string;
}

export interface UsageStats {
    totalSends: number;
    activeKeys: number;
    totalValidations: number;
}

export interface RecentActivity {
  id: string;
  event: string;
  status: "Success" | "Failed";
  timestamp: string;
}
