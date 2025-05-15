import { useState, useEffect, useRef } from "react";
import { ChatMessage as ChatMessageType } from "@/types";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { sendQuery } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";
import { Bot } from "lucide-react";

const AdditionalQuestions = ({ questions, onAsk }: { questions: string[]; onAsk: (q: string) => void }) => (
  <div className="flex gap-2 overflow-x-auto py-2 mb-2">
    {questions.map((q, idx) => (
      <button
        key={idx}
        className="whitespace-nowrap rounded-full bg-muted px-4 py-1 text-sm hover:bg-primary hover:text-primary-foreground border border-border transition"
        onClick={() => onAsk(q)}
      >
        {q}
      </button>
    ))}
  </div>
);

const ChatContainer = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      role: "assistant",
      content: "Hello! I'm your Business Intelligence AI Assistant. Ask me any question about your business data and I'll help you analyze it.",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [additionalQuestions, setAdditionalQuestions] = useState<string[]>([]);
  const { user } = useAuth();
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (content: string) => {
    if (!user?.token) {
      toast({
        title: "Authentication Error",
        description: "You must be logged in to send messages",
        variant: "destructive",
      });
      return;
    }
    
    // Add user message to chat
    const userMessage: ChatMessageType = {
      role: "user",
      content,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setAdditionalQuestions([]); // Clear on new user message
    
    try {
      // Create thinking message
      const thinkingMessage: ChatMessageType = {
        role: "assistant",
        content: "Thinking...",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, thinkingMessage]);
      
      // Send query to API
      const response = await sendQuery(user.token, { question: content });
      
      // Remove thinking message
      setMessages((prev) => prev.filter((msg) => msg.content !== "Thinking..."));
      
      if ('error' in response) {
        throw new Error(response.error);
      }
      // Handle additional_questions
      if (response.additional_questions && Array.isArray(response.additional_questions)) {
        setAdditionalQuestions(response.additional_questions);
      } else {
        setAdditionalQuestions([]);
      }
      
      // Add AI response to chat
      const aiMessage: ChatMessageType = {
        role: "assistant",
        content: "Here's what I found:",
        timestamp: new Date(),
        response: response,
      };
      
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      setMessages((prev) => prev.filter((msg) => msg.content !== "Thinking..."));
      
      const errorMessage: ChatMessageType = {
        role: "assistant",
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : "Unknown error"}`,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
      
      toast({
        title: "Query Error",
        description: error instanceof Error ? error.message : "Failed to process your query",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAskAdditional = (q: string) => {
    handleSendMessage(q);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b">
        <div className="bg-secondary text-secondary-foreground rounded-full p-2 mr-2">
          <Bot className="h-5 w-5" />
        </div>
        <div>
          <h2 className="font-semibold">BI Agent</h2>
          <p className="text-sm text-muted-foreground">Ask me anything about your business data</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <Separator />
      
      <div className="p-4 pt-2">
      {additionalQuestions.length > 0 && (
          <AdditionalQuestions questions={additionalQuestions} onAsk={handleAskAdditional} />
        )}
        <ChatInput onSubmit={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatContainer;
