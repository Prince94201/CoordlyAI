
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, BarChart3, MessageSquare, Search } from "lucide-react";

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <Layout>
      <section className="py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Business Intelligence Agent
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Transform your business data into actionable insights with just a conversation. Ask questions in plain English, get powerful analysis in seconds.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
                    {isAuthenticated ? "Go to Dashboard" : "Get Started"} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                {!isAuthenticated && (
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/login">
                      Login
                    </Link>
                  </Button>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Card className="relative overflow-hidden rounded-xl border bg-gradient-to-b from-primary/20 to-background shadow-lg">
                <CardContent className="flex aspect-[1/1.1] items-center justify-center p-6">
                  <div className="space-y-8 text-center">
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold">Conversational BI</h2>
                      <p className="text-gray-500 dark:text-gray-400">
                        Ask questions in natural language, get instant insights
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <div className="rounded-full bg-secondary/20 p-8">
                        <MessageSquare className="h-12 w-12 text-secondary" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Key Features
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                Explore the powerful features that make BI Agent your essential business analytics tool
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4">
                <div className="rounded-full bg-primary/20 p-4">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Natural Language Queries</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  No coding required. Simply type your business question in plain English.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4">
                <div className="rounded-full bg-primary/20 p-4">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Interactive Visualizations</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  View data as beautiful charts, graphs, and tables that reveal hidden trends.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border-gray-800 p-4">
                <div className="rounded-full bg-primary/20 p-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Instant Insights</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Get key insights and summaries that help you make informed business decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Start Analyzing Your Data Today
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed dark:text-gray-400">
                Join businesses that are making data-driven decisions faster than ever before
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link to={isAuthenticated ? "/dashboard" : "/signup"}>
                  {isAuthenticated ? "Go to Dashboard" : "Get Started"} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
