import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCtf } from '../context/CtfContext';
import { Crown, Cat, Dog, Bird, Bug, User, ChevronRight } from 'lucide-react';

const LOGOS = [
    { id: 'lion', icon: Crown, label: 'Lion' },
    { id: 'tiger', icon: Cat, label: 'Tiger' },
    { id: 'wolf', icon: Dog, label: 'Wolf' },
    { id: 'eagle', icon: Bird, label: 'Eagle' },
    { id: 'snake', icon: Bug, label: 'Snake' },
];

const TeamSetup = () => {
    const [teamName, setTeamName] = useState('');
    const [selectedLogo, setSelectedLogo] = useState(null);
    const { setupTeam } = useCtf();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (teamName.trim() && selectedLogo) {
            setupTeam(teamName, selectedLogo);
        }
    };

    return (
        <div className="container" style={{ minHeight: '100vh', padding: '4rem 1rem' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="luxury-card"
                >
                    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                        <h1 className="gold-text" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Team Assembly</h1>
                        <p style={{ color: 'var(--text-dim)', fontSize: '1.1rem' }}>Choose your identity and prepare for the challenge.</p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: '3rem' }}>
                            <label style={{ display: 'block', marginBottom: '1rem', color: 'var(--primary-color)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                Team Designation
                            </label>
                            <div style={{ position: 'relative' }}>
                                <User size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-color)' }} />
                                <input
                                    required
                                    type="text"
                                    placeholder="Ex: Cyber Phantoms"
                                    value={teamName}
                                    onChange={(e) => setTeamName(e.target.value)}
                                    style={{ width: '100%', paddingLeft: '50px', height: '60px', fontSize: '1.2rem' }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: '3rem' }}>
                            <label style={{ display: 'block', marginBottom: '1.5rem', color: 'var(--primary-color)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                                Select your symbol 
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: '1.5rem' }}>
                                {LOGOS.map((logo) => {
                                    const Icon = logo.icon;
                                    const isSelected = selectedLogo === logo.id;
                                    return (
                                        <motion.div
                                            key={logo.id}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedLogo(logo.id)}
                                            style={{
                                                cursor: 'pointer', padding: '1.5rem', borderRadius: '12px', border: `1px solid ${isSelected ? 'var(--primary-color)' : 'rgba(255,255,255,0.05)'}`,
                                                background: isSelected ? 'rgba(212, 175, 55, 0.1)' : 'rgba(255,255,255,0.02)',
                                                textAlign: 'center', transition: 'all 0.3s ease',
                                                boxShadow: isSelected ? '0 0 15px rgba(212, 175, 55, 0.2)' : 'none'
                                            }}
                                        >
                                            <Icon size={40} style={{ color: isSelected ? 'var(--primary-color)' : 'var(--text-dim)', marginBottom: '0.8rem' }} />
                                            <div style={{ color: isSelected ? '#fff' : 'var(--text-dim)', fontWeight: '600', fontSize: '0.9rem' }}>{logo.label}</div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn-primary"
                            disabled={!teamName.trim() || !selectedLogo}
                            style={{ width: '100%', height: '60px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', opacity: (!teamName.trim() || !selectedLogo) ? 0.5 : 1 }}
                        >
                            Start Mission <ChevronRight size={20} />
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default TeamSetup;
