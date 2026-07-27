import { useState, useEffect } from "react";
import { getSalesMetrics } from "../utils/getSalesMetrics";
import Chart from "../components/Chart";
import Form from "../components/Form";
import supabase from "../supabase/supabase-client";

function Dashboard() {
  const [metrics, setMetrics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      try {
        const data = await getSalesMetrics();
        if (isMounted) setMetrics(data);
      } catch (error) {
        console.error("Fetch data error: ", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    loadData();

    const channel = supabase
      .channel("deal-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "sales_deals" },
        () => loadData(),
      )
      .subscribe((status) => {
        console.log("📡 Realtime 連線狀態:", status);
      });

    return () => {
      isMounted = false;
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
