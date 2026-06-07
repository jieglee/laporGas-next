import { NextRequest, NextResponse } from "next/server"
import { categorizeReport } from "@/lib/ai"

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { title, description } = body

        if (!title && !description) {
            return NextResponse.json(
                { success: false, message: "Title atau description diperlukan" },
                { status: 400 }
            )
        }

        const suggestion = await categorizeReport(
            title ?? "",
            description ?? ""
        )

        return NextResponse.json({ success: true, data: suggestion })
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error)
        return NextResponse.json(
            { success: false, message },
            { status: 500 }
        )
    }
}