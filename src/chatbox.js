import { useState } from 'react';

// chatbox component for user input
function ChatBox({ onSend }) {
  // input state
  const [input, setInput] = useState('');

  // send input to parent handler
  const send = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  // handle enter key
  const onKeyDown = (e) => { if (e.key === 'Enter') send(); };

  return (
    // chat box UI
    <div className="chat-box">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Type commands e.g. 'turn kitchen on'"
      />
      <button onClick={send}>Send</button>
    </div>
  );
}

export default ChatBox;
