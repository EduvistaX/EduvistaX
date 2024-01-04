import React, { useState } from 'react';
import axios from 'axios';
import './Chatbot.css'
import './chatbot-icon.png'
const Chatbot = () => {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
    if (message.trim() !== '') {
      try {
        const response = await axios.post('http://localhost:5001/api/messages', {
          user: 'user',
          message,
        });

        setChat([...chat, { text: message, sender: 'user' }]);
        setChat([...chat, { text: response.data.botResponse, sender: 'bot' }]);
      } catch (error) {
        console.error('Error sending message:', error);
      }

      setMessage('');
    }
  };

  return (
    <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
      <div
        className="chatbot-icon"
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: 'pointer' }}
      >
        {/* Icon or image for chatbot */}
        <img src="chatbot-icon.png" alt="Chatbot" />
      </div>

      {/* Chat interface */}
      <div className="chat-interface" style={{ maxHeight: isOpen ? '500px' : '0' }}>
        {/* Header */}
        <div className="chat-header">
          <span>Chat with our Chatbot</span>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>

        {/* Chat messages */}
        <div className="chat-messages">
          {chat.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        {/* User input */}
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;