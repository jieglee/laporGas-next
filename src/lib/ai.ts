const OLLAMA_URL = process.env.OLLAMA_URL ?? "http://localhost:11434"
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? "llama3.2"

type CategoryId = "1" | "2" | "3" | "4"

export type AISuggestion = {
    category_id: CategoryId
    priority: "low" | "medium" | "high" | "urgent"
    confidence: number
}

const CATEGORY_MAP: Record<string, CategoryId> = {
    Infrastruktur: "1",
    "Fasilitas Umum": "2",
    Kebersihan: "3",
    "Lalu Lintas": "4",
}

const SYSTEM_PROMPT = `
Kamu adalah AI classifier untuk platform pengaduan masyarakat Indonesia bernama LaporGas.

Tugasmu: dari judul dan deskripsi laporan, tentukan KATEGORI dan PRIORITAS.

KATEGORI yang tersedia (pilih SATU):
- Infrastruktur (jalan rusak, jembatan, gorong-gorong, trotoar, penerangan jalan)
- Fasilitas Umum (taman rusak, bangku rusak, toilet umum, halte, lampu taman)
- Kebersihan (sampah menumpuk, got mampet, drainase, limbah, sanitasi)
- Lalu Lintas (kemacetan, rambu rusak, marka jalan, parkir liar, trotoar)

PRIORITAS:
- urgent: berbahaya/darurat, mengancam keselamatan jiwa
- high: berbahaya, butuh penanganan segera
- medium: mengganggu tapi tidak berbahaya langsung
- low: tidak urgent, kosmetik

RESPONS dalam format JSON SAJA, tanpa markdown, tanpa penjelasan:

{"category":"...","priority":"...","confidence":0.0}
`

export async function categorizeReport(
    title: string,
    description: string
): Promise<AISuggestion> {
    const userPrompt = `
Judul: ${title}

Deskripsi:
${description}
`

    try {
        const res = await fetch(`${OLLAMA_URL}/api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                model: OLLAMA_MODEL,
                messages: [
                    {
                        role: "system",
                        content: SYSTEM_PROMPT,
                    },
                    {
                        role: "user",
                        content: userPrompt,
                    },
                ],
                stream: false,
                options: {
                    temperature: 0.1,
                    num_predict: 100,
                },
            }),
        })

        if (!res.ok) {
            throw new Error(`Ollama error: ${res.status}`)
        }

        const data = await res.json()
        const content = data?.message?.content ?? ""

        const jsonMatch = content.match(/\{[\s\S]*?\}/)

        if (!jsonMatch) {
            throw new Error("No JSON found in Ollama response")
        }

        const parsed = JSON.parse(jsonMatch[0])

        const category_id: CategoryId =
            CATEGORY_MAP[parsed.category] ?? "2"

        const rawPriority = String(
            parsed.priority ?? ""
        ).toLowerCase()

        const priority: AISuggestion["priority"] =
            rawPriority === "low" ||
            rawPriority === "medium" ||
            rawPriority === "high" ||
            rawPriority === "urgent"
                ? rawPriority
                : "medium"

        let confidence: number

        if (
            typeof parsed.confidence === "number" &&
            !Number.isNaN(parsed.confidence)
        ) {
            confidence = Math.min(
                Math.max(parsed.confidence, 0),
                1
            )
        } else {
            const categoryValid =
                CATEGORY_MAP[parsed.category] !== undefined

            const priorityValid = [
                "low",
                "medium",
                "high",
                "urgent",
            ].includes(rawPriority)

            confidence =
                categoryValid && priorityValid
                    ? 0.75
                    : 0.5
        }

        return {
            category_id,
            priority,
            confidence,
        }
    } catch (error) {
        console.error("AI categorization failed:", error)

        return {
            category_id: "2",
            priority: "medium",
            confidence: 0,
        }
    }
}
