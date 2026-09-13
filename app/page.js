'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Vote, 
  ShieldCheck, 
  UserCheck, 
  Eye, 
  CheckCircle2, 
  Lock, 
  BarChart3, 
  ArrowRight,
  Shield,
  Clock
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-10 py-4">
      
      {/* Hero Section */}
      <section className="bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-2xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
            <Lock className="w-3.5 h-3.5" /> End-to-End Encrypted & Auditable
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Transparent, Accessible & Secure E-Elections
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Welcome to the Official E-Voting Portal. Cast your vote securely, monitor real-time turnout metrics, or manage election parameters based on your assigned access role.
          </p>
          <div className="pt-2 flex flex-wrap gap-4 justify-center md:justify-start">
            <Link 
              href="/voter"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow border border-blue-500 flex items-center gap-2 transition-all"
            >
              Go to Voter Portal <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              href="#portals"
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl border border-slate-300 transition-all"
            >
              Explore Portals
            </Link>
          </div>
        </div>

        {/* Hero Quick Badge */}
        <div className="w-full md:w-auto bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 space-y-4 text-center md:text-left min-w-[260px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <span className="text-xs text-slate-400">System Status</span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Online
            </span>
          </div>
          <div>
            <p className="text-xs text-slate-400">Active Election</p>
            <p className="font-bold text-sm text-white mt-0.5">2026 General Election</p>
          </div>
          <div>
            <p className="text-xs text-slate-400">Security Standard</p>
            <p className="font-bold text-sm text-blue-400 mt-0.5 flex items-center justify-center md:justify-start gap-1">
              <Shield className="w-3.5 h-3.5" /> SHA-256 Encrypted
            </p>
          </div>
        </div>
      </section>

      {/* Role Navigation Portals */}
      <section id="portals" className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Portal Modules</h2>
            <p className="text-slate-500 text-xs md:text-sm">Select your role to access specialized features.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Voter Card */}
          <Link href="/voter" className="group">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group-hover:shadow-md group-hover:border-blue-500 transition-all h-full flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Vote className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">Voters</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Authenticate voter identity, review candidate slates, and cast encrypted digital ballots.
                </p>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 pt-3 border-t border-slate-100">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Digital Ballot Casting</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Voter Status Check</li>
              </ul>
            </div>
          </Link>

          {/* Admin Card */}
          <Link href="/admin" className="group">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group-hover:shadow-md group-hover:border-indigo-500 transition-all h-full flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">System Admin</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Manage user roles, system permissions, cluster status, and inspect security audit logs.
                </p>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 pt-3 border-t border-slate-100">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Access Controls</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Infrastructure Logs</li>
              </ul>
            </div>
          </Link>

          {/* Election Official Card */}
          <Link href="/official" className="group">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group-hover:shadow-md group-hover:border-emerald-500 transition-all h-full flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <UserCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">Election Officials</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Configure voting schedules, approve candidate entries, and trigger automated tallying.
                </p>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 pt-3 border-t border-slate-100">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Election Lifecycle</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Candidate Approval</li>
              </ul>
            </div>
          </Link>

          {/* Election Observer Card */}
          <Link href="/observer" className="group">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm group-hover:shadow-md group-hover:border-purple-500 transition-all h-full flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900">Election Observers</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Monitor real-time turnout metrics and audit cryptographic logs without impacting votes.
                </p>
              </div>
              <ul className="text-xs text-slate-600 space-y-2 pt-3 border-t border-slate-100">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Real-time Analytics</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Independent Audit</li>
              </ul>
            </div>
          </Link>

        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="bg-slate-900 text-white p-8 md:p-10 rounded-3xl space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl font-bold">Built for High Security & Reliability</h2>
          <p className="text-slate-400 text-xs md:text-sm">
            Designed to ensure vote secrecy, integrity, and verifiable election results.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 pt-2">
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/50 space-y-2">
            <Lock className="w-6 h-6 text-blue-400" />
            <h3 className="font-semibold text-sm">Encrypted Storage</h3>
            <p className="text-xs text-slate-400">All submitted votes are encrypted before hitting the database cluster.</p>
          </div>
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/50 space-y-2">
            <BarChart3 className="w-6 h-6 text-emerald-400" />
            <h3 className="font-semibold text-sm">Live Turnout Auditing</h3>
            <p className="text-xs text-slate-400">Observers and administrators monitor turnout trends in real time.</p>
          </div>
          <div className="bg-slate-800/60 p-5 rounded-2xl border border-slate-700/50 space-y-2">
            <ShieldCheck className="w-6 h-6 text-purple-400" />
            <h3 className="font-semibold text-sm">Role-Based Access</h3>
            <p className="text-xs text-slate-400">Strict separation of duties between Admins, Officials, Observers, and Voters.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
