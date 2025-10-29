import axios from "axios";
import type {AxiosResponse, AxiosError} from "axios";

export const api = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 5000,
});

api.interceptors.response.use(
    (res: AxiosResponse) => res,
    (err: AxiosError) => {
        console.error("API Error:", err.response?.data || err.message);
        alert("Something went wrong while connecting to the server.");
        return Promise.reject(err);
    }
);
