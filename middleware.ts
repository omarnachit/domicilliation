import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value);
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const pathname = request.nextUrl.pathname;
  const isProtectedPath =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/staff");

  if (!isProtectedPath) {
    return response;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role,status")
    .eq("id", user.id)
    .single();

  if (profile?.status === "suspended") {
    const url = request.nextUrl.clone();
    url.pathname = "/error";
    url.searchParams.set("message", "Account suspended");
    return NextResponse.redirect(url);
  }

  if (!profile?.role) {
    const url = request.nextUrl.clone();
    url.pathname = "/error";
    url.searchParams.set("message", "Unauthorized");
    return NextResponse.redirect(url);
  }

  const role = profile.role;

  if (pathname.startsWith("/staff")) {
    if (role !== "staff") {
      const url = request.nextUrl.clone();
      url.pathname = role === "admin" ? "/admin/dashboard" : "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/admin")) {
    if (role === "staff" && !pathname.startsWith("/admin/staff")) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/staff";
      return NextResponse.redirect(url);
    }

    if (role !== "admin" && role !== "staff") {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith("/dashboard") && role !== "client") {
    const url = request.nextUrl.clone();
    url.pathname = role === "admin" ? "/admin/dashboard" : "/staff/dashboard";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
