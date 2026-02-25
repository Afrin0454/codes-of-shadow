import React from 'react';
import { motion } from 'framer-motion';
import { useCtf } from '../context/CtfContext';
import { Crown, Cat, Dog, Bird, Bug, Trophy, Clock, User } from 'lucide-react';

const ICON_MAP = {
    lion: Crown,
    tiger: Cat,
    wolf: Dog,
    eagle: Bird,
    snake: Bug,
};

const Leaderboard = ({ onBack }) => {
    const { leaderboard } = useCtf();

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}m ${s}s`;
    };

    return (
        <div className="container" style={{ padding: '4rem 1rem' }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ maxWidth: '1000px', margin: '0 auto' }}
            >
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h1 className="gold-text" style={{ fontSize: '3rem', marginBottom: '1rem' }}>codes of Shadows</h1>
                    <p style={{ color: 'var(--text-dim)' }}>Global rankings of the elite operators.</p>
                </div>

                <div className="luxury-card" style={{ padding: '0', overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ background: 'rgba(212, 175, 55, 0.05)', borderBottom: '1px solid rgba(212, 175, 55, 0.1)' }}>
                                <th style={{ padding: '1.5rem', color: 'var(--primary-color)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Rank</th>
                                <th style={{ padding: '1.5rem', color: 'var(--primary-color)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Operator</th>
                                <th style={{ padding: '1.5rem', color: 'var(--primary-color)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Score</th>
                                <th style={{ padding: '1.5rem', color: 'var(--primary-color)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leaderboard.length > 0 ? leaderboard.map((entry, index) => {
                                const Icon = ICON_MAP[entry.logo] || User;
                                const isTop3 = index < 3;
                                return (
                                    <motion.tr
                                        key={entry.id || index}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: index * 0.05 }}
                                        style={{
                                            borderBottom: '1px solid rgba(255,255,255,0.05)',
                                            background: index % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)'
                                        }}
                                    >
                                        <td style={{ padding: '1.5rem', fontWeight: 'bold', fontSize: '1.2rem' }}>
                                            {isTop3 ? (
                                                <span style={{ color: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : '#cd7f32' }}>#{index + 1}</span>
                                            ) : (
                                                `#${index + 1}`
                                            )}
                                        </td>
                                        <td style={{ padding: '1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <div style={{
                                                    width: '40px', height: '40px', borderRadius: '8px',
                                                    background: 'rgba(212, 175, 55, 0.1)', display: 'flex',
                                                    alignItems: 'center', justifyContent: 'center',
                                                    border: '1px solid rgba(212, 175, 55, 0.2)'
                                                }}>
                                                    <Icon size={20} className="gold-text" />
                                                </div>
                                                <span style={{ fontWeight: '600', fontSize: '1.1rem' }}>{entry.name}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                                <Trophy size={16} style={{ color: 'var(--primary-color)' }} />
                                                <span style={{ fontWeight: 'bold' }}>{entry.score}</span>
                                            </div>
                                        </td>
                                        <td style={{ padding: '1.5rem' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-dim)' }}>
                                                <Clock size={16} />
                                                <span>{formatTime(entry.time)}</span>
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            }) : (
                                <tr>
                                    <td colSpan="4" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-dim)' }}>
                                        No transmissions received yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {onBack && (
                    <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                        <button onClick={onBack} style={{ background: 'none', border: 'none', color: 'var(--primary-color)', cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>
                            &larr; Back to Results
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Leaderboard;
