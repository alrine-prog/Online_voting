import './globals.css';

export const metadata = {
  title: 'E Voting System',
  description: 'A secure online voting application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased min-h-screen bg-gray-50 text-gray-900 flex flex-col">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl font-bold text-blue-600">E-Vote Portal</span>
            </div>
            <nav className="flex items-center gap-6 text-sm font-medium">
              <a href="#" className="hover:text-blue-600">Elections</a>
              <a href="#" className="hover:text-blue-600">Results</a>
              <a href="#" className="hover:text-blue-600">Audit Logs</a>
            </nav>
          </div>
        </header>

        {/* Main Application Container */}
        <div className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <aside className="md:col-span-1 bg-white p-4 rounded-xl border border-gray-200 h-fit">
              <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Dashboard
              </h2>
              <ul className="space-y-2 text-sm font-medium">
                <li>
                  <a href="#" className="block px-3 py-2 rounded-lg bg-blue-50 text-blue-700">
                    Active Elections
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
                    My Ballot
                  </a>
                </li>
                <li>
                  <a href="#" className="block px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
                    Verification Status
                  </a>
                </li>
              </ul>
            </aside>

            {/* Main Content Area */}
            <main className="md:col-span-3 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
