import { useState, useEffect } from 'react';
import ChatBox from './chatbox';
import './App.css';

// APP


function App() {
  // Climate controls
  const [temperature, setTemperature] = useState(72);
  const [humidity, setHumidity] = useState(45);
  const [fanSpeed, setFanSpeed] = useState(50);
  const [heatOn, setHeatOn] = useState(false);
  const [acOn, setAcOn] = useState(false);

  // Home devices
  const [lights, setLights] = useState({
    kitchen: false,
    bedroom: false,
    livingRoom: false
  });
  const [airPurifierOn, setAirPurifierOn] = useState(false);

  // Dark mode
  const [darkMode, setDarkMode] = useState(true);

  // Apply body class for full-page dark/light background
  useEffect(() => {
    document.body.className = darkMode ? '' : 'light';
  }, [darkMode]);

  const handleCommand = (input) => {
    const cmd = input.toLowerCase();

    // --- Numeric adjustments ---

    // Temperature
    let match = cmd.match(/increase (?:the )?temperature(?: by )?(-?\d+)/);
    if (match) setTemperature(prev => prev + Number(match[1]));

    match = cmd.match(/decrease (?:the )?temperature(?: by )?(-?\d+)/);
    if (match) setTemperature(prev => prev - Number(match[1]));

    match = cmd.match(/set (?:the )?temperature to (-?\d+)/);
    if (match) setTemperature(Number(match[1]));

    // Humidity
    match = cmd.match(/increase (?:the )?humidity(?: by )?(\d+)/);
    if (match) setHumidity(prev => Math.min(prev + Number(match[1]), 100));

    match = cmd.match(/decrease (?:the )?humidity(?: by )?(\d+)/);
    if (match) setHumidity(prev => Math.max(prev - Number(match[1]), 0));

    match = cmd.match(/set (?:the )?humidity to (\d+)/);
    if (match) setHumidity(Number(match[1]));

    // Fan Speed
    match = cmd.match(/increase (?:the )?fan(?: speed)?(?: by )?(\d+)/);
    if (match) setFanSpeed(prev => Math.min(prev + Number(match[1]), 100));

    match = cmd.match(/decrease (?:the )?fan(?: speed)?(?: by )?(\d+)/);
    if (match) setFanSpeed(prev => Math.max(prev - Number(match[1]), 0));

    match = cmd.match(/set (?:the )?fan(?: speed)? to (\d+)/);
    if (match) setFanSpeed(Number(match[1]));

    // --- Boolean cards ---

    // Heat
    if (cmd.includes('heat')) {
      if (cmd.includes('on')) setHeatOn(true);
      else if (cmd.includes('off')) setHeatOn(false);
    }

    // AC
    if (cmd.includes('ac')) {
      if (cmd.includes('on')) setAcOn(true);
      else if (cmd.includes('off')) setAcOn(false);
    }

    // Air Purifier
    if (cmd.includes('air purifier')) {
      if (cmd.includes('on')) setAirPurifierOn(true);
      else if (cmd.includes('off')) setAirPurifierOn(false);
    }

    // Lights mapping: handle spaces or combined words
    const lightKeyMap = {
      kitchen: 'kitchen',
      bedroom: 'bedroom',
      'living room': 'livingRoom',
      livingroom: 'livingRoom'
    };

    Object.keys(lightKeyMap).forEach(key => {
      if (cmd.includes(key)) {
        const stateKey = lightKeyMap[key];
        if (cmd.includes('on')) {
          setLights(prev => ({ ...prev, [stateKey]: true }));
        } else if (cmd.includes('off')) {
          setLights(prev => ({ ...prev, [stateKey]: false }));
        }
      }
    });

    // Hot/Cold quick temperature adjustments
    if (cmd.includes('hot')) {
      setAcOn(true);
      setHeatOn(false);
      setTemperature(prev => prev - 2);
    } else if (cmd.includes('cold')) {
      setHeatOn(true);
      setAcOn(false);
      setTemperature(prev => prev + 2);
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
          Control temperature, humidity, fan, heat, AC, lights, air purifier, and theme via chat commands
        </p>
      </div>

      <div className="card-list">
        {/* Row 1 - numeric values */}
        <div className="card"><h2>Temperature</h2><span>{temperature}°F</span></div>
        <div className="card"><h2>Humidity</h2><span>{humidity}%</span></div>
        <div className="card"><h2>Fan Speed</h2><span>{fanSpeed}%</span></div>

        {/* Row 2 - boolean values */}
        <div className={`card ${heatOn ? 'on' : 'off'}`}><h2>Heat</h2><span>{heatOn ? 'ON' : 'OFF'}</span></div>
        <div className={`card ${acOn ? 'on' : 'off'}`}><h2>AC</h2><span>{acOn ? 'ON' : 'OFF'}</span></div>
        <div className={`card ${airPurifierOn ? 'on' : 'off'}`}><h2>Air Purifier</h2><span>{airPurifierOn ? 'ON' : 'OFF'}</span></div>

        {/* Row 3 - lights */}
        {Object.keys(lights).map(room => (
          <div key={room} className={`card ${lights[room] ? 'on' : 'off'}`}>
            <h2>{room.charAt(0).toUpperCase() + room.slice(1)}</h2>
            <span>{lights[room] ? 'ON' : 'OFF'}</span>
          </div>
        ))}
      </div>

      <ChatBox onSend={handleCommand} />
    </div>
  );
}

export default App;
