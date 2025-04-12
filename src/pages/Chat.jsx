
import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Send, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import ChatMessage from '@/components/ChatMessage';

const Chat = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const agent = location.state?.agent;
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Handle case when there's no agent data
  useEffect(() => {
    if (!agent) {
      navigate('/agents');
      toast.error('No agent selected. Please select an agent first.');
      return;
    }

    // Add initial greeting message from the agent
    setMessages([
      {
        role: 'assistant',
        content: `Hello! I'm ${agent.name}, your personal ${agent.name.toLowerCase()} assistant. How can I help you today?`,
        timestamp: new Date()
      }
    ]);
  }, [agent, navigate]);

  // Auto-scroll to the bottom of the chat on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    
    try {
      // Make API call to get AI response
      // This is a placeholder - you'll need to replace with your actual API
      const response = await sendMessageToAI(inputMessage, agent);
      
      // Add AI response
      const aiMessage = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to get response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Placeholder function for API call - replace with your actual implementation
  const sendMessageToAI = async (message, agent) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const systemPrompt = getAgentSystemPrompt(agent);
    
    // This would be replaced with your actual API call
    console.log('Sending to API:', {
      message,
      agent: agent.name,
      systemPrompt
    });
    
    // Return mock response for now
    return `This is a simulated response from ${agent.name}. To implement a real AI response, you would connect to an API like OpenAI, Anthropic, or your own backend service.`;
  };
  
  // Get system prompt based on agent type
  const getAgentSystemPrompt = (agent) => {
    const prompts = {
      'Study Planner': 'You are a Study Planner AI assistant. Help users create personalized study schedules, provide learning strategies, and assist with academic planning.',
      'Fitness Coach': 'You are a Fitness Coach AI assistant. Provide personalized workout routines, nutrition advice, and motivation to help users achieve their fitness goals.',
      'Script Writer': 'You are a Script Writer AI assistant. Help users generate creative scripts for videos, presentations, and other content.',
      // Add more agent-specific prompts here
    };
    
    return prompts[agent.name] || `You are a helpful ${agent.name} AI assistant.`;
  };
  
  const handleGoBack = () => {
    navigate('/agents');
  };

  if (!agent) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Button variant="ghost" size="icon" onClick={handleGoBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-primary/10 text-primary">
            {agent.icon}
          </div>
          <div>
            <h1 className="text-xl font-bold">{agent.name}</h1>
            <p className="text-sm text-muted-foreground">{agent.description}</p>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-4 rounded-lg border bg-card mb-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isLoading && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <div className="animate-bounce">●</div>
            <div className="animate-bounce animation-delay-200">●</div>
            <div className="animate-bounce animation-delay-400">●</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 resize-none"
          rows={1}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <Button type="submit" disabled={isLoading || !inputMessage.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default Chat;
