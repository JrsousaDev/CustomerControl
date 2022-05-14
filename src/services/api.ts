import axios /* { AxiosError } */ from "axios";
import { BASE_URL_BACKEND } from "../constants/values";
import { parseCookies } from "nookies";
/* import { signOut } from "../contexts/AuthContext"; */

export function setupAPIClient(context = undefined) {
  const { "customerControl.token": token } = parseCookies(context);

  const api = axios.create({
    baseURL: BASE_URL_BACKEND,
    headers: {
      Authorization: `${token}`
    }
  });

/*   api.interceptors.response.use(response => {
    return response;
  }, (error: AxiosError) => { 
    if(error.response.status === 401) {
      if(error.response.data?.code === 'token.expired') {
        signOut();
      } else {
        if(typeof window === 'undefined') {
          signOut();
        }
      }
    }
  });  */

  if (token) {
    api.defaults.headers["Authorization"] = `${token}`
  }

  return api;
}