import { CREATE_CUSTOMER, DELETE_CUSTOMER, UPDATE_DUEDATE_CUSTOMER } from "../constants/routes";
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

interface ICreateCustomer {
  userId: string;
  name: string;
  responsibleName: string;
  email: string;
  phone: string;
  value: string;
  dueDate: string;
  paymentMethod: string;
  serviceStart: string;
}

export async function createCustomer({ 
  userId,
  name,
  responsibleName,
  email,
  phone,
  value,
  dueDate,
  paymentMethod,
  serviceStart,
}: ICreateCustomer) {
  const data = { userId, name, responsibleName, email, phone, value, dueDate, paymentMethod, serviceStart };
  try {
    const response = await api.post(CREATE_CUSTOMER, data);
    return response.data
  } catch (error) {
    if (error.response){
      return error.response.data
    }
  }
}

export async function deleteCustomer({userId, customerId}) {
  const data = {userId, customerId}

  try {
    const response = await api.delete(DELETE_CUSTOMER, {data});
    return response.data
  } catch (error) {
    if (error.response){
      return error.response.data
    }
  }
}