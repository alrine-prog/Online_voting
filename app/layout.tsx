//import React, { useState, useEffect } from 'react';
import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Vote, 
  Users, 
  Lock, 
  Eye, 
  MoreVertical, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Key, 
  Mail, 
  MapPin, 
  Phone, 
  Search, 
  RefreshCw, 
  Fingerprint, 
  ChevronRight, 
  Database, 
  Terminal, 
  LogOut, 
  UserCheck, 
  ShieldAlert, 
  QrCode, 
  Copy, 
  FileSpreadsheet,
  Download,
  Info
} from 'lucide-react';

const INITIAL_CANDIDATES = [
  { id: 'c1', name: 'Dr. Elena Rostova', party: 'Alliance for Digital Governance', vision: 'Transparent Systems & Open Protocols', votes: 14205, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200' },
  { id: 'c2', name: 'Marcus Vance', party: 'Cyber Innovation Coalition', vision: 'Next-Gen Infrastructure & Privacy Rights', votes: 11840, avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200' },
  { id: 'c3', name: 'Sarah Lin', party: 'Public Trust Action Party', vision: 'Verifiable Integrity & Citizen Oversight', votes: 9450, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200' },
];

const INITIAL_LOGS = [
  { id: 'L109', timestamp: '14:22:01', type: 'system', message: 'Zero-Knowledge Proof Batch #8841 validated by Node-Alpha.', status: 'success' },
  { id: 'L108', timestamp: '14:19:45', type: 'voter', message: 'Encrypted vote payload cast via Precinct 042.', status: 'info' },
  { id: 'L107', timestamp: '14:15:12', type: 'security', message: 'HSM Key custody check verified by Election Official keyholder #2.', status: 'success' },
  { id: 'L106', timestamp: '14:02:30', type: 'warning', message: 'Minor network latency spike detected on Node-Gamma (Resolved).', status: 'warning' }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('voter');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [auditLogs, setAuditLogs] = useState(INITIAL_LOGS);

  // Auth State
  const [authUser, setAuthUser] = useState(null); // { role: 'voter' | 'admin' | 'official' | 'observer', name: string, id: string }
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [targetRole, setTargetRole] = useState('voter');
  const [authCredentials, setAuthCredentials] = useState({ id: '', passcode: '', biometricDone: false });
  const [authError, setAuthError] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Voting State
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteReceipt, setVoteReceipt] = useState(null);
  const [isCastingVote, setIsCastingVote] = useState(false);

  // Verification Search State
  const [searchReceiptId, setSearchReceiptId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);

  const handleNavClick = (tabRole) => {
    setIsMenuOpen(false);
    if (tabRole === 'about') {
      setActiveTab('about');
      return;
    }

    // Enforce login if trying to access dashboard without matching role auth
    if (!authUser || authUser.role !== tabRole) {
      setTargetRole(tabRole);
      setAuthCredentials({ id: '', passcode: '', biometricDone: false });
      setAuthError('');
      setAuthModalOpen(true);
    } else {
      setActiveTab(tabRole);
    }
  };

  const handleSignOut = () => {
    setAuthUser(null);
    setActiveTab('about');
    setIsMenuOpen(false);
  };

  const executeLogin = (e) => {
    e.preventDefault();
    setAuthError('');

    if (targetRole === 'voter' && !authCredentials.id.trim()) {
      setAuthError('Please enter a valid Voter Registration Token / Citizen ID.');
      return;
    }
    if (targetRole === 'admin' && authCredentials.passcode !== 'admin123') {
      setAuthError('Invalid Master Admin Security Key (Try: admin123)');
      return;
    }
    if (targetRole === 'official' && !authCredentials.id.trim()) {
      setAuthError('Please enter Official Credentials (e.g., OFFICIAL-09)');
      return;
    }

    setIsAuthenticating(true);

    setTimeout(() => {
      let mockName = 'Authenticated User';
      let mockId = authCredentials.id || 'ID-77291';

      if (targetRole === 'voter') mockName = 'Citizen Voter';
      if (targetRole === 'admin') mockName = 'Chief Security Admin';
      if (targetRole === 'official') mockName = 'Official Keyholder #2';
      if (targetRole === 'observer') mockName = 'Independent Observer';

      setAuthUser({
        role: targetRole,
        name: mockName,
        id: mockId
      });

      setIsAuthenticating(false);
      setAuthModalOpen(false);
      setActiveTab(targetRole);
    }, 800);
  };

  const handleVoteSubmit = (e) => {
    e.preventDefault();
    if (!selectedCandidate) return;

    setIsCastingVote(true);
    setTimeout(() => {
      const generatedHash = '0x' + Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      const newReceipt = {
        hash: generatedHash,
        timestamp: new Date().toISOString(),
        candidateId: selectedCandidate,
        candidateName: candidates.find(c => c.id === selectedCandidate)?.name,
        blockNumber: Math.floor(100000 + Math.random() * 900000)
      };

      setCandidates(prev => prev.map(c => c.id === selectedCandidate ? { ...c, votes: c.votes + 1 } : c));
      setVoteReceipt(newReceipt);
      setHasVoted(true);
      setIsCastingVote(false);

      setAuditLogs(prev => [
        {
          id: `L${prev.length + 100}`,
          timestamp: new Date().toLocaleTimeString(),
          type: 'voter',
          message: `Zero-Knowledge Encrypted Ballot Committed. Proof: ${generatedHash.substring(0, 14)}...`,
          status: 'success'
        },
        ...prev
      ]);
    }, 1200);
  };

  const handleVerifyReceipt = (e) => {
    e.preventDefault();
    if (!searchReceiptId.trim()) return;

    if (voteReceipt && searchReceiptId.trim() === voteReceipt.hash) {
      setVerificationResult({
        valid: true,
        hash: voteReceipt.hash,
        timestamp: voteReceipt.timestamp,
        status: 'Included in Cryptographic Tally Block #' + voteReceipt.blockNumber,
        zkProof: 'ZK-SNARK-0x992388a0021ff7c'
      });
    } else {
      setVerificationResult({
        valid: true,
        hash: searchReceiptId,
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'Verified on Public Cryptographic Ledger',
        zkProof: 'ZK-SNARK-0x4521782aabef773'
      });
    }
  };

  const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      
      {}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick('voter')}>
            <div className="p-2 bg-blue-600/20 rounded-xl border border-blue-500/30 text-blue-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-blue-400 bg-clip-text text-transparent">
                AegisVote
              </span>
              <span className="ml-2 text-[10px] uppercase font-mono px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded">
                E2E Verifiable
              </span>
            </div>
          </div>

          {/* Desktop Navigation Quick Switcher */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => handleNavClick('voter')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'voter' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Voter Portal
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'admin' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Admin Portal
            </button>
            <button
              onClick={() => handleNavClick('official')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'official' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Officials Portal
            </button>
            <button
              onClick={() => handleNavClick('observer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'observer' ? 'bg-blue-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Observer Portal
            </button>
          </nav>

          {/* User Auth Badge & 3-Dots Menu */}
          <div className="flex items-center gap-3">
            {authUser ? (
              <div className="hidden sm:flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="text-slate-300 font-medium">{authUser.name}</span>
                <span className="uppercase text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 font-mono">
                  {authUser.role}
                </span>
                <button
                  onClick={handleSignOut}
                  title="Sign Out"
                  className="ml-1 text-slate-400 hover:text-red-400 transition"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => handleNavClick('voter')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600/20 border border-blue-500/30 text-blue-400 hover:bg-blue-600 hover:text-white transition text-xs font-semibold"
              >
                <UserCheck className="w-3.5 h-3.5" /> Sign In
              </button>
            )}

            {/* Right-Hand 3-Dots Menu Access */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white transition border border-slate-700/50 flex items-center justify-center focus:outline-none"
                aria-label="Access Navigation Menu"
              >
                <MoreVertical className="w-5 h-5" />
              </button>

              {/* Dropdown Navigation Menu */}
              {isMenuOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl py-2 z-50 divide-y divide-slate-800/60 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="px-4 py-2">
                    <p className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">Dashboard Portals</p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => handleNavClick('voter')}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-800/80 flex items-center gap-3"
                    >
                      <Vote className="w-4 h-4 text-blue-400" />
                      <span>Voters Dashboard</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('admin')}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-800/80 flex items-center gap-3"
                    >
                      <Lock className="w-4 h-4 text-amber-400" />
                      <span>Admin Dashboard</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('official')}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-800/80 flex items-center gap-3"
                    >
                      <Users className="w-4 h-4 text-purple-400" />
                      <span>Election Officials Dashboard</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('observer')}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-800/80 flex items-center gap-3"
                    >
                      <Eye className="w-4 h-4 text-emerald-400" />
                      <span>Observer Dashboard</span>
                    </button>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => handleNavClick('about')}
                      className="w-full text-left px-4 py-2.5 text-sm text-slate-200 hover:bg-slate-800/80 flex items-center gap-3"
                    >
                      <FileText className="w-4 h-4 text-slate-400" />
                      <span>About Us & Security Info</span>
                    </button>
                  </div>

                  {authUser && (
                    <div className="py-1">
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out ({authUser.name})</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl relative">
            <button
              onClick={() => setAuthModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl bg-slate-800/50"
            >
              ✕
            </button>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-600/10 border border-blue-500/30 text-blue-400 rounded-2xl flex items-center justify-center mx-auto">
                {targetRole === 'voter' && <Vote className="w-6 h-6" />}
                {targetRole === 'admin' && <Lock className="w-6 h-6 text-amber-400" />}
                {targetRole === 'official' && <Users className="w-6 h-6 text-purple-400" />}
                {targetRole === 'observer' && <Eye className="w-6 h-6 text-emerald-400" />}
              </div>
              <h2 className="text-xl font-bold text-white capitalize">
                Sign In to {targetRole} Portal
              </h2>
              <p className="text-xs text-slate-400">
                Authentication required for zero-knowledge access authorization.
              </p>
            </div>

            {authError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <form onSubmit={executeLogin} className="space-y-4">
              {targetRole === 'voter' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Citizen / Student ID</label>
                    <input
                      type="text"
                      placeholder="e.g., VTR-99042-881"
                      value={authCredentials.id}
                      onChange={(e) => setAuthCredentials(prev => ({ ...prev, id: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-2">
                      <Fingerprint className="w-4 h-4 text-emerald-400" /> Biometric Passkey Simulation
                    </span>
                    <button
                      type="button"
                      onClick={() => setAuthCredentials(prev => ({ ...prev, biometricDone: true }))}
                      className={`px-2.5 py-1 rounded text-[10px] font-semibold transition ${
                        authCredentials.biometricDone ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-200 hover:bg-slate-700'
                      }`}
                    >
                      {authCredentials.biometricDone ? 'Verified ✓' : 'Verify Touch ID'}
                    </button>
                  </div>
                </>
              )}

              {targetRole === 'admin' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Master Security Passcode</label>
                    <input
                      type="password"
                      placeholder="Enter Key (Hint: admin123)"
                      value={authCredentials.passcode}
                      onChange={(e) => setAuthCredentials(prev => ({ ...prev, passcode: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </>
              )}

              {targetRole === 'official' && (
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Official Badge ID</label>
                    <input
                      type="text"
                      placeholder="e.g., OFFICIAL-KEY-09"
                      value={authCredentials.id}
                      onChange={(e) => setAuthCredentials(prev => ({ ...prev, id: e.target.value }))}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 font-mono focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </>
              )}

              {targetRole === 'observer' && (
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 leading-relaxed">
                  Public Observers may sign in with zero-knowledge guest credentials for transparent verification access.
                </div>
              )}

              <button
                type="submit"
                disabled={isAuthenticating}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
              >
                {isAuthenticating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Verifying Credentials...
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" /> Authenticate & Access
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ==================== 1. VOTER DASHBOARD ==================== */}
        {activeTab === 'voter' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Banner */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border border-blue-800/40 p-6 sm:p-8">
              <div className="relative z-10 max-w-2xl">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-4">
                  <ShieldCheck className="w-3.5 h-3.5" /> Official General Election 2026
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Secure End-to-End Cryptographic Ballot
                </h1>
                <p className="mt-2 text-slate-400 text-sm leading-relaxed">
                  Your vote is anonymized using zero-knowledge proofs before being committed to the public ledger. Verification receipts allow post-election auditing without revealing choices.
                </p>
              </div>
            </div>

            {/* Voting Stepper */}
            {!hasVoted ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Candidates List */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-400" /> Official Candidates
                    </h2>
                    <span className="text-xs text-slate-400 font-mono">Select 1 Candidate</span>
                  </div>

                  <div className="space-y-3">
                    {candidates.map((candidate) => (
                      <div
                        key={candidate.id}
                        onClick={() => setSelectedCandidate(candidate.id)}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                          selectedCandidate === candidate.id
                            ? 'bg-blue-900/20 border-blue-500/80 shadow-md ring-1 ring-blue-500'
                            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <img 
                            src={candidate.avatar} 
                            alt={candidate.name} 
                            className="w-14 h-14 rounded-xl object-cover border border-slate-700" 
                          />
                          <div>
                            <h3 className="font-bold text-slate-100">{candidate.name}</h3>
                            <p className="text-xs text-blue-400 font-medium">{candidate.party}</p>
                            <p className="text-xs text-slate-400 mt-1">{candidate.vision}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                            selectedCandidate === candidate.id
                              ? 'border-blue-500 bg-blue-500 text-white'
                              : 'border-slate-600'
                          }`}>
                            {selectedCandidate === candidate.id && <CheckCircle2 className="w-4 h-4" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Authentication & Ballot Casting Side Card */}
                <div className="space-y-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
                    <h3 className="text-base font-semibold text-white flex items-center gap-2">
                      <Fingerprint className="w-5 h-5 text-emerald-400" /> Identity Session Status
                    </h3>

                    <div className="space-y-4">
                      <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800/80 text-xs text-slate-400 space-y-2">
                        <div className="flex justify-between">
                          <span>Voter Identity:</span>
                          <span className="text-emerald-400 font-mono font-semibold">{authUser?.id || 'VTR-8942-8819'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <span className="text-emerald-400 font-semibold">Verified & Eligible</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Jurisdiction:</span>
                          <span>District 09 - Metro</span>
                        </div>
                      </div>

                      <button
                        disabled={!selectedCandidate || isCastingVote}
                        onClick={handleVoteSubmit}
                        className={`w-full py-3 px-4 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                          selectedCandidate && !isCastingVote
                            ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        {isCastingVote ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            Encrypting Ballot...
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4" /> Cast Encrypted Ballot
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* Receipt View */
              <div className="max-w-xl mx-auto bg-slate-900 border border-emerald-500/30 rounded-3xl p-8 space-y-6 text-center animate-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">Ballot Successfully Cast</h2>
                  <p className="text-xs text-slate-400 mt-1">Your vote has been cryptographically sealed into block #{voteReceipt.blockNumber}</p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-left space-y-3 font-mono text-xs">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Cryptographic Receipt Hash</span>
                    <span className="text-emerald-400 font-semibold break-all">{voteReceipt.hash}</span>
                  </div>
                  <div className="flex justify-between border-t border-slate-900 pt-2">
                    <span className="text-slate-500">Timestamp:</span>
                    <span className="text-slate-300">{new Date(voteReceipt.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      handleNavClick('observer');
                      setSearchReceiptId(voteReceipt.hash);
                    }}
                    className="flex-1 py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-medium text-xs transition"
                  >
                    Verify on Ledger
                  </button>
                  <button
                    onClick={() => {
                      setHasVoted(false);
                      setSelectedCandidate(null);
                    }}
                    className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-xs transition"
                  >
                    Return to Portal
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== 2. ADMIN DASHBOARD ==================== */}
        {activeTab === 'admin' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Lock className="w-6 h-6 text-amber-400" /> System Administration Portal
                </h1>
                <p className="text-xs text-slate-400 mt-1">Voter Roll Management, Key Ceremony & Turn-out Metrics</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-xs font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Election Active
                </span>
              </div>
            </div>

            {/* Metrics Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                <span className="text-slate-400 text-xs font-medium">Total Registered Voters</span>
                <p className="text-2xl font-bold text-white mt-2">50,000</p>
                <p className="text-[10px] text-emerald-400 mt-1">98.4% Identity Verified</p>
              </div>
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                <span className="text-slate-400 text-xs font-medium">Ballots Cast</span>
                <p className="text-2xl font-bold text-white mt-2">{totalVotes.toLocaleString()}</p>
                <p className="text-[10px] text-blue-400 mt-1">{((totalVotes / 50000) * 100).toFixed(1)}% Turnout Rate</p>
              </div>
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                <span className="text-slate-400 text-xs font-medium">Active Consensus Nodes</span>
                <p className="text-2xl font-bold text-white mt-2">12 / 12</p>
                <p className="text-[10px] text-emerald-400 mt-1">100% Sync Accuracy</p>
              </div>
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl">
                <span className="text-slate-400 text-xs font-medium">Key Custody Threshold</span>
                <p className="text-2xl font-bold text-white mt-2">3 of 5</p>
                <p className="text-[10px] text-amber-400 mt-1">Shamir Shares Locked</p>
              </div>
            </div>

            {/* Live Tally Chart & Security Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-semibold text-white">Live Homomorphic Encryption Tally</h3>
                <div className="space-y-4">
                  {candidates.map(candidate => {
                    const percentage = ((candidate.votes / totalVotes) * 100).toFixed(1);
                    return (
                      <div key={candidate.id} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-200 font-medium">{candidate.name} ({candidate.party})</span>
                          <span className="text-slate-400 font-mono">{candidate.votes.toLocaleString()} votes ({percentage}%)</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                          <div 
                            className="h-full bg-blue-600 rounded-full transition-all duration-500" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Administrative Actions */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-semibold text-white">System Controls</h3>
                <div className="space-y-3">
                  <button className="w-full text-left p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between text-xs text-slate-200">
                    <span className="flex items-center gap-2">
                      <Key className="w-4 h-4 text-amber-400" /> Initiate Key Ceremony
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                  <button className="w-full text-left p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between text-xs text-slate-200">
                    <span className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-blue-400" /> Export Ledger Snapshot
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                  <button className="w-full text-left p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between text-xs text-slate-200">
                    <span className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-400" /> Freeze Election Protocol
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 3. ELECTION OFFICIALS DASHBOARD ==================== */}
        {activeTab === 'official' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                  <Users className="w-6 h-6 text-purple-400" /> Election Officials Operations
                </h1>
                <p className="text-xs text-slate-400 mt-1">Precinct Status, Incident Logging & Key-Share Validation</p>
              </div>
            </div>

            {/* Audit Log & Precinct Status */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-white flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-blue-400" /> System Audit Trail Log
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">Real-Time Stream</span>
                </div>
                <div className="space-y-3 font-mono text-xs">
                  {auditLogs.map((log) => (
                    <div key={log.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 flex items-start gap-3">
                      <span className="text-slate-500 text-[10px]">{log.timestamp}</span>
                      <div className="flex-1">
                        <span className={`inline-block px-1.5 py-0.5 rounded text-[9px] uppercase font-semibold mr-2 ${
                          log.status === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          log.status === 'warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                        }`}>
                          {log.type}
                        </span>
                        <span className="text-slate-300">{log.message}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Precinct Readiness */}
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="text-base font-semibold text-white">Precinct Status</h3>
                <div className="space-y-3">
                  {[
                    { id: 'P-01', name: 'District Central', status: 'Online', verified: '100%' },
                    { id: 'P-02', name: 'North Tech Hub', status: 'Online', verified: '100%' },
                    { id: 'P-03', name: 'Metro South', status: 'Online', verified: '99.8%' },
                    { id: 'P-04', name: 'West Suburbs', status: 'Online', verified: '100%' },
                  ].map((precinct) => (
                    <div key={precinct.id} className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-semibold text-slate-200">{precinct.name}</span>
                        <span className="block text-[10px] text-slate-500">{precinct.id}</span>
                      </div>
                      <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded text-[10px] font-medium border border-emerald-500/20">
                        {precinct.status} ({precinct.verified})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ==================== 4. OBSERVER DASHBOARD ==================== */}
        {activeTab === 'observer' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                <Eye className="w-6 h-6 text-emerald-400" /> Independent Observer Portal
              </h1>
              <p className="text-xs text-slate-400 mt-1">Merkle Tree Ledger Verification & Zero-Knowledge Audit Inspection</p>
            </div>

            {/* Verification Tool */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <h3 className="text-base font-semibold text-white">Verify Ballot Inclusion on Ledger</h3>
              <form onSubmit={handleVerifyReceipt} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Paste Cryptographic Receipt Hash (e.g. 0x992388...)"
                  value={searchReceiptId}
                  onChange={(e) => setSearchReceiptId(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-xs transition flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" /> Verify Hash
                </button>
              </form>

              {verificationResult && (
                <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-2 text-xs font-mono">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Valid Receipt Verified
                  </div>
                  <p className="text-slate-300">Hash: {verificationResult.hash}</p>
                  <p className="text-slate-400">Proof: {verificationResult.zkProof}</p>
                  <p className="text-slate-400">Status: {verificationResult.status}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== 5. ABOUT US & CONTACT ==================== */}
        {activeTab === 'about' && (
          <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl mx-auto">
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-extrabold text-white">About AegisVote Cryptographic Architecture</h1>
              <p className="text-slate-400 text-sm max-w-2xl mx-auto leading-relaxed">
                Engineered for end-to-end verifiability (E2E-V), complete voter anonymity, and transparent tallying using Zero-Knowledge Proofs (ZK-SNARKs) and Homomorphic Encryption protocols.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 bg-blue-600/10 text-blue-400 rounded-xl flex items-center justify-center mx-auto">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-white text-sm">Email Support</h3>
                <p className="text-xs text-slate-400">support@securevote.org</p>
                <p className="text-xs text-slate-400">security@securevote.org</p>
              </div>

              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 bg-emerald-600/10 text-emerald-400 rounded-xl flex items-center justify-center mx-auto">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-white text-sm">24/7 Hotline</h3>
                <p className="text-xs text-slate-400">+1 (800) 555-0199</p>
                <p className="text-xs text-slate-400">Election Operations Center</p>
              </div>

              <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl text-center space-y-3">
                <div className="w-12 h-12 bg-purple-600/10 text-purple-400 rounded-xl flex items-center justify-center mx-auto">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-white text-sm">Global Headquarters</h3>
                <p className="text-xs text-slate-400">100 Cyber Security Blvd</p>
                <p className="text-xs text-slate-400">Suite 400, Tech District</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {}
      <footer className="bg-slate-900 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-800/80">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                <span className="font-bold text-white text-base">AegisVote Infrastructure</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Tamper-proof, verifiable digital voting system ensuring total transparency and voter privacy.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Quick Navigation</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li><button onClick={() => handleNavClick('voter')} className="hover:text-white transition">Voters Portal</button></li>
                <li><button onClick={() => handleNavClick('admin')} className="hover:text-white transition">Admin Dashboard</button></li>
                <li><button onClick={() => handleNavClick('official')} className="hover:text-white transition">Election Officials</button></li>
                <li><button onClick={() => handleNavClick('observer')} className="hover:text-white transition">Observer Portal</button></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">Contact Information</h4>
              <p className="text-xs text-slate-400 mb-1">Email: support@securevote.org</p>
              <p className="text-xs text-slate-400 mb-1">Location: 100 Cyber Security Blvd, Suite 400</p>
              <p className="text-xs text-slate-400">Phone: +1 (800) 555-0199</p>
            </div>
          </div>

          <div className="pt-6 text-center text-xs text-slate-500">
            <p>&copy; {new Date().getFullYear()} AegisVote Secure Systems Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
