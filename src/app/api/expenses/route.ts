import { supabase } from "@/lib/supabaseClient";
import { getDateRange } from "@/utils/date";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const selectedMonth = searchParams.get("month");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const { beginDate, endDate } = getDateRange(selectedMonth || "");

  try {
    const { data, error } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", userId)
      .filter("created_at", "gte", beginDate)
      .filter("created_at", "lt", endDate)
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
