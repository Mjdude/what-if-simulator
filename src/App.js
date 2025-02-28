import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import clickSound from './sounds/click.mp3';
import correctSound from './sounds/correct.mp3';
import wrongSound from './sounds/wrong.mp3';
import bgMusic from './sounds/background.mp3';
import smallAsteroid from './images/small-asteroid.jpg';
import mediumAsteroid from './images/medium-asteroid.jpg';
import largeAsteroid from './images/large-asteroid.jpeg';
import alienInvasion from './images/alien-invasion.jpg';
import climateChange from './images/climate-change.jpeg';
import './App.css';

function App() {
  const [selectedOption, setSelectedOption] = useState('');
  const [result, setResult] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [scenarioType, setScenarioType] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [playClick] = useSound(clickSound);
  const [playCorrect] = useSound(correctSound);
  const [playWrong] = useSound(wrongSound);
  const [playBgMusic, { stop }] = useSound(bgMusic, { volume: 0.5, loop: true });

  useEffect(() => {
    playBgMusic();
    return () => stop();
  }, [playBgMusic, stop]);

  // ✅ Sample scenarios data (replace with actual data)
  const scenarios = {
    asteroid: [
      {
        question: "What happens if a small asteroid hits Earth?",
        image: smallAsteroid,
        options: [
          { text: "It burns up in the atmosphere", correct: true },
          { text: "It causes mass extinction", correct: false },
        ],
        explanation: "Most small asteroids burn up before reaching the ground."
      },
      {
        question: "What would happen if a large asteroid hits the ocean?",
        image: largeAsteroid,
        options: [
          { text: "It causes tsunamis", correct: true },
          { text: "It vaporizes instantly", correct: false },
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
        ],
        explanation: "Switching to renewable energy reduces emissions significantly."
      }
    ]
  };

  const handleOptionSelect = (option) => {
    playClick();
    setSelectedOption(option.text);
    if (option.correct) {
      playCorrect();
      setResult(`✅ Correct! ${scenarios[scenarioType][currentScenario].explanation}`);
      setAttempts(0);
    } else {
      playWrong();
      setAttempts(attempts + 1);
      if (attempts < 1) {
        setResult('❌ Incorrect. Try again!');
      } else {
        setResult(`❌ Incorrect. The correct answer is: ${scenarios[scenarioType][currentScenario].options.find(opt => opt.correct).text}`);
        setAttempts(0);
      }
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
      <div className="scenario-selector">
        <label htmlFor="scenario-type">Choose a scenario:</label>
        <select id="scenario-type" value={scenarioType} onChange={handleScenarioChange}>
          <option value="">Select a scenario</option>
          <option value="asteroid">☄️ Asteroid Impact</option>
          <option value="alien">👽 Alien Invasion</option>
          <option value="climate">🌡️ Climate Change</option>
        </select>
      </div>
      {scenarioType && scenarios[scenarioType] && scenarios[scenarioType].length > 0 && (
        <motion.div
          className="scenario"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>{scenarios[scenarioType][currentScenario].question}</h2>
          <img src={scenarios[scenarioType][currentScenario].image} alt="Scenario" className="scenario-image" />
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
