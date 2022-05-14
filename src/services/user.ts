import { AUTH_USER, GET_USER } from "../constants/routes";
import { setupAPIClient } from "./api";
import { api } from "./apiClient";

interface ICreateAuthenticateUser {
  email: string;
  password: string;
}

export async function createAuthenticationUser({ email, password }: ICreateAuthenticateUser) {
  const data = { email, password };
  try {
    const response = await api.post(AUTH_USER, data);
    return response.data
  } catch (error) {
    if (error.response){
      return error.response.data
    }
  }
}

interface GetUser {
  ctx?: any
}

export async function getUser({ ctx }: GetUser) {
  if(ctx) {
    const apiClient = setupAPIClient(ctx);

    try {
      const response = await apiClient.get(GET_USER);
      return response.data
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
    }

  } else {
    try {
      const response = await api.get(GET_USER);
      return response.data
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
    }
  }
}