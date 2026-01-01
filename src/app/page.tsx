'use client';

import useSWR from 'swr';
import { PetAvatar } from '@/components/PetAvatar';
import { StatsDisplay } from '@/components/StatsDisplay';
import { ActivityLog } from '@/components/ActivityLog';
import { PetState } from '@/lib/types';

const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function Home() {
  const { data: state, error } = useSWR<PetState>('/api/status', fetcher, {
    refreshInterval: 2000,
    fallbackData: {
      name: 'GitGotchi',
      level: 1,
      health: 100,
      hunger: 0,
      mood: 'neutral',
      lastFedAt: new Date().toISOString(),
      history: []
    }
  });

  if (error) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Failed to connect to Habitat.</div>;
  if (!state) return <div className="min-h-screen bg-black text-white flex items-center justify-center">Hatching...</div>;

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900 via-purple-950 to-black text-white p-4 md:p-10 flex items-center justify-center overflow-hidden">

      {/* Background particles or flair can go here */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-10 left-20 w-64 h-64 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left Column: Avatar & Stats */}
        <div className="flex flex-col items-center space-y-10">
          <PetAvatar mood={state.mood} />
          <StatsDisplay state={state} />
        </div>

        {/* Right Column: Info & Logs */}
        <div className="flex flex-col h-full justify-center space-y-8">
          <div>
            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mb-4 drop-shadow-lg">
              GitGotchi
            </h1>
            <p className="text-xl text-indigo-200/80 font-light max-w-md border-l-4 border-pink-500 pl-4">
              The AI companion that grows with your code quality.
              <span className="block text-sm mt-2 text-white/40">Feed via GitHub Webhooks. Avoid bugs.</span>
            </p>
          </div>
          <ActivityLog history={state.history} />
        </div>
      </div>
    </main>
  );
}
