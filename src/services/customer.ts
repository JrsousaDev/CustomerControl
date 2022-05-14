import { CREATE_CUSTOMER, DELETE_CUSTOMER, PAYMENT_SUCCESS_CUSTOMER, UPDATE_DUEDATE_CUSTOMER } from "../constants/routes";
import { api } from "./apiClient";

interface IUpdateDueDate {
  customerId: string;
  dueDate: Date;
}

export async function updateDueDateCustomer({ customerId, dueDate }: IUpdateDueDate) {
  const data = { customerId, dueDate };
  try {
    const response = await api.patch(UPDATE_DUEDATE_CUSTOMER, data);
    return response.data
  } catch (error) {
    if (error.response){
      return error.response.data
    }
  }
}

interface ICreateCustomer {
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
  name,
  responsibleName,
  email,
  phone,
  value,
  dueDate,
  paymentMethod,
  serviceStart,
}: ICreateCustomer) {
  const data = { name, responsibleName, email, phone, value, dueDate, paymentMethod, serviceStart };
  try {
    const response = await api.post(CREATE_CUSTOMER, data);
    return response.data
  } catch (error) {
    if (error.response){
      return error.response.data
    }
  }
}

interface IDeleteCustomer {
  customerId: string;
}

export async function deleteCustomer({customerId}: IDeleteCustomer) {
  const data = {customerId}

  try {
    const response = await api.delete(DELETE_CUSTOMER, {data});
    return response.data
  } catch (error) {
    if (error.response){
      return error.response.data
    }
  }
}

interface IPaymentSuccess {
  customerId: string;
}

export async function paymentSuccess({customerId}: IPaymentSuccess) {
  const data = { customerId };

  try {
    const response = await api.patch(PAYMENT_SUCCESS_CUSTOMER, data);
    return response.data
  } catch (error) {
    if (error.response){
      return error.response.data
    }
  }
}