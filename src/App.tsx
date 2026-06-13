import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Onboarding from './components/Onboarding';
import DashboardView from './components/DashboardView';
import InvestorReports from './components/InvestorReports';
import AIChat from './components/AIChat';
import { Industry } from './types';

export default function App() {
  const [screen, setScreen] = useState<'landing' | 'onboarding' | 'dashboard' | 'report'>('landing');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true); // Let's default to a premium dark mode as it looks incredibly luxurious!

  // Active onboarding business statistics
  const [businessName, setBusinessName] = useState('Apex Softworks LLC');
  const [industry, setIndustry] = useState<Industry>('SaaS');
  const [employees, setEmployees] = useState(12);
  const [monthlyRevenue, setMonthlyRevenue] = useState(115000);
  const [goals, setGoals] = useState<string[]>(['Increase organic MRR', 'Benchmark AWS containers']);

  // User account credentials
  const [userName, setUserName] = useState('Ray Devlin');
  const [userEmail, setUserEmail] = useState('ray@apexcloud.com');
  const [userPassword, setUserPassword] = useState('••••••••••••');

  // Report transfer states
  const [reportHealthScore, setReportHealthScore] = useState(88);
  const [reportSummary, setReportSummary] = useState<any>(null);

  // Sync HTML body class for Tailwind dark support
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleStartFree = () => {
    setScreen('onboarding');
  };

  const handleBookDemo = () => {
    // Quick skip onboarding with nice presets
    setBusinessName('Acme Global');
    setIndustry('SaaS');
    setEmployees(45);
    setMonthlyRevenue(160000);
    setGoals(['Build Enterprise Tier V2', 'Improve checkout margins by 4%']);
    setUserName('Jessy Nuwa');
    setUserEmail('nuwajessy@gmail.com');
    setUserPassword('SecureDemo123!');
    setScreen('dashboard');
  };

  const handleOnboardingComplete = (data: any) => {
    if (data.businessName) setBusinessName(data.businessName);
    if (data.industry) setIndustry(data.industry);
    if (data.employees) setEmployees(data.employees);
    if (data.monthlyRevenue) setMonthlyRevenue(data.monthlyRevenue);
    if (data.goals) setGoals(data.goals);
    if (data.userName) setUserName(data.userName);
    if (data.userEmail) setUserEmail(data.userEmail);
    if (data.userPassword) setUserPassword(data.userPassword);
    setScreen('dashboard');
  };

  const handleOpenReport = (healthScore: number, summary: any) => {
    setReportHealthScore(healthScore);
    setReportSummary(summary);
    setScreen('report');
  };

  return (
    <div className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-250`}>
      {screen === 'landing' && (
        <LandingPage 
          onStartFree={handleStartFree} 
          onBookDemo={handleBookDemo} 
        />
      )}

      {screen === 'onboarding' && (
        <Onboarding 
          onOnboardingComplete={handleOnboardingComplete} 
        />
      )}

      {screen === 'dashboard' && (
        <>
          <DashboardView
            businessName={businessName}
            industry={industry}
            employees={employees}
            monthlyRevenue={monthlyRevenue}
            initialGoals={goals}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            onOpenReport={handleOpenReport}
            userName={userName}
            userEmail={userEmail}
            userPassword={userPassword}
            onUpdateProfile={(updatedUser: any) => {
              if (updatedUser.userName !== undefined) setUserName(updatedUser.userName);
              if (updatedUser.userEmail !== undefined) setUserEmail(updatedUser.userEmail);
              if (updatedUser.userPassword !== undefined) setUserPassword(updatedUser.userPassword);
              if (updatedUser.businessName !== undefined) setBusinessName(updatedUser.businessName);
              if (updatedUser.industry !== undefined) setIndustry(updatedUser.industry);
              if (updatedUser.employees !== undefined) setEmployees(updatedUser.employees);
              if (updatedUser.monthlyRevenue !== undefined) setMonthlyRevenue(updatedUser.monthlyRevenue);
            }}
          />
          {/* Active floating AI business advisor */}
          <AIChat 
            businessContext={{
              businessName,
              industry,
              employees,
              monthlyRevenue,
              goals,
              summary: {
                revenue: monthlyRevenue * 1.5,
                revenueGrowth: 8.2,
                profit: monthlyRevenue * 0.9,
                profitGrowth: 11.2,
                expenses: monthlyRevenue * 0.6,
                expensesGrowth: 5.4,
                customers: Math.round(employees * 50)
              }
            }}
          />
        </>
      )}

      {screen === 'report' && (
        <InvestorReports
          businessName={businessName}
          industry={industry}
          healthScore={reportHealthScore}
          summary={reportSummary}
          onBackToDashboard={() => setScreen('dashboard')}
        />
      )}
    </div>
  );
}
