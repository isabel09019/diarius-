const API_BASE_URL = "http://localhost:3000/api";

export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    },
  );

  if (!response.ok) {
    throw new Error(
      `Erro na API: ${response.status}`,
    );
  }

  return response.json();
}