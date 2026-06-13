import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Legend 
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Sparkles, Award, Wallet, ArrowRight,
  Plus, Target, AlertTriangle, RefreshCw, Sun, Moon, FileText, CheckCircle2, ChevronRight, PlusCircle,
  User, Settings, Mail, Key, Shield, LogOut, Check, X, CreditCard, Building2, Users
} from 'lucide-react';
import { Industry, MetricPoint, Goal, SmartAlert, AIInsight } from '../types';
import { calculateHealthScore, filterDataByRange } from '../data';

interface DashboardViewProps {
  businessName: string;
  industry: Industry;
  employees: number;
  monthlyRevenue: number;
  initialGoals: string[];
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenReport: (healthScore: number, summary: any) => void;
  userName: string;
  userEmail: string;
  userPassword?: string;
  onUpdateProfile: (updatedProfile: {
    userName?: string;
    userEmail?: string;
    userPassword?: string;
    businessName?: string;
    industry?: Industry;
    employees?: number;
    monthlyRevenue?: number;
  }) => void;
}

export default function DashboardView({
  businessName,
  industry,
  employees,
  monthlyRevenue,
  initialGoals,
  isDarkMode,
  onToggleDarkMode,
  onOpenReport,
  userName,
  userEmail,
  userPassword = '••••••••••••',
  onUpdateProfile
}: DashboardViewProps) {
  const [range, setRange] = useState<'7d' | '30d' | '90d' | '6m' | '1y'>('30d');
  
  // Load data presets based on active variables
  const dataPackage = filterDataByRange(industry, range);
  
  // Track active goals and alert states locally so users can modify them dynamically!
  const [goals, setGoals] = useState<Goal[]>(() => {
    return dataPackage.goals.map((g, idx) => {
      // Map initialOnboarding names on top of types if matched
      if (idx === 0 && initialGoals && initialGoals.length > 0) {
        return { ...g, title: initialGoals[0] };
      }
      return g;
    });
  });

  const [alerts, setAlerts] = useState<SmartAlert[]>(dataPackage.alerts);
  const [insights] = useState<AIInsight[]>(dataPackage.insights);

  // Custom goals controller state
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState(10000);
  const [newGoalType, setNewGoalType] = useState<'revenue' | 'expenses' | 'branch' | 'hiring' | 'product_launch'>('revenue');
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);

  // Recalculate Health metrics dynamically
  const healthScore = calculateHealthScore(dataPackage.metrics, goals, alerts);

  // User Profile dialog local states
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState<'personal' | 'workspace' | 'access'>('personal');

  const [editUserName, setEditUserName] = useState(userName);
  const [editUserEmail, setEditUserEmail] = useState(userEmail);
  const [editUserPassword, setEditUserPassword] = useState('');
  const [editBusinessName, setEditBusinessName] = useState(businessName);
  const [editIndustry, setEditIndustry] = useState<Industry>(industry);
  const [editEmployees, setEditEmployees] = useState(employees);
  const [editMonthlyRevenue, setEditMonthlyRevenue] = useState(monthlyRevenue);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Synchronize inputs on initial show
  useEffect(() => {
    if (showProfileModal) {
      setEditUserName(userName);
      setEditUserEmail(userEmail);
      setEditUserPassword('');
      setEditBusinessName(businessName);
      setEditIndustry(industry);
      setEditEmployees(employees);
      setEditMonthlyRevenue(monthlyRevenue);
      setSaveSuccess(false);
    }
  }, [showProfileModal, userName, userEmail, businessName, industry, employees, monthlyRevenue]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      userName: editUserName,
      userEmail: editUserEmail,
      userPassword: editUserPassword || undefined,
      businessName: editBusinessName,
      industry: editIndustry,
      employees: editEmployees,
      monthlyRevenue: editMonthlyRevenue
    });
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  const handleAddNewGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGoalTitle.trim() === '') return;

    const added: Goal = {
      id: `g-${Date.now()}`,
      title: newGoalTitle.trim(),
      type: newGoalType,
      target: newGoalTarget,
      current: Math.round(newGoalTarget * 0.1), // start with 10%
      unit: newGoalType === 'hiring' ? 'p' : newGoalType === 'branch' ? 'br' : '$',
      deadline: '25-12-2026',
      progress: 10,
      estimatedCompletion: '20-11-2026',
      status: 'on_track'
    };

    setGoals([...goals, added]);
    setNewGoalTitle('');
    setShowAddGoalModal(false);
  };

  const handleRemoveAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const formatCurrency = (val: number) => {
    if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
    return `$${val}`;
  };

  const rangeOptions: { value: '7d' | '30d' | '90d' | '6m' | '1y'; label: string }[] = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' },
    { value: '6m', label: '6 Months' },
    { value: '1y', label: '1 Year' }
  ];

  return (
    <div className="min-h-screen font-sans pb-24 transition-colors duration-350">
      
      {/* Header element */}
      <header className="border-b border-slate-200/60 dark:border-slate-800/60 sticky top-0 bg-white/70 dark:bg-slate-950/70 backdrop-blur-md z-30">
        <div className="max-w-7xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-605 flex items-center justify-center text-white font-bold text-sm shadow-md">
              A
            </div>
            <div>
              <h2 className="font-sans font-bold select-none text-base tracking-tight leading-none text-slate-900 dark:text-white">
                {businessName || 'Atrix Group'}
              </h2>
              <span className="text-[10px] font-mono leading-none tracking-wider text-slate-400 dark:text-slate-500 uppercase mt-1 block">
                {industry} Segment • {employees} staff
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Range Toggle */}
            <div className="bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/50 dark:border-slate-800/80 p-0.5 rounded-lg hidden sm:flex">
              {rangeOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setRange(opt.value)}
                  className={`px-3 py-1 text-[11px] font-semibold rounded-md transition-all cursor-pointer ${
                    range === opt.value 
                      ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm' 
                      : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button
              onClick={onToggleDarkMode}
              className="w-9 h-9 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl flex items-center justify-center transition-colors text-slate-500 hover:text-slate-800 dark:hover:text-white cursor-pointer"
            >
              {isDarkMode ? <Sun className="w-4.5 h-4.5 text-yellow-500" /> : <Moon className="w-4.5 h-4.5 text-slate-600" />}
            </button>

            <button
              onClick={() => onOpenReport(healthScore, dataPackage.summary)}
              className="px-4 py-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl text-xs font-semibold cursor-pointer text-slate-800 dark:text-slate-200 flex items-center gap-2 shadow-sm"
            >
              <FileText className="w-3.5 h-3.5 text-blue-500" />
              Download Report
            </button>

            {/* Profile trigger button */}
            <button
              id="header_profile_button"
              onClick={() => setShowProfileModal(true)}
              className="px-3 py-2 border border-blue-200 dark:border-blue-900/60 bg-blue-50/20 dark:bg-blue-950/20 hover:bg-blue-50 dark:hover:bg-blue-950 rounded-xl text-xs font-semibold cursor-pointer text-blue-600 dark:text-blue-400 flex items-center gap-2 shadow-sm"
            >
              <div id="user_avatar_bubble" className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[10px] shadow-sm">
                {userName ? userName.slice(0, 2).toUpperCase() : 'AD'}
              </div>
              <span className="max-w-[80px] sm:max-w-[120px] truncate">{userName}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-8 space-y-8">
        
        {/* Mobile range warning pill */}
        <div className="flex sm:hidden justify-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 p-1 rounded-lg">
          {rangeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setRange(opt.value)}
              className={`flex-1 text-center py-1.5 text-[10px] font-semibold rounded-md transition-all cursor-pointer ${
                range === opt.value
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* 1. KPIs & Health circular grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Health Score Panel (Circular visual indicator) */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/85 dark:border-slate-850/85 p-6 flex flex-col items-center justify-center relative shadow-sm h-64">
            <span className="text-xs font-mono tracking-wider uppercase text-slate-400 dark:text-slate-500 block mb-3 text-center">Business Health Index</span>
            
            {/* Circle drawing */}
            <div className="relative w-32 h-32 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle 
                  cx="64" cy="64" r="54" 
                  className="stroke-slate-100 dark:stroke-slate-800" 
                  strokeWidth="8" fill="transparent" 
                />
                <circle 
                  cx="64" cy="64" r="54" 
                  className="stroke-blue-600 dark:stroke-blue-500 transition-all duration-500" 
                  strokeWidth="8" fill="transparent" 
                  strokeDasharray={339.29}
                  strokeDashoffset={339.29 - (339.29 * healthScore) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{healthScore}</span>
                <span className="text-xs text-slate-400 block -mt-1">/100</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 mt-4">
              <Award className="w-4 h-4 text-emerald-500" />
              <span className="text-[11px] font-sans text-slate-500 dark:text-slate-400 font-semibold tracking-tight text-center">
                {healthScore >= 80 ? 'Robust scale metrics' : healthScore >= 60 ? 'Satisfactory stability' : 'Anomalies flagged'}
              </span>
            </div>
          </div>

          {/* KPI Card 1: Revenue */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/85 dark:border-slate-850/85 p-6 flex flex-col justify-between shadow-sm h-64">
            <div>
              <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 dark:text-slate-500 block mb-1">Total Revenue</span>
              <span className="text-3xl font-bold font-sans text-slate-900 dark:text-white tracking-tight">{formatCurrency(dataPackage.summary.revenue)}</span>
            </div>
            
            <div className="py-2">
              <div className="text-xs text-slate-404 flex items-center gap-1">
                {dataPackage.summary.revenueGrowth >= 0 ? (
                  <TrendingUp className="w-4.5 h-4.5 text-emerald-500" />
                ) : (
                  <TrendingDown className="w-4.5 h-4.5 text-red-500" />
                )}
                <span className={dataPackage.summary.revenueGrowth >= 0 ? 'text-emerald-500 font-bold' : 'text-red-500 font-bold'}>
                  {dataPackage.summary.revenueGrowth >= 0 ? '+' : ''}{dataPackage.summary.revenueGrowth}%
                </span>
                <span className="text-slate-400 text-[11px]">vs previous cycles</span>
              </div>
              <p className="text-[11px] text-slate-400 block mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 leading-relaxed">
                Represents cumulative invoiced volumes over the selected {range} window.
              </p>
            </div>
          </div>

          {/* KPI Card 2: Operations Profit */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/85 dark:border-slate-850/85 p-6 flex flex-col justify-between shadow-sm h-64">
            <div>
              <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 dark:text-slate-500 block mb-1">Net Profit</span>
              <span className="text-3xl font-bold font-sans text-slate-900 dark:text-white tracking-tight">{formatCurrency(dataPackage.summary.profit)}</span>
            </div>
            
            <div className="py-2">
              <div className="text-xs text-slate-404 flex items-center gap-1">
                {dataPackage.summary.profitGrowth >= 0 ? (
                  <TrendingUp className="w-4.5 h-4.5 text-emerald-500" />
                ) : (
                  <TrendingDown className="w-4.5 h-4.5 text-red-500" />
                )}
                <span className={dataPackage.summary.profitGrowth >= 0 ? 'text-emerald-500 font-bold' : 'text-red-500 font-bold'}>
                  {dataPackage.summary.profitGrowth >= 0 ? '+' : ''}{dataPackage.summary.profitGrowth}%
                </span>
                <span className="text-slate-400 text-[11px]">in conversion margins</span>
              </div>
              <p className="text-[11px] text-slate-400 block mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 leading-relaxed">
                Operating average profit margin tracks at {Math.round((dataPackage.summary.profit / (dataPackage.summary.revenue || 1)) * 100)}% for this business level.
              </p>
            </div>
          </div>

          {/* KPI Card 3: Free Cash Flow / Expenses split */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/85 dark:border-slate-850/85 p-6 flex flex-col justify-between shadow-sm h-64">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 dark:text-slate-500 block">Total Expenses</span>
                <span className="text-xs font-sans text-slate-400">Ratio: {Math.round((dataPackage.summary.expenses / (dataPackage.summary.revenue || 1)) * 100)}%</span>
              </div>
              <span className="text-3xl font-bold font-sans text-slate-900 dark:text-white tracking-tight">{formatCurrency(dataPackage.summary.expenses)}</span>
            </div>
            
            <div className="py-2">
              <div className="text-xs text-slate-404 flex items-center gap-1">
                {dataPackage.summary.expensesGrowth >= 0 ? (
                  <TrendingDown className="w-4.5 h-4.5 text-red-500" />
                ) : (
                  <TrendingUp className="w-4.5 h-4.5 text-emerald-500" />
                )}
                <span className={dataPackage.summary.expensesGrowth >= 0 ? 'text-red-500 font-bold' : 'text-emerald-500 font-bold'}>
                  {dataPackage.summary.expensesGrowth >= 0 ? '+' : ''}{dataPackage.summary.expensesGrowth}%
                </span>
                <span className="text-slate-400 text-[11px]">bill spillover factors</span>
              </div>
              <p className="text-[11px] text-slate-400 block mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 leading-relaxed">
                Cash Flow indicates {dataPackage.summary.cashFlow >= 0 ? '+' : ''}{formatCurrency(dataPackage.summary.cashFlow)} fluid cash runway.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Primary Financial AREA CHART (Recharts) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/85 dark:border-slate-850/85 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="font-bold tracking-tight text-slate-900 dark:text-white text-base">Revenue & Operating Expenditures</h3>
              <p className="text-slate-400 text-xs sm:text-sm mt-0.5">Plotting monthly transactional flows over active dates</p>
            </div>
            <div className="flex gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-blue-600">
                <span className="w-3 h-3 rounded-full bg-blue-600 block" />
                <span>REVENUE</span>
              </div>
              <div className="flex items-center gap-1.5 text-indigo-400">
                <span className="w-3 h-3 rounded-full bg-indigo-400 block" />
                <span>EXPENSES</span>
              </div>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dataPackage.metrics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? '#334155' : '#E2E8F0'} />
                <XAxis dataKey="label" stroke={isDarkMode ? '#64748B' : '#94A3B8'} fontSize={10} tickLine={false} />
                <YAxis stroke={isDarkMode ? '#64748B' : '#94A3B8'} fontSize={10} tickLine={false} tickFormatter={formatCurrency} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? '#0F172A' : '#FFFFFF', 
                    borderColor: isDarkMode ? '#1E293B' : '#E2E8F0',
                    color: isDarkMode ? '#F8FAFC' : '#0F172A',
                    fontSize: 11,
                    borderRadius: 12
                  }}
                  formatter={(value: any) => [`$${value.toLocaleString()}`]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                <Area type="monotone" dataKey="expenses" stroke="#7C3AED" strokeWidth={1.5} fillOpacity={1} fill="url(#colorExpenses)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Dynamic alerts & Active goals split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Smart Alerts column (2 thirds span) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold tracking-tight text-slate-900 dark:text-white text-base">Atrix Smart Alerts</h3>
                <p className="text-slate-400 text-xs mt-0.5">Real-time indicators triggering proactive adjustments</p>
              </div>
              <span className="text-xs font-mono bg-blue-100 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-full font-semibold">
                {alerts.length} ALERTS INSTANTLY
              </span>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {alerts.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-emerald-50/50 dark:bg-emerald-950/15 border border-emerald-100 dark:border-emerald-900 p-6 rounded-2xl text-center space-y-2"
                  >
                    <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                    <b className="text-slate-900 dark:text-white block text-sm font-sans">Clear Alert Ledger</b>
                    <p className="text-slate-400 text-xs sm:text-xs">Congratulations! Your business margins are completely optimized, healthy, and on track with standard peer velocities.</p>
                  </motion.div>
                ) : (
                  alerts.map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className={`p-5 rounded-2xl border transition-all relative flex flex-col justify-between gap-4 ${
                        alert.severity === 'error'
                          ? 'bg-rose-50/30 dark:bg-rose-950/10 border-rose-150/40 dark:border-rose-900/50'
                          : 'bg-amber-50/30 dark:bg-amber-950/10 border-amber-150/40 dark:border-amber-900/50'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            alert.severity === 'error' 
                              ? 'bg-rose-100 dark:bg-rose-950 text-rose-600 dark:text-rose-450' 
                              : 'bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-450'
                          }`}>
                            <AlertTriangle className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-slate-900 dark:text-white font-sans">{alert.title}</h4>
                            <p className="text-slate-500 dark:text-slate-400 text-xs mt-1 leading-relaxed">{alert.message}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveAlert(alert.id)}
                          className="text-[10px] uppercase font-mono text-slate-400 hover:text-slate-600 dark:hover:text-white cursor-pointer px-2 py-1 rounded hover:bg-slate-100/50 dark:hover:bg-slate-800"
                        >
                          Resolve
                        </button>
                      </div>

                      {/* AI Action item guideline */}
                      <div className="bg-white/80 dark:bg-slate-950/65 border border-slate-200/40 dark:border-slate-850/60 p-4 rounded-xl">
                        <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-1 font-mono">
                          <Sparkles className="w-3.5 h-3.5" />
                          Recommended mitigation action
                        </div>
                        <p className="text-xs text-slate-650 dark:text-slate-300 leading-relaxed">{alert.recommendation}</p>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Goals widget column (1 third span) */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold tracking-tight text-slate-900 dark:text-white text-base">Goal Milestones</h3>
                <p className="text-slate-400 text-xs mt-0.5">Slicing forward business objectives</p>
              </div>
              <button
                onClick={() => setShowAddGoalModal(true)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 flex items-center justify-center text-slate-600 dark:text-slate-350 cursor-pointer"
                title="Create custom goal"
              >
                <PlusCircle className="w-4.5 h-4.5 text-blue-500" />
              </button>
            </div>

            <div className="space-y-4">
              {goals.map((g) => (
                <div key={g.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-850/85 shadow-sm space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-xs sm:text-sm text-slate-900 dark:text-white leading-tight font-sans">{g.title}</h4>
                      <span className="text-[9px] font-mono tracking-wider text-slate-400 uppercase mt-1 block">EST. DEADLINE: {g.deadline}</span>
                    </div>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded uppercase tracking-wider font-semibold ${
                      g.status === 'completed'
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600'
                        : g.status === 'at_risk'
                        ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-500'
                        : 'bg-blue-550/10 text-blue-500'
                    }`}>
                      {g.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                      <span>{g.progress}% complete</span>
                      <span>{g.unit}{g.current.toLocaleString()} / {g.unit}{g.target.toLocaleString()}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-300 ${
                          g.status === 'completed'
                            ? 'bg-emerald-500'
                            : g.status === 'at_risk'
                            ? 'bg-rose-500'
                            : 'bg-blue-600'
                        }`}
                        style={{ width: `${g.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="text-[10px] text-slate-400 italic">
                    Estimated completion: {g.estimatedCompletion}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4. AI-Generated Insights panel (Executive categories grid) */}
        <div className="space-y-6 pt-4">
          <div>
            <h3 className="font-bold tracking-tight text-slate-900 dark:text-white text-base">Atrix Intelligence Insights</h3>
            <p className="text-slate-400 text-xs mt-0.5">Automated structural commentary detailing operation integrity</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((ins) => (
              <div 
                key={ins.id}
                className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-850/85 flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/85 pb-2 mb-3">
                    <span className={`text-[10px] font-mono tracking-wider uppercase px-2 py-0.5 rounded font-semibold ${
                      ins.category === 'win'
                        ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600'
                        : ins.category === 'risk'
                        ? 'bg-rose-50 dark:bg-rose-950/30 text-rose-500'
                        : ins.category === 'opportunity'
                        ? 'bg-purple-50 dark:bg-purple-950/30 text-purple-600'
                        : 'bg-blue-50/70 dark:bg-blue-950/30 text-blue-600'
                    }`}>
                      {ins.category}
                    </span>
                    <span className="text-[9px] text-slate-400 font-mono">EST: {ins.estimatedImpact}</span>
                  </div>
                  
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight font-sans">{ins.title}</h4>
                  <p className="text-xs text-slate-550 dark:text-slate-300 mt-2.5 leading-relaxed">{ins.what}</p>
                  
                  <div className="text-[11px] text-slate-400 mt-2 leading-relaxed pt-2 border-t border-slate-100/60 dark:border-slate-800/50">
                    <span className="font-bold uppercase text-[9px] text-slate-500 block mb-0.5">Causal Factors:</span>
                    {ins.why}
                  </div>
                </div>

                <div className="mt-4 bg-slate-50 dark:bg-slate-950/80 p-3 rounded-xl border border-slate-200/30 dark:border-slate-850/50 text-[11px] leading-relaxed text-slate-650 dark:text-slate-300">
                  <span className="font-bold text-blue-600 block mb-1">AI Recommendation:</span>
                  {ins.recommendation}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Custom Goal Adding Modal Dialogue */}
        {showAddGoalModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-250 dark:border-slate-800 p-6 w-full max-w-md shadow-2xl relative"
            >
              <h3 className="font-bold text-base text-slate-900 dark:text-white mb-4">Create custom milestone goal</h3>
              
              <form onSubmit={handleAddNewGoal} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1.5">Goal Description</label>
                  <input 
                    type="text"
                    required
                    value={newGoalTitle}
                    onChange={(e) => setNewGoalTitle(e.target.value)}
                    placeholder="E.g. Transition AWS containers forward..."
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs outline-none text-slate-900 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1.5">Milestone Type</label>
                    <select 
                      value={newGoalType}
                      onChange={(e: any) => setNewGoalType(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2.5 text-xs outline-none text-slate-800 dark:text-white"
                    >
                      <option value="revenue">Revenue target ($)</option>
                      <option value="expenses">Expenses limit ($)</option>
                      <option value="branch">Branch/Suites</option>
                      <option value="hiring">Hiring staff (p)</option>
                      <option value="product_launch">Launch tier (%)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1.5">Target boundary</label>
                    <input 
                      type="number"
                      required
                      value={newGoalTarget}
                      onChange={(e) => setNewGoalTarget(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs outline-none text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4 border-t border-slate-100 dark:border-slate-805">
                  <button 
                    type="button"
                    onClick={() => setShowAddGoalModal(false)}
                    className="flex-1 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl text-xs font-semibold text-slate-550 dark:text-slate-350 cursor-pointer text-center"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold cursor-pointer text-center"
                  >
                    Save goal
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* 6. Profile View & Account Settings Modal */}
        {showProfileModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-2xl shadow-2xl overflow-hidden relative text-left"
            >
              <div className="flex justify-between items-center px-6 py-4.5 border-b border-slate-200/60 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-950/40">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-505" />
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">Account Profile & Settings</h3>
                </div>
                <button 
                  onClick={() => setShowProfileModal(false)}
                  className="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-650 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Upper Bio panel */}
              <div className="px-6 py-5 bg-gradient-to-r from-blue-50/30 to-indigo-50/15 dark:from-blue-950/10 dark:to-indigo-950/5 border-b border-slate-200/40 dark:border-slate-800/40 flex flex-col sm:flex-row items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/20">
                  {userName ? userName.slice(0, 2).toUpperCase() : 'AD'}
                </div>
                <div className="text-center sm:text-left flex-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <span className="font-bold text-lg text-slate-900 dark:text-white font-sans">{userName}</span>
                    <span className="px-2 py-0.5 text-[9px] font-mono font-bold uppercase rounded bg-green-100 dark:bg-green-950/60 text-green-700 dark:text-green-400">
                      Active Administrator
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-0.5 font-mono">{userEmail}</p>
                </div>
                <div className="text-center sm:text-right text-[10px] sm:text-xs font-mono text-slate-400">
                  <p>Registered: <span className="font-bold text-slate-700 dark:text-slate-300">13-June-2026</span></p>
                  <p className="mt-0.5">Workspace: <span className="font-bold text-blue-600">{businessName}</span></p>
                </div>
              </div>

              {/* Tabs button array */}
              <div className="flex border-b border-slate-100 dark:border-slate-800 px-6 bg-slate-50/50 dark:bg-slate-950/20">
                {[
                  { id: 'personal', label: 'User Admin Account', icon: User },
                  { id: 'workspace', label: 'Business Profile', icon: Building2 },
                  { id: 'access', label: 'Status & Permissions', icon: Shield }
                ].map((t) => {
                  const IconComp = t.icon;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        setActiveProfileTab(t.id as any);
                        setSaveSuccess(false);
                      }}
                      className={`flex items-center gap-2 py-3 px-4 border-b-2 text-xs font-semibold transform translate-y-[1px] transition-all cursor-pointer ${
                        activeProfileTab === t.id 
                          ? 'border-blue-600 text-blue-600 dark:text-blue-400' 
                          : 'border-transparent text-slate-400 hover:text-slate-650 dark:hover:text-slate-200'
                      }`}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>

              <form onSubmit={handleSaveProfile}>
                {/* Form content viewport */}
                <div className="p-6 max-h-[350px] overflow-y-auto space-y-4 text-left">
                  {saveSuccess && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900 rounded-xl p-3.5 flex items-center gap-3 animate-pulse"
                    >
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      <p className="text-xs text-emerald-850 dark:text-emerald-300 font-medium">
                        Success! Your administrative account profile statistics have been synced.
                      </p>
                    </motion.div>
                  )}

                  {/* TAB 1: Personal User Account */}
                  {activeProfileTab === 'personal' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1.5">Full Administrator Name</label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-2.5 text-slate-400 text-xs">@</span>
                            <input 
                              type="text"
                              required
                              value={editUserName}
                              onChange={(e) => setEditUserName(e.target.value)}
                              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-xl pl-8 pr-4 py-2.5 text-xs outline-none text-slate-900 dark:text-white"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1.5">Work Email Address</label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-3 w-3.5 h-3.5 text-slate-400" />
                            <input 
                              type="email"
                              required
                              value={editUserEmail}
                              onChange={(e) => setEditUserEmail(e.target.value)}
                              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2.5 text-xs outline-none text-slate-900 dark:text-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1.5">Modify Administrator Password</label>
                        <div className="relative border border-dashed border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50/40 dark:bg-slate-950/20 text-left">
                          <div className="flex gap-4">
                            <div className="relative flex-1">
                              <Key className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
                              <input 
                                type="password"
                                placeholder="Enter secure password to replace current"
                                value={editUserPassword}
                                onChange={(e) => setEditUserPassword(e.target.value)}
                                className="w-full bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-lg pl-9 pr-4 py-2 text-xs outline-none text-slate-900 dark:text-white"
                              />
                            </div>
                            <span className="text-[10px] text-slate-400 hidden md:block max-w-[150px] leading-snug">
                              Leave empty to keep existing bank-grade encrypted master password active.
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50/40 dark:bg-blue-950/10 border border-blue-100/30 dark:border-blue-900/50 p-3.5 rounded-xl text-[11px] leading-relaxed text-slate-550 dark:text-slate-350">
                        <span className="font-bold text-blue-600 block mb-0.5">Platform Security Info:</span>
                        This account is protected with industry-standard TLS 1.3 encryption and secured under custom user role configurations. All system interactions are tracked under your primary supervisor key.
                      </div>
                    </div>
                  )}

                  {/* TAB 2: Workspace Business Settings */}
                  {activeProfileTab === 'workspace' && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1.5">Business Name</label>
                          <input 
                            type="text"
                            required
                            value={editBusinessName}
                            onChange={(e) => setEditBusinessName(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 focus:border-blue-500 rounded-xl px-4 py-2.5 text-xs outline-none text-slate-900 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1.5">Industry Segment</label>
                          <select 
                            value={editIndustry}
                            onChange={(e: any) => setEditIndustry(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2.5 text-xs outline-none text-slate-800 dark:text-white"
                          >
                            <option value="SaaS">SaaS & Subscriptions</option>
                            <option value="E-commerce">E-commerce & Retail</option>
                            <option value="Manufacturing">Manufacturing & Plants</option>
                            <option value="Consulting">Consulting & Services</option>
                            <option value="Healthcare">Healthcare & Clinical</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <span className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1.5">Workspace Staff: <b className="text-blue-605 text-xs font-sans">{editEmployees} members</b></span>
                          <input 
                            type="range"
                            min="1"
                            max="250"
                            value={editEmployees}
                            onChange={(e) => setEditEmployees(parseInt(e.target.value) || 1)}
                            className="w-full accent-blue-650 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-lg mt-3"
                          />
                        </div>
                        <div>
                          <span className="block text-[10px] font-mono tracking-wider uppercase text-slate-400 mb-1.5">Target Monthly Volume: <b className="text-blue-650 text-xs font-sans">${editMonthlyRevenue.toLocaleString()}</b></span>
                          <input 
                            type="range"
                            min="5000"
                            max="750000"
                            step="5000"
                            value={editMonthlyRevenue}
                            onChange={(e) => setEditMonthlyRevenue(parseInt(e.target.value) || 5000)}
                            className="w-full accent-blue-650 bg-slate-100 dark:bg-slate-800 h-1.5 rounded-lg mt-3"
                          />
                        </div>
                      </div>

                      <div className="bg-slate-50 dark:bg-slate-950/40 p-3.5 rounded-xl border border-slate-200/50 dark:border-slate-800 text-[11px] leading-relaxed text-slate-550 dark:text-slate-350">
                        <span className="font-bold text-slate-700 dark:text-slate-300 block mb-0.5 font-sans">Note on benchmark shifts:</span>
                        Adjusting your business metadata will dynamically calibrate standard peer dashboards and reset smart alert parameters, keeping comparison models aligned accurately.
                      </div>
                    </div>
                  )}

                  {/* TAB 3: Access, Roles & Permissions Status */}
                  {activeProfileTab === 'access' && (
                    <div className="space-y-4">
                      <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden text-xs">
                        <div className="bg-slate-50 dark:bg-slate-950 px-4 py-2 font-semibold text-[10px] text-slate-400 font-mono uppercase tracking-wider text-left">
                          Active Security Clearances
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-slate-805 bg-white dark:bg-slate-900 px-4 py-1 text-left">
                          {[
                            { role: 'Owner Access (Superuser)', enabled: true, level: 'Full root clearance' },
                            { role: 'CFO Insights & Financial Planning', enabled: true, level: 'Benchmarking enabled' },
                            { role: 'Write Ledger Transactions API', enabled: true, level: 'Auto-sync active' },
                            { role: 'Download PDF Investor Briefings', enabled: true, level: 'Enterprise clearance' },
                            { role: 'Multi-User Workspace Sharing', enabled: false, level: 'VIP Upgrade Required' }
                          ].map((r, index) => (
                            <div key={index} className="py-2.5 flex items-center justify-between">
                              <div>
                                <h5 className="font-semibold text-xs text-slate-850 dark:text-slate-200">{r.role}</h5>
                                <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{r.level}</span>
                              </div>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                r.enabled 
                                  ? 'bg-blue-100/60 dark:bg-blue-955/40 text-blue-600 dark:text-blue-400' 
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-450'
                              }`}>
                                {r.enabled ? 'Granted' : 'VIP Locked'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="border border-slate-250 dark:border-slate-800 rounded-xl p-3.5 space-y-2 text-left">
                        <h5 className="font-semibold text-xs text-slate-800 dark:text-slate-200 font-sans">Active Infrastructure Diagnostics</h5>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 text-center mt-2">
                          <div className="bg-slate-100/50 dark:bg-slate-950/60 p-2 rounded-lg border border-slate-200/20">
                            <span className="text-[9px] text-slate-450 block font-mono">DB LATENCY</span>
                            <span className="font-mono text-xs font-bold text-emerald-500 mt-0.5 block">2 ms</span>
                          </div>
                          <div className="bg-slate-100/50 dark:bg-slate-950/60 p-2 rounded-lg border border-slate-200/20">
                            <span className="text-[9px] text-slate-450 block font-mono">TLS STATE</span>
                            <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">256-bit</span>
                          </div>
                          <div className="bg-slate-100/50 dark:bg-slate-950/60 p-2 rounded-lg border border-slate-200/20">
                            <span className="text-[9px] text-slate-450 block font-mono">ROUTING</span>
                            <span className="font-mono text-xs font-bold text-blue-600 mt-0.5 block">HTTPS ok</span>
                          </div>
                          <div className="bg-slate-100/50 dark:bg-slate-950/60 p-2 rounded-lg border border-slate-200/20">
                            <span className="text-[9px] text-slate-450 block font-mono">DATA STATE</span>
                            <span className="font-mono text-xs font-bold text-emerald-500 mt-0.5 block">Normal</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer panel controls */}
                <div className="flex gap-4 p-6 border-t border-slate-200/60 dark:border-slate-800/60 bg-slate-50 dark:bg-slate-950/40">
                  <button 
                    type="button"
                    onClick={() => setShowProfileModal(false)}
                    className="flex-1 py-2.5 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer text-center"
                  >
                    Close Settings
                  </button>
                  {activeProfileTab !== 'access' ? (
                    <button 
                      type="submit"
                      className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/10"
                    >
                      <Check className="w-3.5 h-3.5" />
                      Save changes
                    </button>
                  ) : (
                    <div className="flex-1 text-center py-2 text-[10px] text-slate-450 font-mono self-center">
                      Credentials and clearence logs active
                    </div>
                  )}
                </div>
              </form>
            </motion.div>
          </div>
        )}

      </main>
    </div>
  );
}
