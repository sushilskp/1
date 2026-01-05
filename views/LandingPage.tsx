
import React, { useState } from 'react';

const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  const [activeTab, setActiveTab] = useState('student');

  return (
    <div className="bg-[#050505] overflow-x-hidden">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
          <span className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">G</span>
          GROWTH AI
        </div>
        <button onClick={onStart} className="bg-white text-black font-bold px-6 py-2.5 rounded-full hover:bg-zinc-200 transition-all">
          Login
        </button>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-12 pb-24 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-600/20 text-indigo-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-8">
          🚀 Decision + Execution OS for Gen Z
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-tight">
          Right decision. Right time. <br/>
          <span className="gradient-text">Consistent execution.</span>
        </h1>
        <p className="text-zinc-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
          The only system that helps you stop overthinking, locks your path, and builds the habits needed to actually win.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button onClick={onStart} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-full text-lg shadow-xl shadow-indigo-600/20 transition-all transform hover:scale-105 active:scale-95">
            Get Early Access
          </button>
          <button className="bg-zinc-900 border border-white/10 text-white font-bold px-8 py-4 rounded-full text-lg hover:bg-zinc-800 transition-all">
            Watch 60-sec Demo
          </button>
        </div>
      </section>

      {/* Problem */}
      <section className="px-6 py-24 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Talent problem nahi hai. <br/><span className="text-indigo-500">Decision problem hai.</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass p-8 rounded-3xl border border-white/5">
              <span className="text-4xl mb-6 block">❌</span>
              <h3 className="text-xl font-bold mb-3">Information overload</h3>
              <p className="text-zinc-400">Sab kuch sikhna hai, par shuru kahan se karein? Clarity zero hai.</p>
            </div>
            <div className="glass p-8 rounded-3xl border border-white/5">
              <span className="text-4xl mb-6 block">❌</span>
              <h3 className="text-xl font-bold mb-3">Direction confusion</h3>
              <p className="text-zinc-400">Skills bohot hain, par sahi niche ya industry choose nahi ho rahi.</p>
            </div>
            <div className="glass p-8 rounded-3xl border border-white/5">
              <span className="text-4xl mb-6 block">❌</span>
              <h3 className="text-xl font-bold mb-3">Emotional hijacking</h3>
              <p className="text-zinc-400">Stress ya breakup mein poora plan drop kar dete ho. Discipline broken.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-6xl font-bold mb-12 tracking-tight">How it <span className="text-indigo-500">works.</span></h2>
            <div className="space-y-8">
              {[
                { n: '01', t: 'Smart Understanding', d: 'Hamaara AI aapke background, risk capability aur interests ko scan karta hai.' },
                { n: '02', t: 'Right Decision (Locked)', d: 'Hum ek decision lock karte hain 21 dinon ke liye. No distractions.' },
                { n: '03', t: 'Personalized Learning', d: 'Sahi resources jo actually results dein, koi fluff nahi.' },
                { n: '04', t: 'Daily Execution', d: 'Checklists and streaks to keep you moving forward.' },
                { n: '05', t: 'Emotional Protection', d: 'System triggers a lock when you are low, saving your progress.' },
              ].map(step => (
                <div key={step.n} className="flex gap-6">
                  <span className="text-indigo-500 font-black text-2xl">{step.n}</span>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{step.t}</h4>
                    <p className="text-zinc-400">{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-indigo-600/20 blur-3xl rounded-full"></div>
            <img src="https://picsum.photos/800/800?grayscale" alt="Product Flow" className="relative rounded-3xl border border-white/10 shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="px-6 py-24 bg-indigo-600/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-12">Who is this <span className="text-indigo-500">for?</span></h2>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['student', 'working', 'founder', 'gen z'].map(t => (
              <button 
                key={t}
                onClick={() => setActiveTab(t)}
                className={`px-8 py-3 rounded-full font-bold transition-all ${activeTab === t ? 'bg-indigo-600 text-white' : 'bg-white/5 text-zinc-400 hover:bg-white/10'}`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="glass p-12 rounded-[40px] border border-indigo-500/10 max-w-3xl mx-auto">
             <h3 className="text-2xl font-bold mb-4">
              {activeTab === 'student' && "Academic pressure se career clarity tak."}
              {activeTab === 'working' && "9-5 trap se financial freedom ka roadmap."}
              {activeTab === 'founder' && "Idea se first $1000 execution tak."}
              {activeTab === 'gen z' && "Digital distractions se mental focus tak."}
             </h3>
             <p className="text-zinc-400 text-lg">
                {activeTab === 'student' && "Growth AI helps you identify which skills will actually pay off based on current market data, not outdated courses."}
                {activeTab === 'working' && "Plan your exit strategy or your next promotion with data-backed decisions and a strict execution timeline."}
                {activeTab === 'founder' && "Stop building in circles. Get a locked execution path that focuses only on revenue and growth."}
                {activeTab === 'gen z' && "Protect your focus from TikTok trends and emotional burnout. Decisions that outlast your dopamine spikes."}
             </p>
          </div>
        </div>
      </section>

      {/* Footer / Waitlist */}
      <section className="px-6 py-32 text-center max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black mb-8">Ready to lock <br/>your <span className="text-indigo-500">future?</span></h2>
        <div className="flex flex-col md:flex-row gap-2 max-w-md mx-auto mb-16">
          <input type="email" placeholder="Enter your email" className="flex-1 bg-zinc-900 border border-white/10 rounded-full px-6 py-4 focus:outline-none focus:border-indigo-500 transition-all" />
          <button onClick={onStart} className="bg-white text-black font-bold px-8 py-4 rounded-full hover:bg-zinc-200 transition-all">Join Waitlist</button>
        </div>
        <div className="flex justify-center gap-8 text-zinc-500 text-sm font-bold uppercase tracking-widest">
          <a href="#" className="hover:text-white transition-all">About</a>
          <a href="#" className="hover:text-white transition-all">Privacy</a>
          <a href="#" className="hover:text-white transition-all">Terms</a>
          <a href="#" className="hover:text-white transition-all">Contact</a>
        </div>
        <p className="mt-12 text-zinc-700 text-xs font-medium">© 2024 GROWTH AI. ALL RIGHTS RESERVED. MADE FOR GEN Z.</p>
      </section>
    </div>
  );
};

export default LandingPage;
