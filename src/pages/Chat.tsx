import React, { useState } from 'react';
import { Send, Paperclip, Phone, MessageCircle, TrendingUp, Bug, Droplets } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  actions?: Array<{
    label: string;
    action: string;
  }>;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: '🌱 Hello! I\'m KisanMitra, your AI agriculture assistant. How can I help you today?',
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isOnline] = useState(true);

  const suggestedPrompts = [
    { icon: TrendingUp, text: 'Will it rain today?', category: 'weather' },
    { icon: Bug, text: 'Pest risk for cotton', category: 'pest' },
    { icon: Droplets, text: 'Fertilizer dose for 1 acre rice', category: 'fertilizer' },
    { icon: MessageCircle, text: 'Best sowing time for wheat', category: 'general' }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: getSimulatedResponse(inputMessage),
        timestamp: new Date(),
        actions: [
          { label: 'View Weather', action: 'weather' },
          { label: 'Open Store', action: 'store' }
        ]
      };
      setMessages(prev => [...prev, response]);
    }, 1000);

    setInputMessage('');
  };

  const getSimulatedResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes('rain') || lowerInput.includes('weather')) {
      return '🌧️ Based on current weather models, there\'s a 30% chance of light rain today afternoon. The monsoon is expected to be normal this season. I recommend checking the 7-day forecast for better planning.';
    }
    if (lowerInput.includes('pest') || lowerInput.includes('cotton')) {
      return '🐛 Cotton pest alert: Bollworm activity is moderate in your region. I recommend monitoring your fields closely and consider applying neem oil (3ml/L) as a preventive measure. Early morning application works best.';
    }
    if (lowerInput.includes('fertilizer') || lowerInput.includes('rice')) {
      return '🌾 For 1 acre of rice cultivation, I recommend: NPK 120:60:40 kg. Apply nitrogen in 3 splits - 50% at transplanting, 25% at tillering, and 25% at panicle initiation. Would you like me to create a fertilizer schedule?';
    }
    return '🌱 I understand your query. Let me provide you with the best agricultural guidance based on current conditions and best practices. Feel free to ask more specific questions about weather, crops, pests, or fertilizers.';
  };

  const handlePromptClick = (prompt: string) => {
    setInputMessage(prompt);
  };

  return (
    <div className="flex flex-col h-screen bg-muted/30">
      {/* Chat Header */}
      <div className="bg-card border-b border-border px-4 py-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-primary p-2 rounded-xl">
              <MessageCircle className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-semibold text-foreground">Ask KisanMitra</h1>
              <div className="flex items-center space-x-2 text-sm">
                <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success' : 'bg-muted-foreground'}`} />
                <span className="text-muted-foreground">
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm" className="flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span className="hidden md:inline">Talk to Agronomist</span>
          </Button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
          {/* Suggested Prompts */}
          {messages.length === 1 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Quick questions to get started:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestedPrompts.map((prompt, index) => {
                  const Icon = prompt.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => handlePromptClick(prompt.text)}
                      className="bg-card border border-border rounded-xl p-4 text-left hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium text-foreground">
                          {prompt.text}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-lg rounded-2xl px-4 py-3 ${
                  message.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-card border border-border'
                }`}
              >
                <div className="text-sm leading-relaxed">{message.content}</div>
                
                {message.actions && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {message.actions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs h-7"
                      >
                        {action.label}
                      </Button>
                    ))}
                  </div>
                )}

                <div className="text-xs text-muted-foreground mt-2">
                  {message.timestamp.toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-card border-t border-border px-4 py-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm" className="flex-shrink-0">
              <Paperclip className="w-4 h-4" />
            </Button>
            
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about weather, crops, pests, fertilizers..."
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="pr-12"
              />
              <Button
                size="sm"
                onClick={handleSendMessage}
                className="absolute right-1 top-1 bottom-1 px-3"
                disabled={!inputMessage.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-center mt-3">
            <p className="text-xs text-muted-foreground text-center">
              Get instant answers about farming practices, weather, and crop management
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;