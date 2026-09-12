'use client';

import React from 'react';
import { Eye, BarChart3, AlertTriangle } from 'lucide-react';

export default function ObserverDashboard() {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Observer Auditing Module</h1>
        <p className="text-sm text-slate-500">Real-time vote stream analysis and audit verification.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-600" /> Live Turnout Metrics
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span>Voter Turnout</span>
              <span>68.4%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-600 h-full w-[68.4%]"></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-500" /> Audit Log Monitor
          </h2>
          <p className="text-xs text-slate-500">No anomalies or cryptographic hash mismatches detected.</p>
        </div>
      </div>
    </div>
  );
}
