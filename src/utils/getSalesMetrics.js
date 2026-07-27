import supabase from "../supabase/supabase-client";

export async function getSalesMetrics() {
  const { data, error } = await supabase
    .from("sales_deals")
    .select("name, sum_value:value.sum()");

  if (error) throw error;
  return data || [];
}
