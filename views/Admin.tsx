
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Admin: React.FC<{ navigate: (v: string) => void }> = ({ navigate }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Users', value: '1,284', trend: '+12%', color: 'indigo' },
    { label: 'Decision Locks', value: '842', trend: '+5%', color: 'purple' },
    { label: 'Task Completion', value: '76%', trend: '+2%', color: 'green' },
    { label: 'Support Tickets', value: '14', trend: '-8%', color: 'red' },
  ];

  const userList = [
    { id: '1', name: 'Rahul Sharma', role: 'Student', status: 'Active', locked: 'UX Designer' },
    { id: '2', name: 'Priya Patel', role: 'Founder', status: 'Active', locked: 'SaaS Builder' },
    { id: '3', name: 'Aman Verma', role: 'Working', status: 'Low Mood', locked: 'Fullstack Dev' },
    { id: '4', name: 'Simran Kaur', role: 'Student', status: 'Inactive', locked: 'Digital Marketer' },
  ];

  const taskTemplates = [
    { role: 'Student', count: 8, lastUpdated: '2 days ago' },
    { role: 'Working Pro', count: 12, lastUpdated: '5 days ago' },
    { role: 'Founder', count: 15, lastUpdated: '1 day ago' },
  ];

  const completionData = [
    { name: 'Mon', completed: 400, total: 600 },
    { name: 'Tue', completed: 500, total: 600 },
    { name: 'Wed', completed: 300, total: 600 },
    { name: 'Thu', completed: 550, total: 600 },
    { name: 'Fri', completed: 480, total: 600 },
    { name: 'Sat', completed: 580, total: 600 },
    { name: 'Sun', completed: 200, total: 600 },
  ];

  const roleDistribution = [
    { name: 'Student', value: 450 },
    { name: 'Working', value: 300 },
    { name: 'Founder', value: 150 },
    { name: 'Business', value: 100 },
  ];

  const COLORS = ['#4f46e5', '#818cf8', '#a78bfa', '#c084fc'];

  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-[#0a0a0a] flex flex-col p-6 fixed h-full overflow-y-auto">
        <div className="flex items-center gap-3 font-bold text-xl tracking-tight mb-12">
          <span className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-sm">G</span>
          ADMIN PANEL
        </div>

        <nav className="space-y-2 flex-1">
          {[
            { id: 'overview', label: 'Dashboard', icon: '📊' },
            { id: 'users', label: 'User Management', icon: '👥' },
            { id: 'decisions', label: 'Decision Logs', icon: '🔒' },
            { id: 'tasks', label: 'Task Templates', icon: '📝' },
            { id: 'support', label: 'Support Tickets', icon: '🎫' },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item.id ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-zinc-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="pt-8 border-t border-white/5 mt-auto">
          <button 
            onClick={() => navigate('dashboard')}
            className="w-full text-left px-4 py-3 text-zinc-500 hover:text-white font-bold text-sm transition-all"
          >
            ← Back to App
          </button>
        </div>
      </aside>

      {/* Admin Main Content */}
      <main className="ml-64 flex-1 p-10 bg-[#050505]">
        <div className="max-w-6xl mx-auto">
          <header className="mb-10 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-black capitalize tracking-tight mb-1">{activeTab}</h1>
              <p className="text-zinc-500 font-medium">System Management & Analytics</p>
            </div>
            <div className="flex gap-4">
               <button className="glass px-6 py-2.5 rounded-full text-sm font-bold border-white/10">Export Data</button>
               <button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold">Refresh Logs</button>
            </div>
          </header>

          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map(s => (
                  <div key={s.label} className="glass p-6 rounded-[28px] border-white/5 relative overflow-hidden">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">{s.label}</p>
                    <p className="text-3xl font-black mb-2">{s.value}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.trend.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                      {s.trend} from last month
                    </span>
                  </div>
                ))}
              </div>

              {/* Charts Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 glass p-8 rounded-[32px]">
                  <h3 className="text-xl font-bold mb-8">System Task Completion</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={completionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
                        <XAxis dataKey="name" stroke="#525252" axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip cursor={{fill: '#1a1a1a'}} contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }} />
                        <Bar dataKey="completed" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="total" fill="#1f1f1f" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="glass p-8 rounded-[32px]">
                  <h3 className="text-xl font-bold mb-8">Role Distribution</h3>
                  <div className="h-80 flex flex-col items-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={roleDistribution}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {roleDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 w-full">
                       {roleDistribution.map((r, i) => (
                         <div key={r.name} className="flex items-center gap-2 text-xs font-bold text-zinc-500">
                           <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                           <span>{r.name}</span>
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="glass rounded-[32px] overflow-hidden border-white/5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-8 border-b border-white/5 flex justify-between items-center">
                 <h3 className="text-xl font-bold">Manage Users</h3>
                 <input 
                  type="text" 
                  placeholder="Search user by name..." 
                  className="bg-zinc-900/50 border border-white/10 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-indigo-500 w-64"
                />
              </div>
              <table className="w-full text-left">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-8 py-4 text-xs font-black text-zinc-500 uppercase tracking-widest">Name</th>
                    <th className="px-8 py-4 text-xs font-black text-zinc-500 uppercase tracking-widest">Role</th>
                    <th className="px-8 py-4 text-xs font-black text-zinc-500 uppercase tracking-widest">Status</th>
                    <th className="px-8 py-4 text-xs font-black text-zinc-500 uppercase tracking-widest">Decision Locked</th>
                    <th className="px-8 py-4 text-xs font-black text-zinc-500 uppercase tracking-widest">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {userList.map(u => (
                    <tr key={u.id} className="hover:bg-white/[0.02] transition-all group">
                      <td className="px-8 py-5 font-bold text-sm">{u.name}</td>
                      <td className="px-8 py-5 text-zinc-400 text-sm">{u.role}</td>
                      <td className="px-8 py-5">
                        <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest ${
                          u.status === 'Active' ? 'bg-green-500/10 text-green-500' : 
                          u.status === 'Low Mood' ? 'bg-red-500/10 text-red-500' : 'bg-zinc-800 text-zinc-500'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-indigo-400 text-sm font-bold">{u.locked}</td>
                      <td className="px-8 py-5">
                        <button className="text-zinc-600 hover:text-white font-bold text-xs">Edit User</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="p-8 text-center bg-white/[0.02]">
                <button className="text-indigo-400 font-bold text-sm">View all 1,280 more users</button>
              </div>
            </div>
          )}

          {activeTab === 'tasks' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               {taskTemplates.map(template => (
                 <div key={template.role} className="glass p-8 rounded-[32px] border-white/5 group hover:border-indigo-500/20 transition-all">
                    <div className="flex justify-between items-start mb-6">
                       <h4 className="text-lg font-black">{template.role}</h4>
                       <span className="text-[10px] font-black bg-indigo-500/10 text-indigo-400 px-2 py-1 rounded-md uppercase tracking-widest">Template</span>
                    </div>
                    <p className="text-3xl font-black mb-1">{template.count}</p>
                    <p className="text-zinc-500 text-xs mb-8">Tasks in default sequence</p>
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">Updated {template.lastUpdated}</span>
                       <button className="bg-zinc-900 group-hover:bg-indigo-600 px-4 py-2 rounded-xl text-xs font-bold transition-all">Edit Rules</button>
                    </div>
                 </div>
               ))}
               <button className="border-2 border-dashed border-white/5 p-8 rounded-[32px] flex flex-col items-center justify-center text-zinc-600 hover:text-zinc-400 hover:border-white/10 transition-all">
                  <span className="text-4xl mb-4">+</span>
                  <span className="font-bold">Add New Template</span>
               </button>
            </div>
          )}

          {activeTab === 'decisions' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
               {[
                 { user: 'Rahul S.', decision: 'UI/UX Specialization', reason: 'High visual skills + low risk threshold', time: '2 hours ago' },
                 { user: 'Simran K.', decision: 'Content Strategy', reason: 'Strong writing history + market demand', time: '5 hours ago' },
                 { user: 'Karthik N.', decision: 'E-commerce Brand', reason: 'Family business background + funding', time: 'Yesterday' },
               ].map((log, i) => (
                 <div key={i} className="glass p-6 rounded-2xl flex gap-6 items-center border-white/5">
                    <div className="w-12 h-12 bg-indigo-600/10 rounded-xl flex items-center justify-center text-xl">🔒</div>
                    <div className="flex-1">
                       <div className="flex justify-between items-center mb-1">
                          <h4 className="font-bold">{log.user} locked <span className="text-indigo-400">{log.decision}</span></h4>
                          <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{log.time}</span>
                       </div>
                       <p className="text-xs text-zinc-500 leading-relaxed">Engine Reason: {log.reason}</p>
                    </div>
                    <button className="text-xs font-black text-indigo-500 uppercase tracking-widest">Trace Rule</button>
                 </div>
               ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
