import { useState } from 'react';
import './App.css';
import mockDB from './api/mockdb.json';

function App() {
  const [lights, setLights] = useState(mockDB.lights);
  const [thermostats, setThermostats] = useState(mockDB.thermostats);

  const toggleLight = (id) => {
    const updated = lights.map(light =>
      light.id === id
        ? { ...light, status: light.status === 'on' ? 'off' : 'on' }
        : light
    );
    setLights(updated);
  };

  const changeTemperature = (id, newTemp) => {
    const updated = thermostats.map(thermo =>
      thermo.id === id
        ? { ...thermo, currentTemperature: Number(newTemp) }
        : thermo
    );
    setThermostats(updated);
  };

  const changeMode = (id, newMode) => {
    const updated = thermostats.map(thermo =>
      thermo.id === id
        ? { ...thermo, mode: newMode }
        : thermo
    );
    setThermostats(updated);
  };

  return (
    <div className="App">
      <header className="header">
        <h1> smart home automation system</h1>
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
              <p>
                Temperature: <strong>{thermo.currentTemperature}°F</strong>
              </p>
              <input
                type="range"
                min="60"
                max="85"
                value={thermo.currentTemperature}
                onChange={(e) => changeTemperature(thermo.id, e.target.value)}
                className="temp-slider"
              />
              <p>
                Mode: 
                <select
                  value={thermo.mode}
                  onChange={(e) => changeMode(thermo.id, e.target.value)}
                  className="mode-select"
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
    </div>
  );
}

export default App;
