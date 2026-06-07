const OLLAMA_URL = process.env.OLLAMA_URL ?? "http://localhost:11434"
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "llama3.2"

export type AISuggestion = {
    category_id: "1" | "2" | "3" | "4"
    priority: "low" | "medium" | "high" | "urgent"
    confidence: number
}

// Mapping nama kategori AI → ID di form
const CATEGORY_MAP: Record<string, string> = {
    "Infrastruktur":  "1",
    "Fasilitas Umum": "2",
    "Kebersihan":     "3",
    "Lalu Lintas":    "4",
}

const SYSTEM_PROMPT = `Kamu adalah AI classifier untuk platform pengaduan masyarakat Indonesia bernama LaporGas.

Tugasmu: dari judul dan deskripsi laporan, tentukan KATEGORI dan PRIORITAS.

KATEGORI yang tersedia (pilih SATU):
- Infrastruktur (jalan rusak, jembatan, gorong-gorong, trotoar, penerangan jalan)
- Fasilitas Umum (taman rusak, bangku rusak, toilet umum, halte, lampu taman)
- Kebersihan (sampah menumpuk, got mampet, drainase, limbah, sanitasi)
- Lalu Lintas (kemacetan, rambu rusak, marka jalan, parkir liar, trotoar)

PRIORITAS:
- urgent: berbahaya/darurat, mengancam keselamatan jiwa (jalan ambles, banjir besar, pohon mau roboh ke jalan)
- high: berbahaya, butuh penanganan segera (jalan berlubang besar, lampu lalu lintas mati, got meluap)
- medium: mengganggu tapi tidak berbahaya langsung (sampah menumpuk, jalan berlubang kecil, lampu taman mati)
- low: tidak urgent, kosmetik (cat pudar, rumput tinggi, coretan ringan)

RESPONS dalam format JSON SAJA, tanpa markdown, tanpa penjelasan:
{"category":"...","priority":"...","confidence":0.0}`

export async function categorizeReport(
    title: string,
    description: string
): Promise<AISuggestion> {
    const userPrompt = `Judul: ${title}\nDeskripsi: ${description}`

    try {
        const res = await fetch(`${OLLAMA_URL}/api/chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                model: OLLAMA_MODEL,
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    { role: "user", content: userPrompt },
                ],
                stream: false,
                options: {
                    temperature: 0.1,
                    num_predict: 100,
                },
            }),
        })

        if (!res.ok) throw new Error(`Ollama error: ${res.status}`)

        const data = await res.json()
        const content = data.message?.content ?? ""

        const jsonMatch = content.match(/\{[\s\S]*?\}/)
        if (!jsonMatch) throw new Error("No JSON in response")

        const parsed = JSON.parse(jsonMatch[0])

        // Map nama kategori → ID
        const category_id = CATEGORY_MAP[parsed.category] ?? ""

        // Normalize priority ke lowercase, fallback medium
        const rawPriority = (parsed.priority ?? "").toLowerCase()
        const priority = ["low", "medium", "high", "urgent"].includes(rawPriority)
            ? rawPriority
            : "medium"

        let confidence =
    typeof parsed.confidence === "number" && parsed.confidence > 0
        ? Math.min(Math.max(parsed.confidence, 0), 1)
        : null

// Kalau model return 0 atau null, estimasi confidence dari apakah kategori valid
if (!confidence || confidence === 0) {
    const categoryValid = CATEGORY_MAP[parsed.category] !== undefined
    const priorityValid = ["low", "medium", "high", "urgent"].includes(
        (parsed.priority ?? "").toLowerCase()
    )
    confidence = categoryValid && priorityValid ? 0.75 : 0.5
}

        return { category_id, priority, confidence }
    } catch (error) {
        console.error("AI categorization failed:", error)
        return { category_id: "", priority: "medium", confidence: 0 }
    }
}