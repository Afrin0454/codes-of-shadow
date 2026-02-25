import React from 'react';
import { motion } from 'framer-motion';
import { useCtf } from '../context/CtfContext';
import { Trophy, Clock, Target, List } from 'lucide-react';

const Result = ({ onShowLeaderboard }) => {
    const { gameState, getRank } = useCtf();
    const rank = getRank();
    const timeTaken = Math.floor((gameState.endTime - gameState.startTime) / 1000);

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}m ${s}s`;
    };

    return (
        <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="luxury-card"
                style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}
            >
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <Trophy size={80} className="gold-text" style={{ margin: '0 auto 1.5rem', filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.4))' }} />
                    <h1 className="gold-text" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Congratulations!</h1>
                    <p style={{ color: 'var(--text-dim)', fontSize: '1.2rem', marginBottom: '3rem' }}>Mission Accomplished, {gameState.team?.name}</p>
                </motion.div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
                    <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <Target size={24} style={{ color: 'var(--primary-color)', marginBottom: '0.8rem' }} />
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{gameState.score}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Final Score</div>
                    </div>
                    <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <Clock size={24} style={{ color: 'var(--secondary-color)', marginBottom: '0.8rem' }} />
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{formatTime(timeTaken)}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Time Taken</div>
                    </div>
                </div>

                <div style={{ marginBottom: '3rem' }}>
                    <div style={{ fontSize: '1rem', color: 'var(--text-dim)', marginBottom: '0.5rem' }}>Your Standing</div>
                    <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                        Rank #{rank}
                    </div>
                </div>

                <button
                    onClick={onShowLeaderboard}
                    className="btn-primary"
                    style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}
                >
                    View Global Leaderboard <List size={20} />
                </button>
            </motion.div>
        </div>
    );
};

export default Result;
