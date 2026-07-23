import { useEffect, useState } from "react";
import supabase from "./supabase-client";
import Chart from "./Chart";
import Form from "./Form";

function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const { data, error } = await supabase
          .from("sales_deals")
          .select("name, sum_value:value.sum()");

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

    const channel = supabase
      .channel("deal-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "sales_deals",
        },
        (payload) => {
          console.log("New deal:", payload.new);
          // Action
        },
      )
      .subscribe();

    // Clean up subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="dashboard-wrapper">
      <div className="chart-container">
        <h2>Total Sales This Quarter ($)</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : metrics.length > 0 ? (
          <>
            <Chart data={metrics} />
            <Form data={metrics} />
          </>
        ) : (
          <p>No data found.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
