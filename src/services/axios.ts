import axios from "axios";
import { BASE_URL_BACKEND } from "../constants/values";
import { parseCookies } from "nookies";

export function getAPIClient(context?: any) {
  const { "customerControl.token": token } = parseCookies(context);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL_BACKEND
  });

  if (token) {
    api.defaults.headers["Authorization"] = `${token}`
  }

  return api;
}