import axios from "axios";

const URL = "https://api.thecatapi.com/v1/images";

const config = {
  "Content-Type": "application/json",
  "x-api-key": process.env.VITE_API_KEY_1,
};

export const api_ = axios.create({
  baseURL: URL,
  headers: config,
});
