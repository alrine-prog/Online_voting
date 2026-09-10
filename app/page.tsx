export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-950 text-white">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex flex-col gap-6">
        <h1 className="text-4xl font-bold tracking-tight text-center sm:text-6xl">
          Welcome to Your App
        </h1>
        <p className="text-gray-400 text-center text-lg max-w-xl">
          Get started by editing{' '}
          <code className="font-mono font-bold text-white bg-gray-800 px-2 py-1 rounded">
            app/page.tsx
          </code>
        </p>
        <div className="flex gap-4">
          <a
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-500 transition-colors"
          >
            Documentation &rarr;
          </a>
        </div>
      </div>
    </main>
  );
}
