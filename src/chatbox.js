import { useState } from 'react';

function ChatBox({ onSend }) {
  const [input, setInput] = useState('');

  const send = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput('');
  };

  const onKeyDown = (e) => { if (e.key === 'Enter') send(); };

  return (
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
