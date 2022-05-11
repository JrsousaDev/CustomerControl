import { GET_MOUNTHS } from "../constants/routes";
import { api } from "./api";
import { getAPIClient } from "./axios";

interface GetMounths {
  ctx?: any
}

export async function getMounths({ ctx }: GetMounths) {
  if(ctx) {
    const api = getAPIClient(ctx);

    try {
      const response = await api.get(GET_MOUNTHS);
      return response.data
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
    }

  } else {
    try {
      const response = await api.get(GET_MOUNTHS);
      return response.data
    } catch (error) {
      if (error.response) {
        return error.response.data;
      }
    }
  }
}