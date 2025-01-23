'use client'
import React from 'react'
import { useState } from 'react'

// Icon Component
function Icon({ children, className = '' }) {
  return (
    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${className}`}>
      {children}
    </span>
  )
}

// Stat Card Component
function StatCard({ icon, title, value, change, changeText, color }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <div className="flex items-center justify-between">
        <div className={`${color} text-white rounded-lg p-2`}>
          {icon}
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold">{value}</h3>
        </div>
      </div>
      <div className="mt-4 border-t pt-4">
        <span className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? '+' : ''}{change}%
        </span>
        <span className="text-sm text-gray-500 ml-1">{changeText}</span>
      </div>
    </div>
  )
}

// Chart Component
function Chart({ title, subtitle, color, data }) {
  // In a real app, you'd use a charting library like Chart.js or Recharts
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-gray-500">{subtitle}</p>
      <div className={`h-48 mt-4 ${color}`}>
        {/* Placeholder for chart */}
        <div className="w-full h-full rounded-lg opacity-50" />
      </div>
    </div>
  )
}

// Project Row Component
function ProjectRow({ company, members, budget, completion }) {
  return (
    <div className="grid grid-cols-4 gap-4 py-4 border-b items-center">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded-lg" />
        <span className="font-medium">{company}</span>
      </div>
      <div className="flex -space-x-2">
        {members.map((member, i) => (
          <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
        ))}
      </div>
      <div className="text-gray-500">${budget.toLocaleString()}</div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full"
          style={{ width: `${completion}%` }}
        />
      </div>
    </div>
  )
}

// Order Item Component
function OrderItem({ icon, title, time, color }) {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center`}>
        {icon}
      </div>
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-500">{time}</p>
      </div>
    </div>
  )
}

// Sidebar Item Component
function SidebarItem({ icon, label, active }) {
  return (
    <button
      className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors
        ${active ? 'bg-blue-500 text-white' : 'text-gray-500 hover:bg-gray-100'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  )
}

// Main Dashboard Component
export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const stats = [
    {
      icon: '📊',
      title: 'Bookings',
      value: '281',
      change: 55,
      changeText: 'than last week',
      color: 'bg-blue-500'
    },
    {
      icon: '👥',
      title: "Today's Users",
      value: '2,300',
      change: 3,
      changeText: 'than last month',
      color: 'bg-green-500'
    },
    {
      icon: '💰',
      title: 'Revenue',
      value: '34k',
      change: 1,
      changeText: 'than yesterday',
      color: 'bg-red-500'
    },
    {
      icon: '🔔',
      title: 'Followers',
      value: '+91',
      change: 0,
      changeText: 'Just updated',
      color: 'bg-purple-500'
    }
  ]

  const projects = [
    {
      company: 'Material UI XD Version',
      members: [1, 2, 3, 4],
      budget: 14000,
      completion: 60
    },
    {
      company: 'Add Progress Track',
      members: [1, 2],
      budget: 3000,
      completion: 10
    },
    {
      company: 'Fix Platform Errors',
      members: [1, 2],
      budget: 0,
      completion: 100
    },
    {
      company: 'Launch our Mobile App',
      members: [1, 2, 3, 4],
      budget: 20500,
      completion: 100
    }
  ]

  const orders = [
    {
      icon: '💎',
      title: '$2400, Design changes',
      time: '22 DEC 7:20 PM',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: '🛍️',
      title: 'New order #1832412',
      time: '21 DEC 11 PM',
      color: 'bg-red-100 text-red-600'
    },
    {
      icon: '🖥️',
      title: 'Server payments for April',
      time: '21 DEC 9:34 PM',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: '💳',
      title: 'New card added for order #4395133',
      time: '20 DEC 2:20 AM',
      color: 'bg-orange-100 text-orange-600'
    }
  ]

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-white shadow-lg w-64 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}
      >
        <div className="p-4">
          <h1 className="text-xl font-bold mb-8">Material Dashboard 2</h1>
          <nav className="space-y-1">
            <SidebarItem icon="📊" label="Dashboard" active />
            <SidebarItem icon="📋" label="Tables" />
            <SidebarItem icon="💰" label="Billing" />
            <SidebarItem icon="🌐" label="RTL" />
            <SidebarItem icon="🔔" label="Notifications" />
            <SidebarItem icon="👤" label="Profile" />
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between p-4">
            <button
              className="lg:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
            <div className="flex items-center gap-4">
              <input
                type="search"
                placeholder="Search here"
                className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button>👤</button>
              <button>⚙️</button>
              <button>🔔</button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
            <Chart
              title="Website Views"
              subtitle="Last Campaign Performance"
              color="bg-blue-100"
              data={[]}
            />
            <Chart
              title="Daily Sales"
              subtitle="(+15%) increase in today sales"
              color="bg-green-100"
              data={[]}
            />
            <Chart
              title="Completed Tasks"
              subtitle="Last Campaign Performance"
              color="bg-gray-100"
              data={[]}
            />
          </div>

          {/* Projects and Orders Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Projects */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-medium">Projects</h2>
                  <p className="text-sm text-gray-500">
                    <span className="text-green-500">30 done</span> this month
                  </p>
                </div>
                <button>⋮</button>
              </div>
              <div className="overflow-x-auto">
                {projects.map((project, index) => (
                  <ProjectRow key={index} {...project} />
                ))}
              </div>
            </div>

            {/* Orders Overview */}
            <div className="bg-white rounded-xl shadow-sm p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium">Orders overview</h2>
                <button>⋮</button>
              </div>
              <p className="text-sm text-green-500 mb-4">
                <span className="font-medium">24%</span> this month
              </p>
              <div className="space-y-2">
                {orders.map((order, index) => (
                  <OrderItem key={index} {...order} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

