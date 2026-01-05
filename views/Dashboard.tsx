
import React, { useState, useEffect, useRef } from 'react';
import { UserState, ChatMessage, Task } from '../types';
import { sendMessageToGuide } from '../services/geminiService';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface DashboardProps {
  user: UserState;
  toggleTask: (id: string) => void;
  updateMood: (score: number) => void;
  navigate: (v: string) => void;
  initialTab?: string;
}

const Dashboard: React.FC<DashboardProps> = ({ user, toggleTask, updateMood, navigate, initialTab = 'dashboard' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  const handleSendChat = async () => {
    if (!chatMessage.trim()) return;
    
    const newUserMsg: ChatMessage = { role: 'user', text: chatMessage, timestamp: new Date() };
    setChatHistory(prev => [...prev, newUserMsg]);
    setChatMessage('');
    setIsTyping(true);

    const response = await sendMessageToGuide(chatMessage, chatHistory, {
      profile: user.profile,
      decision: user.decision
    });

    const aiMsg: ChatMessage = { role: 'model', text: response, timestamp: new Date() };
    setChatHistory(prev => [...prev, aiMsg]);
    setIsTyping(false);
  };

  const isEmotionLock = user.profile.emotionScale !== undefined && user.profile.emotionScale <= 2;

  const progressData = [
    { name: 'Mon', score: 40 },
    { name: 'Tue', score: 65 },
    { name: 'Wed', score: 45 },
    { name: 'Thu', score: 80 },
    { name: 'Fri', score: 85 },
    { name: 'Sat', score: 90 },
    { name: 'Sun', score: 75 },
  ];

  return (
    <div className="pb-20">
      {/* Header section */}
      <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight mb-1">Hi, {user.profile.role === 'founder' ? 'Founder' : 'Champ'} 👋</h1>
            <p className="text-zinc-500 font-medium">Here's your execution plan for today.</p>
          </div>
          <div className="flex gap-2">
            <div className="glass px-4 py-2 rounded-2xl flex items-center gap-2 border-indigo-500/20">
              <span className="text-indigo-400">🔥</span>
              <span className="font-bold text-sm tracking-widest">{user.streak} STREAK</span>
            </div>
          </div>
        </div>
      </div>

      {activeTab === 'dashboard' && (
        <div className="grid md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Main Focused Decision */}
          <div className="md:col-span-2 space-y-8">
            <div className="glass p-8 rounded-[32px] border-indigo-500/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-8 opacity-10">
                 <span className="text-8xl">🎯</span>
               </div>
               <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                🔒 Decision Locked
               </div>
               <h2 className="text-4xl font-black mb-2 tracking-tight">{user.decision?.focus}</h2>
               <p className="text-zinc-400 mb-8 max-w-lg">{user.decision?.path} • {user.decision?.timeline} to Result</p>
               
               <div className="grid grid-cols-2 gap-4">
                 <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
                   <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Status</p>
                   <p className="text-green-500 font-black">ON TRACK</p>
                 </div>
                 <div className="bg-zinc-900/50 p-4 rounded-2xl border border-white/5">
                   <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Next Review</p>
                   <p className="text-white font-black">12 Days</p>
                 </div>
               </div>
            </div>

            <div className="glass p-8 rounded-[32px]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Today's Focus</h3>
                <span className="text-zinc-500 text-sm font-bold">{user.tasks.filter(t => t.completed).length}/{user.tasks.length} Completed</span>
              </div>
              <div className="space-y-3">
                {user.tasks.map(task => (
                  <button 
                    key={task.id}
                    onClick={() => toggleTask(task.id)}
                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border transition-all ${task.completed ? 'bg-green-500/10 border-green-500/20 text-green-500 opacity-60' : 'bg-zinc-900/50 border-white/5 hover:border-white/10'}`}
                  >
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center border-2 ${task.completed ? 'bg-green-500 border-green-500 text-white' : 'border-zinc-700'}`}>
                      {task.completed && '✓'}
                    </div>
                    <span className={`font-bold ${task.completed ? 'line-through' : ''}`}>{task.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Side Panel: Mood & Quick Chat */}
          <div className="space-y-8">
            <div className="glass p-8 rounded-[32px]">
              <h3 className="text-xl font-bold mb-6">Mood Tracker</h3>
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map(v => (
                  <button 
                    key={v}
                    onClick={() => updateMood(v)}
                    className={`text-2xl transition-all ${user.profile.emotionScale === v ? 'scale-150 grayscale-0' : 'grayscale opacity-30 hover:opacity-100 hover:grayscale-0'}`}
                  >
                    {v === 1 && '😩'}
                    {v === 2 && '😕'}
                    {v === 3 && '😐'}
                    {v === 4 && '🙂'}
                    {v === 5 && '🔥'}
                  </button>
                ))}
              </div>
              {isEmotionLock && (
                <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
                  <p className="text-red-400 text-xs font-bold leading-relaxed">
                    ⚠️ EMOTIONAL LOCK ACTIVE: Don't make new major decisions for 7 days. Focus only on essential health tasks.
                  </p>
                </div>
              )}
            </div>

            <div className="glass p-8 rounded-[32px] bg-indigo-600/5 border-indigo-500/10">
              <h3 className="text-xl font-bold mb-2">Mera Guide</h3>
              <p className="text-zinc-500 text-sm mb-6">Ask me anything about your current path or if you're stuck.</p>
              <button 
                onClick={() => setActiveTab('guide')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2"
              >
                Start Conversation <span>🧠</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'guide' && (
        <div className="max-w-3xl mx-auto flex flex-col h-[75vh] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex-1 overflow-y-auto space-y-6 pb-6 scrollbar-hide">
            {chatHistory.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center px-12 opacity-50">
                 <div className="w-16 h-16 bg-indigo-600 rounded-3xl mb-6 flex items-center justify-center text-3xl">🧠</div>
                 <h3 className="text-xl font-bold mb-2">I am your Guide.</h3>
                 <p className="text-zinc-400">Try saying: "Aaj kya karna hai?" or "Samajh nahi aaya."</p>
              </div>
            )}
            {chatHistory.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] px-5 py-4 rounded-3xl font-medium leading-relaxed ${
                  msg.role === 'user' ? 'bg-indigo-600 text-white' : 'glass border-white/5 text-zinc-200'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="glass px-5 py-4 rounded-3xl text-zinc-500 italic animate-pulse">
                  Guide is thinking...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="mt-4 flex gap-2 glass p-2 rounded-[28px] border-white/10">
            <input 
              type="text" 
              value={chatMessage}
              onChange={e => setChatMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendChat()}
              placeholder="Ask Guide anything..."
              className="flex-1 bg-transparent border-none px-4 py-3 focus:outline-none font-medium"
            />
            <button 
              onClick={handleSendChat}
              className="bg-indigo-600 w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-indigo-700 transition-all text-xl"
            >
              ➔
            </button>
          </div>
        </div>
      )}

      {activeTab === 'progress' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="glass p-8 rounded-[32px]">
              <h3 className="text-xl font-bold mb-8">Consistency Score</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={progressData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f1f1f" vertical={false} />
                    <XAxis dataKey="name" stroke="#525252" axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                      itemStyle={{ color: '#818cf8' }}
                    />
                    <Area type="monotone" dataKey="score" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <div className="glass p-8 rounded-[32px]">
              <h3 className="text-xl font-bold mb-8">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Tasks Done', val: '42' },
                  { label: 'Total Hours', val: '128' },
                  { label: 'Level', val: 'Lvl 4' },
                  { label: 'Points', val: '1.2k' },
                ].map(s => (
                  <div key={s.label} className="bg-zinc-900/50 p-6 rounded-[24px] border border-white/5">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">{s.label}</p>
                    <p className="text-2xl font-black">{s.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'memory' && (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-4xl font-black mb-12 text-center">Your <span className="text-indigo-500">Memory</span></h2>
          <div className="space-y-4">
            {[
              { date: 'Today', title: 'Daily Review Completed', type: 'system' },
              { date: 'Yesterday', title: 'Unlocked Level 4 Consistency', type: 'milestone' },
              { date: 'Oct 15', title: 'Locked Decision: Build Micro-SaaS', type: 'decision' },
              { date: 'Oct 12', title: 'Onboarding completed successfully', type: 'system' },
            ].map((m, i) => (
              <div key={i} className="flex gap-6 group">
                <div className="flex flex-col items-center">
                  <div className={`w-3 h-3 rounded-full mt-2 ${m.type === 'decision' ? 'bg-indigo-500' : 'bg-zinc-800'}`}></div>
                  <div className="w-0.5 flex-1 bg-zinc-900"></div>
                </div>
                <div className="pb-8 flex-1">
                  <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">{m.date}</p>
                  <h4 className={`text-lg font-bold ${m.type === 'decision' ? 'text-indigo-400' : 'text-zinc-300'}`}>{m.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
