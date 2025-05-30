import { NextResponse } from "next/server";

//ลูกที่ตาม /news จะแสดง console.log เช่น /news/adv
export const config = {
  matcher: ["/game/:path*", "/api/:path*", "/admin/:path*"],
};
export function middleware(request) {
  console.log("GET request received:", request.method);

  const { pathname } = request.nextUrl;
  const authCookie = request.cookies.get("auth");
  // บล็อกการลบข่าว ถ้าไม่ได้ส่ง header x-admin=true
  if (pathname.startsWith("/api/game") && request.method === "DELETE") {
    const isAdmin = request.headers.get("x-admin") === "true";
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (
    !pathname.startsWith("/admin/auth") &&
    //ลองแก้
    pathname.startsWith("/admin") &&
    !authCookie
  ) {
    const loginUrl = new URL("/admin/auth", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}
