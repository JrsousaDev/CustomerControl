/* //import axios from "axios";
import { BASE_URL_BACKEND } from "constants/values";
import { parseCookies } from "nookies";

export function getAPIClient(ctx?: any) {
  const { "unitok.token": token } = parseCookies(ctx);

  const api = axios.create({
    baseURL: BASE_URL_BACKEND,
  });

  // api.interceptors.request.use(config => {
  //   console.log(config);

  //   return config;
  // })

  if (token) {
    api.defaults.headers["Authorization"] = `${token}`;
  }

  return api;
}
 */