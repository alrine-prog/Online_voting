'use client';

import React from 'react';
import { ShieldCheck, Users, Lock, Server } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">System Administration</h1>
        <p className="text-sm text-slate-500">Manage security settings, access controls, and database nodes.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <Users className="w-8 h-8 text-indigo-600" />
          <div>
            <p className="text-xs text-slate-500">Total Users</p>
            <p className="text-xl font-bold text-slate-900">12,450</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <Server className="w-8 h-8 text-emerald-600" />
          <div>
            <p className="text-xs text-slate-500">Database Cluster</p>
            <p className="text-xl font-bold text-slate-900">3 Nodes Synced</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
          <Lock className="w-8 h-8 text-blue-600" />
          <div>
            <p className="text-xs text-slate-500">Security Mode</p>
            <p className="text-xl font-bold text-slate-900">Strict (TLS 1.3)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
