export const baseURL =
  import.meta.env.VITE_BASE_URL ||
  "https://api-say-hello.onrender.com" ||
  "http://localhost:5000";

export const apiURL =
  import.meta.env.VITE_API_URL ||
  "https://api-say-hello.onrender.com/api/v1" ||
  "http://localhost:5000/api/v1";
