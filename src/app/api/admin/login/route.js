import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "Username dan Password wajib diisi" }, { status: 400 });
    }

    // Try checking database
    const sql = "SELECT id, username FROM admin_users WHERE username = ? AND password = ? LIMIT 1";
    const { data, fallback, error } = await query(sql, [username, password]);

    if (fallback || !data) {
      // Offline fallback: verify against default credentials
      if (username === "admin" && password === "cakrawala123") {
        return NextResponse.json({
          success: true,
          message: "Login Berhasil (Mode Offline/Fallback aktif)!",
          isFallback: true
        });
      } else {
        return NextResponse.json({ error: "Kredensial salah (Mode Offline)" }, { status: 401 });
      }
    }

    // Check if user exists in database
    if (data.length === 0) {
      return NextResponse.json({ error: "Username atau Password salah" }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      message: "Login Berhasil! Sesi admin diaktifkan.",
      isFallback: false
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
