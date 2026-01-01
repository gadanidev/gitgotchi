'use client';
import { motion } from 'framer-motion';
import { Mood } from '@/lib/types';

export function PetAvatar({ mood }: { mood: Mood }) {
    const colors = {
        happy: 'bg-green-400 shadow-green-400/50',
        neutral: 'bg-blue-400 shadow-blue-400/50',
        sick: 'bg-yellow-400 shadow-yellow-400/50',
        angry: 'bg-red-500 shadow-red-500/50',
        dead: 'bg-gray-600 shadow-gray-600/50'
    };

    const animations = {
        happy: { y: [0, -10, 0], scale: [1, 1.05, 1] },
        neutral: { y: [0, -5, 0] },
        sick: { x: [-2, 2, -2, 2], rotate: [0, -2, 0, 2, 0] }, // shivering
        angry: { scale: [1, 1.1, 1], x: [-5, 5, -5, 5] },
        dead: { y: 0, scale: 0.9, rotate: 90 }
    };

    return (
        <div className="flex justify-center items-center p-12">
            <motion.div
                className={`w-64 h-64 rounded-3xl ${colors[mood]} relative shadow-2xl transition-colors duration-500 ease-in-out`}
                animate={animations[mood]}
                transition={{ repeat: Infinity, duration: mood === 'angry' || mood === 'sick' ? 0.2 : 2, ease: "easeInOut" }}
            >
                {/* Face Container */}
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">

                    {/* Eyes */}
                    <div className="flex space-x-12">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center relative overflow-hidden">
                            <motion.div
                                className="w-4 h-4 bg-black rounded-full"
                                animate={{ x: mood === 'angry' ? [0, 5, 0] : 0 }}
                            />
                            {mood === 'angry' && <div className="absolute top-0 w-full h-1/2 bg-red-600 opacity-50 rotate-12" />}
                        </div>
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center relative overflow-hidden">
                            <motion.div
                                className="w-4 h-4 bg-black rounded-full"
                                animate={{ x: mood === 'angry' ? [0, -5, 0] : 0 }}
                            />
                            {mood === 'angry' && <div className="absolute top-0 w-full h-1/2 bg-red-600 opacity-50 -rotate-12" />}
                        </div>
                    </div>

                    {/* Mouth */}
                    <div className="w-16 h-8 flex justify-center">
                        {mood === 'happy' && <div className="w-full h-full border-b-8 border-white rounded-full" />}
                        {mood === 'neutral' && <div className="w-12 h-2 bg-white rounded-full mt-4" />}
                        {mood === 'sick' && <div className="w-8 h-8 bg-green-700/30 rounded-full animate-pulse mt-1" />}
                        {mood === 'angry' && <div className="w-12 h-4 bg-white rounded-sm mt-2 skew-x-12" />}
                        {mood === 'dead' && <div className="w-12 h-2 bg-black rounded-full mt-4" />}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
