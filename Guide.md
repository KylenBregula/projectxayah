# Smart Home Dashboard - User Guide & Design Rationale

## 1. Introduction
The Smart Home Dashboard is a web app that allows users to monitor and control home devices including temperature, humidity, fan speed, heat, AC, lights, and air purifier. Users can interact via the UI or chat commands.

---

## 2. User Manual

### 2.1 Dashboard Overview
- **Sliders**: Adjust temperature (50–90°F), humidity (0–100%), and fan speed (0–100%).
- **Buttons**: Toggle heat, AC, air purifier, and room lights ON/OFF.
- **Dark/Light Mode**: Use the toggle at the top to switch themes.
- **Logs Panel**: Displays all actions and commands with timestamps.

### 2.2 Chat Commands
- **Temperature & Humidity**
  - `increase temperature by 3`
  - `decrease humidity by 10`
  - `set fan speed to 50`
- **Device Toggles**
  - `turn heat on`
  - `turn AC off`
  - `turn air purifier on`
- **Lights**
  - `turn kitchen on` / `turn bedroom off`
- **Quick Commands**
  - `hot` → AC turns on, heat off, temperature decreases 2°F
  - `cold` → Heat turns on, AC off, temperature increases 2°F
  - `leaving` → Minimal energy mode (lights off, heat/AC off, fan 20%, temperature 70°F)
  - `coming` → Comfortable mode (lights on, heat on, AC off, fan 50%, temperature 72°F)

### 2.3 Interaction Notes
- Press **Enter** or click **Send** in the chat box to execute commands.
- All actions are logged in the logs panel for reference.

---

## 3. Design Rationale

### 3.1 UI Design
- **Cards for each device**: Visual separation for clarity and easy interaction.
- **Color-coded states**: Green = ON, Red = OFF; helps users quickly identify device status.
- **Responsive layout**: Works on desktop and mobile (single-column on small screens).

### 3.2 User Interaction
- **Sliders & buttons**: Allow precise control and quick toggling.
- **Chat commands**: Provide natural language input for convenience and testing automation.
- **Logs panel**: Ensures transparency for all device actions and AI decisions.

### 3.3 System Behavior
- **Mock Backend**: Simulates device API to allow testing without real IoT hardware.
- **Energy modes** (`leaving` / `coming`): Simplify automation for common user scenarios.
- **Dark/Light mode**: Improves accessibility and user comfort.

---

## 4. Future Improvements
- Connect real IoT devices via REST or MQTT.
- Add voice commands and natural language understanding.
- Enhance accessibility (ARIA labels, keyboard navigation).
- Deploy on a cloud platform for real-time remote access.

---
