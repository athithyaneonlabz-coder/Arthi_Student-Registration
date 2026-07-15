import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

export const httpClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});