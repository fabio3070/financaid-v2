import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
);

export async function GET(req: Request, { params }: { params: { username: string } }) {
    const { username } = params;
  
    if (!username) {
      return NextResponse.json({ error: "Username is required" }, { status: 400 });
    }
  
    // Fetch user from Supabase
    const { data: user, error } = await supabase
      .from("Users")
      .select("*")
      .eq("username", username)
      .single();
  
    if (error || !user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
  
    return NextResponse.json(user, { status: 200 });
}