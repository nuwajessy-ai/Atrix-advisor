import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, Users, FileSpreadsheet, Target, Sparkles, ArrowRight, ArrowLeft, 
  CheckCircle, Plus, Upload, UploadCloud, PlayCircle, Loader2
} from 'lucide-react';
import { Industry, OnboardingState } from '../types';

interface OnboardingProps {
  onOnboardingComplete: (data: Partial<OnboardingState>) => void;
}

export default function Onboarding({ onOnboardingComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [employees, setEmployees] = useState(10);
  const [industry, setIndustry] = useState<Industry>('SaaS');
  const [monthlyRevenue, setMonthlyRevenue] = useState(75000);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([
    'Increase revenue by 20%',
    'Reduce operational SaaS fees'
  ]);
  const [customGoal, setCustomGoal] = useState('');
  const [importType, setImportType] = useState<'demo' | 'file'>('demo');
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState('');
  const [generatingReport, setGeneratingReport] = useState(false);
  const [generationStage, setGenerationStage] = useState(0);

  // Encouraging headers or tips
  const encouragingTips = [
    '"Great start! We are securing your connection with modern bank-grade end-to-end encryption."',
    '"This profile matches high-growth businesses. We optimize your insights based on your team size."',
    '"We support several major industries. Atrix benchmarking will compare details with other peers anonymously."',
    '"Atrix imports and structures data instantly. Click standard Demo dataset for a zero-friction playground."',
    '"Setting specific goals accelerates AI action recommendations by up to 40%."'
  ];

  const handleNext = () => {
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Trigger AI Generation Animation (Step 6)
      setStep(6);
      startAIGeneration();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const startAIGeneration = () => {
    setGeneratingReport(true);
    // Simulate multi-stage AI compilation
    const stages = [
      'Establishing sandboxed encryption runway...',
      'Structuring imported historical transactions...',
      'Computing standard Business Health index...',
      'Analyzing expense anomalies & margins...',
      'Generating custom CFO strategic recommendations...',
      'Compiling investor-ready executive briefs...'
    ];
    
    let currentStage = 0;
    const interval = setInterval(() => {
      if (currentStage < stages.length - 1) {
        currentStage++;
        setGenerationStage(currentStage);
      } else {
        clearInterval(interval);
        // Completed - finalize onboarding
        setTimeout(() => {
          onOnboardingComplete({
            businessName: businessName || 'Apex Softworks',
            industry,
            employees,
            monthlyRevenue,
            goals: selectedGoals
          });
        }, 1000);
      }
    }, 1200);
  };

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleAddCustomGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (customGoal.trim() !== '') {
      setSelectedGoals([...selectedGoals, customGoal.trim()]);
      setCustomGoal('');
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFileName(e.dataTransfer.files[0].name);
      setImportType('file');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
      setImportType('file');
    }
  };

  // Pre-configured industry options
  const industries: { value: Industry; label: string; desc: string }[] = [
    { value: 'SaaS', label: 'SaaS & Subscriptions', desc: 'High margins, recurring licensing, user churn metrics' },
    { value: 'E-commerce', label: 'E-commerce & Retail', desc: 'Physical inventory, standard checkouts, shipping overhead' },
    { value: 'Manufacturing', label: 'Manufacturing & Plants', desc: 'Capital investments, material resource cycles' },
    { value: 'Consulting', label: 'Consulting & Services', desc: 'Hourly advisor metrics, retainer renewals, custom project timelines' },
    { value: 'Healthcare', label: 'Healthcare & Clinical', desc: 'Compliance auditing, equipment amortization, provider logs' }
  ];

  // Goals options
  const goalPresets = [
    'Increase revenue by 20%',
    'Reduce operational SaaS fees',
    'Hire three senior architects',
    'Open European distribution hub',
    'Maintain a 5-month cash flow reserves cushion',
    'Launch mobile app client tier'
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      
      {/* Upper Logo Indicator */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-md">
          A
        </div>
        <span className="font-sans font-bold text-lg text-slate-900 dark:text-white">Atrix</span>
        <span className="text-[10px] font-mono border border-slate-300 dark:border-slate-800 text-slate-500 rounded bg-slate-100 dark:bg-slate-900 px-1.5 py-0.5 uppercase">Onboarding</span>
      </div>

      <div className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-850/80 rounded-2xl shadow-xl p-6 sm:p-8 relative overflow-hidden backdrop-blur-md">
        
        {/* Progress header */}
        {step <= 5 && (
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">
              <span>Step {step} of 5</span>
              <span>{Math.round((step / 5) * 100)}% complete</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Create Account */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Create Account</h2>
                <p className="text-slate-400 text-sm mt-1">Let's set up secure workspace administrator credentials.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input 
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ray Devlin"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm outline-none transition-all dark:text-white dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">Work Email</label>
                  <input 
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ray@apexcloud.com"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm outline-none transition-all dark:text-white dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">Password</label>
                  <input 
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm outline-none transition-all dark:text-white dark:focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleNext}
                  disabled={!name || !email || !password}
                  className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white font-medium py-3.5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
                >
                  Create and Proceed
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Add Business Info */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Business Information</h2>
                <p className="text-slate-400 text-sm mt-1">This helps us tailor our benchmarking algorithms to your enterprise.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">Business / Workspace Name</label>
                  <div className="relative">
                    <Building2 className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                    <input 
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Apex Softworks LLC"
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-xl pl-11 pr-4 py-3 text-sm outline-none transition-all dark:text-white dark:focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">Employee Size: <span className="font-sans font-bold text-blue-600">{employees} team members</span></label>
                  <div className="flex items-center gap-4">
                    <Users className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <input 
                      type="range"
                      min="1"
                      max="150"
                      value={employees}
                      onChange={(e) => setEmployees(parseInt(e.target.value))}
                      className="w-full accent-blue-600 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-lg"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">Estimated Monthly Revenue: <span className="font-sans font-bold text-blue-600">${monthlyRevenue.toLocaleString()}</span></label>
                  <input 
                    type="range"
                    min="1000"
                    max="500000"
                    step="5000"
                    value={monthlyRevenue}
                    onChange={(e) => setMonthlyRevenue(parseInt(e.target.value))}
                    className="w-full accent-blue-600 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>$1k/mo</span>
                    <span>$500k/mo+</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleBack}
                  className="flex-1 bg-slate-100 hover:bg-slate-250 dark:bg-slate-800 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!businessName}
                  className="flex-[2] bg-blue-600 hover:bg-blue-500 disabled:bg-slate-250 text-white font-medium py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Choose Industry */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Choose Industry</h2>
                <p className="text-slate-400 text-sm mt-1">This configures background indicators and report templates automatically.</p>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {industries.map((ind) => (
                  <button
                    key={ind.value}
                    onClick={() => setIndustry(ind.value)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex gap-4 items-center ${
                      industry === ind.value 
                        ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/20' 
                        : 'border-slate-200 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-950/50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      industry === ind.value ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                    }`}>
                      {ind.value === 'SaaS' && <Sparkles className="w-4 h-4" />}
                      {ind.value === 'E-commerce' && <Building2 className="w-4 h-4" />}
                      {ind.value === 'Manufacturing' && <Users className="w-4 h-4" />}
                      {ind.value === 'Consulting' && <Target className="w-4 h-4" />}
                      {ind.value === 'Healthcare' && <CheckCircle className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{ind.label}</h4>
                      <p className="text-xs text-slate-400 mt-0.5 leading-tight">{ind.desc}</p>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={handleBack}
                  className="flex-1 bg-slate-100 hover:bg-slate-250 dark:bg-slate-800 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  Pick Industry
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Import business data */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Import Business Data</h2>
                <p className="text-slate-400 text-sm mt-1">Plug your ledger system or explore instantly with pre-loaded intelligence logs.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setImportType('demo')}
                  className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                    importType === 'demo'
                      ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/20'
                      : 'border-slate-200 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-950/50'
                  }`}
                >
                  <PlayCircle className={`w-8 h-8 mx-auto mb-2 ${importType === 'demo' ? 'text-blue-600' : 'text-slate-400'}`} />
                  <h4 className="font-semibold text-xs text-slate-900 dark:text-white uppercase tracking-wider">Quick Start Demo</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Pre-loaded high fidelity statistics metrics</p>
                </button>

                <button
                  onClick={() => setImportType('file')}
                  className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                    importType === 'file'
                      ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/20'
                      : 'border-slate-200 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-950/50'
                  }`}
                >
                  <UploadCloud className={`w-8 h-8 mx-auto mb-2 ${importType === 'file' ? 'text-blue-600' : 'text-slate-400'}`} />
                  <h4 className="font-semibold text-xs text-slate-900 dark:text-white uppercase tracking-wider">CSV/Excel Upload</h4>
                  <p className="text-[10px] text-slate-400 mt-1">Import physical worksheets</p>
                </button>
              </div>

              {importType === 'file' ? (
                <div 
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                    dragOver 
                      ? 'border-blue-500 bg-blue-50/10' 
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700'
                  }`}
                >
                  <input 
                    type="file" 
                    id="file-upload" 
                    className="hidden" 
                    accept=".csv,.xlsx,.json"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="file-upload" className="cursor-pointer block">
                    <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                    {fileName ? (
                      <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 block font-bold">{fileName} successfully uploaded!</span>
                    ) : (
                      <>
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">Drag & Drop or Click to Select Ledger</span>
                        <span className="text-[10px] text-slate-400 block mt-1">Supports standard CSV, JSON, XLS up to 10MB</span>
                      </>
                    )}
                  </label>
                </div>
              ) : (
                <div className="bg-emerald-50/40 dark:bg-emerald-950/10 border border-emerald-100/50 dark:border-emerald-900 p-4 rounded-xl flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</div>
                  <div className="text-xs text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-900 dark:text-white block">Perfect Sandbox Readiness</span>
                    Our algorithms will construct synthetic active historical ledgers aligned exactly with ${monthlyRevenue.toLocaleString()}/mo in SaaS patterns.
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-2">
                <button
                  onClick={handleBack}
                  className="flex-1 bg-slate-100 hover:bg-slate-250 dark:bg-slate-800 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  Load Data
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 5: Set Goals */}
          {step === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Set Business Goals</h2>
                <p className="text-slate-400 text-sm mt-1">We translate these milestones into daily real-time actionable task alerts.</p>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {goalPresets.map((goal, idx) => {
                  const active = selectedGoals.includes(goal);
                  return (
                    <button
                      key={idx}
                      onClick={() => toggleGoal(goal)}
                      className={`w-full text-left px-4 py-3 rounded-xl border transition-all cursor-pointer text-xs font-medium flex items-center justify-between ${
                        active 
                          ? 'border-blue-600 bg-blue-50/30 dark:bg-blue-950/10 text-slate-900 dark:text-white' 
                          : 'border-slate-200 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-950/50 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <span>{goal}</span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        active ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 dark:border-slate-700'
                      }`}>
                        {active && <span className="text-[10px]">✓</span>}
                      </div>
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleAddCustomGoal} className="flex gap-2">
                <input 
                  type="text"
                  value={customGoal}
                  onChange={(e) => setCustomGoal(e.target.value)}
                  placeholder="E.g. Hire senior advisor, Launch V2 UI..."
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-blue-500 text-slate-800 dark:text-white"
                />
                <button 
                  type="submit"
                  className="px-4 bg-slate-100 hover:bg-slate-250 dark:bg-slate-800 dark:hover:bg-slate-850 border border-slate-200 dark:border-slate-800 rounded-xl flex items-center justify-center text-slate-700 dark:text-slate-300 font-bold text-lg cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </form>

              <div className="flex gap-4 pt-2">
                <button
                  onClick={handleBack}
                  className="flex-1 bg-slate-100 hover:bg-slate-250 dark:bg-slate-800 dark:hover:bg-slate-850 text-slate-700 dark:text-slate-300 font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="flex-[2] bg-blue-600 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  Generate AI Report
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 6: Load Animations / AI Compilation */}
          {step === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8 space-y-6"
            >
              <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border-4 border-blue-100 dark:border-blue-900/30 animate-ping opacity-75" />
                <div className="relative rounded-full p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
                  <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
                </div>
              </div>

              <div>
                <b className="text-lg font-sans font-bold text-slate-900 dark:text-white block">Atrix Intelligence Engine at Work</b>
                <p className="text-slate-400 text-xs mt-1.5 font-sans">Compiling standard metric arrays and drafting first executive profiles...</p>
              </div>

              {/* Status micro transitions */}
              <div className="bg-slate-100/50 dark:bg-slate-950 border border-slate-200/40 dark:border-slate-800/60 rounded-xl p-4 max-w-sm mx-auto text-left min-h-24 flex items-center">
                <p className="text-xs font-mono text-blue-600 dark:text-blue-400 animate-pulse">
                  &gt; {
                    generatingReport && [
                      'Establishing secure encryption key arrays...',
                      'Aligning transaction columns recursively...',
                      'Plotting health thresholds for target indices...',
                      'Flagging operational expense overshoots...',
                      'Drafting CFO briefing files via Gemini API...',
                      'Packaging dashboard view templates...'
                    ][generationStage]
                  }
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Tip section */}
        {step <= 5 && (
          <div className="mt-8 border-t border-slate-100 dark:border-slate-800 pb-1 pt-4">
            <p className="text-[10px] font-sans text-slate-400 italic leading-snug">{encouragingTips[step - 1]}</p>
          </div>
        )}
      </div>
    </div>
  );
}
