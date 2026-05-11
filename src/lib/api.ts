const BASE_URL = "http://localhost:3000";

export async function apiFetch(endpoint: string, options?: RequestInit) {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
        "Content-Type": "application/json",
        ...options?.headers,
    },

    ...options,
    });

    const result = await response.json();

    if (!response.ok) {
    throw new Error(result.message || "Something went wrong");
    }

    return result;
}