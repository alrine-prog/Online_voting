'use client';

import React from 'react';
import { 
  Vote, 
  ShieldCheck, 
  UserCheck, 
  Eye, 
  CheckCircle2, 
  Lock, 
  BarChart3, 
  ArrowRight 
} from 'lucide-react';

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero Banner */}
      <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-200">
            <Lock className="w-3.5 h-3.5" /> End-to-End Encrypted Voting System
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Secure, Transparent & Accessible E-Elections
          </h1>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Welcome to the Online Voting System portal. Cast your vote securely, monitor election integrity, or manage system parameters based on your assigned access level.
          </p>
        </div>
        <div className="flex-shrink-0">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow border border-blue-500 flex items-center gap-2 transition-all">
            Get Started <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Role Cards Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Portal Roles & Access Modules</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Voter Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                <Vote className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Voters</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Authenticate your identity, review candidate profiles, and submit encrypted digital ballots.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Digital Ballot Casting</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Voter Registration Verification</li>
            </ul>
          </div>

          {/* Admin Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Administrators</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Manage system infrastructure, configure database models, and maintain access control security.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Role & Permission Controls</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Audit Log Monitoring</li>
            </ul>
          </div>

          {/* Officials Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Election Officials</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Setup active election schedules, validate candidate slates, and trigger final vote tallies.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Election Lifecycle Setup</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Candidate Slate Management</li>
            </ul>
          </div>

          {/* Observers Card */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-slate-900">Election Observers</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Monitor live turnout metrics and independently inspect cryptographic audit trails without altering data.
              </p>
            </div>
            <ul className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-100">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Real-time Turnout Analytics</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Cryptographic Integrity Audit</li>
            </ul>
          </div>

        </div>
      </div>

      {/* System Status Metrics */}
      <section className="bg-slate-900 text-white p-6 rounded-2xl shadow-sm grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wider">System Status</p>
          <p className="text-xl font-bold text-emerald-400 mt-1 flex items-center justify-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span> Active
          </p>
        </div>
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wider">Active Elections</p>
          <p className="text-xl font-bold text-white mt-1">1 Ongoing</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wider">Registered Voters</p>
          <p className="text-xl font-bold text-white mt-1">12,450</p>
        </div>
        <div>
          <p className="text-slate-400 text-xs uppercase tracking-wider">Encryption</p>
          <p className="text-xl font-bold text-blue-400 mt-1 flex items-center justify-center gap-1">
            <BarChart3 className="w-4 h-4" /> SHA-256
          </p>
        </div>
      </section>
    </div>
  );
}
