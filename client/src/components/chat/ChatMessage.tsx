
import { ChatMessage as ChatMessageType } from "@/types";
import QueryResultView from "@/components/visualization/QueryResultView";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { User, Bot } from "lucide-react";

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.role === "user";
  
  return (
    <div className={`flex items-start gap-4 mb-6 animate-slide-in ${isUser ? "" : "flex-row-reverse"}`}>
      <div className={`flex-shrink-0 rounded-full p-2 ${isUser ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"}`}>
        {isUser ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
      </div>
      
      <div className={`flex-1 ${isUser ? "text-right" : "text-left"}`}>
        <div className={`inline-block text-left p-4 rounded-lg shadow-sm ${isUser ? "bg-muted" : "bg-card"}`}>
          <p className="text-foreground">{message.content}</p>
          
          {!isUser && message.response && (
            <>
              <Separator className="my-4" />
              
              {/* SQL query display */}
              {message.response.sql && (
                <div className="mb-4">
                  <h4 className="font-medium mb-1 text-sm text-muted-foreground">Generated SQL:</h4>
                  <pre className="code-block text-xs">{message.response.sql}</pre>
                </div>
              )}
              
              {/* Natural language summary */}
              <div className="mb-4">
                <h4 className="font-medium mb-1 text-primary">Summary:</h4>
                <p>{message.response.nlp_text}</p>
              </div>
              
              {/* Insights */}
              {message.response.insights && message.response.insights.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium mb-1 text-primary">Key Insights:</h4>
                  <ul className="list-disc pl-5">
                    {message.response.insights.map((insight, index) => (
                      <li key={index}>{insight}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Visualization */}
              {message.response.visualization && message.response.data && (
                <Card className="p-4 mt-4">
                  <h4 className="font-medium mb-2 text-primary">Visualization:</h4>
                  <QueryResultView 
                    visualization={message.response.visualization} 
                    data={message.response.data} 
                  />
                </Card>
              )}
            </>
          )}
        </div>
        
        <p className="text-xs text-muted-foreground mt-1">
          {message.timestamp?.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
