import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const supabase = await createClient();

  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email and password are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 401 }
    );
  }

  // 🔎 Récupérer rôle depuis profiles
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .single();

  let redirectTo = "/dashboard";

  if (profile?.role === "admin") {
    redirectTo = "/admin/dashboard";
  } else if (profile?.role === "staff") {
    redirectTo = "/staff/dashboard";
  }

  return NextResponse.json({
    success: true,
    redirectTo,
  });
}