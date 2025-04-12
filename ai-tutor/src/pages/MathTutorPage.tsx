import React, { useState } from 'react';
import { motion } from 'framer-motion';
import withRequireAuth from '../components/auth/RequireAuth';

interface MessageType {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface MessageProps {
  message: MessageType;
}

const MathTutorPage: React.FC = () => {
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      content: 'Hello! I\'m your AI Math Tutor. What would you like to learn today?',
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputMode, setInputMode] = useState<'text' | 'voice' | 'image'>('text');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const getAIResponse = (userInput: string): string => {
    // This is a simple implementation. In a real app, this would call a Groq API endpoint
    if (userInput.toLowerCase().includes('quadratic')) {
      return `
        To solve a quadratic equation of the form ax² + bx + c = 0:
        
        1. Try to factor the equation if possible
        2. Use the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a
        3. Calculate the discriminant (b² - 4ac) to determine the number of solutions
        
        Would you like me to solve a specific quadratic equation for you?
      `;
    } else if (userInput.toLowerCase().includes('derivative')) {
      return `
        The derivative measures the rate of change of a function.
        
        Basic derivative rules:
        - Constant rule: d/dx(c) = 0
        - Power rule: d/dx(x^n) = n·x^(n-1)
        - Sum rule: d/dx(f(x) + g(x)) = d/dx(f(x)) + d/dx(g(x))
        - Product rule: d/dx(f(x)·g(x)) = f(x)·g'(x) + g(x)·f'(x)
        
        Would you like to see an example with a specific function?
      `;
    } else if (userInput.toLowerCase().includes('integral') || userInput.toLowerCase().includes('integration')) {
      return `
        Integration is the reverse of differentiation. The indefinite integral ∫f(x)dx represents the family of all antiderivatives of f(x).
        
        Basic integration rules:
        - ∫x^n dx = x^(n+1)/(n+1) + C (where n ≠ -1)
        - ∫e^x dx = e^x + C
        - ∫sin(x) dx = -cos(x) + C
        
        For definite integrals, we evaluate: ∫[a,b]f(x)dx = F(b) - F(a), where F is an antiderivative of f.
      `;
    } else {
      return `I'd be happy to help you with that math problem! Could you provide more details or specify what topic in mathematics you're working on?`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4">
            <h1 className="text-xl font-bold">Mathematics Tutor</h1>
            <p className="text-blue-100">Get step-by-step help with any math problem</p>
          </div>

          {/* Messages Area */}
          <div className="h-[500px] overflow-y-auto p-4 bg-gray-50">
            <div className="space-y-4">
              {messages.map((message) => (
                <Message key={message.id} message={message} />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-200 text-gray-800 rounded-lg py-2 px-4 max-w-[80%]">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-gray-600 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-2 mb-3">
              <button
                onClick={() => setInputMode('text')}
                className={`p-2 rounded-full ${inputMode === 'text' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => setInputMode('voice')}
                className={`p-2 rounded-full ${inputMode === 'voice' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => setInputMode('image')}
                className={`p-2 rounded-full ${inputMode === 'image' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {inputMode === 'text' && (
              <div className="flex space-x-2">
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type your math question here..."
                  rows={1}
                ></textarea>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className={`rounded-lg px-4 py-2 ${!inputValue.trim() || isLoading ? 'bg-gray-300 text-gray-500' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                  </svg>
                </button>
              </div>
            )}
            
            {inputMode === 'voice' && (
              <div className="flex justify-center items-center p-6">
                <div className="text-center">
                  <button
                    className="bg-blue-100 text-blue-600 rounded-full p-4 mb-2 hover:bg-blue-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <p className="text-gray-600">Press to record your question</p>
                </div>
              </div>
            )}
            
            {inputMode === 'image' && (
              <div className="flex justify-center items-center p-6">
                <div className="text-center">
                  <label className="cursor-pointer flex flex-col items-center">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-2 hover:bg-blue-200">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <input type="file" className="hidden" accept="image/*" />
                    <p className="text-gray-600">Upload an image of your math problem</p>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Topic Suggestions */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Popular Topics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TopicCard 
              title="Algebra" 
              description="Equations, Functions, Inequalities" 
              onClick={() => setInputValue("Help me with algebra concepts")}
            />
            <TopicCard 
              title="Calculus" 
              description="Derivatives, Integrals, Limits" 
              onClick={() => setInputValue("Explain calculus fundamentals")}
            />
            <TopicCard 
              title="Geometry" 
              description="Shapes, Areas, Volumes" 
              onClick={() => setInputValue("How do I calculate the volume of a sphere?")}
            />
            <TopicCard 
              title="Statistics" 
              description="Probability, Distributions, Hypothesis Testing" 
              onClick={() => setInputValue("Explain normal distribution")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Message: React.FC<MessageProps> = ({ message }) => {
  const isAi = message.sender === 'ai';
  
  return (
    <motion.div 
      className={`flex ${isAi ? 'justify-start' : 'justify-end'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className={`rounded-lg py-2 px-4 max-w-[80%] ${
          isAi 
            ? 'bg-gray-200 text-gray-800' 
            : 'bg-blue-600 text-white'
        }`}
      >
        <div className="whitespace-pre-line">{message.content}</div>
        <div 
          className={`text-xs mt-1 ${
            isAi ? 'text-gray-500' : 'text-blue-200'
          }`}
        >
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
};

interface TopicCardProps {
  title: string;
  description: string;
  onClick: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ title, description, onClick }) => {
  return (
    <button 
      className="bg-white rounded-lg p-4 shadow hover:shadow-md transition-shadow border border-gray-200 text-left"
      onClick={onClick}
    >
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );
};

export default withRequireAuth(MathTutorPage); 