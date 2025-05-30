import { type NextRequest, NextResponse } from "next/server"

// This would typically connect to your database
// For demo purposes, we'll just log the data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { score, feedback, timestamp, url, userAgent } = body

    // Get API key from Authorization header
    const authHeader = request.headers.get("authorization")
    const apiKey = authHeader?.replace("Bearer ", "")

    if (!apiKey) {
      return NextResponse.json({ error: "API key required" }, { status: 401 })
    }

    // Validate the API key (in a real app, check against your database)
    if (!apiKey.startsWith("sk_")) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 401 })
    }

    // In a real implementation, you would:
    // 1. Validate the API key against your database
    // 2. Store the response in your database
    // 3. Update analytics/metrics

    console.log("NPS Response received:", {
      apiKey,
      score,
      feedback,
      timestamp,
      url,
      userAgent: userAgent?.substring(0, 100), // Truncate for logging
    })

    // Simulate database save
    const responseId = Math.random().toString(36).substring(7)

    return NextResponse.json({
      success: true,
      id: responseId,
      message: "Response saved successfully",
    })
  } catch (error) {
    console.error("Error saving NPS response:", error)
    return NextResponse.json({ error: "Failed to save response" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  // This endpoint could be used to fetch responses for the dashboard
  const authHeader = request.headers.get("authorization")
  const apiKey = authHeader?.replace("Bearer ", "")

  if (!apiKey) {
    return NextResponse.json({ error: "API key required" }, { status: 401 })
  }

  // In a real app, fetch responses from database based on API key
  // For demo, return mock data
  return NextResponse.json({
    responses: [
      {
        id: 1,
        score: 9,
        feedback: "Great product!",
        timestamp: new Date().toISOString(),
        url: "/dashboard",
      },
    ],
  })
}
