import { useState } from 'react';
import './App.css';
import mockDB from './api/mockdb.json';
import ChatBox from './chatbox';

// Mock AI parser for demo
const mockAIResponse = (message) => {
  const lower = message.toLowerCase();
  if (lower.includes('cold')) return { thermostatChange: 1 };
  if (lower.includes('hot')) return { thermostatChange: -1 };
  if (lower.includes('turn on light')) return { lightStatus: 'on' };
  if (lower.includes('turn off light')) return { lightStatus: 'off' };
  return {};
};

function App() {
  const [lights, setLights] = useState(mockDB.lights);
  const [thermostats, setThermostats] = useState(mockDB.thermostats);

  const toggleLight = (id) => {
    setLights(lights.map(light =>
      light.id === id ? { ...light, status: light.status === 'on' ? 'off' : 'on' } : light
    ));
  };

  const changeTemperature = (id, newTemp) => {
    setThermostats(thermostats.map(thermo =>
      thermo.id === id ? { ...thermo, currentTemperature: Number(newTemp) } : thermo
    ));
  };

  const changeMode = (id, newMode) => {
    setThermostats(thermostats.map(thermo =>
      thermo.id === id ? { ...thermo, mode: newMode } : thermo
    ));
  };

  const handleAICommand = (message) => {
    const command = mockAIResponse(message);

    if (command.lightStatus) {
      setLights(lights.map(light => ({ ...light, status: command.lightStatus })));
    }

    if (command.thermostatChange) {
      setThermostats(thermostats.map(thermo => ({
        ...thermo,
        currentTemperature: thermo.currentTemperature + command.thermostatChange
      })));
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Smart Home Automation System</h1>
        <p className="subtitle">Monitor and control your devices</p>
      </header>

      <section className="section">
        <h2>💡 Lights</h2>
        <ul className="card-list">
          {lights.map(light => (
            <li
              key={light.id}
              className={`card ${light.status}`}
              onClick={() => toggleLight(light.id)}
            >
              <h3>{light.name}</h3>
              <p>Status: <span>{light.status}</span></p>
              <button className="toggle-btn">
                Turn {light.status === 'on' ? 'Off' : 'On'}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>🌡️ Thermostats</h2>
        <ul className="card-list">
          {thermostats.map(thermo => (
            <li key={thermo.id} className="card">
              <h3>{thermo.name}</h3>
              <p>Temperature: <strong>{thermo.currentTemperature}°F</strong></p>
              <input
                type="range"
                min="60"
                max="85"
                value={thermo.currentTemperature}
                onChange={(e) => changeTemperature(thermo.id, e.target.value)}
              />
              <p>
                Mode:
                <select
                  value={thermo.mode}
                  onChange={(e) => changeMode(thermo.id, e.target.value)}
                >
                  <option value="Heating">Heating</option>
                  <option value="Cooling">Cooling</option>
                  <option value="Auto">Auto</option>
                </select>
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <h2>💬 Chat Commands</h2>

        <ChatBox onSend={handleAICommand} />

        <p className="hint">
          Try typing: "I am cold", "I am hot", "Turn off light", "Turn on light"
        </p>
      </section>
    </div>
  );
}

export default App;
