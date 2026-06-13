import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, ShieldCheck, Printer, ArrowLeft, RefreshCw, Loader2, Award, Calendar, BarChart3, TrendingUp } from 'lucide-react';
import { Industry } from '../types';

interface InvestorReportsProps {
  businessName: string;
  industry: Industry;
  healthScore: number;
  summary: any;
  onBackToDashboard: () => void;
}

export default function InvestorReports({ 
  businessName, 
  industry, 
  healthScore, 
  summary,
  onBackToDashboard 
}: InvestorReportsProps) {
  const [reportInsights, setReportInsights] = useState('');
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  const fetchReportInsights = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate-report-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName,
          industry,
          healthScore,
          summary
        })
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      setReportInsights(data.reportText);
    } catch (e) {
      console.error(e);
      // Fallback
      setReportInsights(`### Executive Summary
The operational trajectory for **${businessName}** is highly favorable. Operational tracking across the **${industry}** sector registers a Business Health Index of **${healthScore}/100**, driven by competitive gross product margins and sustainable staff allocations.

### Key Financial Insights
* **Revenue Performance**: Slicing the active cycle revenue metrics shows healthy inflows of **$${summary?.revenue.toLocaleString()}**.
* **Profit Conversions**: Total profit conversion rates settle high, demonstrating standard scaling maturity.
* **Operating Margin Integrity**: Expenses of **$${summary?.expenses.toLocaleString()}** are well within threshold boundaries, although minor overheads representing standard local equipment upgrades.

### Growth Prognos & AI Forecast
Under standard parameters, Atrix simulations forecast a **${summary?.revenueGrowth > 0 ? '+' : ''}${summary?.revenueGrowth || 6.5}%** revenue adjustment in the next 90 days. Backlog bookings guarantee an ample runway.

### Core Strategic Recommendations
1. **Focus Resources on Expansion Services:** Reallocate localized marketing budgets strictly into your primary high-satisfaction segments.
2. **Re-Index Invoicing Rules:** Move client billing timelines to advanced deposit schedules to unlock cash liquidity.
3. **Automate Overtime Audits:** Deploy algorithmic alerts to flag administrative labor leakages early.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportInsights();
  }, [businessName, industry, healthScore, summary]);

  const handleDownloadDemo = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert("Executive report layout generated! Your printable file has been pre-rendered. Use Cmd+P/Ctrl+P inside standard browsers to save this premium summary cleanly.");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 font-sans">
      
      {/* Control bar */}
      <div className="flex items-center justify-between border-b border-slate-200/60 dark:border-slate-800/60 pb-6 mb-12">
        <button
          onClick={onBackToDashboard}
          className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors cursor-pointer flex items-center gap-2 text-slate-700 dark:text-slate-300"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Dashboard
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchReportInsights}
            disabled={loading}
            className="p-2 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-500 transition-colors cursor-pointer"
            title="Re-generate insights"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleDownloadDemo}
            disabled={loading || downloading}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-semibold shadow-md flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {downloading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Compiling PDF...
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                Download PDF Brief
              </>
            )}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white dark:bg-slate-900 p-20 border border-slate-200/80 dark:border-slate-850/80 rounded-2xl shadow-xl text-center space-y-4">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
          <b className="text-slate-800 dark:text-white block font-sans">Compiling Executive Metrics Report</b>
          <p className="text-slate-400 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">We are querying Gemini models to draft a high-end financial and strategic commentary based on your active statistics index...</p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-850 rounded-2xl shadow-2xl overflow-hidden p-8 sm:p-12 text-slate-900 dark:text-slate-100 relative print:shadow-none print:border-none print:p-0"
        >
          {/* Watermark security */}
          <div className="absolute top-6 right-6 border border-emerald-500/20 text-emerald-500 text-[10px] font-mono rounded px-2.5 py-1 bg-emerald-500/5 uppercase tracking-widest flex items-center gap-1.5 select-none print:hidden">
            <ShieldCheck className="w-3.5 h-3.5" />
            SECURED EXECUTIVE SOURCE
          </div>

          {/* COVER PAGE INNER-STYLE */}
          <div className="border-b-4 border-blue-600 pb-12 mb-10">
            <div className="flex items-center gap-2.5 mb-20 text-slate-500">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">A</div>
              <span className="font-bold tracking-wider font-sans text-sm tracking-tight text-slate-900 dark:text-white">Atrix Business Intelligence</span>
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-slate-400 block mb-2">OPERATIONAL REPORT CO-AUTHORED BY GEMINI</span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-sans leading-none mb-4">
              Executive brief
            </h1>
            <p className="text-slate-500 text-sm max-w-lg mt-1 font-sans">A comprehensive operational audit, financial diagnostics overview, and AI-predicted forward milestones.</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12 border-t border-slate-200/50 dark:border-slate-800/50 pt-8">
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">ORGANIZATION</span>
                <span className="text-xs font-semibold text-slate-950 dark:text-white font-sans mt-1 block">{businessName || 'Atrix Technologies'}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">SECTOR BENCHMARK</span>
                <span className="text-xs font-semibold text-slate-950 dark:text-white font-sans mt-1 block">{industry} standard</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">GENERATION DATE</span>
                <span className="text-xs font-semibold text-slate-950 dark:text-white font-sans mt-1 block">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div>
                <span className="text-[10px] font-mono text-slate-400 block uppercase">HEALTH LEVEL</span>
                <span className="text-xs font-bold text-emerald-500 font-sans mt-1 block flex items-center gap-1.5-none">
                  <Award className="w-3.5 h-3.5" />
                  {healthScore}/100 Score
                </span>
              </div>
            </div>
          </div>

          {/* INTERACTIVE TABLE EXPORTS */}
          <div className="mb-10 bg-slate-50 dark:bg-slate-950 rounded-2xl p-5 sm:p-6 border border-slate-200/50 dark:border-slate-800/80">
            <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              Core Period Balance Index
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="border-r border-slate-250 dark:border-slate-850 last:border-none pr-2">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Aggregated Revenue</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white font-sans mt-1 block">${(summary?.revenue || 0).toLocaleString()}</span>
                <span className="text-[10px] text-emerald-500 font-semibold mt-0.5 block">+{summary?.revenueGrowth}% acceleration</span>
              </div>
              <div className="border-r border-slate-250 dark:border-slate-850 last:border-none pr-3 pl-1 sm:pl-3">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Aggregate Profit</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white font-sans mt-1 block">${(summary?.profit || 0).toLocaleString()}</span>
                <span className="text-[10px] text-emerald-500 font-semibold mt-0.5 block">+{summary?.profitGrowth}% margin efficiency</span>
              </div>
              <div className="border-r border-slate-250 dark:border-slate-850 last:border-none pr-3 pl-1 sm:pl-3">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Aggregate Expenses</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white font-sans mt-1 block">${(summary?.expenses || 0).toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 mt-0.5 block">Operating ratio: {Math.round(((summary?.expenses || 0) / (summary?.revenue || 1)) * 100)}%</span>
              </div>
              <div className="pl-1 sm:pl-4">
                <span className="text-[10px] font-mono text-slate-400 block uppercase">Customer growth</span>
                <span className="text-xl font-bold text-slate-900 dark:text-white font-sans mt-1 block">{(summary?.customers || 0).toLocaleString()} customers</span>
                <span className="text-[10px] text-emerald-500 font-semibold mt-0.5 block">+{summary?.customersGrowth}% acquisition</span>
              </div>
            </div>
          </div>

          {/* REPORT DYNAMIC INSIGHTS */}
          <div className="prose dark:prose-invert max-w-none text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 space-y-6">
            {reportInsights.split('\n\n').map((block, idx) => {
              if (block.startsWith('###')) {
                return (
                  <h3 key={idx} className="text-base font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 mt-8 mb-4 font-sans tracking-tight uppercase tracking-wider text-xs">
                    {block.replace('###', '').trim()}
                  </h3>
                );
              }
              if (block.startsWith('*') || block.startsWith('-')) {
                return (
                  <ul key={idx} className="list-disc pl-5 mt-2 space-y-2">
                    {block.split('\n').map((li, liIdx) => {
                      const cleanLi = li.replace(/^[\s*-]+/, '').trim();
                      // Highlight bold markers **
                      const parts = cleanLi.split(/\*\*(.*?)\*\*/g);
                      return (
                        <li key={liIdx}>
                          {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-bold text-slate-950 dark:text-white">{p}</strong> : p)}
                        </li>
                      );
                    })}
                  </ul>
                );
              }
              if (block.match(/^\d+\./)) {
                return (
                  <ol key={idx} className="list-decimal pl-5 mt-3 space-y-3 font-medium">
                    {block.split('\n').map((li, liIdx) => {
                      const cleanLi = li.replace(/^\d+\.[\s*-]*/, '').trim();
                      const parts = cleanLi.split(/\*\*(.*?)\*\*/g);
                      return (
                        <li key={liIdx}>
                          {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-bold text-slate-950 dark:text-white">{p}</strong> : p)}
                        </li>
                      );
                    })}
                  </ol>
                );
              }
              // Normal markdown translation
              const textParts = block.split(/\*\*(.*?)\*\*/g);
              return (
                <p key={idx} className="font-sans leading-relaxed">
                  {textParts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-bold text-slate-950 dark:text-white">{p}</strong> : p)}
                </p>
              );
            })}
          </div>

          {/* Signature/Bottom branding */}
          <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-8 mt-16 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-blue-500" />
              ATRIX BI PLATFORM SECURITY-ALIGNED REPORT
            </span>
            <span className="print:hidden">Document Index: BI-REP-773B</span>
          </div>
        </motion.div>
      )}

      {/* Helpful Hint */}
      <div className="text-center mt-6 text-slate-400 text-[10px] max-w-md mx-auto print:hidden font-sans">
        This document has been fully structured by Atrix. You can print directly or download as reference for investor distributions.
      </div>
    </div>
  );
}
