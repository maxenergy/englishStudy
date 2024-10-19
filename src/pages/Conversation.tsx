import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Volume2 } from 'lucide-react';

interface ConversationTopic {
  id: number;
  title: string;
  description: string;
  sampleQuestions: string[];
}

const Conversation: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [conversation, setConversation] = useState<{ speaker: string; message: string }[]>([]);
  const [currentTopic, setCurrentTopic] = useState<ConversationTopic | null>(null);
  const [topics, setTopics] = useState<ConversationTopic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechSynthesisRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    // Simulating API call to fetch topics
    setTimeout(() => {
      const fetchedTopics: ConversationTopic[] = [
        {
          id: 1,
          title: "Travel Experiences",
          description: "Discuss your favorite travel experiences or dream destinations.",
          sampleQuestions: [
            "What's the most interesting place you've ever visited?",
            "If you could travel anywhere in the world, where would you go and why?",
            "What's one travel experience that changed your perspective on life?"
          ]
        },
        {
          id: 2,
          title: "Technology in Daily Life",
          description: "Explore how technology impacts our everyday lives.",
          sampleQuestions: [
            "How has technology changed your daily routine in the past 5 years?",
            "What's one piece of technology you can't live without?",
            "Do you think social media has more positive or negative effects on society?"
          ]
        },
        // Add more topics as needed
      ];
      setTopics(fetchedTopics);
      setCurrentTopic(fetchedTopics[0]);
      setIsLoading(false);
    }, 1000);

    speechSynthesisRef.current = window.speechSynthesis;

    return () => {
      if (speechSynthesisRef.current) {
        speechSynthesisRef.current.cancel();
      }
    };
  }, []);

  const toggleListening = () => {
    setIsListening(!isListening);
    // Here you would typically start/stop the speech recognition
    // For demonstration, we'll just toggle the state
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (userInput.trim()) {
      const newUserMessage = { speaker: 'User', message: userInput };
      setConversation(prev => [...prev, newUserMessage]);
      setUserInput('');
      
      // Simulate AI response
      setTimeout(() => {
        const aiResponse = { speaker: 'AI', message: generateAIResponse(userInput) };
        setConversation(prev => [...prev, aiResponse]);
        speakMessage(aiResponse.message);
      }, 1000);
    }
  };

  const generateAIResponse = (userMessage: string): string => {
    // This is a simple response generation. In a real application, you'd use a more sophisticated AI model.
    const responses = [
      "That's an interesting point. Can you elaborate on that?",
      "I see. How does that relate to your personal experiences?",
      "That's a unique perspective. What led you to think that way?",
      "Interesting. How do you think others might view this topic?",
      "Thank you for sharing. Can you give an example to illustrate your point?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const speakMessage = (message: string) => {
    if (speechSynthesisRef.current) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesisRef.current.speak(utterance);
    }
  };

  const handleTopicChange = (topicId: number) => {
    const newTopic = topics.find(topic => topic.id === topicId);
    if (newTopic) {
      setCurrentTopic(newTopic);
      setConversation([]);
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading conversation topics...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Conversation Practice</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Topics</h2>
          <ul className="space-y-2">
            {topics.map((topic) => (
              <li
                key={topic.id}
                className={`cursor-pointer p-2 rounded ${currentTopic?.id === topic.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                onClick={() => handleTopicChange(topic.id)}
              >
                {topic.title}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {currentTopic && (
              <div className="mb-4">
                <h2 className="text-2xl font-semibold mb-2">{currentTopic.title}</h2>
                <p className="text-gray-600 mb-4">{currentTopic.description}</p>
                <h3 className="font-semibold mb-2">Sample Questions:</h3>
                <ul className="list-disc pl-5 mb-4">
                  {currentTopic.sampleQuestions.map((question, index) => (
                    <li key={index}>{question}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mb-4 h-96 overflow-y-auto border rounded p-4">
              {conversation.map((entry, index) => (
                <div key={index} className={`mb-4 ${entry.speaker === 'User' ? 'text-right' : 'text-left'}`}>
                  <span className={`inline-block p-2 rounded-lg ${entry.speaker === 'User' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <strong>{entry.speaker}:</strong> {entry.message}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleListening}
                className={`p-2 rounded-full ${isListening ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                disabled={isSpeaking}
              >
                {isListening ? <MicOff size={24} /> : <Mic size={24} />}
              </button>
              <textarea
                value={userInput}
                onChange={handleInputChange}
                className="flex-grow p-2 border rounded resize-none"
                rows={2}
                placeholder="Type your message here..."
              ></textarea>
              <button
                onClick={handleSendMessage}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
                disabled={isSpeaking}
              >
                <Send size={24} />
              </button>
              {isSpeaking && (
                <div className="flex items-center">
                  <Volume2 size={24} className="text-blue-500 animate-pulse" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;