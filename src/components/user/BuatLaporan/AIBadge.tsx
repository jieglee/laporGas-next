"use client"

import { Sparkles, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
    loading: boolean
    confidence: number | null
    error: boolean
    applied: boolean
}

export default function AIBadge({ loading, confidence, error, applied }: Props) {
    if (!loading && confidence === null && !error) return null

    return (
        <div className={cn(
            "inline-flex items-center gap-2 text-[0.7rem] font-semibold px-3 py-1.5 rounded-full border transition-all duration-300",
            loading && "bg-[#FFF5EE] border-[rgba(232,84,28,0.2)] text-[#E8541C]",
            !loading && applied && confidence !== null && confidence >= 0.7 && "bg-[#FFF5EE] border-[rgba(232,84,28,0.2)] text-[#E8541C]",
            !loading && applied && confidence !== null && confidence < 0.7 && "bg-amber-50 border-amber-200 text-amber-700",
            error && "bg-[#fafaf8] border-[#f0e6dc] text-[#a8856b]",
        )}>
            {loading ? (
                <>
                    <Loader2 size={11} className="animate-spin" />
                    AI sedang menganalisis...
                </>
            ) : error ? (
                <>
                    <Sparkles size={11} />
                    AI tidak tersedia
                </>
            ) : applied && confidence !== null ? (
                <>
                    <Sparkles size={11} />
                    AI: {Math.round(confidence * 100)}% yakin
                </>
            ) : null}
        </div>
    )
}