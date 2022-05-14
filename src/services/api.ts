import axios, { AxiosError } from "axios";
import { BASE_URL_BACKEND } from "../constants/values";
import { parseCookies } from "nookies";

export function setupAPIClient(context = undefined) {
  const { "customerControl.token": token } = parseCookies(context);

  const api = axios.create({
    baseURL: BASE_URL_BACKEND,
    headers: {
      Authorization: `${token}`
    }
  });

  api.interceptors.response.use(response => {
    return response;
  }, (err: AxiosError) => {})

  if (token) {
    api.defaults.headers["Authorization"] = `${token}`
  }

  return api;
}