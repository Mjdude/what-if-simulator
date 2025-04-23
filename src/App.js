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
import nuclearWinter from './images/nuclear2.gif';
import climateCloud from './images/cloud2.gif';
import superVolcano1 from './images/supervolcano2.gif';
import alienInvasion2 from './images/alien2.gif';
import climateChange1 from './images/climate2.gif';
import aiTakeover1 from './images/ai2.gif';
import './App.css';
import LoginForm from './loginform/LoginForm';
import 'bootstrap/dist/css/bootstrap.min.css';

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
  const [gameMode, setGameMode] = useState(null);
  const [playerScores, setPlayerScores] = useState([0, 0]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    playBgMusic();
    return () => stop();
  }, [playBgMusic, stop]);

  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    setLeaderboard(storedLeaderboard);
  }, []);

  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0';
    document.head.appendChild(meta);
  
    return () => {
      document.head.removeChild(meta);
    };
  }, []);

  // Your scenarios object remains the same...
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
      },
      {
        question: "How should we prepare for potential alien contact?",
        image: alienInvasion2, // Consider a different image for preparation scenario
        options: [
          { text: "Build more weapons and defenses", correct: false },
          { text: "Develop international protocols and research", correct: true },
          { text: "Ignore the possibility until it happens", correct: false }
        ],
        explanation: "The SETI Institute recommends coordinated scientific preparation rather than militarization."
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
      },
      {
        question: "What's the most effective way for individuals to reduce their carbon footprint?",
        image: climateChange1, // Consider using a different image like "carbon-footprint.jpg"
        options: [
          { text: "Reduce meat consumption", correct: true },
          { text: "Recycle household waste", correct: false },
          { text: "Use reusable shopping bags", correct: false }
        ],
        explanation: "Animal agriculture accounts for 14.5% of global emissions - reducing meat has a bigger impact than common recycling habits."
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
      },
      {
        question: "What's the biggest concern about autonomous weapons systems?",
        image: aiTakeover1, // Could use "ai-weapons.jpg" for variety
        options: [
          { text: "They might malfunction", correct: false },
          { text: "They could start wars without human consent", correct: true },
          { text: "They would be too expensive", correct: false }
        ],
        explanation: "The UN warns 'killer robots' could lower thresholds for warfare and escalate conflicts uncontrollably."
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
      },
      {
        question: "What's the most likely warning sign before a supervolcano erupts?",
        image: superVolcano1, // Could use "volcano-monitoring.jpg"
        options: [
          { text: "Sudden animal migrations", correct: false },
          { text: "Intense earthquake swarms and ground uplift", correct: true },
          { text: "Unusual weather patterns", correct: false }
        ],
        explanation: "Scientists monitor seismic activity and ground deformation as key indicators of potential eruptions."
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
      },
      {
        question: "What would nuclear winter most severely affect?",
        image: nuclearWinter, // Could use "nuclear-winter.jpg"
        options: [
          { text: "Global food production", correct: true },
          { text: "Electronic devices worldwide", correct: false },
          { text: "Ocean current patterns", correct: false }
        ],
        explanation: "Soot blocking sunlight would cause catastrophic crop failures and mass starvation globally."
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
      if (gameMode === 'single') {
        const newScore = score + 10;
        setScore(newScore);
        updateLeaderboard(newScore);
      } else {
        const newScores = [...playerScores];
        newScores[currentPlayer] += 10;
        setPlayerScores(newScores);
      }
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
      // Switch player after answering (not just when moving to next scenario)
      if (gameMode === 'multi') {
        setCurrentPlayer(currentPlayer === 0 ? 1 : 0);
      }
    }
  };

  const prevScenario = () => {
    if (currentScenario > 0) {
      setCurrentScenario(currentScenario - 1);
      setResult('');
      setSelectedOption('');
      // Don't switch player when going back
    }
  };

  const handleScenarioChange = (event) => {
    playClick();
    setScenarioType(event.target.value);
    setCurrentScenario(0);
    setResult('');
    setSelectedOption('');
    // Reset to player 1 when changing scenario type
    if (gameMode === 'multi') {
      setCurrentPlayer(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Your message has been sent!');
  };

  const selectGameMode = (mode) => {
    playClick();
    setGameMode(mode);
    setScore(0);
    setPlayerScores([0, 0]);
    setCurrentPlayer(0);
  };

  const resetGame = () => {
    setGameMode(null);
    setScenarioType('');
    setCurrentScenario(0);
    setResult('');
    setSelectedOption('');
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      {isLoggedIn ? (
        <>
          <button 
            className={`dark-mode-toggle ${isDarkMode ? 'dark' : 'light'}`} 
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
          <motion.h1 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            🌎 What If Simulator
          </motion.h1>
          <p className="description">
            Welcome to the "What If Simulator"! 🚀 This interactive game explores various catastrophic and futuristic scenarios,
            allowing you to test your knowledge and make decisions that could shape the outcome. Choose a scenario and see if you
            can survive the unexpected!
          </p>
          {!gameMode ? (
            <div className="game-mode-selector">
              <h2>Select Game Mode</h2>
              <div className="mode-buttons">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => selectGameMode('single')}
                  className="mode-button"
                >
                  1 Player
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => selectGameMode('multi')}
                  className="mode-button"
                >
                  2 Players
                </motion.button>
              </div>
            </div>
          ) : (
            <>
              <button 
                className={`reset-button ${isDarkMode ? 'dark' : 'light'}`} 
                onClick={resetGame}
              >
                ↩️ Change Game Mode
              </button>

              {gameMode === 'multi' && (
                <div className="player-scores">
                  <div className={`player-score ${currentPlayer === 0 ? 'active' : ''} ${isDarkMode ? 'dark' : 'light'}`}>
                    Player 1: {playerScores[0]} points
                  </div>
                  <div className={`player-score ${currentPlayer === 1 ? 'active' : ''} ${isDarkMode ? 'dark' : 'light'}`}>
                    Player 2: {playerScores[1]} points
                  </div>
                </div>
              )}

              <button 
                className={`leaderboard-toggle ${isDarkMode ? 'dark' : 'light'}`} 
                onClick={() => setShowLeaderboard(!showLeaderboard)}
              >
                {showLeaderboard ? 'Hide 🏆 Leaderboard' : '🏆'}
              </button>
              
              {showLeaderboard && (
                <div className={`leaderboard ${isDarkMode ? 'dark' : 'light'}`}>
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
                <select 
                  id="scenario-type" 
                  value={scenarioType} 
                  onChange={handleScenarioChange}
                  className={isDarkMode ? 'dark' : 'light'}
                >
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
                  {gameMode === 'multi' && (
                    <div className={`current-player-indicator ${isDarkMode ? 'dark' : 'light'}`}>
                      Player {currentPlayer + 1}'s turn
                    </div>
                  )}
                  <img 
                    src={scenarios[scenarioType][currentScenario].image} 
                    alt="Scenario" 
                    className="scenario-image" 
                  />
                  
                  {scenarios[scenarioType][currentScenario].options ? (
                    <div className="options">
                      {scenarios[scenarioType][currentScenario].options.map((option, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleOptionSelect(option)}
                          className={isDarkMode ? 'dark' : 'light'}
                        >
                          {option.text}
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <p>No options available.</p>
                  )}
                  
                  {result && <motion.p className="result" animate={{ scale: 1.1 }}>{result}</motion.p>}

                  <div className="navigation">
                    <button 
                      onClick={prevScenario} 
                      disabled={currentScenario === 0}
                      className={isDarkMode ? 'dark' : 'light'}
                    >
                      ⬅️ Previous
                    </button>
                    <button 
                      onClick={nextScenario} 
                      disabled={currentScenario >= scenarios[scenarioType].length - 1}
                      className={isDarkMode ? 'dark' : 'light'}
                    >
                      Next ➡️
                    </button>
                  </div>
                </motion.div>
              )}

              <div className="contact-form">
                <h2>📩 Contact Me</h2>
                <form onSubmit={handleSubmit}>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Your Name" 
                    required 
                    className={isDarkMode ? 'dark' : 'light'}
                  />
                  <input 
                    type="email" 
                    name="email" 
                    placeholder="Your Email" 
                    required 
                    className={isDarkMode ? 'dark' : 'light'}
                  />
                  <textarea 
                    name="message" 
                    placeholder="Your Message" 
                    rows="4" 
                    required
                    className={isDarkMode ? 'dark' : 'light'}
                  ></textarea>
                  <button 
                    type="submit"
                    className={isDarkMode ? 'dark' : 'light'}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </>
          )}

          <footer className="footer">
            <p>© 2025 What If Simulator | Designed by Prashanth A</p>
            <p>Follow me on <a href="https://github.com/yourgithub">GitHub</a> | <a href="https://linkedin.com/in/yourlinkedin">LinkedIn</a></p>
          </footer>
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;