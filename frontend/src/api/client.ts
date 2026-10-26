import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "/api/v1",
  withCredentials: true,
  timeout: 10_000,
});

// Fetch a fresh session-bound token before mutations; login/logout may rotate it in Phase 2.
api.interceptors.request.use(async (config) => {
  if (
    ["post", "put", "patch", "delete"].includes(
      config.method?.toLowerCase() || "",
    )
  ) {
    const { data } = await api.get<{ headerName: string; token: string }>(
      "/auth/csrf",
    );
    config.headers.set(data.headerName, data.token);
  }
  return config;
});
