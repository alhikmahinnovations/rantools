import axios, { AxiosRequestConfig } from 'axios';
import { ServerResponse } from '../entities/clientserver';

const URL = import.meta.env.DEV
  ? import.meta.env.VITE_DEV_API_BASE_URL
  : import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: URL,
  withCredentials: true,
  // headers: {
  //   "Content-Type": "application/json",
  // }
})

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint
  }

  getAll = (config: AxiosRequestConfig) => {
    return axiosInstance
      .get<ServerResponse<T>>(this.endpoint, config)
      .then(res => res.data);
  }
}

export default APIClient;

