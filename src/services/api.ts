import axios from "axios";

export const api = axios.create({
  baseURL: "https://almox-system.vercel.app/",
  headers: {
    "Content-Type": "application/json ",
  },
});
