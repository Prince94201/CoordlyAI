
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HistoryItem, QueryResponse } from "@/types";
import { getHistory } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Search, Loader } from "lucide-react";
import { Input } from "@/components/ui/input";
import QueryResultView from "../visualization/QueryResultView";

const HistoryList = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (user?.token) {
      loadHistory();
    }
  }, [user]);

  const loadHistory = async () => {
    if (!user?.token) return;
    
    setIsLoading(true);
    
    try {
      const response = await getHistory(user.token);
      
      if ('error' in response) {
        throw new Error(response.error);
      }
      
      setHistory(response.history || []);
    } catch (error) {
      toast({
        title: "Failed to load history",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const parseResponse = (item: HistoryItem): QueryResponse => {
    try {
      return JSON.parse(item.response);
    } catch (error) {
      console.error("Failed to parse response", error);
      return {
        data: [],
        insights: [],
        visualization: { type: "table" },
        nlp_text: "Could not parse response data.",
      };
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const filteredHistory = history.filter((item) =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Query History</CardTitle>
            <CardDescription>Your recent business intelligence queries</CardDescription>
            
            <div className="relative mt-2">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search queries..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : filteredHistory.length > 0 ? (
              <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
                {filteredHistory.map((item) => (
                  <Button
                    key={item.id}
                    variant="outline"
                    className={`w-full justify-start text-left p-3 h-auto ${
                      selectedItem?.id === item.id ? "border-l-4 border-primary" : ""
                    }`}
                    onClick={() => setSelectedItem(item)}
                  >
                    <div className="w-full">
                      <div className="flex justify-between items-start mb-1">
                        <Badge variant="secondary" className="text-xs">
                          {formatDate(item.created_at)}
                        </Badge>
                      </div>
                      <p className="line-clamp-2 text-sm font-normal">
                        {item.question}
                      </p>
                    </div>
                  </Button>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                {searchTerm ? "No matching queries found" : "No query history yet"}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="md:col-span-2">
        <Card className="h-full">
          {selectedItem ? (
            <>
              <CardHeader>
                <CardTitle>Query Details</CardTitle>
                <CardDescription className="text-sm">
                  {formatDate(selectedItem.created_at)}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">Your Question:</h3>
                    <p className="text-muted-foreground">{selectedItem.question}</p>
                  </div>
                  
                  <Separator />
                  
                  {(() => {
                    const parsedResponse = parseResponse(selectedItem);
                    
                    return (
                      <>
                        {/* SQL Query */}
                        {parsedResponse.sql && (
                          <div>
                            <h3 className="font-medium mb-1">Generated SQL:</h3>
                            <pre className="code-block text-xs">{parsedResponse.sql}</pre>
                          </div>
                        )}
                        
                        {/* Summary */}
                        <div>
                          <h3 className="font-medium mb-1 text-primary">Summary:</h3>
                          <p>{parsedResponse.nlp_text}</p>
                        </div>
                        
                        {/* Insights */}
                        {parsedResponse.insights && parsedResponse.insights.length > 0 && (
                          <div>
                            <h3 className="font-medium mb-1 text-primary">Key Insights:</h3>
                            <ul className="list-disc pl-5">
                              {parsedResponse.insights.map((insight, index) => (
                                <li key={index}>{insight}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Visualization */}
                        {parsedResponse.visualization && parsedResponse.data && (
                          <div className="mt-4">
                            <h3 className="font-medium mb-3 text-primary">Visualization:</h3>
                            <QueryResultView
                              visualization={parsedResponse.visualization}
                              data={parsedResponse.data}
                            />
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </CardContent>
            </>
          ) : (
            <div className="flex items-center justify-center h-full py-20">
              <div className="text-center text-muted-foreground">
                <h3 className="text-lg font-medium mb-2">Select a query</h3>
                <p>Choose a query from the list to view details</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default HistoryList;
