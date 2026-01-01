'use client';
import { PetState } from '@/lib/types';
import { motion } from 'framer-motion';

export function StatsDisplay({ state }: { state: PetState }) {
    return (
        <div className="space-y-6 w-full max-w-md p-6 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl">
            <div className="flex justify-between items-end">
                <h2 className="text-3xl font-bold text-white tracking-widest uppercase">{state.name}</h2>
                <span className="text-purple-300 font-mono text-xl">LVL {state.level}</span>
            </div>


            <div className="space-y-4">
                <StatBar label="HEALTH" value={state.health} color="bg-gradient-to-r from-red-500 to-pink-600" />
                <StatBar label="HUNGER" value={state.hunger} color="bg-gradient-to-r from-orange-400 to-yellow-500" />
            </div>

            <div className="text-gray-400 text-xs font-mono text-center pt-2" suppressHydrationWarning>
                LAST MEAL: {new Date(state.lastFedAt).toLocaleTimeString()}
            </div>
        </div>
    );
}

function StatBar({ label, value, color }: { label: string, value: number, color: string }) {
    return (
        <div>
            <div className="flex justify-between text-white/80 text-xs font-bold mb-1">
                <span>{label}</span>
                <span>{value}%</span>
            </div>
            <div className="w-full bg-gray-800/50 rounded-full h-4 overflow-hidden border border-white/5">
                <motion.div
                    className={`h-full ${color} shadow-lg`}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, type: "spring" }}
                />
            </div>
        </div>
    );
}
