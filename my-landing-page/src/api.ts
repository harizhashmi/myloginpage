const BASE_URL = "http://localhost:3000";

export async function apiFetch<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const token = localStorage.getItem("access_token");
  const response = await fetch(BASE_URL + path, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });
  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message ?? response.statusText);
  }
  return response.json();
}
