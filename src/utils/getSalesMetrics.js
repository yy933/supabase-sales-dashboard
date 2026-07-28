import supabase from "../supabase/supabase-client";

export async function getSalesMetrics() {
  const { data, error } = await supabase.from("sales_deals").select(
    `
    value.sum(),
    ...user_profiles!inner(
      name
    )
    `,
  );
  console.log("Fetched metrics:", data);

 if (error) {
   console.error("Error in getSalesMetrics:", error);
   throw error;
 }

 // Supabase 回傳的資料結構會是 [{ sum: 3000, user_profiles: { name: "Dwight" } }]
 // 將其轉換為 Chart 元件預期的格式 [{ name: "Dwight", sum_value: 3000 }]
 const formattedData = data.map((item) => ({
   name: item.name || "Unknown",
   sum_value: item.sum,
 }));

 return formattedData;
}
