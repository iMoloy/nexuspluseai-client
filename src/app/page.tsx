export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl w-full text-center z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 bg-clip-text text-transparent mb-4 tracking-tight">
          NexusPulse AI
        </h1>
        <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto">
          The Ultimate AI-Powered Gig, Rental & Escrow Financial Super-App Ecosystem.
        </p>
      </div>
    </main>
  );
}
