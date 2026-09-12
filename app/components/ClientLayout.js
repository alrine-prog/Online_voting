'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Vote, 
  ShieldCheck, 
  UserCheck, 
  Eye, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';

export default function ClientLayout({ children }) {
  // Replace this state with your actual Auth/Session context (e.g., next-auth, custom JWT)
  const [currentRole, setCurrentRole] = useState('voter'); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Define navigation links mapped to each user role
  const roleNavigations = {
    voter: [
      { name: 'Cast Vote', href: '/voter/dashboard', icon: Vote },
      { name: 'My Ballot', href: '/voter/ballot', icon: UserCheck },
    ],
    admin: [
      { name: 'Admin Dashboard', href: '/admin/dashboard', icon: ShieldCheck },
      { name: 'User Management', href: '/admin/users', icon: UserCheck },
      { name: 'System Settings', href: '/admin/settings', icon: ShieldCheck },
    ],
    official: [
      { name: 'Election Setup', href: '/official/elections', icon: Vote },
      { name: 'Candidate Approval', href: '/official/candidates', icon: UserCheck },
      { name: 'Tally Verification', href: '/official/tally', icon: ShieldCheck },
    ],
    observer: [
      { name: 'Live Observation', href: '/observer/live', icon: Eye },
      { name: 'Audit Logs', href: '/observer/audit', icon: Eye },
      { name: 'Turnout Metrics', href: '/observer/metrics', icon: Eye },
    ],
  };

  const navItems = roleNavigations[currentRole] || [];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Header */}
      <header className="bg-slate-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Vote className="h-7 w-7 text-blue-400" />
            <span className="font-bold text-xl">E-Voting Portal</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 hover:text-blue-400 text-sm font-medium transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Role Switcher (For Testing/Development) */}
          <div className="hidden md:flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
            <span className="text-xs text-slate-400">Role:</span>
            <select
              value={currentRole}
              onChange={(e) => setCurrentRole(e.target.value)}
              className="bg-transparent text-xs font-semibold text-blue-400 focus:outline-none cursor-pointer"
            >
              <option value="voter" className="bg-slate-900 text-white">Voter</option>
              <option value="admin" className="bg-slate-900 text-white">Admin</option>
              <option value="official" className="bg-slate-900 text-white">Election Official</option>
              <option value="observer" className="bg-slate-900 text-white">Election Observer</option>
            </select>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-slate-800 px-4 pt-2 pb-4 space-y-2 border-t border-slate-700">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-slate-200 hover:text-blue-400"
              >
                {item.name}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Main Content View */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-center py-4 border-t border-slate-800 text-xs">
        &copy; {new Date().getFullYear()} Online Voting System. All role sessions are securely logged.
      </footer>
    </div>
  );
}
