import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import clickSound from './sounds/click.mp3';
import correctSound from './sounds/correct.mp3';
import wrongSound from './sounds/wrong.mp3';
import bgMusic from './sounds/background.mp3';
import smallAsteroid from './images/small-asteroid.gif';
import mediumAsteroid from './images/medium-asteroid.jpg';
import largeAsteroid from './images/large-asteroid.gif';
import alienInvasion from './images/alien-invasion.gif';
import climateChange from './images/climate-change.gif';
import aiTakeover from './images/ai-takeover.gif';
import supervolcano from './images/supervolcano.gif';
import nuclearWar from './images/nuclear-war.gif';
import './App.css';

function App() {
  const [selectedOption, setSelectedOption] = useState('');
  const [result, setResult] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [scenarioType, setScenarioType] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [playClick] = useSound(clickSound);
  const [playCorrect] = useSound(correctSound);
  const [playWrong] = useSound(wrongSound);
  const [playBgMusic, { stop }] = useSound(bgMusic, { volume: 0.5, loop: true });

  useEffect(() => {
    playBgMusic();
    return () => stop();
  }, [playBgMusic, stop]);

  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    setLeaderboard(storedLeaderboard);
  }, []);


  const scenarios = {
    asteroid: [
      {
        question: "What happens if a small asteroid hits Earth?",
        image: smallAsteroid,
        options: [
          { text: "It burns up in the atmosphere", correct: true },
          { text: "It causes mass extinction", correct: false },
          { text: "It creates a big crater", correct: false }
        ],
        explanation: "Most small asteroids burn up before reaching the ground."
      },
      {
        question: "What would happen if a large asteroid hits Earth?",
        image: largeAsteroid,
        options: [
          { text: "It causes humongous tsunamis", correct: true },
          { text: "It vaporizes instantly", correct: false },
          { text: "It causes mass extinction", correct: false }
        ],
        explanation: "Large asteroids hitting the ocean can generate massive tsunamis."
      }
    ],
    alien: [
      {
        question: "How should humanity react to an alien signal?",
        image: alienInvasion,
        options: [
          { text: "Try to contact them", correct: false },
          { text: "Observe and analyze first", correct: true },
          { text: "Attack them!", correct: false }
        ],
        explanation: "Scientists suggest analyzing before responding to avoid risks."
      }
    ],
    climate: [
      {
        question: "Which action helps reduce climate change the most?",
        image: climateChange,
        options: [
          { text: "Using renewable energy", correct: true },
          { text: "Turning off lights at night", correct: false },
          { text: "Reducing the usage of CFG gases", correct: false }
        ],
        explanation: "Switching to renewable energy reduces emissions significantly."
      }
    ],
    ai: [
      {
        question: "What is a potential risk of AI surpassing human intelligence?",
        image: aiTakeover,
        options: [
          { text: "It could automate all jobs", correct: false },
          { text: "It may make humans obsolete", correct: true },
          { text: "It will never surpass humans", correct: false }
        ],
        explanation: "Experts warn AI could outpace human control, leading to risks."
      }
    ],
    supervolcano: [
      {
        question: "What would happen if Yellowstone's supervolcano erupts?",
        image: supervolcano,
        options: [
          { text: "Minor earthquakes and small eruptions", correct: false },
          { text: "A global climate disaster", correct: true },
          { text: "Only local damage", correct: false }
        ],
        explanation: "A supervolcano eruption would impact global temperatures and food supply."
      }
    ],
    nuclear: [
      {
        question: "What is the biggest risk of a nuclear war?",
        image: nuclearWar,
        options: [
          { text: "Massive explosions only", correct: false },
          { text: "Long-term radiation and climate impact", correct: true },
          { text: "Governments will stop it in time", correct: false }
        ],
        explanation: "A nuclear war could cause nuclear winter, starvation, and long-term radiation effects."
      }
    ]
  };

  const updateLeaderboard = (newScore) => {
    const updatedLeaderboard = [...leaderboard, newScore].sort((a, b) => b - a).slice(0, 5);
    setLeaderboard(updatedLeaderboard);
    localStorage.setItem('leaderboard', JSON.stringify(updatedLeaderboard));
  };


  const handleOptionSelect = (option) => {
    playClick();
    setSelectedOption(option.text);
    if (option.correct) {
      playCorrect();
      setResult(`✅ Correct!`);
      const newScore = score + 10;
      setScore(newScore);
      updateLeaderboard(newScore);
      setAttempts(0);
    } else {
      playWrong();
      setAttempts(attempts + 1);
      setResult(`❌ Incorrect. Try again!`);
    }
  };


  const nextScenario = () => {
    if (currentScenario < scenarios[scenarioType].length - 1) {
      setCurrentScenario(currentScenario + 1);
      setResult('');
      setSelectedOption('');
    }
  };

  const prevScenario = () => {
    if (currentScenario > 0) {
      setCurrentScenario(currentScenario - 1);
      setResult('');
      setSelectedOption('');
    }
  };

  const handleScenarioChange = (event) => {
    playClick();
    setScenarioType(event.target.value);
    setCurrentScenario(0);
    setResult('');
    setSelectedOption('');
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <button className="dark-mode-toggle" onClick={() => setIsDarkMode(!isDarkMode)}>
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        🌎 What If Simulator
      </motion.h1>

      <button className="leaderboard-toggle" onClick={() => setShowLeaderboard(!showLeaderboard)}>
      {showLeaderboard ? 'Hide 🏆 Leaderboard' : '🏆'}
    </button>
    
      
      {showLeaderboard && (
        <div className="leaderboard">
          <h2>🏆 Leaderboard</h2>
          <ol>
            {leaderboard.map((score, index) => (
              <li key={index}>Player {index + 1}: {score} points</li>
            ))}
          </ol>
        </div>
      )}

      <div className="scenario-selector">
        <label htmlFor="scenario-type">Choose a What If scenario:</label>
        <select id="scenario-type" value={scenarioType} onChange={handleScenarioChange}>
          <option value="">Select a scenario</option>
          <option value="asteroid">☄️ Asteroid Impact</option>
          <option value="alien">👽 Alien Invasion</option>
          <option value="climate">🌡️ Climate Change</option>
          <option value="ai">🤖 AI Future</option>
          <option value="supervolcano">🌋 SuperVolcano Explosion</option>
          <option value="nuclear">⚛️ Nuclear Blast</option>
        </select>
      </div>
      {scenarioType && scenarios[scenarioType] && scenarios[scenarioType][currentScenario] && (
  <motion.div
    className="scenario"
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2>{scenarios[scenarioType][currentScenario].question}</h2>
    <img 
      src={scenarios[scenarioType][currentScenario].image} 
      alt="Scenario" 
      className="scenario-image" 
    />
    
    {/* ✅ Check if options exist before mapping */}
    {scenarios[scenarioType][currentScenario].options ? (
      <div className="options">
        {scenarios[scenarioType][currentScenario].options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => handleOptionSelect(option)}
          >
            {option.text}
          </motion.button>
        ))}
      </div>
    ) : (
      <p>No options available.</p>  // Error handling
    )}
    
    {result && <motion.p className="result" animate={{ scale: 1.1 }}>{result}</motion.p>}

    <div className="navigation">
      <button onClick={prevScenario} disabled={currentScenario === 0}>⬅️ Previous</button>
      <button onClick={nextScenario} disabled={currentScenario >= scenarios[scenarioType].length - 1}>Next ➡️</button>
    </div>
  </motion.div>
)}

    </div>
  );
}

export default App;
