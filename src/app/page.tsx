export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Dynamic Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl w-full backdrop-blur-md bg-slate-900/60 border border-slate-800 p-8 rounded-2xl shadow-2xl z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-sm font-medium mb-6">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Section 1 Setup Verified & Operational
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent mb-4 tracking-tight">
          NexusPulse AI
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          The Ultimate AI-Powered Gig, Asset Rental & Escrow Financial Super-App Ecosystem.
        </p>

        {/* System Architecture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mt-6">
          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
            <h2 className="text-lg font-semibold text-slate-200 mb-2 flex items-center gap-2">
              <span className="text-indigo-400">⚡</span> Frontend Service (`nexuspulseai-client`)
            </h2>
            <ul className="text-sm text-slate-400 space-y-1.5">
              <li>• Framework: <strong className="text-slate-200">Next.js (App Router) + React</strong></li>
              <li>• Language: <strong className="text-slate-200">TypeScript</strong></li>
              <li>• Styling: <strong className="text-slate-200">Tailwind CSS</strong></li>
              <li>• Status: <span className="text-emerald-400 font-medium">Initialized & Ready</span></li>
            </ul>
          </div>

          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800">
            <h2 className="text-lg font-semibold text-slate-200 mb-2 flex items-center gap-2">
              <span className="text-purple-400">🛡️</span> Backend Service (`nexuspulseai-server`)
            </h2>
            <ul className="text-sm text-slate-400 space-y-1.5">
              <li>• Framework: <strong className="text-slate-200">Node.js + Express.js</strong></li>
              <li>• Language: <strong className="text-slate-200">TypeScript</strong></li>
              <li>• Database: <strong className="text-slate-200">MongoDB + Mongoose</strong></li>
              <li>• API Health Endpoint: <code className="text-indigo-300 bg-indigo-950/50 px-1.5 py-0.5 rounded">http://localhost:5000/api/v1/health</code></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
