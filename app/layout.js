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
  Lock,
  BarChart3,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import './globals.css';

export default function RootLayout({ children }) {
  // Active role state: 'voter' | 'admin' | 'official' | 'observer'
  const [currentRole, setCurrentRole] = useState('voter');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Role-specific navigation items
  const navigationByRole = {
    voter: [
      { name: 'Cast Vote', href: '/#vote', icon: Vote },
      { name: 'Verification', href: '/#verify', icon: CheckCircle2 },
      { name: 'Live Results', href: '/#results', icon: BarChart3 },
    ],
    admin: [
      { name: 'Admin Dashboard', href: '/admin', icon: ShieldCheck },
      { name: 'User Management', href: '/admin/users', icon: UserCheck },
      { name: 'System Logs', href: '/admin/logs', icon: Lock },
    ],
    official: [
      { name: 'Election Setup', href: '/official/elections', icon: Vote },
      { name: 'Candidate Review', href: '/official/candidates', icon: UserCheck },
      { name: 'Tally Audit', href: '/official/tally', icon: BarChart3 },
    ],
    observer: [
      { name: 'Live Observation', href: '/observer/live', icon: Eye },
      { name: 'Turnout Metrics', href: '/observer/metrics', icon: BarChart3 },
      { name: 'Incident Reports', href: '/observer/reports', icon: AlertTriangle },
    ],
  };

  const navItems = navigationByRole[currentRole] || [];

  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 min-h-screen flex flex-col font-sans antialiased">
        {/* Top Navbar */}
        <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
            
            {/* Brand Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <Vote className="h-7 w-7 text-blue-400" />
              <span className="font-bold text-xl tracking-tight">E-Voting Portal</span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-2 hover:text-blue-400 text-sm font-medium transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Role Switcher Selector */}
            <div className="hidden md:flex items-center space-x-2 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
              <span className="text-xs text-slate-400 font-medium">Portal Mode:</span>
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                className="bg-transparent text-xs font-semibold text-blue-400 focus:outline-none cursor-pointer"
              >
                <option value="voter" className="bg-slate-900 text-white">Voter Portal</option>
                <option value="admin" className="bg-slate-900 text-white">System Admin</option>
                <option value="official" className="bg-slate-900 text-white">Election Official</option>
                <option value="observer" className="bg-slate-900 text-white">Election Observer</option>
              </select>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-slate-800 px-4 pt-3 pb-4 space-y-3 border-t border-slate-700">
              <div className="flex items-center justify-between py-2 border-b border-slate-700">
                <span className="text-xs text-slate-400">Switch Role:</span>
                <select
                  value={currentRole}
                  onChange={(e) => {
                    setCurrentRole(e.target.value);
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-slate-900 text-blue-400 text-xs font-semibold px-2 py-1 rounded"
                >
                  <option value="voter">Voter Portal</option>
                  <option value="admin">System Admin</option>
                  <option value="official">Election Official</option>
                  <option value="observer">Election Observer</option>
                </select>
              </div>

              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 py-2 text-slate-200 hover:text-blue-400 text-sm font-medium"
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          )}
        </header>

        {/* Main Content View */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-400 text-center py-4 border-t border-slate-800 text-xs">
          &copy; {new Date().getFullYear()} Secure E-Voting Portal. All actions are cryptographically logged.
        </footer>
      </body>
    </html>
  );
}

