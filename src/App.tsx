import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  Award, 
  Info, 
  Sparkles, 
  Calculator, 
  HelpCircle, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  ArrowUpDown,
  BookOpen,
  CornerDownRight,
  RefreshCw,
  Send
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart,
  Area,
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  Legend 
} from 'recharts';
import { BRANCHES, getPredictionsForCategory, getHistoricalCutoffsForCategory, CORE_FACTORS } from './data';
import { BranchCode, CategoryCode } from './types';

export default function App() {
  const [quota, setQuota] = useState<'GN' | 'EW' | 'OB'>('EW');
  const [gender, setGender] = useState<'GN' | 'GL'>('GN');
  const [region, setRegion] = useState<'D' | 'O'>('D');
  
  // ✅ FIXED: Ensure category is always correctly derived and typed
  const selectedCategory = `${quota}${gender}${region}` as CategoryCode;
  
  const [selectedCollege, setSelectedCollege] = useState<'ALL' | 'NSUT' | 'DTU' | 'IIITD' | 'IGDTUW'>('ALL');
  const [activeTab, setActiveTab] = useState<'predictions' | 'historical' | 'insights'>('predictions');
  const [selectedBranch, setSelectedBranch] = useState<BranchCode>('NSUT_ECE');
  const [userRank, setUserRank] = useState<string>('');
  const [evaluatedRank, setEvaluatedRank] = useState<number | null>(null);

  // ✅ FIXED: Added proper dependencies to useMemo
  const PREDICTIONS_2026 = useMemo(() => getPredictionsForCategory(selectedCategory), [selectedCategory]);
  const HISTORICAL_CUTOFFS = useMemo(() => getHistoricalCutoffsForCategory(selectedCategory), [selectedCategory]);
  
  // Counselor chat states
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{ role: 'user' | 'model'; text: string }>>([
    { 
      role: 'model', 
      text: "👋 Hello candidate! I am your **JAC Delhi AI Admission assistant**. I have access to cumulative data of DTU, NSUT, IIIT-D, and IGDTUW across **all programs**.\n\nSelect your category above (General/EWS/OBC + Delhi/Outside) and enter your JEE Main CRL rank to get started!" 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // Parse chart data for historical branches
  // ✅ FIXED: Added HISTORICAL_CUTOFFS and PREDICTIONS_2026 dependencies
  const historicalChartData = useMemo(() => {
    if (!HISTORICAL_CUTOFFS || !PREDICTIONS_2026) return [];
    
    const records = HISTORICAL_CUTOFFS[selectedBranch] || [];
    const filtered = records.filter(r => r.r1 > 0);
    
    const scenario = PREDICTIONS_2026[selectedBranch];
    if (scenario && scenario.actualR1 > 0) {
      return [
        ...filtered.map(r => ({
          year: r.year.toString(),
          'Round 1': r.r1,
          'Round 2': r.r2,
          'Round 3': r.r3,
          'Round 4': r.r4,
          'Round 5 (If happens)': r.r5,
          'Upgradation': r.upgradation
        })),
        {
          year: '2026 (Pred)',
          'Round 1': scenario.actualR1,
          'Round 2': scenario.trueOutcome.r2,
          'Round 3': scenario.trueOutcome.r3,
          'Round 4': scenario.trueOutcome.r4,
          'Round 5 (If happens)': scenario.trueOutcome.r5,
          'Upgradation': scenario.trueOutcome.upgradation
        }
      ];
    }
    return filtered.map(r => ({
      year: r.year.toString(),
      'Round 1': r.r1,
      'Round 2': r.r2,
      'Round 3': r.r3,
      'Round 4': r.r4,
      'Round 5 (If happens)': r.r5,
      'Upgradation': r.upgradation
    }));
  }, [selectedBranch, HISTORICAL_CUTOFFS, PREDICTIONS_2026]);

  // Evaluated eligibility analysis
  // ✅ FIXED: Added missing dependencies (PREDICTIONS_2026, selectedCollege)
  const eligibilityReport = useMemo(() => {
    if (evaluatedRank === null) return [];
    if (!PREDICTIONS_2026) return [];
    
    return Object.keys(BRANCHES).filter(key => {
      if (selectedCollege !== 'ALL' && BRANCHES[key as BranchCode].college !== selectedCollege) return false;
      const pred = PREDICTIONS_2026[key as BranchCode];
      if (!pred || pred.actualR1 === 0) return false;
      return true;
    }).map(key => {
      const code = key as BranchCode;
      const branchInfo = BRANCHES[code];
      const pred = PREDICTIONS_2026[code];

      // Worst case checks
      let worstCaseStatus: 'Highly Probable' | 'Borderline / Likely' | 'Tough / Unlikely' = 'Tough / Unlikely';
      let worstChanceRound = '';
      if (evaluatedRank <= pred.worstCase.r1) { worstCaseStatus = 'Highly Probable'; worstChanceRound = 'Round 1'; }
      else if (evaluatedRank <= pred.worstCase.r2) { worstCaseStatus = 'Highly Probable'; worstChanceRound = 'Round 2'; }
      else if (evaluatedRank <= pred.worstCase.r3) { worstCaseStatus = 'Highly Probable'; worstChanceRound = 'Round 3'; }
      else if (evaluatedRank <= pred.worstCase.r4) { worstCaseStatus = 'Highly Probable'; worstChanceRound = 'Round 4'; }
      else if (evaluatedRank <= pred.worstCase.r5) { worstCaseStatus = 'Borderline / Likely'; worstChanceRound = 'Round 5 (If happens)'; }
      else if (evaluatedRank <= pred.worstCase.upgradation) { worstCaseStatus = 'Borderline / Likely'; worstChanceRound = 'Upgradation Round'; }

      // True outcome checks
      let trueOutcomeStatus: 'Highly Probable' | 'Borderline / Likely' | 'Tough / Unlikely' = 'Tough / Unlikely';
      let trueChanceRound = '';
      if (evaluatedRank <= pred.trueOutcome.r1) { trueOutcomeStatus = 'Highly Probable'; trueChanceRound = 'Round 1'; }
      else if (evaluatedRank <= pred.trueOutcome.r2) { trueOutcomeStatus = 'Highly Probable'; trueChanceRound = 'Round 2'; }
      else if (evaluatedRank <= pred.trueOutcome.r3) { trueOutcomeStatus = 'Highly Probable'; trueChanceRound = 'Round 3'; }
      else if (evaluatedRank <= pred.trueOutcome.r4) { trueOutcomeStatus = 'Highly Probable'; trueChanceRound = 'Round 4'; }
      else if (evaluatedRank <= pred.trueOutcome.r5) { trueOutcomeStatus = 'Borderline / Likely'; trueChanceRound = 'Round 5 (If happens)'; }
      else if (evaluatedRank <= pred.trueOutcome.upgradation) { trueOutcomeStatus = 'Borderline / Likely'; trueChanceRound = 'Upgradation Round'; }

      return {
        code,
        branchInfo,
        worstCase: {
          status: worstCaseStatus,
          round: worstChanceRound,
          limit: pred.worstCase.upgradation
        },
        trueOutcome: {
          status: trueOutcomeStatus,
          round: trueChanceRound,
          limit: pred.trueOutcome.upgradation
        }
      };
    });
  }, [evaluatedRank, selectedCollege, PREDICTIONS_2026]);

  // Command to trigger Counselor query
  // ✅ FIXED: Ensures selectedCategory is passed explicitly
  const handleCounselSubmit = async (e?: React.FormEvent, customMsg?: string) => {
    if (e) e.preventDefault();
    const queryStr = customMsg || chatInput;
    if (!queryStr.trim() || isTyping) return;

    const userMessage = { role: 'user' as const, text: queryStr };
    setChatHistory(prev => [...prev, userMessage]);
    setChatInput('');
    setIsTyping(true);
    setErrorStatus(null);

    try {
      const response = await fetch('/api/counselor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryStr,
          chatHistory: chatHistory.slice(-6), // Send recent context
          category: selectedCategory  // ✅ EXPLICITLY PASSING CATEGORY
        })
      });

      if (!response.ok) {
        throw new Error('AI assistant returned an error.');
      }

      const data = await response.json();
      setChatHistory(prev => [...prev, { role: 'model', text: data.text }]);
    } catch (err: any) {
      console.error(err);
      setErrorStatus(err.message || 'API Server under heavy load.');
      setChatHistory(prev => [...prev, { 
        role: 'model', 
        text: "⚠️ **System Issue**: Unable to retrieve response. Please check if GEMINI_API_KEY is configured in .env file or try again." 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleRankSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = parseInt(userRank.replace(/,/g, ''), 10);
    if (!isNaN(parsed) && parsed > 0) {
      setEvaluatedRank(parsed);
      // Trigger counselor analysis automatically with current category
      handleCounselSubmit(undefined, `My JEE Main CRL Rank is ${parsed} under ${selectedCategory} category (${quota} Quota, ${region} Region). Analyze my admission chances.`);
    }
  };

  const setDemoRankAndSearch = (rank: number) => {
    setUserRank(rank.toLocaleString());
    setEvaluatedRank(rank);
    handleCounselSubmit(undefined, `Analyze my chances at rank ${rank} in ${selectedCategory} for NSUT and DTU.`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Header */}
      <header className="border-b border-cyan-500/30 bg-slate-950/90 backdrop-blur-md sticky top-0 z-50 p-6 shadow-[0_4px_20px_-10px_rgba(34,211,238,0.3)]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase">
              JAC Delhi 2026 Prediction Engine
            </h1>
            <div className="flex flex-col md:flex-row gap-2 mt-2 items-start md:items-center">
              <span className="text-emerald-400 font-bold bg-emerald-400/10 border border-emerald-400/20 px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase">Creator: IRONMANWASRYT</span>
              <p className="text-[10px] md:text-xs font-mono text-cyan-400 tracking-widest uppercase">
                Data Source: Official 2026 R1 & Historic Trends
              </p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Gender Toggle */}
            <div className="flex border border-slate-700 rounded overflow-hidden">
              <button 
                onClick={() => setGender('GN')}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition ${gender === 'GN' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'}`}
              >Neutral</button>
              <button 
                onClick={() => setGender('GL')}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition ${gender === 'GL' ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-slate-400'}`}
              >Female</button>
            </div>
          
            {/* Region Toggle */}
            <div className="flex border border-slate-700 rounded overflow-hidden">
              <button 
                onClick={() => setRegion('D')}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition ${region === 'D' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'}`}
              >Delhi (HS)</button>
              <button 
                onClick={() => setRegion('O')}
                className={`px-3 py-1.5 text-xs font-mono font-bold uppercase transition ${region === 'O' ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400'}`}
              >Outside (OS)</button>
            </div>

            {/* Category Toggle */}
            <div className="flex gap-2">
              {(['GN', 'EW', 'OB'] as const).map((catPrefix) => {
                const isSelected = quota === catPrefix;
                return (
                  <button
                    key={catPrefix}
                    onClick={() => setQuota(catPrefix)}
                    className={`px-3 py-1.5 rounded text-xs font-mono font-bold uppercase transition border cursor-pointer ${
                      isSelected
                        ? 'border-cyan-400 bg-cyan-500/20 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.25)]'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    {catPrefix === 'GN' ? 'General' : catPrefix === 'EW' ? 'EWS' : 'OBC'}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
        
        {/* Debug info for testing */}
        <div className="mt-2 text-[10px] text-slate-600 font-mono">
          Active Category: {selectedCategory}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
        
        {/* Info Banner */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl relative overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.05)]">
          <div className="absolute top-0 right-0 h-40 w-40 bg-cyan-500/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-8 -left-8 h-40 w-40 bg-blue-600/5 rounded-full blur-3xl"></div>
          
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Dynamic Extrapolations for Round 2, 3, 4 & Internal Upgradations
              </div>
              <h2 className="text-2xl font-black text-slate-100 uppercase tracking-tight">
                JAC Delhi {selectedCategory} Focus Analysis
              </h2>
              <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
                National level certificate counts, simplified online registrations, and NIT Delhi campus developments are shifting JAC cutoff tolerances. Select a college below.
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                {(['ALL', 'NSUT', 'DTU', 'IIITD', 'IGDTUW'] as const).map(col => (
                  <button 
                    key={col}
                    onClick={() => setSelectedCollege(col)}
                    className={`px-3 py-1 text-[11px] font-bold tracking-wider font-mono uppercase rounded border transition ${
                      selectedCollege === col ? 'bg-indigo-500/20 border-indigo-400 text-indigo-300' : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
                    }`}
                  >{col === 'ALL' ? 'All Institutes' : col}</button>
                ))}
              </div>
            </div>
            
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800/80 min-w-[240px] shadow-inner space-y-2 self-stretch md:self-auto flex flex-col justify-center">
              <span className="text-xs text-slate-400 block font-medium">Quick Demo Rank Queries:</span>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setDemoRankAndSearch(34500)}
                  className="px-2 py-1.5 text-xs text-center font-mono rounded border border-cyan-500/20 bg-cyan-950/20 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 transition"
                >
                  🎯 34,500 CRL
                </button>
                <button 
                  onClick={() => setDemoRankAndSearch(62000)}
                  className="px-2 py-1.5 text-xs text-center font-mono rounded border border-blue-500/20 bg-blue-950/20 text-blue-300 hover:bg-blue-500/10 hover:border-blue-400 transition"
                >
                  🎯 62,000 CRL
                </button>
                <button 
                  onClick={() => setDemoRankAndSearch(82500)}
                  className="px-2 py-1.5 text-xs text-center font-mono rounded border border-indigo-500/20 bg-indigo-950/20 text-indigo-300 hover:bg-indigo-500/10 hover:border-indigo-500 transition"
                >
                  🎯 82,500 CRL
                </button>
                <button 
                  onClick={() => setDemoRankAndSearch(105000)}
                  className="px-2 py-1.5 text-xs text-center font-mono rounded border border-slate-700 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:border-slate-500 transition"
                >
                  🎯 1.05L CRL
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column (8 cols) */}
          <section className="lg:col-span-8 space-y-8">
            
            {/* Rank Predictor Widget */}
            <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6 shadow-xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
              
              <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
                <div className="flex items-center gap-2.5">
                  <Calculator className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-bold uppercase tracking-wider text-sm text-slate-100">Interactive CRL Eligibility Checker</h3>
                </div>
                {evaluatedRank && (
                  <button 
                    onClick={() => { setUserRank(''); setEvaluatedRank(null); }}
                    className="text-xs text-cyan-400 hover:text-cyan-300 underline font-mono tracking-wider"
                  >
                    Clear Search
                  </button>
                )}
              </div>

              <form onSubmit={handleRankSubmit} className="flex flex-col sm:flex-row gap-4 items-stretch">
                <div className="flex-1 relative">
                  <label className="text-xs text-cyan-400 bg-slate-900/90 px-1.5 absolute -top-2 left-3 font-mono uppercase tracking-wider">
                    Enter JEE Main CRL Rank
                  </label>
                  <input 
                    type="text"
                    value={userRank}
                    onChange={(e) => {
                      const cleanNumeric = e.target.value.replace(/[^0-9]/g, '');
                      setUserRank(cleanNumeric ? Number(cleanNumeric).toLocaleString() : '');
                    }}
                    placeholder="e.g. 48,500"
                    className="w-full bg-slate-950 text-cyan-300 border border-slate-800 px-4 py-3.5 rounded-xl font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-cyan-400 text-lg font-bold"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="sm:px-8 py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-slate-950 font-black tracking-widest uppercase rounded-xl flex items-center justify-center gap-2 cursor-pointer transition shadow-lg shadow-cyan-400/10 active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4 fill-slate-950" />
                  Evaluate Ranks
                </button>
              </form>

              {evaluatedRank !== null && (
                <div className="mt-8 space-y-4">
                  <div className="p-4 bg-slate-950 rounded-xl border border-cyan-500/30 text-sm flex items-center justify-between shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                    <div>
                      <span className="text-[10px] text-cyan-400 font-mono tracking-wider uppercase block">EVALUATED JEE MAIN CRL</span>
                      <p className="text-xl font-mono font-bold text-slate-100">{evaluatedRank.toLocaleString()}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-mono tracking-wider uppercase">Target Branches analysed</span>
                      <span className="text-xs inline-flex items-center bg-cyan-500/10 text-cyan-300 font-mono px-2 py-0.5 rounded border border-cyan-500/30 mt-1 uppercase tracking-wider font-bold">
                        {selectedCollege === 'ALL' ? 'All Institutes' : selectedCollege}
                      </span>
                    </div>
                  </div>

                  <div className="overflow-y-auto max-h-[500px] rounded-lg border border-slate-800 scrollbar-thin scrollbar-thumb-slate-800">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-slate-800/80 text-cyan-400 uppercase tracking-widest font-mono border-b border-slate-700">
                          <th className="p-3 font-semibold">Branch & Campus</th>
                          <th className="p-3 font-semibold">Worst Case Limit</th>
                          <th className="p-3 text-center font-semibold">Worst Case Odds</th>
                          <th className="p-3 font-semibold">True Outcome Limit</th>
                          <th className="p-3 text-center font-semibold">True Outcome Odds</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {eligibilityReport.map(item => (
                          <tr key={item.code} className="hover:bg-cyan-500/5 transition-colors">
                            <td className="p-3">
                              <div className="font-bold text-white text-sm">{BRANCHES[item.code].name}</div>
                              <div className="text-[10px] text-slate-400 truncate max-w-[200px]">{item.code}</div>
                              <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 mt-1 inline-block bg-slate-800 text-slate-400 rounded">
                                {BRANCHES[item.code].college} - {BRANCHES[item.code].campus}
                              </span>
                            </td>
                            <td className="p-3 font-mono font-semibold text-slate-300 text-sm">
                              {item.worstCase.limit.toLocaleString()}
                            </td>
                            <td className="p-3 text-center">
                              {item.worstCase.status === 'Highly Probable' ? (
                                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30 font-bold font-mono tracking-wide uppercase">
                                  <CheckCircle2 className="w-3 h-3" /> High Chance ({item.worstCase.round})
                                </span>
                              ) : item.worstCase.status === 'Borderline / Likely' ? (
                                <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30 font-bold font-mono tracking-wide uppercase">
                                  <AlertTriangle className="w-3 h-3" /> Borderline ({item.worstCase.round})
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] text-red-400 bg-red-400/10 px-2.5 py-1 rounded border border-red-500/30 font-bold font-mono tracking-wide uppercase">
                                  <XCircle className="w-3 h-3" /> Low Chance
                                </span>
                              )}
                            </td>
                            <td className="p-3 font-mono font-semibold text-slate-300 text-sm">
                              {item.trueOutcome.limit.toLocaleString()}
                            </td>
                            <td className="p-3 text-center">
                              {item.trueOutcome.status === 'Highly Probable' ? (
                                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30 font-bold font-mono tracking-wide uppercase">
                                  <CheckCircle2 className="w-3 h-3" /> High Chance ({item.trueOutcome.round})
                                </span>
                              ) : item.trueOutcome.status === 'Borderline / Likely' ? (
                                <span className="inline-flex items-center gap-1 text-[10px] text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30 font-bold font-mono tracking-wide uppercase">
                                  <AlertTriangle className="w-3 h-3" /> Borderline ({item.trueOutcome.round})
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 text-[10px] text-red-400 bg-red-400/10 px-2.5 py-1 rounded border border-red-500/30 font-bold font-mono tracking-wide uppercase">
                                  <XCircle className="w-3 h-3" /> Low Chance
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {/* Tabs Section */}
            <div className="space-y-6">
              <div className="flex border-b border-slate-800">
                <button
                  onClick={() => setActiveTab('predictions')}
                  className={`px-5 py-3 text-sm font-bold tracking-wider uppercase transition relative cursor-pointer ${
                    activeTab === 'predictions' ? 'text-cyan-400 font-black' : 'text-slate-400 hover:text-cyan-300'
                  }`}
                >
                  2026 Predictions
                  {activeTab === 'predictions' && <div className="h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 absolute bottom-0 left-0 right-0"></div>}
                </button>
                <button
                  onClick={() => setActiveTab('historical')}
                  className={`px-5 py-3 text-sm font-bold tracking-wider uppercase transition relative cursor-pointer ${
                    activeTab === 'historical' ? 'text-cyan-400 font-black' : 'text-slate-400 hover:text-cyan-300'
                  }`}
                >
                  5-Year Trends
                  {activeTab === 'historical' && <div className="h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 absolute bottom-0 left-0 right-0"></div>}
                </button>
                <button
                  onClick={() => setActiveTab('insights')}
                  className={`px-5 py-3 text-sm font-bold tracking-wider uppercase transition relative cursor-pointer ${
                    activeTab === 'insights' ? 'text-cyan-400 font-black' : 'text-slate-400 hover:text-cyan-300'
                  }`}
                >
                  Driving Insights
                  {activeTab === 'insights' && <div className="h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 absolute bottom-0 left-0 right-0"></div>}
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'predictions' && (
                <div className="grid grid-cols-1 gap-6 animate-fadeIn">
                  
                  {/* True Outcome Table */}
                  <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6 shadow-md space-y-4">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="space-y-1">
                        <h2 className="text-lg font-bold flex items-center gap-2 text-slate-100">
                          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                          Expected Trend <span className="text-slate-500 font-normal text-sm">— Most Probable</span>
                        </h2>
                      </div>
                      <span className="text-xs text-cyan-400 font-mono tracking-wider uppercase">Model: {selectedCategory}-X5 // 2026</span>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-slate-800">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-800/80 text-cyan-400 uppercase tracking-wider font-mono">
                          <tr>
                            <th className="p-3 border-b border-slate-700 font-semibold">Branch</th>
                            <th className="p-3 border-b border-slate-700 font-semibold">R1 (Actual)</th>
                            <th className="p-3 border-b border-slate-700 font-semibold">R2</th>
                            <th className="p-3 border-b border-slate-700 font-semibold">R3</th>
                            <th className="p-3 border-b border-slate-700 font-semibold">R4</th>
                            <th className="p-3 border-b border-slate-700 font-semibold">R5 (If happens)</th>
                            <th className="p-3 border-b border-slate-700 font-semibold">Upgrad</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {Object.keys(PREDICTIONS_2026).filter(k => {
                            if (selectedCollege !== 'ALL' && BRANCHES[k as BranchCode].college !== selectedCollege) return false;
                            if (PREDICTIONS_2026[k as BranchCode].actualR1 === 0) return false;
                            return true;
                          }).map((key) => {
                            const branch = key as BranchCode;
                            const pred = PREDICTIONS_2026[branch];
                            return (
                              <tr key={branch} className="hover:bg-cyan-500/5 transition-colors">
                                <td className="p-3 font-bold text-white max-w-[200px]">
                                  {BRANCHES[branch].name}
                                  <span className="text-[9px] text-slate-500 font-normal font-mono block">
                                    {BRANCHES[branch].college} - {BRANCHES[branch].campus}
                                  </span>
                                </td>
                                <td className="p-3 font-mono text-slate-400">{pred.actualR1.toLocaleString()}</td>
                                <td className="p-3 font-mono text-slate-200">{pred.trueOutcome.r2.toLocaleString()}</td>
                                <td className="p-3 font-mono text-slate-200">{pred.trueOutcome.r3.toLocaleString()}</td>
                                <td className="p-3 font-mono text-slate-200">{pred.trueOutcome.r4.toLocaleString()}</td>
                                <td className="p-3 font-mono text-slate-200">{pred.trueOutcome.r5.toLocaleString()}</td>
                                <td className="p-3 font-mono text-cyan-400 font-bold">{pred.trueOutcome.upgradation.toLocaleString()}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Worst Case Table */}
                  <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6 shadow-md space-y-4">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 to-orange-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div className="space-y-1">
                        <h2 className="text-lg font-bold flex items-center gap-2 text-slate-100">
                          <span className="w-2 h-2 rounded-full bg-red-400"></span>
                          Conservative Guardrail <span className="text-slate-500 font-normal text-sm">— Worst Case</span>
                        </h2>
                      </div>
                      <span className="text-xs text-red-400 font-mono tracking-wider uppercase">Model: High Retention // 2026</span>
                    </div>

                    <div className="overflow-hidden rounded-lg border border-slate-800">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-800/80 text-red-400 uppercase tracking-wider font-mono">
                          <tr>
                            <th className="p-3 border-b border-slate-700 font-semibold">Branch</th>
                            <th className="p-3 border-b border-slate-700 font-semibold">R1 (Actual)</th>
                            <th className="p-3 border-b border-slate-700 font-semibold">R2</th>
                            <th className="p-3 border-b border-slate-700 font-semibold">R3</th>
                            <th className="p-3 border-b border-slate-700 font-semibold">R4</th>
                            <th className="p-3 border-b border-slate-700 font-semibold">R5 (If happens)</th>
                            <th className="p-3 border-b border-slate-700 font-semibold">Upgrad</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {Object.keys(PREDICTIONS_2026).filter(k => {
                            if (selectedCollege !== 'ALL' && BRANCHES[k as BranchCode].college !== selectedCollege) return false;
                            if (PREDICTIONS_2026[k as BranchCode].actualR1 === 0) return false;
                            return true;
                          }).map((key) => {
                            const branch = key as BranchCode;
                            const pred = PREDICTIONS_2026[branch];
                            return (
                              <tr key={branch} className="hover:bg-red-500/5 transition-colors">
                                <td className="p-3 font-bold text-white max-w-[200px]">
                                  {BRANCHES[branch].name}
                                  <span className="text-[9px] text-slate-500 font-normal font-mono block">
                                    {BRANCHES[branch].college} - {BRANCHES[branch].campus}
                                  </span>
                                </td>
                                <td className="p-3 font-mono text-slate-400">{pred.actualR1.toLocaleString()}</td>
                                <td className="p-3 font-mono text-slate-200">{pred.worstCase.r2.toLocaleString()}</td>
                                <td className="p-3 font-mono text-slate-200">{pred.worstCase.r3.toLocaleString()}</td>
                                <td className="p-3 font-mono text-slate-200">{pred.worstCase.r4.toLocaleString()}</td>
                                <td className="p-3 font-mono text-slate-200">{pred.worstCase.r5.toLocaleString()}</td>
                                <td className="p-3 font-mono text-red-400 font-bold">{pred.worstCase.upgradation.toLocaleString()}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'historical' && (
                <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-6 shadow-md space-y-6 animate-fadeIn">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h4 className="text-lg font-bold text-slate-100 uppercase tracking-widest font-mono">Cumulative Historical Cutoff Mapping (2021-2025)</h4>
                      <p className="text-xs text-slate-400">Select any branch below to view how its ranks have shifted over the last 5 years.</p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                      <span className="text-xs text-slate-300 font-mono uppercase font-bold text-cyan-400">Branch Filter:</span>
                      <select 
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value as BranchCode)}
                        className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-cyan-300 font-mono focus:outline-none focus:ring-1 focus:ring-cyan-500 max-w-[250px]"
                      >
                        {Object.keys(BRANCHES).filter(k => selectedCollege === 'ALL' || BRANCHES[k as BranchCode].college === selectedCollege).map(k => (
                          <option key={k} value={k} className="bg-slate-950 text-slate-200">{k} - {BRANCHES[k as BranchCode].name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="h-72 w-full pr-4 bg-slate-950 p-4 rounded-xl border border-slate-800 shadow-inner">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={historicalChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                        <XAxis dataKey="year" stroke="#64748b" fontSize={11} tickLine={false} />
                        <YAxis 
                          stroke="#64748b" 
                          fontSize={11} 
                          tickLine={false} 
                          domain={['dataMin - 10000', 'dataMax + 5000']}
                          tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                        />
                        <ChartTooltip 
                          contentStyle={{ backgroundColor: '#020617', borderColor: '#0891b2', borderRadius: '12px', boxShadow: '0 0 15px rgba(8,145,178,0.25)', color: '#f1f5f9' }}
                          labelClassName="text-cyan-400 font-black text-xs font-mono uppercase"
                        />
                        <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '5px' }} />
                        <Line type="monotone" dataKey="Round 1" stroke="#475569" strokeWidth={1} dot />
                        <Line type="monotone" dataKey="Round 2" stroke="#06b6d4" strokeWidth={2} dot />
                        <Line type="monotone" dataKey="Round 3" stroke="#3b82f6" strokeWidth={2} dot />
                        <Line type="monotone" dataKey="Round 4" stroke="#6366f1" strokeWidth={2} dot />
                        <Line type="monotone" dataKey="Upgradation" stroke="#2dd4bf" strokeWidth={2.5} dot />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  {/* Table */}
                  <div className="overflow-hidden rounded-lg border border-slate-800">
                    <table className="w-full text-left text-xs text-slate-300">
                      <thead className="bg-slate-800/80 text-cyan-400 font-mono uppercase tracking-wider">
                        <tr>
                          <th className="p-3">Year</th>
                          <th className="p-3">Round 1</th>
                          <th className="p-3">Round 2</th>
                          <th className="p-3">Round 3</th>
                          <th className="p-3">Round 4</th>
                          <th className="p-3">Round 5 (If happens)</th>
                          <th className="p-3 text-teal-400 font-bold">Upgradation Round</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {HISTORICAL_CUTOFFS[selectedBranch]?.map(r => (
                          <tr key={r.year} className="hover:bg-cyan-500/5 transition-colors">
                            <td className="p-3 font-semibold text-white">{r.year}</td>
                            <td className="p-3 font-mono">{r.r1 > 0 ? r.r1.toLocaleString() : 'N/A'}</td>
                            <td className="p-3 font-mono">{r.r2 > 0 ? r.r2.toLocaleString() : 'N/A'}</td>
                            <td className="p-3 font-mono">{r.r3 > 0 ? r.r3.toLocaleString() : 'N/A'}</td>
                            <td className="p-3 font-mono">{r.r4 > 0 ? r.r4.toLocaleString() : 'N/A'}</td>
                            <td className="p-3 font-mono">{r.r5 > 0 ? r.r5.toLocaleString() : 'N/A'}</td>
                            <td className="p-3 font-mono font-medium text-teal-400">{r.upgradation > 0 ? r.upgradation.toLocaleString() : 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'insights' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                  {CORE_FACTORS.map((factor, index) => (
                    <div key={index} className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm p-5 space-y-3 shadow-md">
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-indigo-500"></div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                          {factor.trend}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono uppercase">Factor #{index + 1}</span>
                      </div>
                      <h4 className="font-bold text-slate-100 tracking-tight">{factor.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{factor.description}</p>
                      <div className="pt-2 border-t border-slate-800 flex items-center gap-2 text-[11px]">
                        <span className="text-slate-500">Impact vector:</span>
                        <span className="font-mono font-bold text-cyan-400 uppercase">{factor.impact}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
          </section>

          {/* Right Column (4 cols) - AI Chat */}
          <section className="lg:col-span-4 space-y-6">
            
            <div className="relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm h-[640px] flex flex-col shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-500"></div>
              
              {/* Chat Header */}
              <div className="p-4 bg-slate-950 border-b border-cyan-500/10 flex items-center gap-3">
                <div className="relative">
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-400 rounded-full border border-slate-950"></span>
                  <div className="p-2 bg-cyan-500/10 rounded-xl text-cyan-400 border border-cyan-500/20">
                    <Sparkles className="w-5 h-5 animate-pulse" />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-100 text-sm font-mono uppercase tracking-wider">AI JAC Counselor</h4>
                  <p className="text-[10px] text-slate-400 flex items-center gap-1">
                    <ActivityIcon className="w-2 h-2 text-emerald-400 fill-emerald-400 animate-pulse" /> Connected to {selectedCategory} Metrics
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatHistory.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex flex-col max-w-[88%] ${
                      msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                    }`}
                  >
                    <div 
                      className={`p-3.5 rounded-2xl text-[13px] leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-tr-sm font-bold' 
                          : 'bg-slate-900 border border-slate-800 rounded-tl-sm text-slate-200 font-normal'
                      }`}
                    >
                      <p className="whitespace-pre-line">
                        {msg.text.split('\n').map((line, linIdx) => {
                          const parts = line.split('**');
                          return (
                            <span key={linIdx} className="block mt-1">
                              {parts.map((p, pIdx) => pIdx % 2 === 1 ? <strong key={pIdx} className="font-bold text-slate-100 underline decoration-cyan-400">{p}</strong> : p)}
                            </span>
                          );
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex items-center gap-1.5 mr-auto max-w-[80%] bg-slate-950 p-3.5 rounded-2xl border border-slate-800 text-xs text-slate-400 font-mono">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                    Analyzing quota trends...
                  </div>
                )}
              </div>

              {/* Suggestions */}
              <div className="p-3 bg-slate-900/40 border-t border-slate-850/60">
                <span className="text-[10px] text-slate-450 block font-semibold mb-2 uppercase">Suggested Custom Queries:</span>
                <div className="flex flex-wrap gap-1.5">
                  <button 
                    onClick={() => handleCounselSubmit(undefined, "I have rank of 55,000. Under true outcomes can I secure DTU ECE or any CS at NSUT?")}
                    className="text-[11px] text-slate-350 bg-slate-900 border border-slate-800 hover:border-slate-750 hover:bg-slate-850 px-2 py-1 rounded transition text-left shrink-0"
                  >
                    🔍 55k CRL Odds
                  </button>
                  <button 
                    onClick={() => handleCounselSubmit(undefined, "How does NIT Delhi permanent campus at Narela vacant DTU/NSUT seats?")}
                    className="text-[11px] text-slate-350 bg-slate-900 border border-slate-800 hover:border-slate-750 hover:bg-slate-850 px-2 py-1 rounded transition text-left shrink-0"
                  >
                    🏫 NIT Delhi impact
                  </button>
                </div>
              </div>

              {/* Input Form */}
              <form onSubmit={handleCounselSubmit} className="p-3 bg-slate-900 border-t border-slate-850 flex gap-2">
                <input 
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder={`Ask counselor about JAC ${selectedCategory} trends...`}
                  className="flex-1 bg-slate-950 text-slate-100 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-500"
                  disabled={isTyping}
                />
                <button 
                  type="submit"
                  disabled={!chatInput.trim() || isTyping}
                  className="px-4 py-2 bg-gradient-to-r from-teal-500 to-indigo-500 hover:from-teal-600 hover:to-indigo-600 disabled:opacity-40 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1 transition shrink-0 active:scale-95"
                >
                  <Send className="w-3.5 h-3.5 stroke-[2.5]" />
                  Send
                </button>
              </form>

            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-850 bg-slate-950 text-slate-450 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-mono">
          <div className="text-slate-500 font-sans">
            JAC Delhi 2026 Academic Predictor. Data projections generated utilizing historical JAC structures.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">JAC-AI-ANALYTICS // v2.0.0</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Activity Icon Component
function ActivityIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}