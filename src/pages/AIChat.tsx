import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
}

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = () => {
    if (input.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: input.trim(),
        sender: 'user',
      };
      setMessages(prev => [...prev, newMessage]);
      setInput('');
      // Here you would typically send the message to the AI and get a response
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now(),
          text: "I'm an AI assistant. How can I help you with your English learning today?",
          sender: 'ai',
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // Here you would typically start/stop the speech recognition
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">AI Chat Assistant</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                  message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t p-4 flex items-center">
          <button
            onClick={toggleListening}
            className={`p-2 rounded-full mr-2 ${
              isListening ? 'bg-red-500 text-white' : 'bg-gray-200'
            }`}
          >
            {isListening ? <MicOff size={24} /> : <Mic size={24} />}
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow p-2 border rounded-l"
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white p-2 rounded-r hover:bg-blue-600"
          >
            <Send size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;