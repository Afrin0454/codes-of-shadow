import React from 'react';
import { motion } from 'framer-motion';
import { useCtf } from '../context/CtfContext';
import { QUESTION_SETS } from '../data/questions';
import useTimer from '../hooks/useTimer';
import { Timer, Send, ClipboardCheck } from 'lucide-react';

const CTFChallenge = () => {
    const { gameState, submitFlag, finishGame } = useCtf();
    const { formatTime } = useTimer(gameState.startTime);
    const questions = QUESTION_SETS[gameState.password] || QUESTION_SETS['one'];

    const handleFlagChange = (id, value) => {
        submitFlag(id, value);
    };

    return (
        <div className="container" style={{ padding: '6rem 1rem 4rem' }}>
            {/* Sticky Header */}
            <div style={{
                position: 'fixed', top: 0, left: 0, right: 0, background: 'rgba(5, 5, 8, 0.8)',
                backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(212, 175, 55, 0.1)',
                zIndex: 100, padding: '1rem 0'
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div className="gold-text" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{gameState.team?.name}</div>
                        <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.1)' }}></div>
                        <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem', textTransform: 'uppercase' }}>Mission In Progress</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--primary-color)' }}>
                        <Timer size={20} />
                        <span style={{ fontFamily: 'monospace', fontSize: '1.5rem', fontWeight: 'bold' }}>{formatTime}</span>
                    </div>
                </div>
            </div>

            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
                    <h2 className="gold-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Decryption Phase</h2>
                    <p style={{ color: 'var(--text-dim)' }}>
                        Find the flags hidden within the logic. Format: <code style={{ color: 'var(--secondary-color)', background: 'rgba(0, 242, 255, 0.1)', padding: '2px 6px', borderRadius: '4px' }}>FLAG&#123;answer&#125;</code>
                    </p>
                </header>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {questions.map((q, index) => (
                        <motion.div
                            key={q.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="luxury-card"
                            style={{ position: 'relative', overflow: 'hidden' }}
                        >
                            <div style={{
                                position: 'absolute', top: 0, left: 0, width: '4px', height: '100%',
                                background: 'var(--primary-color)'
                            }}></div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <span style={{ color: 'var(--primary-color)', fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Challenge #0{index + 1}</span>
                                <h3 style={{ marginTop: '0.5rem', fontSize: '1.2rem', lineHeight: '1.4' }}>{q.question}</h3>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <label style={{ fontSize: '0.8rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Input Flag</label>
                                <input
                                    type="text"
                                    placeholder="FLAG{...}"
                                    value={gameState.answers[q.id] || ''}
                                    onChange={(e) => handleFlagChange(q.id, e.target.value)}
                                    style={{ width: '100%', fontFamily: 'monospace' }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{ marginTop: '4rem', textAlign: 'center' }}
                >
                    <button
                        onClick={finishGame}
                        className="btn-primary"
                        style={{ padding: '1rem 3rem', fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center', gap: '12px' }}
                    >
                        Final Submission <Send size={20} />
                    </button>
                    <p style={{ marginTop: '1.5rem', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                        Warning: This action is final and will lock your score.
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default CTFChallenge;
