# Smart Home Dashboard - User Guide & Design Rationale

## 1. Introduction
The Smart Home Dashboard is a web application that allows users to monitor and control home devices including temperature, humidity, fan speed, heat, AC, lights, and air purifier. Users can interact with the system using the UI or chat commands. All actions are logged for easy reference.

---

## 2. User Manual

### 2.1 Dashboard Overview
- **Sliders**
  - **Temperature**: Adjust between 50–90°F
  - **Humidity**: Adjust between 0–100%
  - **Fan Speed**: Adjust between 0–100%
- **Device Cards**
  - Toggle heat, AC, air purifier, and room lights ON/OFF.
- **Dark/Light Mode**
  - Click the toggle button at the top to switch between dark and light themes.
- **Logs Panel**
  - Displays all actions and commands with timestamps for tracking changes.

### 2.2 Chat Commands
You can type natural language commands in the chat box to control devices:

#### Temperature, Humidity, and Fan Speed
- `increase temperature by 3`
- `decrease humidity by 10`
- `set fan speed to 50`

#### Device Toggles
- `turn heat on` / `turn heat off`
- `turn AC on` / `turn AC off`
- `turn air purifier on` / `turn air purifier off`

#### Lights
- `turn kitchen on` / `turn bedroom off`
- `turn living room on` / `turn living room off`

#### Quick Automation Commands
- `hot` → AC turns on, heat off, temperature decreases 2°F
- `cold` → Heat turns on, AC off, temperature increases 2°F
- `leaving` → Minimal energy mode:
  - All lights off
  - Heat & AC off
  - Fan speed set to 20%
  - Temperature set to 70°F
  - Air purifier off
- `coming` → Comfortable mode:
  - All lights on
  - Heat on, AC off
  - Fan speed set to 50%
  - Temperature set to 72°F
  - Air purifier on

---

### 2.3 Interaction Notes
- Press **Enter** or click the **Send** button to execute chat commands.
- All actions are logged in the logs panel for transparency.
- Device cards and sliders update in real-time based on user input or automation commands.

---

## 3. Design Rationale

### 3.1 UI Design
- **Cards for each device**: Visual separation for clarity and ease of use.
- **Color-coded states**: Green = ON, Red = OFF; helps users quickly see device status.
- **Responsive layout**: Works on both desktop and mobile devices. Single-column layout is applied for small screens.

### 3.2 User Interaction
- **Sliders & buttons**: Provide precise control for users and quick toggles for binary devices.
- **Chat commands**: Allow users to issue natural language commands, simulating voice or AI interaction.
- **Logs panel**: Provides a history of all actions to ensure transparency and accountability.

### 3.3 System Behavior
- **Mock Backend**: Simulates device APIs, enabling testing without actual IoT hardware.
- **Energy Modes** (`leaving` and `coming`): Simplify automation for common user scenarios.
- **Dark/Light mode**: Improves readability and user comfort under different lighting conditions.

---

## 4. Future Improvements
- Connect to real IoT devices via REST or MQTT.
- Implement voice commands and advanced natural language understanding.
- Enhance accessibility with ARIA labels and keyboard navigation.
- Deploy on a cloud platform for remote monitoring and control.

---
