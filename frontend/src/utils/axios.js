import axios from "axios";
import { apiURL } from "./config";

const axiosInstance = axios.create({ baseURL: apiURL });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || "Something went wrong"
    )
);

export default axiosInstance;
