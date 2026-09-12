'use client';

import React from 'react';
import { Vote, UserCheck, Play, Pause } from 'lucide-react';

export default function OfficialDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Election Control Center</h1>
          <p className="text-sm text-slate-500">Configure ballots, candidates, and voting periods.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1">
            <Play className="w-3.5 h-3.5" /> Start Election
          </button>
          <button className="bg-rose-600 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1">
            <Pause className="w-3.5 h-3.5" /> Pause Election
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Candidate Approvals</h2>
        <div className="divide-y divide-slate-100">
          <div className="py-3 flex justify-between items-center">
            <div>
              <p className="font-semibold text-sm text-slate-900">Alice Johnson</p>
              <p className="text-xs text-slate-500">Progressive Party</p>
            </div>
            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs rounded">Approved</span>
          </div>
          <div className="py-3 flex justify-between items-center">
            <div>
              <p className="font-semibold text-sm text-slate-900">Bob Smith</p>
              <p className="text-xs text-slate-500">Unity Alliance</p>
            </div>
            <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded">Pending Review</span>
          </div>
        </div>
      </div>
    </div>
  );
}
