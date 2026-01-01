'use client';
import { Interaction } from '@/lib/types';
import { motion, AnimatePresence } from 'framer-motion';

export function ActivityLog({ history }: { history: Interaction[] }) {
    return (
        <div className="w-full max-w-md p-6 bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 shadow-xl flex flex-col h-[300px]">
            <h3 className="text-white font-bold mb-4 uppercase tracking-wider text-sm border-b border-white/10 pb-2 flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Digestive Log
            </h3>
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                <AnimatePresence initial={false}>
                    {[...history].reverse().map((item) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 p-3 rounded-lg border-l-2 border-purple-500 transform hover:scale-102 transition-transform"
                        >
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-purple-300 font-mono" suppressHydrationWarning>{new Date(item.timestamp).toLocaleTimeString()}</span>
                                <span className="text-[10px] uppercase bg-white/10 px-1 rounded text-white/50">{item.type}</span>
                            </div>
                            <div className="text-white text-sm font-medium mb-1">{item.content}</div>
                            {item.analysis && (
                                <div className="mt-2 bg-black/20 p-2 rounded text-xs text-gray-300">
                                    <p className="italic mb-2">"{item.analysis.summary}"</p>
                                    <div className="flex flex-wrap gap-1">
                                        <Badge label="Clean" value={item.analysis.codeCleanliness} />
                                        <Badge label="Complex" value={item.analysis.complexity} />
                                        <span className="bg-blue-500/20 text-purple-200 px-1.5 py-0.5 rounded text-[10px] border border-blue-500/30">{item.analysis.flavor}</span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                    {history.length === 0 && (
                        <div className="text-white/30 text-center py-10 italic">
                            No food yet. Feed me commits!
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

function Badge({ label, value }: { label: string, value: number }) {
    let color = 'text-gray-300 bg-gray-500/20';
    if (value > 7) color = 'text-green-300 bg-green-500/20 border-green-500/30';
    else if (value < 4) color = 'text-red-300 bg-red-500/20 border-red-500/30';

    return (
        <span className={`px-1.5 py-0.5 rounded text-[10px] border ${color}`}>
            {label}: {value}
        </span>
    );
}
