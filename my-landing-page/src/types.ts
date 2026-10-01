export type User = {
  id: number;
  name: string;
  email: string;
};

export interface RecentUser {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface DashboardStats {
  totalUsers: number;
  newThisMonth: number;
  recentUsers: RecentUser[];
}
