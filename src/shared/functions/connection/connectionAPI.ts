import axios from 'axios';

import { ERROR_ACCESS_DANIED, ERROR_CONNECTION } from '../../constants/errorsStatus';
import { MethodsEnum } from '../../enums/methods.enum';

export default class ConnectionAPI {
  static async call<Type>(url: string, method: string, body?: unknown): Promise<Type> {
    switch (method) {
      case MethodsEnum.GET:
        return (await axios.get<Type>(url)).data;
      case MethodsEnum.DELETE:
        return (await axios.delete<Type>(url)).data;
      case MethodsEnum.POST:
        return (await axios.post<Type>(url, body)).data;
      case MethodsEnum.PUT:
        return (await axios.put<Type>(url, body)).data;
      case MethodsEnum.PATCH:
      default:
        return (await axios.patch<Type>(url, body)).data;
    }
  }

  static async connect<Type>(url: string, method: string, body?: unknown): Promise<Type> {
    return ConnectionAPI.call<Type>(url, method, body).catch((error) => {
      if (error.response) {
        switch (error.response.status) {
          case 401:
          case 403:
            throw new Error(ERROR_ACCESS_DANIED);
          default:
            throw new Error(ERROR_CONNECTION);
        }
      }

      throw new Error(ERROR_CONNECTION);
    });
  }
}

export const connectionAPIGet = async <Type>(url: string): Promise<Type> => {
  return ConnectionAPI.connect<Type>(url, MethodsEnum.GET);
};

export const connectionAPIDelete = async <Type>(url: string): Promise<Type> => {
  return ConnectionAPI.connect<Type>(url, MethodsEnum.DELETE);
};

export const connectionAPIPost = async <Type>(url: string, body: unknown): Promise<Type> => {
  return ConnectionAPI.connect<Type>(url, MethodsEnum.POST, body);
};

export const connectionAPIPut = async <Type>(url: string, body: unknown): Promise<Type> => {
  return ConnectionAPI.connect<Type>(url, MethodsEnum.PUT, body);
};

export const connectionAPIPatch = async <Type>(url: string, body: unknown): Promise<Type> => {
  return ConnectionAPI.connect<Type>(url, MethodsEnum.PATCH, body);
};
