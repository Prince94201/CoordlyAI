
import { Visualization } from "@/types";
import BarChart from "./BarChart";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import DataTable from "./DataTable";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, Table } from "lucide-react";

interface QueryResultViewProps {
  visualization: Visualization;
  data: any[];
}

const QueryResultView = ({ visualization, data }: QueryResultViewProps) => {
  const [activeTab, setActiveTab] = useState(visualization.type || "table");
  
  if (!data || data.length === 0) {
    return <div className="text-center py-4">No data to display</div>;
  }

  const xKey = visualization.x || Object.keys(data[0])[0];
  const yKey = visualization.y || Object.keys(data[0])[1];
  
  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          {(visualization.type === "bar" || visualization.type === "table") && (
            <TabsTrigger value="bar">
              <BarChart3 className="h-4 w-4 mr-2" />
              Bar Chart
            </TabsTrigger>
          )}
          
          {(visualization.type === "line" || visualization.type === "table") && (
            <TabsTrigger value="line">
              <LineChartIcon className="h-4 w-4 mr-2" />
              Line Chart
            </TabsTrigger>
          )}
          
          {(visualization.type === "pie" || visualization.type === "table") && (
            <TabsTrigger value="pie">
              <PieChartIcon className="h-4 w-4 mr-2" />
              Pie Chart
            </TabsTrigger>
          )}
          
          <TabsTrigger value="table">
            <Table className="h-4 w-4 mr-2" />
            Table
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="bar" className="border rounded-md p-4">
          <BarChart data={data} xKey={xKey} yKey={yKey} />
        </TabsContent>
        
        <TabsContent value="line" className="border rounded-md p-4">
          <LineChart data={data} xKey={xKey} yKey={yKey} />
        </TabsContent>
        
        <TabsContent value="pie" className="border rounded-md p-4">
          <PieChart data={data} nameKey={xKey} dataKey={yKey} />
        </TabsContent>
        
        <TabsContent value="table" className="border rounded-md p-4">
          <DataTable data={data} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QueryResultView;
