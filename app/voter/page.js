'use client';

import React, { useState } from 'react';
import { Vote, CheckCircle2, ShieldCheck, Clock } from 'lucide-react';

export default function VoterDashboard() {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const candidates = [
    { id: 1, name: 'Alice Johnson', party: 'Progressive Party', manifesto: 'Focusing on digital reform and transparency.' },
    { id: 2, name: 'Bob Smith', party: 'Unity Alliance', manifesto: 'Strengthening community outreach and voter rights.' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Voter Portal</h1>
          <p className="text-sm text-slate-500">2026 Presidential & General Election</p>
        </div>
        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> ID Verified
        </span>
      </div>

      {!hasVoted ? (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
            <Vote className="w-5 h-5 text-blue-600" /> Cast Your Vote
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {candidates.map((candidate) => (
              <div
                key={candidate.id}
                onClick={() => setSelectedCandidate(candidate.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all ${
                  selectedCandidate === candidate.id
                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <h3 className="font-bold text-slate-900">{candidate.name}</h3>
                <p className="text-xs font-medium text-blue-600">{candidate.party}</p>
                <p className="text-xs text-slate-500 mt-2">{candidate.manifesto}</p>
              </div>
            ))}
          </div>

          <button
            disabled={!selectedCandidate}
            onClick={() => setHasVoted(true)}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all"
          >
            Submit Encrypted Ballot
          </button>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-2">
          <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
          <h2 className="text-xl font-bold text-emerald-900">Ballot Successfully Cast</h2>
          <p className="text-xs text-emerald-700">Receipt Hash: 0x8f3b...e92a</p>
        </div>
      )}
    </div>
  );
}
