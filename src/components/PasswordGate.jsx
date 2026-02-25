import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCtf } from '../context/CtfContext';
import { Shield } from 'lucide-react';

const PasswordGate = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const { validatePassword } = useCtf();

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validatePassword(password);
        if (!isValid) {
            setError(true);
            setTimeout(() => setError(false), 500);
        }
    };

    return (
        <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="luxury-card"
                style={{ width: '100%', maxWidth: '450px', textAlign: 'center' }}
            >
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(212, 175, 55, 0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem',
                        border: '1px solid var(--primary-color)'
                    }}>
                        <Shield size={40} className="gold-text" />
                    </div>
                    <h1 className="gold-text" style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Security Protocol</h1>
                    <p style={{ color: 'var(--text-dim)' }}>Scan detected. Authorization required.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
                        <motion.div
                            animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                            transition={{ duration: 0.4 }}
                        >
                            <input
                                type="text"
                                placeholder="Enter Access Key..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%', padding: '15px 20px', fontSize: '1.1rem',
                                    textAlign: 'center', letterSpacing: '2px', textTransform: 'lowercase',
                                    borderColor: error ? 'var(--error-color)' : ''
                                }}
                            />
                        </motion.div>
                        <AnimatePresence>
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    style={{ color: 'var(--error-color)', marginTop: '0.8rem', fontWeight: '500' }}
                                >
                                    ACCESS DENIED
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                        Authorize Access
                    </button>
                </form>

                <p style={{ marginTop: '2rem', fontSize: '0.8rem', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Restricted Area - Port 8080 Active
                </p>
            </motion.div>
        </div>
    );
};

export default PasswordGate;
