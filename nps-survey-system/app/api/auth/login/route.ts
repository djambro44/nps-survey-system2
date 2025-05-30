import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // In a real app, you would:
    // 1. Validate credentials against your database
    // 2. Generate a JWT token
    // 3. Set secure cookies

    // For demo purposes, accept any email/password
    if (email && password) {
      return NextResponse.json({
        success: true,
        user: { email, id: "1" },
        token: "demo-jwt-token",
      })
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}
