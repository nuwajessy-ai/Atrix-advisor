import { Industry, MetricPoint, Goal, SmartAlert, AIInsight, InvestorReport } from './types';

// Business Health Score calculator
export function calculateHealthScore(metrics: MetricPoint[], goals: Goal[], alerts: SmartAlert[]): number {
  if (metrics.length === 0) return 75;
  
  const latest = metrics[metrics.length - 1];
  const previous = metrics[Math.max(0, metrics.length - 2)];
  
  // 1. Profit Margin Score (ideal > 15-20%)
  const margin = latest.revenue > 0 ? (latest.profit / latest.revenue) * 100 : 0;
  let marginScore = Math.min(100, Math.max(0, margin * 2.5)); // 40% margin = 100 score
  
  // 2. Growth Score
  const revenueGrowth = previous.revenue > 0 ? ((latest.revenue - previous.revenue) / previous.revenue) * 100 : 0;
  let growthScore = 50 + revenueGrowth * 5; // positive growth increases score
  growthScore = Math.min(100, Math.max(0, growthScore));
  
  // 3. Goal Progress Score
  const avgGoalProgress = goals.length > 0 
    ? goals.reduce((sum, g) => sum + g.progress, 0) / goals.length 
    : 80;
  
  // 4. Alerts penalty
  const alertPenalty = alerts.reduce((penalty, alert) => {
    if (alert.severity === 'error') return penalty + 8;
    if (alert.severity === 'warning') return penalty + 4;
    return penalty + 1;
  }, 0);
  
  const score = (marginScore * 0.35) + (growthScore * 0.3) + (avgGoalProgress * 0.35) - alertPenalty;
  return Math.min(100, Math.max(10, Math.round(score)));
}

// Dummy standard queries & high-quality static responses for when API key is missing
export const fallbackResponses: { question: string; answer: string }[] = [
  {
    question: "Why did profit decrease?",
    answer: "Our analytics engine shows that while your monthly top-line revenue maintained solid momentum, operating expenses rose by 14.2% over the last fiscal period. This compression was primarily driven by standard seasonal marketing acquisitions (+22%) and localized SaaS tooling upgrades. Increasing user conversion margins will help recover standard gross profitability."
  },
  {
    question: "What should I improve?",
    answer: "1. **Optimize Operating Expenses:** Consolidate external developer toolkits currently running over budget. \n2. **Nurture High-Margin Clients:** Focus customer success resources strictly on account tier expansions where gross margin stands at 84%. \n3. **Improve Cash Conversion Cycle:** Shorten invoice windows from Net-45 down to Net-30 to sustain positive physical cash runway."
  },
  {
    question: "Can I hire another employee?",
    answer: "Looking at your current positive cash flow trend ($34.2K surplus) and steady 6.2% month-over-month growth, you possess a reliable, low-risk hiring window. We recommend allocating a max salary of $85K/year (approx. $7,100/mo fully loaded) to ensure you maintain a minimum of 4.5 months cash runway."
  },
  {
    question: "What happens if marketing increases by 20%?",
    answer: "A strategic $5k/month (20%) increase in marketing spending is estimated to drive client acquisition velocities upwards by 12-15%. Based on your standard LTV of $3,200 and CAC of $450, this shift should comfortably generate an incremental $18.4K in net profit within 90 days, yielding a clear 360% ROI."
  }
];

// Rich datasets for industries
export const industryPresets: Record<Industry, {
  metrics: MetricPoint[];
  goals: Goal[];
  alerts: SmartAlert[];
  insights: AIInsight[];
}> = {
  SaaS: {
    metrics: [
      { date: '2025-07', label: 'Jul', revenue: 72000, profit: 54000, expenses: 18000, cashFlow: 12000, customers: 310 },
      { date: '2025-08', label: 'Aug', revenue: 78000, profit: 58500, expenses: 19500, cashFlow: 14000, customers: 340 },
      { date: '2025-09', label: 'Sep', revenue: 84000, profit: 63000, expenses: 21000, cashFlow: 16500, customers: 382 },
      { date: '2025-10', label: 'Oct', revenue: 91000, profit: 65000, expenses: 26000, cashFlow: 18000, customers: 425 },
      { date: '2025-11', label: 'Nov', revenue: 98000, profit: 71000, expenses: 27000, cashFlow: 21000, customers: 490 },
      { date: '2025-12', label: 'Dec', revenue: 112000, profit: 82000, expenses: 30000, cashFlow: 29000, customers: 560 },
      { date: '2026-01', label: 'Jan', revenue: 118000, profit: 86000, expenses: 32000, cashFlow: 25000, customers: 595 },
      { date: '2026-02', label: 'Feb', revenue: 125000, profit: 91000, expenses: 34000, cashFlow: 28000, customers: 640 },
      { date: '2026-03', label: 'Mar', revenue: 134000, profit: 98000, expenses: 36000, cashFlow: 32000, customers: 685 },
      { date: '2026-04', label: 'Apr', revenue: 142000, profit: 104000, expenses: 38000, cashFlow: 35000, customers: 720 },
      { date: '2026-05', label: 'May', revenue: 149000, profit: 107000, expenses: 42000, cashFlow: 38000, customers: 775 },
      { date: '2026-06', label: 'Jun', revenue: 160000, profit: 114000, expenses: 46000, cashFlow: 44000, customers: 850 }
    ],
    goals: [
      { id: 'g1', title: 'Reach $200k MRR', type: 'revenue', target: 200000, current: 160000, unit: '$', deadline: '2026-12-31', progress: 80, estimatedCompletion: '2026-11-15', status: 'on_track' },
      { id: 'g2', title: 'Optimize Infrastructure Bills', type: 'expenses', target: 35000, current: 46000, unit: '$', deadline: '2026-09-30', progress: 30, estimatedCompletion: '2026-10-10', status: 'at_risk' },
      { id: 'g3', title: 'Hire Senior Architect', type: 'hiring', target: 1, current: 0, unit: 'p', deadline: '2026-08-31', progress: 50, estimatedCompletion: '2026-08-15', status: 'on_track' },
      { id: 'g4', title: 'Launch Enterprise Tier', type: 'product_launch', target: 100, current: 100, unit: '%', deadline: '2026-06-01', progress: 100, estimatedCompletion: '2026-05-24', status: 'completed' }
    ],
    alerts: [
      { id: 'a1', type: 'expenses_rise', title: 'Infrastructure Costs Rising', message: 'SaaS server compute usage increased by 18.4% last week.', severity: 'warning', recommendation: 'Review AWS Auto-scaling rules and container reservations.', impactOnScore: 3 },
      { id: 'a2', type: 'customer_decline', title: 'Churn Alert in Small Business Tier', message: 'Small biz subscription churn rose to 4.2% this month.', severity: 'error', recommendation: 'Initiate auto-discount campaign or customer satisfaction feedback loops.', impactOnScore: 5 }
    ],
    insights: [
      {
        id: 'i1',
        category: 'win',
        title: 'Outstanding Net Revenue Retention',
        what: 'Net revenue retention surged to an industry-leading 114% this quarter.',
        why: 'Expansion sales and up-selling in Enterprise brackets outperformed primary customer acquisitions.',
        recommendation: 'Increase emphasis on existing customer success and structured account upgrade campaigns.',
        estimatedImpact: '+18% ARR Expansion'
      },
      {
        id: 'i2',
        category: 'improvement',
        title: 'High Trial Churn Index',
        what: 'Self-serve premium trials are dropping off inside 7 days after setup.',
        why: 'Complex setup steps are causing onboarding bottlenecks inside the core product module.',
        recommendation: 'Simplify initial steps and inject dynamic product tutorials to decrease friction.',
        estimatedImpact: '+22% Trial Conversion'
      },
      {
        id: 'i3',
        category: 'risk',
        title: 'Hosting Expense Spillover',
        what: 'Database backup clusters are outpacing budgeted levels by $4,200.',
        why: 'Redundant developer logs are being archived on premium high-availability clusters.',
        recommendation: 'Establish an automated lifecycle script to transfer cold log data of > 14 days to standard S3 cold tiers.',
        estimatedImpact: '-$35,000 yearly overhead'
      },
      {
        id: 'i4',
        category: 'opportunity',
        title: 'Expansion of EMEA Markets',
        what: 'Incoming visual click traffic from Southern Europe rose 45%.',
        why: 'Localized marketing channels and active review platforms are ranking your SaaS highly.',
        recommendation: 'Deploy basic translated landing pages and adapt region-specific pricing presets.',
        estimatedImpact: '+12% global growth'
      },
      {
        id: 'i5',
        category: 'forecast',
        title: 'Strong End-of-Year Acceleration',
        what: 'Current revenue vectors indicate solid, low-risk margins.',
        why: 'Compounding software subscriptions are generating exponential momentum.',
        recommendation: 'Expand sales pipelines to safely absorb heavier growth volumes.',
        estimatedImpact: '$2.1M run-rate forecast'
      }
    ]
  },
  'E-commerce': {
    metrics: [
      { date: '2025-07', label: 'Jul', revenue: 98000, profit: 34000, expenses: 64000, cashFlow: 15000, customers: 1100 },
      { date: '2025-08', label: 'Aug', revenue: 105000, profit: 36000, expenses: 69000, cashFlow: 12000, customers: 1250 },
      { date: '2025-09', label: 'Sep', revenue: 112000, profit: 39000, expenses: 73000, cashFlow: 18000, customers: 1320 },
      { date: '2025-10', label: 'Oct', revenue: 125000, profit: 45000, expenses: 80000, cashFlow: 22000, customers: 1500 },
      { date: '2025-11', label: 'Nov', revenue: 185000, profit: 72000, expenses: 113000, cashFlow: 54000, customers: 2400 },
      { date: '2025-12', label: 'Dec', revenue: 210000, profit: 89000, expenses: 121000, cashFlow: 65000, customers: 2840 },
      { date: '2026-01', label: 'Jan', revenue: 110000, profit: 38000, expenses: 72000, cashFlow: -15000, customers: 1400 },
      { date: '2026-02', label: 'Feb', revenue: 115000, profit: 40000, expenses: 75000, cashFlow: 8000, customers: 1450 },
      { date: '2026-03', label: 'Mar', revenue: 128000, profit: 46000, expenses: 82000, cashFlow: 14000, customers: 1610 },
      { date: '2026-04', label: 'Apr', revenue: 135000, profit: 49000, expenses: 86000, cashFlow: 19000, customers: 1750 },
      { date: '2026-05', label: 'May', revenue: 142000, profit: 51000, expenses: 91000, cashFlow: 21000, customers: 1840 },
      { date: '2026-06', label: 'Jun', revenue: 152000, profit: 55000, expenses: 97000, cashFlow: 24000, customers: 1990 }
    ],
    goals: [
      { id: 'eg1', title: 'Reduce Abandoned Cart rate to 60%', type: 'expenses', target: 60, current: 68, unit: '%', deadline: '2026-09-30', progress: 45, estimatedCompletion: '2026-10-01', status: 'on_track' },
      { id: 'eg2', title: 'Open European Fulfilment Hub', type: 'branch', target: 1, current: 0, unit: 'hub', deadline: '2026-11-30', progress: 20, estimatedCompletion: '2026-12-15', status: 'at_risk' },
      { id: 'eg3', title: 'Complete site redesign launch', type: 'product_launch', target: 1, current: 1, unit: 'app', deadline: '2026-05-15', progress: 100, estimatedCompletion: '2026-05-10', status: 'completed' }
    ],
    alerts: [
      { id: 'ea1', type: 'inventory_shortage', title: 'Trending Inventory Shortage', message: 'Best-selling leather wallets are estimated to stock-out in 9 days.', severity: 'error', recommendation: 'Place priority reorder batch with our domestic supplier today.', impactOnScore: 6 },
      { id: 'ea2', type: 'revenue_slow', title: 'Average Order Value (AOV) dipped 5%', message: 'AOV decreased from $88.50 to $84.10 over the past 14 days.', severity: 'warning', recommendation: 'Introduce smart buy-one-get-one promotions or shopping cart threshold discounts.', impactOnScore: 3 }
    ],
    insights: [
      {
        id: 'ei1',
        category: 'win',
        title: 'High Mobile Checkout Completion',
        what: 'Mobile cart friction reduced by 34% leading to record conversions.',
        why: 'Integration of single-tap Apple Pay & Google Pay at checkout reduced conversion effort.',
        recommendation: 'Ensure high-speed mobile media layouts are perfectly sustained.',
        estimatedImpact: '+$42,000 monthly revenue'
      },
      {
        id: 'ei2',
        category: 'improvement',
        title: 'Heavy Ad Spend Spillover',
        what: 'Meta ROAS index softened down to 1.8x from previous 2.4x target.',
        why: 'Competitive ad bidding and audience fatigue are driving up standard acquisition overhead.',
        recommendation: 'Rotate visual creatives and expand search intent keywords into organic search engine marketing.',
        estimatedImpact: '+$18,000 ad efficiency savings'
      },
      {
        id: 'ei3',
        category: 'risk',
        title: 'Supplier Cost Increase Squeeze',
        what: 'Packaging material supplier announced an upcoming 14% tariff rise.',
        why: 'International cargo tariffs and standard shipping freight rates are climbing.',
        recommendation: 'Perform packaging design optimization to reduce weight, or explore alternative local packaging providers.',
        estimatedImpact: 'Saves 3.5% store gross profit margins'
      },
      {
        id: 'ei4',
        category: 'opportunity',
        title: 'Post-Purchase Retargeting Strategy',
        what: 'Customers on second transactions are generating 40% higher cart baskets.',
        why: 'A loyal user base trusts premium collection quality and service.',
        recommendation: 'Deploy email post-purchase loyalty coupons and exclusive tier invitations after initial orders.',
        estimatedImpact: '+15% Customer Lifetime Value'
      },
      {
        id: 'ei5',
        category: 'forecast',
        title: 'Record Q4 Seasonal Demand Expected',
        what: 'Trend algorithms forecast an monumental holiday season (up to $450K Q4 revenue).',
        why: 'Sustained user acquisition loops and upcoming exclusive lines are driving robust interest.',
        recommendation: 'Acquire high volume logistics runway securely ahead of late October.',
        estimatedImpact: 'Guarantees perfect checkout deliveries'
      }
    ]
  },
  Manufacturing: {
    metrics: [
      { date: '2025-07', label: 'Jul', revenue: 220000, profit: 24000, expenses: 196000, cashFlow: -18000, customers: 34 },
      { date: '2025-08', label: 'Aug', revenue: 230000, profit: 26000, expenses: 204000, cashFlow: 45000, customers: 35 },
      { date: '2025-09', label: 'Sep', revenue: 215000, profit: 21000, expenses: 194000, cashFlow: 12000, customers: 35 },
      { date: '2025-10', label: 'Oct', revenue: 240000, profit: 28000, expenses: 212000, cashFlow: 28000, customers: 36 },
      { date: '2025-11', label: 'Nov', revenue: 250000, profit: 31000, expenses: 219000, cashFlow: 31000, customers: 38 },
      { date: '2025-12', label: 'Dec', revenue: 270000, profit: 34000, expenses: 236000, cashFlow: -50000, customers: 40 },
      { date: '2026-01', label: 'Jan', revenue: 235000, profit: 24000, expenses: 211000, cashFlow: 85000, customers: 41 },
      { date: '2026-02', label: 'Feb', revenue: 245000, profit: 25000, expenses: 220000, cashFlow: 18000, customers: 41 },
      { date: '2026-03', label: 'Mar', revenue: 260000, profit: 29000, expenses: 231000, cashFlow: 24000, customers: 43 },
      { date: '2026-04', label: 'Apr', revenue: 275000, profit: 32000, expenses: 243000, cashFlow: 29000, customers: 45 },
      { date: '2026-05', label: 'May', revenue: 285000, profit: 34000, expenses: 251000, cashFlow: 35000, customers: 48 },
      { date: '2026-06', label: 'Jun', revenue: 300000, profit: 38000, expenses: 262000, cashFlow: 41000, customers: 52 }
    ],
    goals: [
      { id: 'mg1', title: 'Complete Plant 2 Upgrade', type: 'branch', target: 100, current: 75, unit: '%', deadline: '2026-10-31', progress: 75, estimatedCompletion: '2026-10-15', status: 'on_track' },
      { id: 'mg2', title: 'Bring down material scrap rate to 1.5%', type: 'expenses', target: 1.5, current: 2.4, unit: '%', deadline: '2026-08-31', progress: 60, estimatedCompletion: '2026-08-20', status: 'on_track' },
      { id: 'mg3', title: 'Secure 10 new strategic industrial distributors', type: 'revenue', target: 10, current: 6, unit: 'dist', deadline: '2026-12-31', progress: 60, estimatedCompletion: '2027-01-15', status: 'at_risk' }
    ],
    alerts: [
      { id: 'ma1', type: 'cashflow_risk', title: 'Extended Receivables Lag', message: 'Outstanding account bills from distributors hit 58 days (target: 45).', severity: 'error', recommendation: 'Initiate automated invoicing reminders & pre-payment incentives.', impactOnScore: 5 },
      { id: 'ma2', type: 'inventory_shortage', title: 'Raw Steel Supply Bottleneck', message: 'Primary steel batch delivery delayed by custom log-jamb by 14 days.', severity: 'warning', recommendation: 'Engage alternative secondary local supply contracts immediately.', impactOnScore: 3 }
    ],
    insights: [
      {
        id: 'mi1',
        category: 'win',
        title: 'CNC Automation Deployment Success',
        what: 'Average manufacturing tooling times decreased by 18%.',
        why: 'Integration of state-of-the-art automatic loading docks went live smoothly.',
        recommendation: 'Transition secondary fabrication tracks into automated CNC queues.',
        estimatedImpact: 'Reduces hourly direct labor expenses'
      },
      {
        id: 'mi2',
        category: 'improvement',
        title: 'High Machine Down-time in Assembly',
        what: 'Assembly segment saw 12 hours of unexpected down-time this month.',
        why: 'Stale pneumatic components failed due to deferred equipment maintenance.',
        recommendation: 'Implement proactive, scheduled weekend sensor checks to replace wear parts.',
        estimatedImpact: 'Saves $15,000 monthly output'
      },
      {
        id: 'mi3',
        category: 'risk',
        title: 'Fuel & Utility Price Volatility',
        what: 'Industrial gas expenditure exceeded monthly budget projections by 8.5%.',
        why: 'Seasonal utility tariff grids are re-indexing across early summer.',
        recommendation: 'Lock in firm utility price contracts for the next 18 months.',
        estimatedImpact: 'Shields operating margins from spikes'
      },
      {
        id: 'mi4',
        category: 'opportunity',
        title: 'Aviation Sector Integration',
        what: 'Direct requests for certified precision aluminum blocks climbed 60%.',
        why: 'Aviation supply chains are seeking alternative ISO9001 certified mills.',
        recommendation: 'Fast-track premium aerospace fabrication certifications.',
        estimatedImpact: 'Generates up to $1.2M pipeline value'
      },
      {
        id: 'mi5',
        category: 'forecast',
        title: 'Stable Scale into Q1 2027',
        what: 'Contracts backlogs assure high-capacity manufacturing runs.',
        why: 'Long-term corporate relationship agreements are fully booked.',
        recommendation: 'Begin planning next-stage capital expansions for plant tooling.',
        estimatedImpact: 'Enables 25% year-over-year production capacity'
      }
    ]
  },
  Consulting: {
    metrics: [
      { date: '2025-07', label: 'Jul', revenue: 45000, profit: 32000, expenses: 13000, cashFlow: 15000, customers: 12 },
      { date: '2025-08', label: 'Aug', revenue: 48000, profit: 34000, expenses: 14000, cashFlow: -5000, customers: 13 },
      { date: '2025-09', label: 'Sep', revenue: 52000, profit: 37000, expenses: 15000, cashFlow: 22000, customers: 14 },
      { date: '2025-10', label: 'Oct', revenue: 60000, profit: 42000, expenses: 18000, cashFlow: 14000, customers: 15 },
      { date: '2025-11', label: 'Nov', revenue: 64000, profit: 45000, expenses: 19000, cashFlow: 18000, customers: 16 },
      { date: '2025-12', label: 'Dec', revenue: 55000, profit: 38000, expenses: 17000, cashFlow: -12000, customers: 15 },
      { date: '2026-01', label: 'Jan', revenue: 68000, profit: 48000, expenses: 20000, cashFlow: 35000, customers: 18 },
      { date: '2026-02', label: 'Feb', revenue: 72000, profit: 51000, expenses: 21000, cashFlow: 12000, customers: 19 },
      { date: '2026-03', label: 'Mar', revenue: 78000, profit: 55000, expenses: 23000, cashFlow: 19000, customers: 21 },
      { date: '2026-04', label: 'Apr', revenue: 84000, profit: 59000, expenses: 25000, cashFlow: 22000, customers: 22 },
      { date: '2026-05', label: 'May', revenue: 90000, profit: 63000, expenses: 27000, cashFlow: 24000, customers: 24 },
      { date: '2026-06', label: 'Jun', revenue: 98000, profit: 69000, expenses: 29000, cashFlow: 28000, customers: 27 }
    ],
    goals: [
      { id: 'cg1', title: 'Bring average client contract to $15k', type: 'revenue', target: 15000, current: 12400, unit: '$', deadline: '2026-12-31', progress: 75, estimatedCompletion: '2026-11-20', status: 'on_track' },
      { id: 'cg2', title: 'Hire senior managing consultant', type: 'hiring', target: 1, current: 0, unit: 'person', deadline: '2026-08-31', progress: 20, estimatedCompletion: '2026-09-10', status: 'at_risk' },
      { id: 'cg3', title: 'Launch proprietary training course', type: 'product_launch', target: 100, current: 100, unit: '%', deadline: '2026-05-30', progress: 100, estimatedCompletion: '2026-05-28', status: 'completed' }
    ],
    alerts: [
      { id: 'ca1', type: 'revenue_slow', title: 'Proposal pipeline bottleneck', message: 'Outstanding proposals stuck in review stage for over 21 days is up 15%.', severity: 'warning', recommendation: 'Schedule active follow-ups or coordinate design scoping alignment sessions.', impactOnScore: 3 },
      { id: 'ca2', type: 'cashflow_risk', title: 'Low Retainer Utilisation', message: 'Three retainer accounts will terminate or trigger autorenew checks in under 15 days.', severity: 'error', recommendation: 'Deliver immediate work audits showing valuable contributions to secure renewals.', impactOnScore: 4 }
    ],
    insights: [
      {
        id: 'ci1',
        category: 'win',
        title: 'Premium Advisory Dominance',
        what: 'Strategic boardroom consulting hours yielded active margins of 79.5%.',
        why: 'Core advisory packages pricing has been correctly adjusted upward reflect massive market value.',
        recommendation: 'Position company communications strictly around premium performance turnarounds.',
        estimatedImpact: 'Sustains top tier profit levels safely'
      },
      {
        id: 'ci2',
        category: 'improvement',
        title: 'Inefficient Project Resource Auditing',
        what: 'Small custom client delivery times are exceeding estimates by 12%.',
        why: 'Scope creep is occurring due to loosely structured communication rules on messaging slots.',
        recommendation: 'Strictly enforce predefined revision allowances in core service contracts.',
        estimatedImpact: 'Recovers 40 lost consulting hours'
      },
      {
        id: 'ci3',
        category: 'risk',
        title: 'Founder Independence Index Key Risk',
        what: 'Founder hours represent 72% of client delivery touchpoints.',
        why: 'The firm has historically struggled to delegate corporate customer relationships.',
        recommendation: 'Onboard senior account executives with heavy business presence.',
        estimatedImpact: 'Generates business saleable value'
      },
      {
        id: 'ci4',
        category: 'opportunity',
        title: 'Subscription Service Models',
        what: 'Clients are requesting continuous fractional advising schedules.',
        why: 'Modern leadership seeks persistent, agile advisors rather than static project timelines.',
        recommendation: 'Package custom fractions advisory roles as recurring annual subscriptions.',
        estimatedImpact: 'Establishes high quality predictable cash'
      },
      {
        id: 'ci5',
        category: 'forecast',
        title: 'Record Advisory Revenue Runway',
        what: 'Current pipeline forecasts full capacity utilization across next winter.',
        why: 'Corporate transformation budgets are being deployed globally.',
        recommendation: 'Expand high quality associate networks to prevent burnout.',
        estimatedImpact: 'Sustains clean reputation'
      }
    ]
  },
  Healthcare: {
    metrics: [
      { date: '2025-07', label: 'Jul', revenue: 140000, profit: 21000, expenses: 119000, cashFlow: 8000, customers: 410 },
      { date: '2025-08', label: 'Aug', revenue: 142000, profit: 22000, expenses: 120000, cashFlow: -12000, customers: 425 },
      { date: '2025-09', label: 'Sep', revenue: 148000, profit: 24000, expenses: 124000, cashFlow: 14000, customers: 440 },
      { date: '2025-10', label: 'Oct', revenue: 155000, profit: 26000, expenses: 129000, cashFlow: 16000, customers: 462 },
      { date: '2025-11', label: 'Nov', revenue: 162000, profit: 29000, expenses: 133000, cashFlow: 18000, customers: 490 },
      { date: '2025-12', label: 'Dec', revenue: 175000, profit: 34000, expenses: 141000, cashFlow: 29000, customers: 530 },
      { date: '2026-01', label: 'Jan', revenue: 158000, profit: 24000, expenses: 134000, cashFlow: -25000, customers: 510 },
      { date: '2026-02', label: 'Feb', revenue: 161000, profit: 25000, expenses: 136000, cashFlow: 12000, customers: 524 },
      { date: '2026-03', label: 'Mar', revenue: 169000, profit: 28000, expenses: 141000, cashFlow: 16000, customers: 545 },
      { date: '2026-04', label: 'Apr', revenue: 176000, profit: 31000, expenses: 145000, cashFlow: 19000, customers: 570 },
      { date: '2026-05', label: 'May', revenue: 182000, profit: 33000, expenses: 149000, cashFlow: 21000, customers: 592 },
      { date: '2026-06', label: 'Jun', revenue: 194000, profit: 37000, expenses: 157000, cashFlow: 26000, customers: 630 }
    ],
    goals: [
      { id: 'hg1', title: 'Open satellite diagnostic suite', type: 'branch', target: 100, current: 85, unit: '%', deadline: '2026-09-30', progress: 85, estimatedCompletion: '2026-09-10', status: 'on_track' },
      { id: 'hg2', title: 'Reduce administrative overtime hours by 15%', type: 'expenses', target: 15, current: 8, unit: '%', deadline: '2026-08-31', progress: 50, estimatedCompletion: '2026-09-05', status: 'at_risk' },
      { id: 'hg3', title: 'Acquire high resolution ultrasound rig', type: 'product_launch', target: 1, current: 1, unit: 'rig', deadline: '2026-06-15', progress: 100, estimatedCompletion: '2026-06-01', status: 'completed' }
    ],
    alerts: [
      { id: 'ha1', type: 'cashflow_risk', title: 'Insurance claim delay surge', message: 'Medicare & insurance claim payouts averaged 44 days (target < 30 days).', severity: 'error', recommendation: 'Integrate clearinghouse claiming systems to clean submissions before post.', impactOnScore: 6 },
      { id: 'ha2', type: 'inventory_shortage', title: 'Surgical pack stock warnings', message: 'Disposable prep pack volumes fell below safety threshold level of 3 days.', severity: 'warning', recommendation: 'Release emergency reserve replenishment orders with backup regional suppliers.', impactOnScore: 3 }
    ],
    insights: [
      {
        id: 'hi1',
        category: 'win',
        title: 'Virtual Telehealth Scaled Cleanly',
        what: 'Digital visit volumes grew by 45% with nearly friction-free cost basis.',
        why: 'In-app booking automation and streamlined EHR chart updates eliminated administrative downtime.',
        recommendation: 'Sustain designated medical practitioners slots for virtual only consult hours.',
        estimatedImpact: 'Generates incremental $22,000 monthly overhead-free profit'
      },
      {
        id: 'hi2',
        category: 'improvement',
        title: 'High No-Show Clinic Penalties',
        what: 'In-person check-ups experienced an 11.2% patient no-show index.',
        why: 'Manual call confirmations are highly ineffective, often reaching passive voicemails.',
        recommendation: 'Engage in unified automated SMS confirmation & waitlist fill sequences.',
        estimatedImpact: 'Fills up to 28 open weekly scheduling slots'
      },
      {
        id: 'hi3',
        category: 'risk',
        title: 'Escalating Regulation Compliance Overhead',
        what: 'Compliance auditing service budgets rose 12%.',
        why: 'New localized electronic health record encryption compliance laws took effect.',
        recommendation: 'Consolidate compliance audits through certified software pipelines to avoid manual consultant retainer fees.',
        estimatedImpact: 'Saves $14,000 annually'
      },
      {
        id: 'hi4',
        category: 'opportunity',
        title: 'Corporate Wellness Subscriptions',
        what: 'Five regional mid-market employers requested customized wellness checks.',
        why: 'Employer branding and healthcare retention indices are heavily valued in modern markets.',
        recommendation: 'Design standardized corporate clinical packages billed on recurring annual retainers.',
        estimatedImpact: 'Brings predictable premium corporate revenues'
      },
      {
        id: 'hi5',
        category: 'forecast',
        title: 'Healthy Demands Trajectory',
        what: 'Local market analysis forecasts patient counts to expand reliably.',
        why: 'Aging demographics and excellent community trust ratings are driving retention.',
        recommendation: 'Recruit secondary practitioner resources ahead of high-winter seasons.',
        estimatedImpact: 'Saves service delivery timelines'
      }
    ]
  }
};

// Slice metrics, alerts, goals, insights by selected Range (7d, 30d, 90d, 6mo, 1y)
export function filterDataByRange(
  industry: Industry,
  range: '7d' | '30d' | '90d' | '6m' | '1y'
): {
  metrics: MetricPoint[];
  goals: Goal[];
  alerts: SmartAlert[];
  insights: AIInsight[];
  summary: {
    revenue: number;
    revenueGrowth: number;
    profit: number;
    profitGrowth: number;
    expenses: number;
    expensesGrowth: number;
    cashFlow: number;
    cashFlowGrowth: number;
    customers: number;
    customersGrowth: number;
  };
} {
  const preset = industryPresets[industry];
  let slicedMetrics = [...preset.metrics];
  
  if (range === '7d') {
    // Return last 3 items, representing days/weeks
    slicedMetrics = preset.metrics.slice(-3);
  } else if (range === '30d') {
    // Return last 6 items
    slicedMetrics = preset.metrics.slice(-6);
  } else if (range === '90d') {
    // Return last 8 items
    slicedMetrics = preset.metrics.slice(-8);
  } else if (range === '6m') {
    // Return last 6 items
    slicedMetrics = preset.metrics.slice(-6);
  } else {
    // 1y: full
    slicedMetrics = preset.metrics;
  }
  
  // Calculate aggregate metrics over the sliced period
  const totalRev = slicedMetrics.reduce((sum, m) => sum + m.revenue, 0);
  const totalProf = slicedMetrics.reduce((sum, m) => sum + m.profit, 0);
  const totalExp = slicedMetrics.reduce((sum, m) => sum + m.expenses, 0);
  const totalCash = slicedMetrics.reduce((sum, m) => sum + m.cashFlow, 0);
  const latestCustomers = slicedMetrics[slicedMetrics.length - 1]?.customers || 0;
  
  // Growth comparison (comparing last half vs first half of sliced metrics)
  const half = Math.floor(slicedMetrics.length / 2);
  const lastHalfRev = slicedMetrics.slice(half).reduce((sum, m) => sum + m.revenue, 0);
  const firstHalfRev = slicedMetrics.slice(0, half).reduce((sum, m) => sum + m.revenue, 0) || 1;
  const revGrowth = ((lastHalfRev - firstHalfRev) / firstHalfRev) * 100;
  
  const lastHalfProf = slicedMetrics.slice(half).reduce((sum, m) => sum + m.profit, 0);
  const firstHalfProf = slicedMetrics.slice(0, half).reduce((sum, m) => sum + m.profit, 0) || 1;
  const profGrowth = ((lastHalfProf - firstHalfProf) / firstHalfProf) * 100;
  
  const lastHalfExp = slicedMetrics.slice(half).reduce((sum, m) => sum + m.expenses, 0);
  const firstHalfExp = slicedMetrics.slice(0, half).reduce((sum, m) => sum + m.expenses, 0) || 1;
  const expGrowth = ((lastHalfExp - firstHalfExp) / firstHalfExp) * 100;

  const lastHalfCash = slicedMetrics.slice(half).reduce((sum, m) => sum + m.cashFlow, 0);
  const firstHalfCash = slicedMetrics.slice(0, half).reduce((sum, m) => sum + m.cashFlow, 0) || 1;
  const cashGrowth = ((lastHalfCash - firstHalfCash) / firstHalfCash) * 100;

  const firstCustomers = slicedMetrics[0]?.customers || 1;
  const custGrowth = ((latestCustomers - firstCustomers) / firstCustomers) * 100;

  return {
    metrics: slicedMetrics,
    goals: preset.goals,
    alerts: preset.alerts,
    insights: preset.insights,
    summary: {
      revenue: totalRev,
      revenueGrowth: Number(revGrowth.toFixed(1)),
      profit: totalProf,
      profitGrowth: Number(profGrowth.toFixed(1)),
      expenses: totalExp,
      expensesGrowth: Number(expGrowth.toFixed(1)),
      cashFlow: totalCash,
      cashFlowGrowth: Number(cashGrowth.toFixed(1)),
      customers: latestCustomers,
      customersGrowth: Number(custGrowth.toFixed(1))
    }
  };
}

// Generate investor report mockup content
export function getReportContent(
  name: string,
  industry: Industry,
  healthScore: number,
  summaryMetrics: { revenue: number; profit: number; expenses: number }
): InvestorReport {
  return {
    id: `rep-${Date.now()}`,
    title: 'Executive Financial & Operational Brief',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    organization: name || 'Atrix Technologies',
    executiveSummary: `This executive performance brief outlines the operational trajectory and structural developments for ${name || 'Atrix Technologies'}, serving the ${industry} market. Our Business Health Score sits comfortably at a verified ${healthScore}/100, showing robust profitability structures, strong goal trajectories, and manageable risks. Operating with positive cash generation, overall metrics signal steady market share consolidation going into next fiscal cycle.`,
    healthScore,
    forecastSummary: `With active business compound velocity indexing at steady intervals, our standard multi-indicator forecasting modules simulate that top-line revenues for ${name || 'Atrix Technologies'} will securely scale. Under nominal expansion trajectories, seasonal momentum in the near term will capture positive growth. Cash flows are projected to remain positive for at least 6 consecutive periods, giving ample liquidity to expand.`,
    recommendations: [
      'Accelerate allocation of operating revenue into top-tier high-margin segments.',
      'Settle standard invoicing gaps using auto-reconciliation to eliminate operational friction.',
      'Adopt predictive supplier stock systems immediately to prevent inventory bottlenecks.'
    ]
  };
}
