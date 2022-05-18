import { GetServerSidePropsContext } from "next";
import { GET_MOUNTHS } from "../constants/routes";
import { setupAPIClient } from "./api";
import { api } from "./apiClient";

interface GetAllUserMonthsParameters {
  context?: GetServerSidePropsContext;
}

class ServicesMonths {

  async GetAllUserMonths({ context }: GetAllUserMonthsParameters) {
    if (context) {
      const api = setupAPIClient(context);
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

}

export const servicesMonths = new ServicesMonths();