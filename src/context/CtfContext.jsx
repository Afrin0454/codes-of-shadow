import React, { createContext, useContext, useState, useEffect } from 'react';
import { QUESTION_SETS, NUMERIC_WORDS } from '../data/questions';
import sql from '../lib/db';

const CtfContext = createContext();

/* ✅ DEFAULT STATE (VERY IMPORTANT) */
const defaultGameState = {
    step: 'password', // password, setup, playing, finished
    password: '',
    team: null, // { name, logo }
    startTime: null,
    endTime: null,
    answers: {},
    score: 0,
};

export const CtfProvider = ({ children }) => {

    /* ✅ SAFE STATE INITIALIZATION */
    const [gameState, setGameState] = useState(() => {
        const saved = localStorage.getItem('vcoders_ctf_state');

        if (saved) {
            const parsed = JSON.parse(saved);

            // 🔐 CRITICAL GUARD — finished state should NOT persist
            if (parsed.step === 'finished') {
                localStorage.removeItem('vcoders_ctf_state');
                return defaultGameState;
            }

            return parsed;
        }

        return defaultGameState;
    });

    const [leaderboard, setLeaderboard] = useState([]);

    /* ✅ FETCH LEADERBOARD (Neon DB) */
    useEffect(() => {
        const fetchLeaderboard = async () => {
            try {
                const data = await sql`
                    SELECT id, name, score, time, logo
                    FROM leaderboard
                    ORDER BY score DESC, time ASC
                    LIMIT 100
                `;
                setLeaderboard(data);
            } catch (error) {
                console.error('Failed to fetch leaderboard from Neon:', error);
                const saved = localStorage.getItem('vcoders_ctf_leaderboard');
                if (saved) setLeaderboard(JSON.parse(saved));
            }
        };
        fetchLeaderboard();
    }, []);

    /* ✅ PERSIST GAME STATE */
    useEffect(() => {
        localStorage.setItem('vcoders_ctf_state', JSON.stringify(gameState));
    }, [gameState]);

    /* ✅ BACKUP LEADERBOARD */
    useEffect(() => {
        localStorage.setItem('vcoders_ctf_leaderboard', JSON.stringify(leaderboard));
    }, [leaderboard]);

    /* ✅ PASSWORD VALIDATION */
    const validatePassword = (pwd) => {
        const cleanPwd = pwd.toLowerCase().trim();
        if (NUMERIC_WORDS.includes(cleanPwd)) {
            setGameState(prev => ({
                ...prev,
                step: 'setup',
                password: cleanPwd
            }));
            return true;
        }
        return false;
    };

    /* ✅ TEAM SETUP */
    const setupTeam = (name, logo) => {
        setGameState(prev => ({
            ...prev,
            step: 'playing',
            team: { name, logo },
            startTime: Date.now()
        }));
    };

    /* ✅ FLAG SUBMISSION */
    const submitFlag = (questionId, flag) => {
        setGameState(prev => ({
            ...prev,
            answers: {
                ...prev.answers,
                [questionId]: flag
            }
        }));
    };

    /* ✅ FINISH GAME */
    const finishGame = () => {
        const endTime = Date.now();
        const timeTaken = Math.floor((endTime - gameState.startTime) / 1000);
        const questions = QUESTION_SETS[gameState.password] || QUESTION_SETS['one'];

        let score = 0;
        questions.forEach(q => {
            const userAnswer = gameState.answers[q.id] || '';
            if (userAnswer.trim().toUpperCase() === `FLAG{${q.answer.toUpperCase()}}`) {
                score += 100;
            }
        });

        const finalState = {
            ...gameState,
            step: 'finished',
            endTime,
            score
        };

        setGameState(finalState);

        /* ✅ SAVE TO NEON */
        const saveToNeon = async () => {
            try {
                const result = await sql`
                    INSERT INTO leaderboard (name, score, time, logo)
                    VALUES (${gameState.team.name}, ${score}, ${timeTaken}, ${gameState.team.logo})
                    RETURNING id, name, score, time, logo
                `;

                const newResult = result[0];
                setLeaderboard(prev => {
                    const updated = [...prev, newResult].sort((a, b) => {
                        if (b.score !== a.score) return b.score - a.score;
                        return a.time - b.time;
                    });
                    return updated;
                });
            } catch (error) {
                console.error('Failed to save score to Neon:', error);

                /* 🔁 LOCAL FALLBACK */
                const newResult = {
                    id: Date.now(),
                    name: gameState.team.name,
                    logo: gameState.team.logo,
                    score,
                    time: timeTaken
                };

                setLeaderboard(prev => {
                    const updated = [...prev, newResult].sort((a, b) => {
                        if (b.score !== a.score) return b.score - a.score;
                        return a.time - b.time;
                    });
                    return updated;
                });
            }
        };

        saveToNeon();
    };

    /* ✅ RANK CALCULATION */
    const getRank = () => {
        const index = leaderboard.findIndex(
            entry =>
                entry.name === gameState.team?.name &&
                entry.score === gameState.score
        );
        return index + 1;
    };

    /* ✅ RESTART / NEW ATTEMPT */
    const restartGame = () => {
        localStorage.removeItem('vcoders_ctf_state');
        setGameState(defaultGameState);
    };

    return (
        <CtfContext.Provider value={{
            gameState,
            validatePassword,
            setupTeam,
            submitFlag,
            finishGame,
            leaderboard,
            getRank,
            restartGame
        }}>
            {children}
        </CtfContext.Provider>
    );
};

export const useCtf = () => useContext(CtfContext);