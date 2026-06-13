import { motion } from 'motion/react';
import { 
  TrendingUp, Sparkles, Shield, Cpu, RefreshCw, Layers, 
  Workflow, Users, FileText, BarChart3, ArrowRight, CheckCircle2, Lock, Eye, Database
} from 'lucide-react';

interface LandingPageProps {
  onStartFree: () => void;
  onBookDemo: () => void;
}

export default function LandingPage({ onStartFree, onBookDemo }: LandingPageProps) {
  return (
    <div className="min-h-screen font-sans">
      {/* Navigation header */}
      <header className="border-b border-slate-200/60 dark:border-slate-800/60 backdrop-blur-md bg-white/60 dark:bg-slate-950/60 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/15">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold tracking-tight text-xl bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">Atrix</span>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 dark:text-slate-500 uppercase leading-none">Intelligence</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-500 dark:text-slate-400">
            <a href="#features" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Features</a>
            <a href="#security" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Security</a>
            <a href="#testimonials" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Testimonials</a>
            <a href="#future" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Future Slate</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={onBookDemo}
              className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Book Demo
            </button>
            <button 
              onClick={onStartFree}
              className="relative group overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-sm font-medium px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-500/20 transition-all duration-300"
            >
              Start Free
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-12 right-12 w-64 h-64 bg-indigo-500/5 dark:bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/40 text-blue-600 dark:text-blue-400 text-xs font-medium mb-8"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="tracking-tight">Intelligence for Every Business</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-7xl font-bold font-sans tracking-tight leading-[1.05] text-slate-900 dark:text-white mb-8"
          >
            Your AI <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-300 dark:to-purple-400 bg-clip-text text-transparent">Business Advisor</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed mb-12"
          >
            Track performance, uncover insights, forecast growth, and make smarter decisions with premium, enterprise-grade AI tailored for your business.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
          >
            <button 
              onClick={onStartFree}
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-white font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              Start Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onBookDemo}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-medium border border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 bg-white/50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 transition-all flex items-center justify-center gap-2 cursor-pointer text-slate-800 dark:text-slate-200"
            >
              Book Demo
            </button>
          </motion.div>
        </div>

        {/* Floating Animated App Preview Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-5xl mx-auto bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 rounded-2xl shadow-2xl overflow-hidden p-3 backdrop-blur-lg"
        >
          <div className="bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200/40 dark:border-slate-800/40 p-4 sm:p-6 text-left">
            <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-800/50 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3.5 h-3.5 rounded-full bg-red-400" />
                <div className="w-3.5 h-3.5 rounded-full bg-yellow-400" />
                <div className="w-3.5 h-3.5 rounded-full bg-green-400" />
                <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-2" />
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500">atrix-bi.platform/enterprise</span>
              </div>
              <span className="text-xs font-mono text-emerald-500 font-semibold bg-emerald-50 dark:bg-emerald-950/30 px-2.5 py-1 rounded-full">● LIVE DEMO MODE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Business Health Score</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-sans text-slate-900 dark:text-white">92</span>
                  <span className="text-xs text-slate-400">/100</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-green-400 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Revenue Run Rate</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-sans text-slate-900 dark:text-white">$149,000</span>
                  <span className="text-xs font-medium text-emerald-500 font-semibold">+8.4%</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-2 block">Steady growth in high-tier enterprise recurring blocks</span>
              </div>

              {/* Card 3 */}
              <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
                <span className="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-wider block mb-1">Profit Margins</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold font-sans text-slate-900 dark:text-white">71.8%</span>
                  <span className="text-xs font-medium text-slate-400">Target: 75%</span>
                </div>
                <span className="text-[11px] text-slate-400 mt-2 block">Optimizations indicate minor cloud compute slippage</span>
              </div>
            </div>

            {/* AI Advisor Panel inside mockup */}
            <div className="mt-6 bg-blue-50/50 dark:bg-slate-900/60 border border-blue-100/50 dark:border-slate-800 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-semibold text-xs">AI</div>
                <span className="text-sm font-semibold text-slate-800 dark:text-white">Atrix Copilot Insights</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-3xl">
                "Based on financial indexing, your SaaS gross profit margin remains highly stable. However, small-tier trial drop-offs could compress pipeline values by 8% in Q3. We recommend routing automated email onboarding sequences inside target 7-day windows."
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Trust & Security Architecture */}
      <section id="security" className="py-24 border-t border-slate-200/60 dark:border-slate-900/60 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold">Security Architecture</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-slate-900 dark:text-white mt-3">Privacy-First Business Intelligence</h2>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-4 font-sans leading-relaxed">
              We understand you are sharing highly sensitive metrics. Our infrastructure is engineered to the highest global financial security standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-850/40 hover:border-slate-300/40 dark:hover:border-slate-800 transition-all shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5 border border-blue-100 dark:border-blue-900/50">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base text-slate-900 dark:text-white mb-2">AES-256 Encryption</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                All business keys, financial databases, and communication records are encrypted both in transit and at rest.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-850/40 hover:border-slate-300/40 dark:hover:border-slate-800 transition-all shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5 border border-indigo-100 dark:border-indigo-900/50">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base text-slate-900 dark:text-white mb-2">Secure Authentication</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Integrated multi-factor validation, strict password routines, and granular OAuth linkages with enterprise systems.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-850/40 hover:border-slate-300/40 dark:hover:border-slate-800 transition-all shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-5 border border-purple-100 dark:border-purple-900/50">
                <RefreshCw className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base text-slate-900 dark:text-white mb-2">Continuous Backup</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Automatic real-time back archives deployed on multi-region redundant database clouds to guarantee 100% data access safety.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-850/40 hover:border-slate-300/40 dark:hover:border-slate-800 transition-all shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5 border border-emerald-100 dark:border-emerald-900/50">
                <Eye className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-base text-slate-900 dark:text-white mb-2">Privacy-First Pillars</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Zero telemetry leakage. Standard compliance structures (SOC2 aligned) ensure we never share or trade details of your operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials section */}
      <section id="testimonials" className="py-24 border-t border-slate-200/60 dark:border-slate-900/60 dark:bg-slate-900 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold">User Endorsements</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-slate-900 dark:text-white mt-3">Loved by Operators Everywhere</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-850/40">
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 italic">
                "The interface is gorgeous. In less than five minutes of onboarding, Atrix pointed out which recurring SaaS licenses we had forgotten about, automatically boosting overhead margins."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-850 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 font-sans">
                  SK
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Sebastian Karr</h4>
                  <span className="text-xs text-slate-400 block leading-tight">Founder & CEO, ScaleLink</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-850/40">
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 italic">
                "Stripe-like simplicity meets deep financial predictive forecasting models. I converted our board report into Atrix format and secured investor renewals inside 48 hours."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-850 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 font-sans">
                  LM
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Lisa Miller</h4>
                  <span className="text-xs text-slate-400 block leading-tight">Chief Financial Officer, Apex Group</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-850/40">
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6 italic">
                "The floating AI chat feels genuinely intelligent. I asked if we could afford an senior engineer hire, and it plotted cash margins out 6 months beautifully."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-850 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300 font-sans">
                  RD
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Ray Devlin</h4>
                  <span className="text-xs text-slate-400 block leading-tight">VP Operations, CloudMelt</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Roadmap / Features Placeholders */}
      <section id="future" className="py-24 border-t border-slate-200/60 dark:border-slate-900/60 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono tracking-widest text-blue-600 dark:text-blue-400 uppercase font-semibold">Future Slate Roadmap</span>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight text-slate-900 dark:text-white mt-3">What We're Building Next</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">
              We are scaling the bounds of Business Intelligence. Take a look at features currently inside our secure core testing pipelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-850/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 px-3 py-1 bg-yellow-100 dark:bg-yellow-950/40 text-yellow-800 dark:text-yellow-400 text-[10px] font-mono rounded-bl-xl border-l border-b border-yellow-250 dark:border-yellow-900/30">
                Q3 2026
              </div>
              <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-slate-850 text-orange-500 flex items-center justify-center mb-5">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">AI Financial Forecasting</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                Connect your physical accounting ledger to generate fully-simulated balance metrics six quarters forward with standard variance indices.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-850/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 px-3 py-1 bg-yellow-100 dark:bg-yellow-950/40 text-yellow-800 dark:text-yellow-400 text-[10px] font-mono rounded-bl-xl border-l border-b border-yellow-250 dark:border-yellow-900/30">
                Q3 2026
              </div>
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-slate-850 text-indigo-500 flex items-center justify-center mb-5">
                <BarChart3 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">Industry Benchmarking</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                Compare your actual operating margins, CAC, and ARR velocities against hundreds of verified regional SaaS and e-commerce players anonymously.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-850/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 px-3 py-1 bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-400 text-[10px] font-mono rounded-bl-xl border-l border-b border-blue-250 dark:border-blue-900/30">
                Q4 2026
              </div>
              <div className="w-10 h-10 rounded-xl bg-pink-50 dark:bg-slate-850 text-pink-500 flex items-center justify-center mb-5">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">Voice Assistant Model</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                Initiate hands-free operations. Speak naturally to query metrics: "Atrix, tell me our profit expansion compared to Q2 targets while driving."
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-850/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 px-3 py-1 bg-blue-100 dark:bg-blue-950/40 text-blue-800 dark:text-blue-400 text-[10px] font-mono rounded-bl-xl border-l border-b border-blue-250 dark:border-blue-900/30">
                Q4 2026
              </div>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-slate-850 text-emerald-500 flex items-center justify-center mb-5">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">Document Analysis</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                Drag on physical invoice scans, contract drafts, or bank statement files for automatic itemized text conversion and transaction logs.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-850/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 px-3 py-1 bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-400 text-[10px] font-mono rounded-bl-xl border-l border-b border-purple-250 dark:border-purple-900/30">
                Q1 2027
              </div>
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-slate-850 text-purple-500 flex items-center justify-center mb-5">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">Team Collaboration</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                Invite operating partners, allocate permissions, assign specific goal KPIs, and share contextual comments on metric anomalies securely.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-850/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 px-3 py-1 bg-purple-100 dark:bg-purple-950/40 text-purple-800 dark:text-purple-400 text-[10px] font-mono rounded-bl-xl border-l border-b border-purple-250 dark:border-purple-900/30">
                Q1 2027
              </div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-slate-850 text-blue-500 flex items-center justify-center mb-5">
                <Workflow className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">Workflow Automation</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                Connect analytical thresholds with slack triggers or email alerts to make sure teammates take instant actions when anomalies trigger.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-850/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-400 text-[10px] font-mono rounded-bl-xl border-l border-b border-blue-200 dark:border-blue-900/30">
                Q2 2027
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-slate-850 text-amber-500 flex items-center justify-center mb-5">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">API Integrations Hub</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                Native connections with over 45 standard developer APIs: Stripe, Salesforce, Plaid, Google Analytics, Shopify, and Quickbooks.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/40 dark:border-slate-850/40 relative overflow-hidden group">
              <div className="absolute top-0 right-0 px-3 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-400 text-[10px] font-mono rounded-bl-xl border-l border-b border-blue-200 dark:border-blue-900/30">
                Q2 2027
              </div>
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-slate-850 text-teal-500 flex items-center justify-center mb-5">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-2">Meeting Summarizer</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
                Connect your Zoom, Google Meet or Teams events. Automatically summarize action points, forecast requirements, and sync them into Atrix goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Footer */}
      <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              A
            </div>
            <span className="font-sans font-bold text-slate-900 dark:text-white">Atrix</span>
          </div>
          <span className="text-slate-400 text-xs">© 2026 Atrix Inc. Intelligence for Every Business. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
