import './globals.css';

export const metadata = {
  title: 'Online Voting System',
  description: 'A secure online voting application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased min-h-screen bg-gray-50 text-gray-900">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight">Online Voting</h1>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>

        <footer className="bg-white border-t border-gray-200 mt-auto py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Online Voting System. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
