import Header from "../components/Header";
import type { User } from "../types";
import Card from "../components/Card";
import { useDashboardStats } from "../hooks/DashboardStats";

type DashboardProps = {
  user: User;
  onLogout: () => void;
};

type StatCardProps = {
  label: string;
  value: string;
};

type ActivityRowProps = {
  title: string;
  detail: string;
};

function StatCard({ label, value }: StatCardProps) {
  return (
    <Card className="mt-6">
      <p className="text-slate-400">{label}</p>
      <h3 className="text-4xl font-bold mt-3">{value}</h3>
    </Card>
  );
}

function ActivityRow({ title, detail }: ActivityRowProps) {
  return (
    <div className="border-b border-slate-800 pb-5">
      <p className="font-medium">{title}</p>
      <p className="text-sm text-slate-500">{detail}</p>
    </div>
  );
}

function Dashboard({ user, onLogout }: DashboardProps) {
  const { data, isLoading, error } = useDashboardStats();

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <Header title="MyApp" user={user} onLogout={onLogout} />

      {/* Main */}
      <main className="p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold">Welcome back, {user.name} !!!</h2>

          <p className="text-slate-400 mt-2">
            Here's what's happening with your application.
          </p>
        </div>

        {isLoading && <p className="text-slate-400">Loading…</p>}

        {error && <p className="text-red-500">{error}</p>}

        {data && (
          <>
            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <StatCard label="Total Users" value={String(data.totalUsers)} />
              <StatCard
                label="New this month"
                value={String(data.newThisMonth)}
              />
            </div>

            {/* Recent Activity */}
            <Card className="mt-8 ">
              <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>

              <div className="space-y-5">
                {data.recentUsers.length === 0 && (
                  <p className="text-slate-500">No activity yet</p>
                )}

                {data.recentUsers.map((recentUser) => (
                  <ActivityRow
                    key={recentUser.id}
                    title="New user registered"
                    detail={`${recentUser.email} · ${new Date(
                      recentUser.createdAt,
                    ).toLocaleDateString()}`}
                  />
                ))}
              </div>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
