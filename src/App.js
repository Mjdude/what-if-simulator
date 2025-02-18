import React, { useState } from 'react';
import './App.css';
import smallAsteroid from './images/small-asteroid.jpg';
import mediumAsteroid from './images/medium-asteroid.jpg';
import largeAsteroid from './images/large-asteroid.jpeg';
import alienInvasion from './images/alien-invasion.jpg';
import climateChange from './images/climate-change.jpeg';

function App() {
  const [selectedOption, setSelectedOption] = useState('');
  const [result, setResult] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [scenarioType, setScenarioType] = useState('');

  const scenarios = {
    asteroid: [
      {
        question: 'What if a small asteroid hits Earth?',
        image: smallAsteroid,
        options: [
          { text: 'It will cause minor damage to a small area.', correct: true },
          { text: 'It will destroy the entire planet.', correct: false },
          { text: 'It will have no effect at all.', correct: false },
        ],
        explanation: 'A small asteroid would cause minor damage to a small area, similar to the Chelyabinsk meteor in 2013.',
      },
      {
        question: 'What if a medium-sized asteroid hits Earth?',
        image: mediumAsteroid,
        options: [
          { text: 'It will cause regional destruction.', correct: true },
          { text: 'It will create a global ice age.', correct: false },
          { text: 'It will only affect the oceans.', correct: false },
        ],
        explanation: 'A medium-sized asteroid could cause regional destruction, similar to the Tunguska event in 1908.',
      },
      {
        question: 'What if a large asteroid hits Earth?',
        image: largeAsteroid,
        options: [
          { text: 'It will cause global devastation.', correct: true },
          { text: 'It will only affect the atmosphere.', correct: false },
          { text: 'It will create a new moon.', correct: false },
        ],
        explanation: 'A large asteroid could cause global devastation, leading to mass extinctions and climate change.',
      },
    ],
    alien: [
      {
        question: 'What if aliens invade Earth?',
        image: alienInvasion,
        options: [
          { text: 'They will try to communicate with us.', correct: true },
          { text: 'They will destroy all human civilization.', correct: false },
          { text: 'They will ignore us completely.', correct: false },
        ],
        explanation: 'If aliens are advanced enough to reach Earth, they would likely try to communicate with us rather than destroy us.',
      },
      {
        question: 'What if aliens are peaceful?',
        image: alienInvasion,
        options: [
          { text: 'They will share advanced technology with us.', correct: true },
          { text: 'They will enslave humanity.', correct: false },
          { text: 'They will leave Earth immediately.', correct: false },
        ],
        explanation: 'Peaceful aliens would likely share knowledge and technology to help humanity progress.',
      },
      {
        question: 'What if aliens are hostile but technologically inferior?',
        image: alienInvasion,
        options: [
          { text: 'Humanity will defend Earth successfully.', correct: true },
          { text: 'They will still conquer Earth.', correct: false },
          { text: 'They will form an alliance with humans.', correct: false },
        ],
        explanation: 'If aliens are hostile but less advanced, humanity could defend Earth successfully.',
      },
    ],
    climate: [
      {
        question: 'What if global temperatures rise by 1°C?',
        image: climateChange,
        options: [
          { text: 'It will cause more frequent heatwaves.', correct: true },
          { text: 'It will have no significant impact.', correct: false },
          { text: 'It will cause a new ice age.', correct: false },
        ],
        explanation: 'A 1°C rise in global temperatures will lead to more frequent heatwaves and extreme weather events.',
      },
      {
        question: 'What if global temperatures rise by 2°C?',
        image: climateChange,
        options: [
          { text: 'It will cause severe droughts and food shortages.', correct: true },
          { text: 'It will improve agricultural productivity.', correct: false },
          { text: 'It will have no impact on ecosystems.', correct: false },
        ],
        explanation: 'A 2°C rise will cause severe droughts, food shortages, and ecosystem collapse.',
      },
      {
        question: 'What if global temperatures rise by 3°C?',
        image: climateChange,
        options: [
          { text: 'It will lead to catastrophic climate events.', correct: true },
          { text: 'It will stabilize the climate.', correct: false },
          { text: 'It will cause global cooling.', correct: false },
        ],
        explanation: 'A 3°C rise will lead to catastrophic climate events, including mass extinctions and uninhabitable regions.',
      },
    ],
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option.text);
    if (option.correct) {
      setResult(`Correct! ${option.text} ${scenarios[scenarioType][currentScenario].explanation}`);
      setAttempts(0); // Reset attempts
    } else {
      setAttempts(attempts + 1);
      if (attempts < 1) {
        setResult(`Incorrect. Try again!`);
      } else {
        setResult(`Incorrect. The correct answer is: ${scenarios[scenarioType][currentScenario].options.find((opt) => opt.correct).text}`);
        setAttempts(0); // Reset attempts
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
    const selectedType = event.target.value;
    setScenarioType(selectedType);
    setCurrentScenario(0);
    setResult('');
    setSelectedOption('');
  };

  return (
    <div className="App">
      <h1>What If Simulator</h1>
      <div className="scenario-selector">
        <label htmlFor="scenario-type">Choose a scenario:</label>
        <select id="scenario-type" value={scenarioType} onChange={handleScenarioChange}>
          <option value="">Select a scenario</option>
          <option value="asteroid">Asteroid Impact</option>
          <option value="alien">Alien Invasion</option>
          <option value="climate">Climate Change</option>
        </select>
      </div>
      {scenarioType && (
        <div className="scenario">
          <h2>{scenarios[scenarioType][currentScenario].question}</h2>
          <img src={scenarios[scenarioType][currentScenario].image} alt="Scenario" className="scenario-image" />
          <div className="options">
            {scenarios[scenarioType][currentScenario].options.map((option, index) => (
              <button key={index} onClick={() => handleOptionSelect(option)}>
                {option.text}
              </button>
            ))}
          </div>
          {result && <p className="result">{result}</p>}
          <div className="navigation">
            <button onClick={prevScenario} disabled={currentScenario === 0}>
              Previous
            </button>
            <button onClick={nextScenario} disabled={currentScenario === scenarios[scenarioType].length - 1}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;