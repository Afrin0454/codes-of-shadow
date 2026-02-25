import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCtf } from './context/CtfContext';
import PasswordGate from './components/PasswordGate';
import TeamSetup from './components/TeamSetup';
import CTFChallenge from './components/CTFChallenge';
import Result from './components/Result';
import Leaderboard from './components/Leaderboard';

const App = () => {
  const { gameState } = useCtf();
  const [viewLeaderboard, setViewLeaderboard] = useState(false);

  // Transition variants
  const pageVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const renderContent = () => {
    if (viewLeaderboard) {
      return (
        <motion.div key="leaderboard" variants={pageVariants} initial="initial" animate="animate" exit="exit">
          <Leaderboard onBack={() => setViewLeaderboard(false)} />
        </motion.div>
      );
    }

    switch (gameState.step) {
      case 'password':
        return (
          <motion.div key="password" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <PasswordGate />
          </motion.div>
        );
      case 'setup':
        return (
          <motion.div key="setup" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <TeamSetup />
          </motion.div>
        );
      case 'playing':
        return (
          <motion.div key="playing" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <CTFChallenge />
          </motion.div>
        );
      case 'finished':
        return (
          <motion.div key="finished" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <Result onShowLeaderboard={() => setViewLeaderboard(true)} />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-main">
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>

      {/* Floating Leaderboard Button (only on welcome/password/setup/finished) */}
      {!viewLeaderboard && (gameState.step === 'password' || gameState.step === 'finished') && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setViewLeaderboard(true)}
          style={{
            position: 'fixed', bottom: '2rem', right: '2rem',
            background: 'var(--surface-color)', border: '1px solid var(--primary-color)',
            color: 'var(--primary-color)', padding: '0.8rem 1.2rem', borderRadius: '30px',
            fontSize: '0.8rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px',
            cursor: 'pointer', zIndex: 1000
          }}
        >
          View Leaderboard
        </motion.button>
      )}
    </div>
  );
};

export default App;
