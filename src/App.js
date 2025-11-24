import { useState, useEffect, useRef } from 'react';
import ChatBox from './chatbox';
import './App.css';
import mockBackend from './mockBackend';

function App() {
  // Climate controls
  const [temperature, setTemperature] = useState(mockBackend.temperature);
  const [humidity, setHumidity] = useState(mockBackend.humidity);
  const [fanSpeed, setFanSpeed] = useState(mockBackend.fanSpeed);
  const [heatOn, setHeatOn] = useState(mockBackend.heatOn);
  const [acOn, setAcOn] = useState(mockBackend.acOn);

  // Home devices
  const [lights, setLights] = useState({ ...mockBackend.lights });
  const [airPurifierOn, setAirPurifierOn] = useState(mockBackend.airPurifierOn);

  // Dark mode
  const [darkMode, setDarkMode] = useState(true);

  // Logs
  const [logs, setLogs] = useState([]);
  const logEndRef = useRef(null);

  useEffect(() => {
    document.body.className = darkMode ? '' : 'light';
  }, [darkMode]);

  // Add log as an object with message + timestamp
  const addLog = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [...prev, { message, time: timestamp }]);
  };

  // Generic function to update state + backend + logs
  const updateDevice = (stateSetter, key, value, logMessage) => {
    stateSetter(value);
    mockBackend.updateDevice(key, value);
    addLog(logMessage);
  };

  // Toggle boolean devices
  const toggleDeviceState = (stateSetter, key, currentValue, label) => {
    const newValue = !currentValue;
    updateDevice(stateSetter, key, newValue, `${label} turned ${newValue ? 'ON' : 'OFF'}`);
  };

  // Toggle lights
  const toggleLight = (room) => {
    const newLights = { ...lights, [room]: !lights[room] };
    updateDevice(setLights, 'lights', newLights, `${room} light turned ${newLights[room] ? 'ON' : 'OFF'}`);
  };

  const handleCommand = (input) => {
    const cmd = input.toLowerCase();

    // Numeric commands
    const numericRegex = /(increase|decrease|set)\s+(?:the\s+)?(temperature|humidity|fan(?: speed)?)\s*(?:by|to)?\s*(-?\d+)/;
    const m = cmd.match(numericRegex);
    if (m) {
      const action = m[1];
      let target = m[2];
      const value = Number(m[3]);
      if (target.includes('fan')) target = 'fanSpeed';

      if (action === 'increase') {
        if (target === 'temperature') updateDevice(setTemperature, 'temperature', temperature + value, `Increased temperature by ${value}`);
        if (target === 'humidity') updateDevice(setHumidity, 'humidity', Math.min(humidity + value, 100), `Increased humidity by ${value}`);
        if (target === 'fanSpeed') updateDevice(setFanSpeed, 'fanSpeed', Math.min(fanSpeed + value, 100), `Increased fan speed by ${value}`);
      }
      if (action === 'decrease') {
        if (target === 'temperature') updateDevice(setTemperature, 'temperature', temperature - value, `Decreased temperature by ${value}`);
        if (target === 'humidity') updateDevice(setHumidity, 'humidity', Math.max(humidity - value, 0), `Decreased humidity by ${value}`);
        if (target === 'fanSpeed') updateDevice(setFanSpeed, 'fanSpeed', Math.max(fanSpeed - value, 0), `Decreased fan speed by ${value}`);
      }
      if (action === 'set') {
        if (target === 'temperature') updateDevice(setTemperature, 'temperature', value, `Set temperature to ${value}`);
        if (target === 'humidity') updateDevice(setHumidity, 'humidity', value, `Set humidity to ${value}`);
        if (target === 'fanSpeed') updateDevice(setFanSpeed, 'fanSpeed', value, `Set fan speed to ${value}`);
      }
    }

    // Boolean devices
    if (cmd.includes('heat')) toggleDeviceState(setHeatOn, 'heatOn', heatOn, 'Heat');
    if (cmd.includes('ac')) toggleDeviceState(setAcOn, 'acOn', acOn, 'AC');
    if (cmd.includes('air purifier')) toggleDeviceState(setAirPurifierOn, 'airPurifierOn', airPurifierOn, 'Air Purifier');

    // Lights
    const lightKeyMap = { kitchen: 'kitchen', bedroom: 'bedroom', 'living room': 'livingRoom', livingroom: 'livingRoom' };
    Object.keys(lightKeyMap).forEach(key => {
      if (cmd.includes(key)) toggleLight(lightKeyMap[key]);
    });

    // Hot / Cold quick adjustments
    if (cmd.includes('hot')) {
      updateDevice(setAcOn, 'acOn', true, 'Hot detected: AC ON');
      updateDevice(setHeatOn, 'heatOn', false, 'Hot detected: Heat OFF');
      updateDevice(setTemperature, 'temperature', temperature - 2, 'Hot detected: Temp -2');
    }
    if (cmd.includes('cold')) {
      updateDevice(setHeatOn, 'heatOn', true, 'Cold detected: Heat ON');
      updateDevice(setAcOn, 'acOn', false, 'Cold detected: AC OFF');
      updateDevice(setTemperature, 'temperature', temperature + 2, 'Cold detected: Temp +2');
    }
  };

  return (
    <div className="App">
      <div className="header">
        <h1 className="title">Home Dashboard</h1>
        <button className="dark-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
        <p className="subtitle">
          Control temperature, humidity, fan, heat, AC, lights, air purifier, and theme via chat commands or UI
        </p>
      </div>

      <div className="card-list">
        {/* Sliders */}
        <div className="card">
          <h2>Temperature</h2>
          <input type="range" min="50" max="90" value={temperature} onChange={e => updateDevice(setTemperature, 'temperature', Number(e.target.value), `Temperature set to ${e.target.value}`)} />
          <span>{temperature}°F</span>
        </div>
        <div className="card">
          <h2>Humidity</h2>
          <input type="range" min="0" max="100" value={humidity} onChange={e => updateDevice(setHumidity, 'humidity', Number(e.target.value), `Humidity set to ${e.target.value}`)} />
          <span>{humidity}%</span>
        </div>
        <div className="card">
          <h2>Fan Speed</h2>
          <input type="range" min="0" max="100" value={fanSpeed} onChange={e => updateDevice(setFanSpeed, 'fanSpeed', Number(e.target.value), `Fan speed set to ${e.target.value}`)} />
          <span>{fanSpeed}%</span>
        </div>

        {/* Boolean toggles */}
        <div className={`card ${heatOn ? 'on' : 'off'}`}>
          <h2>Heat</h2>
          <button onClick={() => toggleDeviceState(setHeatOn, 'heatOn', heatOn, 'Heat')}>{heatOn ? 'ON' : 'OFF'}</button>
        </div>
        <div className={`card ${acOn ? 'on' : 'off'}`}>
          <h2>AC</h2>
          <button onClick={() => toggleDeviceState(setAcOn, 'acOn', acOn, 'AC')}>{acOn ? 'ON' : 'OFF'}</button>
        </div>
        <div className={`card ${airPurifierOn ? 'on' : 'off'}`}>
          <h2>Air Purifier</h2>
          <button onClick={() => toggleDeviceState(setAirPurifierOn, 'airPurifierOn', airPurifierOn, 'Air Purifier')}>{airPurifierOn ? 'ON' : 'OFF'}</button>
        </div>

        {/* Lights */}
        {Object.keys(lights).map(room => (
          <div key={room} className={`card ${lights[room] ? 'on' : 'off'}`}>
            <h2>{room.charAt(0).toUpperCase() + room.slice(1)}</h2>
            <button onClick={() => toggleLight(room)}>{lights[room] ? 'ON' : 'OFF'}</button>
          </div>
        ))}
      </div>

      {/* Chat box */}
      <ChatBox onSend={handleCommand} />

      {/* Logs */}
      <div className="log-panel">
        <h2>Logs</h2>
        <ul>
          {logs.map((log, i) => (
            <li key={i}>
              <span className="log-message">{log.message}</span>
              <span className="log-time">{log.time}</span>
            </li>
          ))}
        </ul>
        <div ref={logEndRef} />
      </div>
    </div>
  );
}

export default App;
