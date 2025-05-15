
import HistoryList from "@/components/history/HistoryList";
import Layout from "@/components/layout/Layout";

const History = () => {
  return (
    <Layout requireAuth>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6">Query History</h1>
        <p className="text-muted-foreground mb-6">
          Review your past queries and insights
        </p>
        
        <HistoryList />
      </div>
    </Layout>
  );
};

export default History;
