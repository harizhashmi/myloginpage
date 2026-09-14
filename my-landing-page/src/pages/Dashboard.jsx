import Header from '../components/Header'

const stats = [
  { label: 'Total Users', value: '1,248', change: '↑ 8.2% this month' },
  { label: 'Revenue', value: '$24,580', change: '↑ 12.5% this month' },
  { label: 'Orders', value: '342', change: '↑ 5.4% this month' },
]
function StatCard({ label, value, change }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <p className="text-slate-400">
        {label}
      </p>

      <h3 className="text-4xl font-bold mt-3">
        {value}
      </h3>

      <p className="text-green-400 text-sm mt-2">
        {change}
      </p>
    </div>
  )
}
const activities = [
  {
    title: 'New user registered',
    detail: 'john@example.com',
  },
  {
    title: 'New order received',
    detail: 'Order #1234',
  },
  {
    title: 'Payment received',
    detail: '$250.00',
  },
]

function ActivityRow({ title, detail }) {
  return (
    <div className="border-b border-slate-800 pb-5">
      <p className="font-medium">
        {title}
      </p>

      <p className="text-sm text-slate-500">
        {detail}
      </p>
    </div>
  )
}

function 
Dashboard({ user,onProfile, onLogout }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
     <Header
  title="MyApp"
  user={user}
  onProfile={onProfile}
  onLogout={onLogout}
/>

      {/* Main */}
      <main className="p-8">

        <div className="mb-8">

          <h2 className="text-3xl font-bold">
            Welcome back, {user.name} !!!
          </h2>

          <p className="text-slate-400 mt-2">
            Here's what's happening with your application.
          </p>

        </div>

        {/* Statistics */}
       {/* Statistics */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {stats.map((stat) => (
    <StatCard key={stat.label} {...stat} />
  ))}
</div>

        {/* Recent Activity */}
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-5">

        {activities.map((activity) => (
  <ActivityRow
    key={activity.title}
    {...activity}
  />
))}

            </div>

          </div>

      </main>

    </div>
  )
}

export default Dashboard
