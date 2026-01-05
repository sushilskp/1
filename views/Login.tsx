
import React, { useState } from 'react';

const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#050505]">
      <div className="w-full max-w-md glass p-10 rounded-[32px] border border-white/5 relative">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-24 h-24 bg-indigo-600 rounded-[28px] rotate-12 flex items-center justify-center text-white text-4xl font-black shadow-2xl shadow-indigo-600/40">
          G
        </div>
        
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-extrabold mb-2 tracking-tight">Growth AI</h2>
          <p className="text-zinc-500 mb-8">Enter your details to access the OS.</p>
        </div>

        {step === 1 ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 ml-1">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
            <button 
              onClick={() => email && setStep(2)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-600/20"
            >
              Continue with Email
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2 ml-1">Verify OTP</label>
              <input 
                type="text" 
                maxLength={6}
                value={otp}
                onChange={e => setOtp(e.target.value)}
                placeholder="000000"
                className="w-full bg-zinc-900/50 border border-white/10 rounded-2xl px-5 py-4 text-center text-2xl font-black tracking-[1em] focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
            <button 
              onClick={onLogin}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-indigo-600/20"
            >
              Access Portal
            </button>
            <button onClick={() => setStep(1)} className="w-full text-zinc-500 text-sm font-bold">Go Back</button>
          </div>
        )}

        <p className="mt-8 text-center text-zinc-600 text-xs px-8">
          By signing up, you agree to our <span className="text-zinc-400 underline">Terms of Service</span> and <span className="text-zinc-400 underline">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default Login;
