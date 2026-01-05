
import React, { useState } from 'react';
import { Role } from '../types';

const Onboarding: React.FC<{ onComplete: (data: any, decision: any) => void }> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    age: '',
    role: 'student' as Role,
    financePressure: 3,
    interests: [] as string[],
    confusion: '',
    emotionScale: 3
  });

  const roles = [
    { id: 'student', label: 'Student', icon: '🎓' },
    { id: 'working', label: 'Working Pro', icon: '💼' },
    { id: 'founder', label: 'Founder', icon: '🚀' },
    { id: 'business', label: 'Business Owner', icon: '🏢' },
  ];

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Mocking Decision Engine Rules
      const decision = {
        focus: data.role === 'founder' ? 'Build Micro-SaaS' : 'UI/UX Specialization',
        path: 'Market Mastery Pathway',
        timeline: '12 Weeks',
        earningStart: 'Month 3',
        lockedUntil: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
        isLocked: true
      };
      onComplete(data, decision);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl">
        {/* Progress */}
        <div className="flex gap-2 mb-12">
          {[1, 2, 3, 4, 5].map(s => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-all ${s <= step ? 'bg-indigo-600' : 'bg-white/10'}`}></div>
          ))}
        </div>

        <div className="space-y-12">
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-4xl font-bold mb-8">What describes you <br/><span className="text-indigo-500">best?</span></h2>
              <div className="grid grid-cols-2 gap-4">
                {roles.map(r => (
                  <button
                    key={r.id}
                    onClick={() => setData({ ...data, role: r.id as Role })}
                    className={`p-6 rounded-3xl border text-left transition-all ${data.role === r.id ? 'bg-indigo-600 border-indigo-600 shadow-xl shadow-indigo-600/20' : 'bg-zinc-900 border-white/5 hover:border-white/20'}`}
                  >
                    <span className="text-3xl mb-3 block">{r.icon}</span>
                    <span className="font-bold text-lg">{r.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-4xl font-bold mb-4">Financial <span className="text-indigo-500">Status.</span></h2>
              <p className="text-zinc-500 mb-12">This helps us gauge the risk you can afford to take.</p>
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold text-zinc-400 mb-4">Pressure Scale (1-5)</label>
                  <input 
                    type="range" min="1" max="5" 
                    value={data.financePressure}
                    onChange={e => setData({ ...data, financePressure: parseInt(e.target.value) })}
                    className="w-full h-2 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
                  />
                  <div className="flex justify-between mt-2 text-xs font-bold text-zinc-600">
                    <span>COMFORTABLE</span>
                    <span>HIGH PRESSURE</span>
                  </div>
                </div>
                <input 
                  type="number" 
                  placeholder="Age"
                  value={data.age}
                  onChange={e => setData({ ...data, age: e.target.value })}
                  className="w-full bg-zinc-900 border border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-4xl font-bold mb-8">Current <span className="text-indigo-500">Confusion.</span></h2>
              <textarea 
                placeholder="What is the biggest decision you are struggling with right now? Be honest."
                value={data.confusion}
                onChange={e => setData({ ...data, confusion: e.target.value })}
                className="w-full h-48 bg-zinc-900 border border-white/5 rounded-3xl px-6 py-4 focus:outline-none focus:border-indigo-500 transition-all resize-none"
              ></textarea>
            </div>
          )}

          {step === 4 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-4xl font-bold mb-8">Mood <span className="text-indigo-500">Check-in.</span></h2>
              <p className="text-zinc-500 mb-12">How are you feeling mentally and emotionally today?</p>
              <div className="grid grid-cols-5 gap-4">
                {[1, 2, 3, 4, 5].map(v => (
                  <button 
                    key={v}
                    onClick={() => setData({ ...data, emotionScale: v })}
                    className={`p-6 rounded-2xl text-2xl flex flex-center transition-all ${data.emotionScale === v ? 'bg-indigo-600 text-white scale-110' : 'bg-zinc-900 text-zinc-600'}`}
                  >
                    {v === 1 && '😩'}
                    {v === 2 && '😕'}
                    {v === 3 && '😐'}
                    {v === 4 && '🙂'}
                    {v === 5 && '🔥'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
              <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-8">✓</div>
              <h2 className="text-4xl font-bold mb-4">Ready to see <br/>your <span className="text-indigo-500">Result.</span></h2>
              <p className="text-zinc-500 mb-8">Our rules engine has calculated your optimal growth path based on 50+ parameters.</p>
            </div>
          )}

          <div className="flex gap-4">
            {step > 1 && (
              <button 
                onClick={() => setStep(step - 1)}
                className="bg-zinc-900 text-zinc-400 font-bold px-8 py-4 rounded-2xl border border-white/5"
              >
                Back
              </button>
            )}
            <button 
              onClick={handleNext}
              className="flex-1 bg-white text-black font-bold py-4 rounded-2xl hover:bg-zinc-200 transition-all shadow-xl"
            >
              {step === 5 ? 'Show My Path' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
