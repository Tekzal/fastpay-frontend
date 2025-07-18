import React from 'react';
import { Users, CreditCard, GraduationCap, UserCheck, ArrowUpRight } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from 'recharts';
import StatCard from '../components/StatCard';
import ChartCard from '../components/ChartCard';
import { DASHBOARD_DATA } from '../data/mockData';

const DashboardContent = () => {
  const { stats, earningsByTerm, earningsByYear, earningsByMonth, userDistribution } = DASHBOARD_DATA;

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-600">Monitor your platform's performance and growth</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            Export Data
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Freemium Users"
          value={stats.freemiumUsers}
          icon={Users}
          change={8.2}
        />
        <StatCard
          title="Paid Users"
          value={stats.paidUsers}
          icon={CreditCard}
          change={15.3}
        />
        <StatCard
          title="Enrolled Students"
          value={stats.enrolledStudents}
          icon={GraduationCap}
          change={12.1}
        />
        <StatCard
          title="Effective Students"
          value={stats.effectiveStudents}
          icon={UserCheck}
          change={9.7}
        />
      </div>

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Total Earnings</h3>
              <p className="text-3xl font-bold text-gray-900">
                GHS {stats.totalEarnings.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-green-600">
                <ArrowUpRight size={16} />
                <span className="text-sm font-medium">{stats.yearlyGrowth}%</span>
              </div>
              <p className="text-xs text-gray-500">Year over year</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-blue-700">Monthly Growth</p>
              <p className="text-xl font-bold text-blue-900">{stats.monthlyGrowth}%</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-green-700">Yearly Growth</p>
              <p className="text-xl font-bold text-green-900">{stats.yearlyGrowth}%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Distribution</h3>
          <div style={{ height: 200 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={userDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {userDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value.toLocaleString(), 'Users']} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {userDistribution.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-sm text-gray-600">{item.name}: {item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Earnings by Term">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={earningsByTerm}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="term" />
              <YAxis tickFormatter={(value) => `GHS ${(value / 1000)}k`} />
              <Tooltip formatter={(value) => [`GHS ${value.toLocaleString()}`, 'Earnings']} />
              <Bar dataKey="earnings" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Earnings by Year">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={earningsByYear}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `GHS ${(value / 1000000)}M`} />
              <Tooltip formatter={(value) => [`GHS ${value.toLocaleString()}`, 'Earnings']} />
              <Line 
                type="monotone" 
                dataKey="earnings" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Monthly Earnings Chart */}
      <ChartCard title="Monthly Earnings (Current Year)" height={350}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={earningsByMonth}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={(value) => `GHS ${(value / 1000)}k`} />
            <Tooltip formatter={(value) => [`GHS ${value.toLocaleString()}`, 'Earnings']} />
            <Line 
              type="monotone" 
              dataKey="earnings" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

export default DashboardContent;
