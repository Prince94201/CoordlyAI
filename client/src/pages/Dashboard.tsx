
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ChatContainer from "@/components/chat/ChatContainer";
import Layout from "@/components/layout/Layout";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    // Welcome toast when dashboard loads
    toast({
      title: "Welcome to BI Agent",
      description: "Ask any business intelligence question in natural language, and I'll analyze your data.",
    });
  }, []);
  
  return (
    <Layout requireAuth>
      <div className="container mx-auto">
        {/* <h1 className="text-3xl font-bold mb-6">AI Data Analysis</h1> */}
        
        <div className="grid grid-cols-1 gap-6">
          <Card className="shadow-md">
            {/* <CardHeader className="pb-0">
              <CardTitle>AI Data Analysis</CardTitle>
              <CardDescription>
                Ask questions about your business data in natural language
              </CardDescription>
            </CardHeader> */}
            <CardContent className="p-0">
              <div className="h-[75vh] border-t">
                <ChatContainer />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
