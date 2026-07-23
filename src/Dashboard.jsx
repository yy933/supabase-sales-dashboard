import { useEffect, useState } from "react";
import supabase from "./supabase-client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";



function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const { data, error } = await supabase
          .from("sales_deals")
          .select("name, sum_value:value.sum()")

        if (error) throw error;

        setMetrics(data);
        console.log("Fetch success data:", data);
      } catch (error) {
        console.log("Fetch data error: ", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMetrics();
  }, []);
  

  
 

  return (
    <div className="dashboard-wrapper">
      <div className="chart-container">
        <h2>Total Sales This Quarter ($)</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : metrics.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={metrics}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis width="auto" />
              <Tooltip />
              <Legend />
              <Bar
                name="Sales ($)"
                dataKey="sum_value"
                fill="#58d675"
                radius={[8, 8, 0, 0]}
              />
              
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p>No data found.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
