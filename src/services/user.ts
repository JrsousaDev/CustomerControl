import { AUTH_USER, GET_USER } from "../constants/routes";
import { api } from "./api";

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


interface IGetUserInID {
  userId: string;
}

export async function getUserInID({ userId }: IGetUserInID) {
  const data = { userId };
  try {
    const response = await api.post(GET_USER, data)
    return response.data
  } catch (error) {
    if (error.response) {
      return error.response.data;
    }
  }
}