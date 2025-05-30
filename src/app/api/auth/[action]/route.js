//ทำงานเป็น nodejs เป็นหลัก ไม่ใช่ nextjs
export const runtime = "nodejs";

import { NextResponse } from "next/server";
import sql from "better-sqlite3";
//เข้ารหัส เป็น h vaule
import bcrypt from "bcrypt";
//เก็บ session ตราบใดที่ยังไม่ log out
import { cookies } from "next/headers";

const db = sql("data.db");

db.exec(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE,
  password TEXT
)`);

//
export async function POST(req, { params }) {
  //ด
  const { action } = await params;
  const { email, password } = await req.json();
  const users = db.prepare("SELECT * FROM users WHERE email = ?");
  const insert = db.prepare(
    "INSERT INTO users (email, password) VALUES (?, ?)"
  );

  //ลงทะเบียน
  if (action === "signup") {
    try {
      //hash password
      // 10 = saltค่าที่สุ่ม
      const hash = await bcrypt.hash(password, 10);
      insert.run(email, hash);
      return NextResponse.json({ message: "Signup successful" });
    } catch (e) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
  }

  if (action === "signin") {
    //หาจาก email
    const user = users.get(email);
    //หาไม่เจอ
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    //หาเจอ
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 403 }
      );
    }
    //สร้างคุกกี้จากฝั่ง server แล้วส่งไป cilent
    (await cookies()).set("auth", email, {
      //cookies มีผลกับ path ตัวไหนบ้าง
      path: "/",
      httpOnly: true,
      //อายุกี่วินาที 3600 = 1 ชม.
      maxAge: 3600,
    });
    return NextResponse.json({ message: "Signin successful" });
  }

  return NextResponse.json({ error: "Invalid action" }, { status: 400 });
}

export async function GET(_, { params }) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const { action } = await params;
  if (action != "signout") {
    return NextResponse.json({ error: "Invalid API call" }, { status: 400 });
  }

  const response = NextResponse.redirect(`${baseUrl}/admin/auth`);
  response.cookies.set("auth", "", {
    path: "/",
    httpOnly: true,
    maxAge: 0,
  });
  return response;
}
