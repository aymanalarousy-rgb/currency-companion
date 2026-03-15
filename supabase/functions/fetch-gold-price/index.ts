import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Use goldapi.io free tier or fallback to frankfurter for XAU
    const response = await fetch(
      "https://api.frankfurter.dev/v1/latest?from=XAU&to=USD"
    );
    if (!response.ok) {
      throw new Error(`Frankfurter API failed [${response.status}]`);
    }

    const data = await response.json();
    // Frankfurter returns { rates: { USD: 2345.67 } } where 1 XAU = X USD
    const goldPrice = data?.rates?.USD;

    if (!goldPrice || typeof goldPrice !== "number") {
      throw new Error("Invalid gold price data received");
    }

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

    const { error } = await supabase
      .from("local_market_rates")
      .upsert({
        id: "gold_international",
        name: "Gold (Troy Ounce)",
        name_ar: "الذهب العالمي (أونصة)",
        rate: goldPrice,
        change: change,
        flag: "🥇",
        category: "gold_intl",
        sort_order: 99,
        updated_at: new Date().toISOString(),
      });

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
