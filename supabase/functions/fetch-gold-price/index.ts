import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Fetch gold price from metals.live (free, no API key needed)
    const response = await fetch("https://api.metals.live/v1/spot");
    if (!response.ok) {
      throw new Error(`metals.live API failed [${response.status}]`);
    }

    const data = await response.json();
    // metals.live returns array like [{"gold":2345.67,"silver":28.45,...}]
    const goldPrice = data?.[0]?.gold;

    if (!goldPrice || typeof goldPrice !== "number") {
      throw new Error("Invalid gold price data received");
    }

    // Get previous price to calculate change
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: existing } = await supabase
      .from("local_market_rates")
      .select("rate")
      .eq("id", "gold_international")
      .single();

    const previousRate = existing?.rate || goldPrice;
    const change =
      previousRate > 0
        ? Number((((goldPrice - previousRate) / previousRate) * 100).toFixed(2))
        : 0;

    // Update the gold price in DB
    const { error } = await supabase
      .from("local_market_rates")
      .update({
        rate: goldPrice,
        change: change,
        updated_at: new Date().toISOString(),
      })
      .eq("id", "gold_international");

    if (error) throw error;

    return new Response(
      JSON.stringify({ success: true, price: goldPrice, change }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error fetching gold price:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
