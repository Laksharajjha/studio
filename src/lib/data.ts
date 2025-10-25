import type { User, ApiKey, UsageStats, RecentActivity } from "./types";

export const mockUser: User = {
  email: "dev@zelth.com",
  avatar: "/avatar.png",
};

export const apiKeys: ApiKey[] = [
  {
    id: "key-1",
    name: "Production App",
    email: "dev@zelth.com",
    sends: 892,
    validations: 850,
    limit: 1000,
    active: true,
    created: "2024-05-10T10:00:00Z",
  },
  {
    id: "key-2",
    name: "Staging Server",
    email: "dev@zelth.com",
    sends: 120,
    validations: 115,
    limit: 1000,
    active: true,
    created: "2024-04-22T12:30:00Z",
  },
  {
    id: "key-3",
    name: "Old Marketing Site",
    email: "dev@zelth.com",
    sends: 5000,
    validations: 4800,
    limit: 5000,
    active: false,
    created: "2023-01-15T09:00:00Z",
  },
  {
    id: "key-4",
    name: "Local Dev Environment",
    email: "dev@zelth.com",
    sends: 42,
    validations: 28,
    limit: 1000,
    active: true,
    created: "2024-06-01T15:00:00Z",
  },
  {
    id: "key-5",
    name: "Analytics Service",
    email: "dev@zelth.com",
    sends: 350,
    validations: 345,
    limit: 1000,
    active: true,
    created: "2024-05-28T11:00:00Z",
  },
];

export const getApiKeys = (): Promise<ApiKey[]> => {
    return new Promise(resolve => {
        resolve(apiKeys);
    })
}

export const usageStats: UsageStats = {
  totalSends: 15302,
  activeKeys: 4,
  totalValidations: 14988,
};

export const recentActivities: RecentActivity[] = [
    { id: "act-1", event: "OTP sent to user@example.com", status: "Success", timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString() },
    { id: "act-2", event: "API Key 'Staging Server' created", status: "Success", timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString() },
    { id: "act-3", event: "OTP validation failed for +1...4321", status: "Failed", timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() },
    { id: "act-4", event: "OTP sent to test@zelth.com", status: "Success", timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() },
    { id: "act-5", event: "API Key 'Old Marketing Site' revoked", status: "Success", timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
];
