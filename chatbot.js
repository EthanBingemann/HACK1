import React, { useState, useEffect, useRef } from 'react';
import './chatbot.css';

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === '') return;

        // Add user message
        setMessages([...messages, { text: input, user: true }]);
        setInput('');

        // Simulate bot response (replace this with actual chatbot logic)
        setTimeout(() => {
            setMessages(prevMessages => [...prevMessages, { text: "Hello! How can I assist you today?", user: false }]);
        }, 1000);
    }

    return (
        <div className="chatbot-container">
            <div className="chat-header">
                <h2>ReForge Chatbot</h2>
            </div>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.user ? 'user-message' : 'bot-message'}`}>
                        {message.text}
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSubmit} className="chat-input-form">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    className="chat-input"
                />
                <button type="submit" className="chat-send-button">Send</button>
            </form>
        </div>
    );
}

export default Chatbot;
