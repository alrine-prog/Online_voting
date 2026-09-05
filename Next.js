"use client";

import { useState } from "react";

interface Candidate {
  id: number;
  name: string;
  party: string;
  votes: number;
}

export default function VotingApp() {
  const [candidates, setCandidates] = useState<Candidate[]>([
    { id: 1, name: "Sarah Jenkins", party: "Progressive Alliance", votes: 12 },
    { id: 2, name: "Marcus Vance", party: "Liberty Coalition", votes: 8 },
    { id: 3, name: "Elena Rostova", party: "Independent", votes: 15 },
  ]);

  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState<boolean>(false);

  const totalVotes = candidates.reduce((acc, curr) => acc + curr.votes, 0);

  const handleVote = () => {
    if (selectedCandidate === null) return;

    setCandidates((prev) =>
      prev.map((c) =>
        c.id === selectedCandidate ? { ...c, votes: c.votes + 1 } : c
      )
    );
    setHasVoted(true);
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6 md:p-12">
      <div className="max-w-2xl mx-auto space-y-8">
        <header className="border-b border-slate-800 pb-4">
          <h1 className="text-3xl font-bold tracking-tight">2026 Online Election Portal</h1>
          <p className="text-slate-400 text-sm mt-1">Select your preferred candidate below to submit your vote.</p>
        </header>

        <div className="space-y-4">
          {candidates.map((candidate) => {
            const percentage = totalVotes > 0 ? ((candidate.votes / totalVotes) * 100).toFixed(1) : "0";
            return (
              <div
                key={candidate.id}
                onClick={() => !hasVoted && setSelectedCandidate(candidate.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedCandidate === candidate.id
                    ? "border-blue-500 bg-slate-800/80 ring-2 ring-blue-500/50"
                    : "border-slate-800 bg-slate-800/30 hover:border-slate-700"
                } ${hasVoted ? "cursor-default" : ""}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{candidate.name}</h3>
                    <p className="text-xs text-slate-400">{candidate.party}</p>
                  </div>
                  <span className="text-sm font-medium text-slate-300">{percentage}% ({candidate.votes} votes)</span>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleVote}
          disabled={selectedCandidate === null || hasVoted}
          className="w-full py-3 px-4 rounded-xl font-medium bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {hasVoted ? "Vote Submitted" : "Cast Vote"}
        </button>
      </div>
    </main>
  );
}
