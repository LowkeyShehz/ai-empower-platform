
import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Send, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import ChatMessage from "@/components/ChatMessage";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

const Chat = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Check if we have agent information from the navigation state
  const agent = state?.agent;

  useEffect(() => {
    // Add initial greeting from the agent
    if (agent) {
      const initialMessage: Message = {
        id: Date.now().toString(),
        content: `Hi there! I'm your ${agent.name} assistant. How can I help you today?`,
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages([initialMessage]);
    } else {
      // If no agent was selected, redirect back to agents page
      toast({
        title: "No agent selected",
        description: "Please select an agent from the agents page.",
        variant: "destructive",
      });
      navigate("/agents");
    }

    // Focus the input field
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [agent, navigate, toast]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current;
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      // Simulate API call to an AI service (replace with actual API call)
      const response = await fetchAIResponse(input.trim(), agent);
      
      // Add AI response
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // This would be replaced with your actual AI API implementation
  const fetchAIResponse = async (prompt: string, agent: any): Promise<string> => {
    // For demonstration purposes, we'll simulate a response
    // In a real application, this would be an API call to your AI service
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`I'm the ${agent.name} AI. Here's a response to your query: "${prompt}".`);
      }, 1000);
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => navigate("/agents")}
          aria-label="Back to agents"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        {agent && (
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-md bg-secondary text-secondary-foreground">
              {agent.icon}
            </div>
            <div>
              <h1 className="text-xl font-semibold">{agent.name}</h1>
              <p className="text-sm text-muted-foreground">{agent.description}</p>
            </div>
          </div>
        )}
      </div>

      {/* Messages Area */}
      <Card className="flex-1 mb-4 overflow-hidden">
        <ScrollArea ref={scrollAreaRef} className="h-full p-4">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="animate-pulse">AI is typing...</div>
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>

      {/* Input Area */}
      <div className="flex gap-2">
        <Input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={isLoading}
          className="flex-1"
        />
        <Button 
          onClick={sendMessage} 
          disabled={!input.trim() || isLoading}
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Chat;
