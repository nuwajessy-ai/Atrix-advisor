import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, X, Send, Sparkles, HelpCircle, ArrowRight, CornerDownLeft, 
  TrendingDown, FileText, ChevronDown, RefreshCcw, Loader2
} from 'lucide-react';
import { Message } from '../types';

interface AIChatProps {
  businessContext: {
    businessName: string;
    industry: string;
    employees: number;
    monthlyRevenue: number;
    goals: string[];
    summary: any;
  };
}

export default function AIChat({ businessContext }: AIChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hello! I am your Atrix AI Business Advisor. I have fully indexed the financial datasets for **${businessContext.businessName}**. \n\nYou can ask me specific questions regarding your profitability metrics, expense concerns, or expansion runways. What should we analyze today?`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Suggested standard questions
  const suggestions = [
    { text: "Why did profit decrease?", icon: TrendingDown },
    { text: "What should I improve?", icon: Sparkles },
    { text: "Can I hire another employee?", icon: FileText },
    { text: "What happens if marketing increases by 20%?", icon: CornerDownLeft }
  ];

  // Auto scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg],
          context: businessContext
        })
      });

      if (!response.ok) throw new Error('API server error');
      const data = await response.json();

      setMessages(prev => [...prev, {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.text || "I was unable to fully process that query right now.",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        sender: 'ai',
        text: "I experienced a slight glitch communicating with the Atrix AI servers. Let's try sending that question again.",
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            layoutId="chat-box"
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white flex items-center justify-center shadow-xl shadow-indigo-500/25 cursor-pointer relative"
          >
            <MessageSquare className="w-6 h-6" />
            <div className="absolute top-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-slate-50 rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Chat Modal Overlay/Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layoutId="chat-box"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[360px] sm:w-[420px] h-[550px] bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-850/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col backdrop-blur-md"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm leading-tight">Atrix AI Business Advisor</h4>
                  <span className="text-[10px] text-indigo-100 flex items-center gap-1.5 mt-0.5 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                    CONNECTED TO SYSTEM SECUREMENT API
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors cursor-pointer text-white"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Chat Area */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/40"
            >
              {messages.map((m) => {
                const isAi = m.sender === 'ai';
                return (
                  <div 
                    key={m.id}
                    className={`flex items-start gap-2.5 ${!isAi ? 'flex-row-reverse' : ''}`}
                  >
                    {isAi && (
                      <div className="w-6.5 h-6.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 text-xs font-bold leading-none mt-1 shadow-sm border border-blue-200/40 dark:border-blue-800/40">
                        AI
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      isAi 
                        ? 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200/40 dark:border-slate-800/80 shadow-sm' 
                        : 'bg-blue-600 text-white font-medium rounded-tr-none'
                    }`}>
                      {/* Very simple custom markdown rendering for bold ** and headers */}
                      {m.text.split('\n').map((line, lIdx) => {
                        // Check for heading ###
                        if (line.startsWith('###')) {
                          return <h4 key={lIdx} className="font-semibold text-xs text-slate-900 dark:text-white mt-3 mb-1">{line.replace('###', '').trim()}</h4>;
                        }
                        // Simple bold replacement
                        const parts = line.split(/\*\*(.*?)\*\*/g);
                        return (
                          <p key={lIdx} className={lIdx > 0 ? 'mt-2' : ''}>
                            {parts.map((part, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-bold text-slate-950 dark:text-white">{part}</strong> : part)}
                          </p>
                        );
                      })}
                      <span className="text-[9px] text-slate-400 block mt-1 text-right">{m.timestamp}</span>
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-start gap-2.5">
                  <div className="w-6.5 h-6.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0 text-xs font-bold leading-none mt-1 animate-pulse">
                    AI
                  </div>
                  <div className="bg-white dark:bg-slate-900 border border-slate-200/40 dark:border-slate-800/80 rounded-2xl px-4 py-3 text-xs text-slate-400 flex items-center gap-2 shadow-sm italic">
                    <Loader2 className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                    Running business model regressions...
                  </div>
                </div>
              )}
            </div>

            {/* Micro Suggestions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-2">Suggested Core Queries</span>
                <div className="grid grid-cols-1 gap-1.5">
                  {suggestions.map((sug, idx) => {
                    const Icon = sug.icon;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleSend(sug.text)}
                        className="w-full text-left bg-slate-50 hover:bg-blue-50/50 dark:bg-slate-950 dark:hover:bg-blue-950/20 border border-slate-200 dark:border-slate-850 px-3 py-2 rounded-xl text-[11px] text-slate-600 dark:text-slate-350 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <Icon className="w-3.5 h-3.5 text-blue-500" />
                        <span>{sug.text}</span>
                        <ArrowRight className="w-3 h-3 text-slate-400 ml-auto" />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <form 
              onSubmit={handleSubmit}
              className="p-3 border-t border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 flex gap-2 items-center"
            >
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask Atrix Advisor a question..."
                className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 px-4 py-2.5 text-xs rounded-xl outline-none focus:border-blue-500 text-slate-800 dark:text-white"
              />
              <button 
                type="submit"
                disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-100 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 flex items-center justify-center transition-all cursor-pointer flex-shrink-0 shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
