import React, { useState } from 'react';

const scenarios = [
  {
    id: 1,
    title: 'BTN vs BB - 15bb Deep',
    options: ['Fold', 'Call', 'Raise to 2.5bb'],
    gtoAnswer: 'Raise to 2.5bb',
    exploitAnswer: 'Call',
    villainType: 'Loose Passive',
  },
  {
    id: 2,
    title: 'CO vs BTN - 25bb Deep',
    options: ['Fold', '3-bet', 'Call'],
    gtoAnswer: '3-bet',
    exploitAnswer: 'Call',
    villainType: 'Nit Passive',
  },
  {
    id: 3,
    title: 'SB vs BB - 10bb Deep',
    options: ['Shove', 'Min-raise', 'Fold'],
    gtoAnswer: 'Shove',
    exploitAnswer: 'Min-raise',
    villainType: 'Aggro Fish',
  },
];

export default function App() {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedAction, setSelectedAction] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [mode, setMode] = useState<'GTO' | 'Exploit'>('GTO');

  const scenario = scenarios[currentScenario];

  const handleSubmit = () => {
    setShowAnswer(true);
  };

  const handleNext = () => {
    setCurrentScenario((prev) => (prev + 1) % scenarios.length);
    setSelectedAction('');
    setShowAnswer(false);
  };

  return (
    <div style={{ padding: 24, maxWidth: 600, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ border: '1px solid #ccc', padding: 16, marginBottom: 16 }}>
        <h2>Scenario {scenario.id}: {scenario.title}</h2>
        <p><strong>Villain Type:</strong> {scenario.villainType}</p>
        <select
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value)}
          style={{ width: '100%', padding: 8, marginTop: 8 }}
        >
          <option value="">Choose your action</option>
          {scenario.options.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <div style={{ marginTop: 12 }}>
          <button onClick={handleSubmit} disabled={!selectedAction} style={{ marginRight: 8 }}>
            Submit
          </button>
          <button onClick={handleNext}>
            Next
          </button>
        </div>
      </div>

      {showAnswer && (
        <div style={{ border: '1px solid #ccc', padding: 16 }}>
          <p>Your action: <strong>{selectedAction}</strong></p>
          <p>Correct GTO Action: <strong>{scenario.gtoAnswer}</strong></p>
          <p>Exploitative Action (vs {scenario.villainType}): <strong>{scenario.exploitAnswer}</strong></p>
          <p style={{ fontSize: '0.85em', color: '#666' }}>
            * Exploitative actions depend on villain tendencies and may differ from GTO.
          </p>
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <p>Mode:</p>
        <button
          onClick={() => setMode('GTO')}
          style={{ marginRight: 8, fontWeight: mode === 'GTO' ? 'bold' : 'normal' }}
        >
          GTO
        </button>
        <button
          onClick={() => setMode('Exploit')}
          style={{ fontWeight: mode === 'Exploit' ? 'bold' : 'normal' }}
        >
          Exploitative
        </button>
      </div>
    </div>
  );
}
