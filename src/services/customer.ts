import { UPDATE_DUEDATE_CUSTOMER } from "../constants/routes";
import { api } from "./api";

interface IUpdateDueDate {
  userId: string;
  customerId: string;
  dueDate: Date;
}

export async function updateDueDateCustomer({ userId, customerId, dueDate }: IUpdateDueDate) {
  const data = { userId, customerId, dueDate };
  try {
    const response = await api.post(UPDATE_DUEDATE_CUSTOMER, data);
    return response.data
  } catch (error) {
    if (error.response){
      return error.response.data
    }
  }
}